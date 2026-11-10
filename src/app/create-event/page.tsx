"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import EventForm, { emptyEvent, type EventFormValues } from "@/components/EventForm";
import PrivateRoute from "@/components/PrivateRoute";
import { api } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const create = async (values: EventFormValues) => {
    setBusy(true);
    try {
      await api("/events", { method: "POST", body: values });
      toast.success("Your event is live. Neighbours can now join it.");
      router.push("/events");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create the event.");
      setBusy(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="eyebrow">Organise</p>
        <h1 className="section-title mt-3">Create an event</h1>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">Tell your neighbours what you are planning. Pick a date in the future and they will be able to find and join it.</p>
        <div className="mt-8">
          <EventForm initial={emptyEvent} submitLabel="Create Event" busy={busy} onSubmit={create} />
        </div>
      </section>
    </PrivateRoute>
  );
}
