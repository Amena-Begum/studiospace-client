"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email address.");
    toast.success("Thank you! We'll send new neighbourhood events to your inbox.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-foot px-6 py-14 text-footink sm:px-12">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[26px] border-footink/10" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 right-1/4 h-56 w-56 rounded-full border-[22px] border-footink/[0.07]" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] opacity-80">The weekly roll call</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight">Hear about new events before the sign-up sheet fills</h2>
            <p className="mt-3 max-w-lg leading-relaxed opacity-85">One short email a week with the drives, cleanups and camps being planned near you.</p>
          </div>
          <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row" noValidate>
            <label htmlFor="home-newsletter" className="sr-only">Email address</label>
            <input id="home-newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="field min-w-0 flex-1 !border-transparent !py-3.5" />
            <button type="submit" className="btn btn-primary !py-3.5">Subscribe <Send size={16} /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
