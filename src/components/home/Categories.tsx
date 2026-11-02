import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import credits from "@/data/credits.json";

const cats = [
  { label: "Photo Studios", value: "Photo Studio", note: "Cycs, sets and daylight lofts", image: credits.lights.url },
  { label: "Sound Stages", value: "Film Stage", note: "Green screens and rigged grids", image: credits.chroma.url },
  { label: "Podcast Rooms", value: "Podcast Lounge", note: "Treated rooms, clean audio", image: credits.podroom.url },
  { label: "Music Suites", value: "Music Suite", note: "Consoles and live rooms", image: credits.console.url },
  { label: "Art Workshops", value: "Workshop", note: "Bright tables for messy work", image: credits.atelier.url },
];

export default function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <p className="eyebrow">Browse by category</p>
      <h2 className="section-title mt-2 max-w-2xl">Start with the kind of room you need</h2>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cats.map((c) => (
          <li key={c.value}>
            <Link href={`/studios?category=${encodeURIComponent(c.value)}`} className="card group relative block aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="flex items-center justify-between gap-2 font-display text-xl font-semibold leading-tight">
                  {c.label}
                  <ArrowUpRight size={18} className="shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 block text-xs text-white/80">{c.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
