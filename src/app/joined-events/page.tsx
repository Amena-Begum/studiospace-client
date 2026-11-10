"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import PrivateRoute from "@/components/PrivateRoute";
import { RowsSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import { formatDate, todayISO } from "@/lib/dates";
import type { JoinedEvent } from "@/lib/types";

function Joined() {
  const [joins, setJoins] = useState<JoinedEvent[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ joins: JoinedEvent[] }>("/joins/mine")
      .then((d) => setJoins([...d.joins].sort((a, b) => a.eventDate.localeCompare(b.eventDate))))
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load your events."));
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow">Your calendar</p>
      <h1 className="section-title mt-3">Joined events</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">The events you have signed up for, in the order they take place.</p>
      <div className="mt-10">
        {error ? (
          <EmptyState title="We couldn't load your events" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
        ) : !joins ? (
          <RowsSkeleton />
        ) : joins.length === 0 ? (
          <EmptyState title="You haven't joined any events yet" message="Browse what is coming up near you and press Join Event on anything that catches your eye." ctaLabel="See upcoming events" ctaHref="/events" />
        ) : (
          <ul className="space-y-4">
            {joins.map((j) => (
              <li key={j._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={j.thumbnail} alt="" className="aspect-[16/10] w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-40" referrerPolicy="no-referrer" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-bold">{j.eventType}</span>
                    {j.eventDate < todayISO() && <span className="rounded-full bg-surface2 px-2.5 py-0.5 text-xs font-bold text-muted">Completed</span>}
                  </div>
                  <h2 className="mt-1.5 line-clamp-2 font-display text-xl font-semibold leading-snug">{j.title}</h2>
                  <p className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><CalendarDays size={15} className="text-accent" /> {formatDate(j.eventDate)}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={15} className="text-accent" /> {j.location}</span>
                  </p>
                </div>
                <Link href={`/events/${j.eventId}`} className="btn btn-ghost">View Event</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <Joined />
    </PrivateRoute>
  );
}
