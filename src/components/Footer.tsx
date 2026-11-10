"use client";

import Link from "next/link";
import { useState } from "react";
import credits from "@/data/credits.json";
import { EVENT_TYPES } from "@/lib/types";
import { Mail, MapPin, Phone } from "lucide-react";
import { MarkIcon } from "./Logo";
import Modal from "./Modal";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15V9l5.2 3z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.82-2 3.74-2 4 0 4.74 2.6 4.74 6V21h-4v-4.9c0-1.17 0-2.67-1.63-2.67s-1.87 1.27-1.87 2.59V21h-4V9.75Z" />
  </svg>
);

const socials = [
  { label: "Mohalla on X", href: "https://x.com", icon: XIcon },
  { label: "Mohalla on Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Mohalla on YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "Mohalla on LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

export default function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-foot text-footink">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-footink/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[32px] border-footink/[0.07]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-footink" aria-label="Mohalla home">
            <MarkIcon />
            <span className="font-display text-[1.45rem] font-semibold tracking-tight">Mohalla</span>
          </Link>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-footink/80">
            Mohalla is where neighbours find each other. Post a clothes drive, a cleanup or a health camp, and see who in your area is ready to show up.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-footink/30 transition hover:bg-footink hover:text-foot">
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em]">Explore</h3>
          <ul className="space-y-2.5 text-[0.95rem] text-footink/80">
            <li><Link className="hover:text-footink hover:underline" href="/">Home</Link></li>
            <li><Link className="hover:text-footink hover:underline" href="/events">Upcoming Events</Link></li>
            <li><Link className="hover:text-footink hover:underline" href="/create-event">Create Event</Link></li>
            <li><Link className="hover:text-footink hover:underline" href="/joined-events">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em]">Event types</h3>
          <ul className="space-y-2.5 text-[0.95rem] text-footink/80">
            {EVENT_TYPES.slice(0, 5).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em]">Contact</h3>
          <ul className="space-y-3 text-[0.95rem] text-footink/80">
            <li className="flex items-start gap-2.5"><MapPin size={18} className="mt-0.5 shrink-0" /> House 14, Road 3, Dhanmondi, Dhaka 1205</li>
            <li className="flex items-start gap-2.5"><Phone size={18} className="mt-0.5 shrink-0" /> +880 1700 000 214</li>
            <li className="flex items-start gap-2.5"><Mail size={18} className="mt-0.5 shrink-0" /> hello@mohalla.app</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-footink/20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-[0.82rem] text-footink/80 sm:flex-row sm:items-center sm:px-6">
          <p>© 2026 Mohalla. By using this site you agree to our Terms of Use and Privacy Notice.</p>
          <button type="button" onClick={() => setCreditsOpen(true)} className="font-semibold underline underline-offset-4 hover:text-footink">
            Photo credits
          </button>
        </div>
      </div>

      <Modal open={creditsOpen} onClose={() => setCreditsOpen(false)} title="Photo credits" wide>
        <p className="mb-4 text-sm text-muted">Event photographs come from Wikimedia Commons and are used under the licences shown. Thank you to the photographers.</p>
        <ul className="space-y-3 text-sm text-ink">
          {Object.values(credits).map((c) => (
            <li key={c.source} className="rounded-xl border border-line bg-surface2/60 p-3">
              <a href={c.source} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-accent">{c.title.replace(/\.(jpe?g|png)$/i, "")}</a>
              <p className="text-muted">
                by {c.author} ·{" "}
                {c.licenseUrl ? (
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{c.license}</a>
                ) : (
                  c.license
                )}
              </p>
            </li>
          ))}
        </ul>
      </Modal>
    </footer>
  );
}
