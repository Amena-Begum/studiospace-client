import { Clapperboard, Clock, MousePointerClick, Search } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover Spaces", text: "Browse rooms by category, location and rate, and read what other creators say." },
  { icon: Clock, title: "Select Shoot Hours", text: "Pick a date and your start and end hours. The total, including deposit, shows up front." },
  { icon: MousePointerClick, title: "Book Instantly", text: "Send your request. If the slot is taken, we tell you straight away instead of letting it clash." },
  { icon: Clapperboard, title: "Create & Produce", text: "Arrive, set up and shoot, record or make. Your host confirms and closes out the booking." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="rounded-[2rem] bg-tone px-6 py-14 text-toneink sm:px-12">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] opacity-80">How booking works</p>
        <h2 className="mt-2 max-w-2xl font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em]">From idea to rolling in four steps</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-current/20 p-6">
              <span className="absolute right-5 top-4 font-display text-5xl font-semibold opacity-20">{i + 1}</span>
              <s.icon size={26} />
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed opacity-85">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
