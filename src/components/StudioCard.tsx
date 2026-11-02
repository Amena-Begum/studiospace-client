import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import type { Studio } from "@/lib/types";

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={studio.imageUrl} alt={`${studio.title}, a ${studio.category.toLowerCase()} in ${studio.location}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-bg">{studio.category}</span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface/95 px-2.5 py-1 text-xs font-bold text-ink">
          <Star size={13} className="fill-accent text-accent" />
          {studio.rating > 0 ? studio.rating.toFixed(1) : "New"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.3rem] font-semibold leading-tight tracking-tight">{studio.title}</h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
          <MapPin size={15} className="mt-0.5 shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-lg font-extrabold">
            ${studio.hourlyRate}
            <span className="text-sm font-semibold text-muted"> / hr</span>
          </p>
          <Link href={`/studios/${studio._id}`} className="btn btn-primary !px-5 !py-2.5">View Details</Link>
        </div>
      </div>
    </article>
  );
}
