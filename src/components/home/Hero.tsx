import { ArrowRight } from "lucide-react";
import Link from "next/link";
import credits from "@/data/credits.json";

// Three photographs set in arch-shaped frames, offset so they read like a row of doorways.
const frames = [
  { src: credits.clothes.url, alt: "Children holding folded winter blankets at a clothing distribution in Chattogram", cls: "mt-10 sm:mt-14" },
  { src: credits.plant.url, alt: "Volunteers planting a sapling together in Dhaka", cls: "" },
  { src: credits.beach.url, alt: "Volunteers lifting litter pickers after cleaning a beach", cls: "mt-6 sm:mt-20" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div className="rise">
          <p className="eyebrow">Neighbours helping neighbours</p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-tight">
            Your mohalla has work to do, and people ready to do it.
          </h1>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-muted">
            Find a winter clothes drive, a river cleanup or a free health camp near you, or post your own and let the neighbourhood know. Every event on Mohalla is real, local and still ahead of us.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary !px-7 !py-3.5">Browse Upcoming Events <ArrowRight size={17} /></Link>
            <Link href="/create-event" className="btn btn-ghost !px-7 !py-3.5">Create an Event</Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-5" aria-label="Photographs of community service events">
          {frames.map((f) => (
            <div key={f.src} className={`overflow-hidden rounded-t-[999px] rounded-b-2xl border border-line bg-surface2 shadow-[var(--shadow)] ${f.cls}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} className="aspect-[3/5] w-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
