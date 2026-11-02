"use client";

import { CalendarCheck, Building2, Inbox, PlusSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { Booking, Studio } from "@/lib/types";

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<{ listings: number; bookings: number; requests: number } | null>(null);

  useEffect(() => {
    Promise.all([api<Studio[]>("/studios/mine"), api<{ asGuest: Booking[]; asHost: Booking[] }>("/bookings/mine")])
      .then(([s, b]) => setStats({ listings: s.length, bookings: b.asGuest.length, requests: b.asHost.filter((x) => x.status === "Pending").length }))
      .catch(() => setStats({ listings: 0, bookings: 0, requests: 0 }));
  }, []);

  const cards = [
    { label: "My studio listings", value: stats?.listings, href: "/my-listings", icon: Building2 },
    { label: "My bookings", value: stats?.bookings, href: "/my-bookings", icon: CalendarCheck },
    { label: "Requests awaiting you", value: stats?.requests, href: "/my-bookings", icon: Inbox },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Dashboard</p>
      <h1 className="section-title mt-2">Hello, {user?.name.split(" ")[0]}.</h1>
      <p className="mt-3 max-w-lg text-muted">Here is where your studios and sessions stand today.</p>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <li key={c.label}>
            <Link href={c.href} className="card block p-6 transition hover:-translate-y-1">
              <c.icon size={24} className="text-accent" />
              <p className="mt-5 font-display text-5xl font-semibold">{stats ? c.value : <span className="skeleton inline-block h-10 w-14 align-middle" />}</p>
              <p className="mt-1 text-sm font-semibold text-muted">{c.label}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/add-studio" className="btn btn-primary mt-10"><PlusSquare size={17} /> Add New Studio</Link>
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><Dashboard /></PrivateRoute>;
}
