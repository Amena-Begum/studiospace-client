import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/dates";
import type { EventItem } from "@/lib/types";

// Every card is the same height: the image has a fixed ratio, the title clamps to two lines and the button sits at the bottom.
export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
        <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur">{event.eventType}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.2rem] font-display text-xl font-semibold leading-snug tracking-tight">{event.title}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          <li className="flex items-center gap-2"><CalendarDays size={16} className="shrink-0 text-accent" /> {formatDate(event.eventDate)}</li>
          <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" /> <span className="line-clamp-1">{event.location}</span></li>
        </ul>
        <Link href={`/events/${event._id}`} className="btn btn-primary mt-5 w-full">View Event</Link>
      </div>
    </article>
  );
}
