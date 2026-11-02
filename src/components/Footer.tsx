"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import credits from "@/data/credits.json";
import Logo from "./Logo";
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
  { label: "StudioSpace on X", href: "https://x.com", icon: XIcon },
  { label: "StudioSpace on Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "StudioSpace on YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "StudioSpace on LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

const categories = [
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Sound Stages", value: "Film Stage" },
  { label: "Podcast Rooms", value: "Podcast Lounge" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Workshop" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [creditsOpen, setCreditsOpen] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're on the call sheet. Watch your inbox for new studios.");
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-line bg-surface2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            Our mission is simple: every creator should be able to book the right room by the hour, and every studio owner should be able to keep their space busy.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface transition hover:border-accent hover:text-accent">
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em]">Quick links</h3>
          <ul className="space-y-2.5 text-[0.95rem] text-muted">
            <li><Link className="hover:text-accent" href="/">Home</Link></li>
            <li><Link className="hover:text-accent" href="/studios">Explore Studios</Link></li>
            <li><Link className="hover:text-accent" href="/#how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-accent" href="/#about">About Us</Link></li>
            <li><Link className="hover:text-accent" href="/add-studio">Host Your Space</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em]">Popular categories</h3>
          <ul className="space-y-2.5 text-[0.95rem] text-muted">
            {categories.map((c) => (
              <li key={c.value}>
                <Link className="hover:text-accent" href={`/studios?category=${encodeURIComponent(c.value)}`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em]">The call sheet</h3>
          <p className="mb-3 text-[0.95rem] text-muted">New rooms and host tips, once a month.</p>
          <form onSubmit={subscribe} className="flex gap-2" noValidate>
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <input id="newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="field min-w-0 flex-1" />
            <button type="submit" className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-[0.82rem] text-muted sm:flex-row sm:items-center sm:px-6">
          <p>© 2026 StudioSpace. By using this site you agree to our Terms of Use and Privacy Notice.</p>
          <button type="button" onClick={() => setCreditsOpen(true)} className="font-semibold underline underline-offset-4 hover:text-accent">
            Photo credits
          </button>
        </div>
      </div>

      <Modal open={creditsOpen} onClose={() => setCreditsOpen(false)} title="Photo credits" wide>
        <p className="mb-4 text-sm text-muted">Studio photographs come from Wikimedia Commons and are used under the licences shown. Thank you to the photographers.</p>
        <ul className="space-y-3 text-sm">
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
