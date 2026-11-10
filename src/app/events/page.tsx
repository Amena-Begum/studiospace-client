"use client";

import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ events: EventItem[] }>("/events")
      .then((d) => setEvents(d.events))
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load events."));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow">Happening soon</p>
      <h1 className="section-title mt-3">Upcoming events</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">Every event below is still ahead of us. Open one to read the details and join the people already signed up.</p>
      <div className="mt-10">
        {error ? (
          <EmptyState title="We couldn't load the events" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
        ) : !events ? (
          <EventGridSkeleton />
        ) : events.length === 0 ? (
          <EmptyState title="No upcoming events yet" message="Nobody has posted an event that is still ahead of us. Be the first to organise one." ctaLabel="Create an event" ctaHref="/create-event" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        )}
      </div>
    </section>
  );
}
