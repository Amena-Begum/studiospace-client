"use client";

import { MapPin, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import PrivateRoute from "@/components/PrivateRoute";
import { RowsSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import type { Studio } from "@/lib/types";

function Listings() {
  const [studios, setStudios] = useState<Studio[] | null>(null);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<Studio | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<Studio[]>("/studios/mine").then(setStudios).catch((e) => setError(e.message));
  }, []);

  const remove = async () => {
    if (!target) return;
    setBusy(true);
    try {
      await api(`/studios/${target._id}`, { method: "DELETE" });
      setStudios((list) => list?.filter((s) => s._id !== target._id) ?? null);
      toast.success(`"${target.title}" was deleted.`);
      setTarget(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete the studio.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Hosting</p>
          <h1 className="section-title mt-2">My studio listings</h1>
        </div>
        <Link href="/add-studio" className="btn btn-primary">Add New Studio</Link>
      </div>

      {error ? (
        <EmptyState title="We couldn't load your listings" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
      ) : !studios ? (
        <RowsSkeleton />
      ) : studios.length === 0 ? (
        <EmptyState title="You haven't listed a studio yet" message="Add your first space and creators can start booking it by the hour." ctaLabel="Add New Studio" ctaHref="/add-studio" />
      ) : (
        <ul className="space-y-4">
          {studios.map((s) => (
            <li key={s._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.imageUrl} alt="" className="h-40 w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-44" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-accent">{s.category}</p>
                <Link href={`/studios/${s._id}`} className="font-display text-xl font-semibold hover:text-accent">{s.title}</Link>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} /> {s.location}</p>
                <p className="mt-1 text-sm font-bold">${s.hourlyRate} / hr <span className="font-medium text-muted">· deposit ${s.securityDeposit} · up to {s.maxCapacity} people</span></p>
              </div>
              <div className="flex gap-3 sm:flex-col">
                <Link href={`/studios/edit/${s._id}`} className="btn btn-ghost flex-1 !py-2.5"><Pencil size={15} /> Update</Link>
                <button type="button" onClick={() => setTarget(s)} className="btn btn-danger flex-1 !py-2.5"><Trash2 size={15} /> Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmModal
        open={!!target}
        onClose={() => !busy && setTarget(null)}
        title="Delete this studio?"
        message={`"${target?.title ?? ""}" will be removed from StudioSpace for good. This can't be undone.`}
        confirmLabel="Delete studio"
        busy={busy}
        onConfirm={remove}
      />
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><Listings /></PrivateRoute>;
}
