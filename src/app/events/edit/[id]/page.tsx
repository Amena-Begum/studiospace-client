"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import EventForm, { fromEvent, type EventFormValues } from "@/components/EventForm";
import PrivateRoute from "@/components/PrivateRoute";
import { RowsSkeleton } from "@/components/Skeletons";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";

function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ event: EventItem }>(`/events/${id}`)
      .then((d) => {
        setEvent(d.event);
        setState("ready");
      })
      .catch(() => setState("missing"));
  }, [id]);

  const save = async (values: EventFormValues) => {
    setBusy(true);
    try {
      await api(`/events/${id}`, { method: "PUT", body: values });
      toast.success("Event updated.");
      router.push("/manage-events");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the event.");
      setBusy(false);
    }
  };

  if (state === "loading") return <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6"><RowsSkeleton rows={3} /></div>;
  if (state === "missing" || !event) return <div className="px-4 py-16"><EmptyState title="Event not found" message="This event may have been deleted." ctaLabel="Back to Manage Events" ctaHref="/manage-events" /></div>;
  if (event.creatorEmail !== user?.email) return <div className="px-4 py-16"><EmptyState title="Not your event" message="You can only update events that you created." ctaLabel="Back to Manage Events" ctaHref="/manage-events" /></div>;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow">Manage</p>
      <h1 className="section-title mt-3">Update event</h1>
      <div className="mt-8">
        <EventForm initial={fromEvent(event)} originalDate={event.eventDate} submitLabel="Save Changes" busy={busy} onSubmit={save} />
      </div>
    </section>
  );
}

export default function EditEventPage() {
  return (
    <PrivateRoute>
      <EditEvent />
    </PrivateRoute>
  );
}
