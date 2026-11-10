import { CalendarCheck2, ClipboardList, HeartHandshake, Megaphone } from "lucide-react";

const features = [
  { icon: Megaphone, title: "Post an event in minutes", text: "Give it a title, a type, a place and a date. Your event appears on the Upcoming Events page straight away." },
  { icon: HeartHandshake, title: "Join with a single click", text: "See who is organising, read the plan and press Join Event. We save your place and show it in your calendar." },
  { icon: CalendarCheck2, title: "Only what is still ahead", text: "Once an event's date passes it quietly leaves the public list, so you never chase something that already happened." },
  { icon: ClipboardList, title: "Keep your events in order", text: "Update the details or delete an event whenever plans change. Only the person who created an event can edit it." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="eyebrow">Why Mohalla</p>
        <h2 className="section-title mt-3">Built for the people who organise, and the people who turn up</h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={f.title} className="card h-full p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent"><f.icon size={24} /></span>
            <p className="mt-5 text-xs font-bold tracking-widest text-muted">0{i + 1}</p>
            <h3 className="mt-1 font-display text-xl font-semibold leading-snug tracking-tight">{f.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
