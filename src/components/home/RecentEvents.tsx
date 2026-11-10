"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";

export default function RecentEvents() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // The server applies .limit(6) to the date-sorted query of upcoming events.
    api<{ events: EventItem[] }>("/events?limit=6")
      .then((d) => setEvents(d.events))
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load events."));
  }, []);

  return (
    <section className="border-y border-line bg-surface2/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Coming up next</p>
            <h2 className="section-title mt-3">Recent upcoming events</h2>
          </div>
          <Link href="/events" className="btn btn-ghost">See all events</Link>
        </div>
        <div className="mt-10">
          {error ? (
            <EmptyState title="We couldn't load the events" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
          ) : !events ? (
            <EventGridSkeleton />
          ) : events.length === 0 ? (
            <EmptyState title="No upcoming events yet" message="Be the first to post one and let your neighbours know." ctaLabel="Create an event" ctaHref="/create-event" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => <EventCard key={e._id} event={e} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
