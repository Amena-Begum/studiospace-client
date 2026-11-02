import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";

const items = [
  { icon: ShieldCheck, title: "Liability protection", text: "Every booking carries a refundable security deposit set by the host, so gear and spaces are covered." },
  { icon: BadgeCheck, title: "Verified profiles", text: "Hosts and guests sign in with an account tied to a real email address before they can book or list." },
  { icon: Wrench, title: "Equipment safety", text: "Hosts list exactly what is in the room, so you know what is yours to use and what is off limits." },
  { icon: Headset, title: "24/7 host support", text: "Questions at midnight before a shoot? Our support desk answers around the clock." },
];

export default function HostGuarantee() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start">
        <div>
          <p className="eyebrow">About StudioSpace · Host guarantee</p>
          <h2 className="section-title mt-2">Built by people who have waited on a studio</h2>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">
            StudioSpace started with a simple annoyance: great rooms sit empty while creators hunt for somewhere to work. We connect the two with clear prices, honest availability and protection for both sides.
          </p>
          <Link href="/add-studio" className="btn btn-primary mt-7">Host Your Space</Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it.title} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-accent"><it.icon size={22} /></span>
              <h3 className="mt-4 font-display text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
