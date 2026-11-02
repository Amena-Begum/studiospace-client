"use client";

import { Calendar, Clock, FileDown, MapPin } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import PrivateRoute from "@/components/PrivateRoute";
import { RowsSkeleton } from "@/components/Skeletons";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { downloadInvoice } from "@/lib/invoice";
import type { Booking, BookingStatus } from "@/lib/types";

const badge: Record<BookingStatus, string> = {
  Pending: "bg-[#f2c14e]/25 text-[#7a5600] dark:text-[#f2c14e]",
  Confirmed: "bg-tone/15 text-tone",
  Completed: "bg-ink/10 text-ink",
  Cancelled: "bg-[#b42318]/12 text-[#b42318] dark:text-[#ff8f84]",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${badge[status]}`}>{status}</span>;
}

function Details({ b, who }: { b: Booking; who?: string }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/studios/${b.studioId}`} className="font-display text-xl font-semibold hover:text-accent">{b.studioTitle}</Link>
        <StatusBadge status={b.status} />
      </div>
      {who && <p className="mt-1 text-sm text-muted">Requested by {who}</p>}
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} /> {b.studioLocation}</p>
      <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {b.date}</span>
        <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {b.startTime}–{b.endTime}</span>
        <span>${b.total} <span className="font-medium text-muted">+ ${b.securityDeposit} deposit</span></span>
      </p>
    </div>
  );
}

type Pending = { booking: Booking; action: "cancel" | "confirm" | "complete"; asHost: boolean };

function Bookings() {
  const { user } = useAuth();
  const [data, setData] = useState<{ asGuest: Booking[]; asHost: Booking[] } | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<Pending | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api<{ asGuest: Booking[]; asHost: Booking[] }>("/bookings/mine").then(setData).catch((e) => setError(e.message));
  }, []);
  useEffect(load, [load]);

  const run = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await api(`/bookings/${pending.booking._id}/status`, { method: "PATCH", body: { action: pending.action } });
      toast.success(pending.action === "confirm" ? "Booking confirmed." : pending.action === "complete" ? "Booking marked as completed." : "Booking cancelled.");
      setPending(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update the booking.");
      setPending(null);
      load();
    } finally {
      setBusy(false);
    }
  };

  const invoice = async (b: Booking) => {
    try {
      await downloadInvoice(b, user!.email);
      toast.success("Receipt downloaded.");
    } catch {
      toast.error("Could not create the receipt. Please try again.");
    }
  };

  const copy: Record<Pending["action"], { title: string; confirm: string; danger: boolean; text: string }> = {
    cancel: { title: "Cancel this booking?", confirm: "Cancel booking", danger: true, text: "The slot will be released. This can't be undone." },
    confirm: { title: "Confirm this booking?", confirm: "Confirm booking", danger: false, text: "We'll check the slot is still free, then lock it in for the guest." },
    complete: { title: "Mark as completed?", confirm: "Mark completed", danger: false, text: "Use this once the session has taken place." },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Reservations</p>
      <h1 className="section-title mt-2">My bookings</h1>

      {error ? (
        <div className="mt-8"><EmptyState title="We couldn't load your bookings" message={error} ctaLabel="Try again" onCta={() => location.reload()} /></div>
      ) : !data ? (
        <div className="mt-8"><RowsSkeleton /></div>
      ) : (
        <>
          <div className="mt-8">
            {data.asGuest.length === 0 ? (
              <EmptyState title="No bookings yet" message="When you book a studio, it will show up here with its status." ctaLabel="Explore Studios" ctaHref="/studios" />
            ) : (
              <ul className="space-y-4">
                {data.asGuest.map((b) => (
                  <li key={b._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.studioImage} alt="" className="h-36 w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-40" />
                    <Details b={b} />
                    <div className="flex gap-3 sm:flex-col">
                      {b.status === "Pending" && <button type="button" className="btn btn-danger !py-2.5" onClick={() => setPending({ booking: b, action: "cancel", asHost: false })}>Cancel Booking</button>}
                      {(b.status === "Confirmed" || b.status === "Completed") && <button type="button" className="btn btn-ghost !py-2.5" onClick={() => invoice(b)}><FileDown size={15} /> Receipt PDF</button>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {data.asHost.length > 0 && (
            <section className="mt-16" aria-labelledby="host-requests">
              <h2 id="host-requests" className="font-display text-3xl font-semibold tracking-tight">Requests on my studios</h2>
              <p className="mb-6 mt-2 text-muted">Confirm, complete or cancel bookings that guests made on your listings.</p>
              <ul className="space-y-4">
                {data.asHost.map((b) => (
                  <li key={b._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.studioImage} alt="" className="h-36 w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-40" />
                    <Details b={b} who={`${b.userName} (${b.userEmail})`} />
                    <div className="flex flex-wrap gap-3 sm:flex-col">
                      {b.status === "Pending" && <button type="button" className="btn btn-primary !py-2.5" onClick={() => setPending({ booking: b, action: "confirm", asHost: true })}>Confirm</button>}
                      {b.status === "Confirmed" && <button type="button" className="btn btn-primary !py-2.5" onClick={() => setPending({ booking: b, action: "complete", asHost: true })}>Mark completed</button>}
                      {(b.status === "Pending" || b.status === "Confirmed") && <button type="button" className="btn btn-danger !py-2.5" onClick={() => setPending({ booking: b, action: "cancel", asHost: true })}>Cancel</button>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <ConfirmModal
        open={!!pending}
        onClose={() => !busy && setPending(null)}
        title={pending ? copy[pending.action].title : ""}
        message={pending ? `${pending.booking.studioTitle} on ${pending.booking.date}, ${pending.booking.startTime}–${pending.booking.endTime}. ${copy[pending.action].text}` : ""}
        confirmLabel={pending ? copy[pending.action].confirm : ""}
        danger={pending ? copy[pending.action].danger : true}
        busy={busy}
        onConfirm={run}
      />
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><Bookings /></PrivateRoute>;
}
