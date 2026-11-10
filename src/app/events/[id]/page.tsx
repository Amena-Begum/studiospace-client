"use client";

import { CalendarDays, CheckCircle2, MapPin, Tag, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { api, ApiError } from "@/lib/api";
import { formatDate, todayISO } from "@/lib/dates";
import type { EventItem } from "@/lib/types";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ event: EventItem }>(`/events/${id}`)
      .then((d) => {
        setEvent(d.event);
        setState("ready");
      })
      .catch(() => setState("missing"));
  }, [id]);

  // Whether this person has already joined is only known once the session check has finished.
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setJoined(false);
      return;
    }
    api<{ joined: boolean }>(`/events/${id}/joined`).then((d) => setJoined(d.joined)).catch(() => {});
  }, [id, user, authLoading]);

  const join = async () => {
    if (!user) {
      toast.info("Please log in to join this event.");
      router.push(`/login?next=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "POST" });
      setJoined(true);
      setEvent((e) => (e ? { ...e, participants: (e.participants ?? 0) + 1 } : e));
      toast.success("You're in! This event is now in your Joined Events.");
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) setJoined(true);
      toast.error(err instanceof Error ? err.message : "Could not join the event.");
    } finally {
      setBusy(false);
    }
  };

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6" role="status" aria-label="Loading event">
        <div className="skeleton aspect-[16/8] w-full" />
        <div className="skeleton mt-8 h-10 w-2/3" />
        <div className="skeleton mt-4 h-5 w-1/3" />
        <div className="skeleton mt-8 h-32 w-full" />
      </div>
    );
  }
  if (state === "missing" || !event) {
    return <div className="px-4 py-16"><EmptyState title="Event not found" message="This event may have been removed by its organiser." ctaLabel="See upcoming events" ctaHref="/events" /></div>;
  }

  const past = event.eventDate < todayISO();
  const facts = [
    { icon: CalendarDays, label: "Date", value: formatDate(event.eventDate) },
    { icon: MapPin, label: "Location", value: event.location },
    { icon: Tag, label: "Event type", value: event.eventType },
    { icon: UserRound, label: "Organiser", value: event.creatorName },
    { icon: Users, label: "Joined so far", value: `${event.participants ?? 0} ${(event.participants ?? 0) === 1 ? "neighbour" : "neighbours"}` },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <Link href="/events" className="text-sm font-bold text-accent underline underline-offset-4">← All upcoming events</Link>
      <div className="relative mt-5 aspect-[16/8] overflow-hidden rounded-3xl border border-line bg-surface2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h1 className="section-title">{event.title}</h1>
          <h2 className="mt-8 font-display text-xl font-semibold">About this event</h2>
          <p className="mt-3 whitespace-pre-line text-[1.02rem] leading-relaxed text-muted">{event.description}</p>
        </div>
        <aside className="card h-fit p-6">
          <ul className="space-y-4">
            {facts.map((f) => (
              <li key={f.label} className="flex gap-3">
                <f.icon size={19} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">{f.label}</p>
                  <p className="font-semibold">{f.value}</p>
                </div>
              </li>
            ))}
          </ul>
          {joined ? (
            <p className="mt-6 flex items-center justify-center gap-2 rounded-full border border-tone/40 bg-tone/10 px-4 py-3 text-sm font-bold text-tone"><CheckCircle2 size={18} /> You have joined this event</p>
          ) : past ? (
            <p className="mt-6 rounded-full border border-line px-4 py-3 text-center text-sm font-bold text-muted">This event has already taken place</p>
          ) : (
            <button type="button" onClick={join} disabled={busy} className="btn btn-primary mt-6 w-full !py-3.5">{busy ? "Joining…" : "Join Event"}</button>
          )}
          {!user && !authLoading && !past && <p className="mt-3 text-center text-xs text-muted">You will be asked to log in before joining.</p>}
        </aside>
      </div>
    </article>
  );
}
