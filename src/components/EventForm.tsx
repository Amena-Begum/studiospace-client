"use client";

import { useState } from "react";
import { toast } from "sonner";
import { todayISO, tomorrowISO } from "@/lib/dates";
import { EVENT_TYPES, type EventItem } from "@/lib/types";

export interface EventFormValues {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export const emptyEvent: EventFormValues = { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "" };

export function fromEvent(e: EventItem): EventFormValues {
  return { title: e.title, description: e.description, eventType: e.eventType, thumbnail: e.thumbnail, location: e.location, eventDate: e.eventDate };
}

type Errors = Partial<Record<keyof EventFormValues, string>>;

// `originalDate` is set when editing: an unchanged date is accepted even if it has since become today.
export function validateEvent(v: EventFormValues, originalDate?: string): Errors {
  const e: Errors = {};
  if (v.title.trim().length < 5) e.title = "Title must be at least 5 characters.";
  if (v.description.trim().length < 20) e.description = "Description must be at least 20 characters.";
  if (!(EVENT_TYPES as readonly string[]).includes(v.eventType)) e.eventType = "Please choose an event type.";
  if (!/^https?:\/\/\S+$/i.test(v.thumbnail.trim())) e.thumbnail = "Enter a valid image URL starting with http:// or https://.";
  if (v.location.trim().length < 3) e.location = "Location is required.";
  if (!v.eventDate) e.eventDate = "Please choose the event date.";
  else if (v.eventDate !== originalDate && v.eventDate <= todayISO()) e.eventDate = "The event date must be in the future.";
  return e;
}

interface Props {
  initial: EventFormValues;
  submitLabel: string;
  busy: boolean;
  originalDate?: string;
  onSubmit: (values: EventFormValues) => void;
}

export default function EventForm({ initial, submitLabel, busy, originalDate, onSubmit }: Props) {
  const [v, setV] = useState<EventFormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const set = (k: keyof EventFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEvent(v, originalDate);
    setErrors(found);
    const first = Object.values(found)[0];
    if (first) return toast.error(first);
    onSubmit({ ...v, title: v.title.trim(), description: v.description.trim(), thumbnail: v.thumbnail.trim(), location: v.location.trim() });
  };

  const fieldErr = (k: keyof EventFormValues) => (errors[k] ? <p role="alert" className="mt-1.5 text-[0.82rem] font-semibold text-[#b42318] dark:text-[#ff8f84]">{errors[k]}</p> : null);

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8" noValidate>
      <div>
        <label htmlFor="title" className="label">Event title</label>
        <input id="title" className="field" value={v.title} onChange={set("title")} placeholder="Winter Clothes Distribution – Mirpur 10, Dhaka" aria-invalid={Boolean(errors.title)} />
        {fieldErr("title")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventType" className="label">Event type</label>
          <select id="eventType" className="field" value={v.eventType} onChange={set("eventType")} aria-invalid={Boolean(errors.eventType)}>
            <option value="">Choose a type…</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {fieldErr("eventType")}
        </div>
        <div>
          <label htmlFor="eventDate" className="label">Event date</label>
          <input id="eventDate" type="date" className="field" value={v.eventDate} min={originalDate && originalDate <= todayISO() ? originalDate : tomorrowISO()} onChange={set("eventDate")} aria-invalid={Boolean(errors.eventDate)} />
          {fieldErr("eventDate")}
        </div>
      </div>
      <div>
        <label htmlFor="location" className="label">Location</label>
        <input id="location" className="field" value={v.location} onChange={set("location")} placeholder="Mirpur 10 Roundabout, Dhaka" aria-invalid={Boolean(errors.location)} />
        {fieldErr("location")}
      </div>
      <div>
        <label htmlFor="thumbnail" className="label">Thumbnail image URL</label>
        <input id="thumbnail" type="url" className="field" value={v.thumbnail} onChange={set("thumbnail")} placeholder="https://…/photo.jpg" aria-invalid={Boolean(errors.thumbnail)} />
        {fieldErr("thumbnail")}
        {/^https?:\/\/\S+$/i.test(v.thumbnail.trim()) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={v.thumbnail.trim()} alt="Thumbnail preview" className="mt-3 aspect-[16/10] w-full max-w-xs rounded-xl border border-line object-cover" referrerPolicy="no-referrer" />
        )}
      </div>
      <div>
        <label htmlFor="description" className="label">Description</label>
        <textarea id="description" rows={6} className="field resize-y" value={v.description} onChange={set("description")} placeholder="What will volunteers do, when should they arrive, and what should they bring?" aria-invalid={Boolean(errors.description)} />
        {fieldErr("description")}
      </div>
      <button type="submit" className="btn btn-primary w-full !py-3.5 sm:w-auto" disabled={busy}>{busy ? "Saving…" : submitLabel}</button>
    </form>
  );
}
