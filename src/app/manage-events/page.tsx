"use client";

import { CalendarDays, MapPin, Pencil, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import PrivateRoute from "@/components/PrivateRoute";
import { RowsSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import { formatDate, todayISO } from "@/lib/dates";
import type { EventItem } from "@/lib/types";

function Manage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<EventItem | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ events: EventItem[] }>("/events/mine")
      .then((d) => setEvents(d.events))
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load your events."));
  }, []);

  const remove = async () => {
    if (!target) return;
    setBusy(true);
    try {
      await api(`/events/${target._id}`, { method: "DELETE" });
      setEvents((list) => (list ?? []).filter((e) => e._id !== target._id));
      toast.success("Event deleted.");
      setTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the event.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Organiser tools</p>
          <h1 className="section-title mt-3">Manage events</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">Every event you have created. Update the details or delete an event you no longer need.</p>
        </div>
        <Link href="/create-event" className="btn btn-primary">Create Event</Link>
      </div>
      <div className="mt-10">
        {error ? (
          <EmptyState title="We couldn't load your events" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
        ) : !events ? (
          <RowsSkeleton />
        ) : events.length === 0 ? (
          <EmptyState title="You haven't created any events" message="When you create an event it shows up here so you can keep it up to date." ctaLabel="Create your first event" ctaHref="/create-event" />
        ) : (
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.thumbnail} alt="" className="aspect-[16/10] w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-40" referrerPolicy="no-referrer" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-bold">{e.eventType}</span>
                    {e.eventDate < todayISO() && <span className="rounded-full bg-surface2 px-2.5 py-0.5 text-xs font-bold text-muted">Completed</span>}
                  </div>
                  <h2 className="mt-1.5 line-clamp-2 font-display text-xl font-semibold leading-snug">{e.title}</h2>
                  <p className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><CalendarDays size={15} className="text-accent" /> {formatDate(e.eventDate)}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={15} className="text-accent" /> {e.location}</span>
                    <span className="flex items-center gap-1.5"><Users size={15} className="text-accent" /> {e.participants ?? 0} joined</span>
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <Link href={`/events/edit/${e._id}`} className="btn btn-ghost"><Pencil size={15} /> Update</Link>
                  <button type="button" className="btn btn-danger" onClick={() => setTarget(e)}><Trash2 size={15} /> Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmModal
        open={Boolean(target)}
        title="Delete this event?"
        message={target ? `“${target.title}” and everyone's sign-ups for it will be removed. This can't be undone.` : ""}
        confirmLabel="Delete event"
        busy={busy}
        onConfirm={remove}
        onClose={() => !busy && setTarget(null)}
      />
    </section>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <Manage />
    </PrivateRoute>
  );
}
