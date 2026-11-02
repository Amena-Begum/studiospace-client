"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Studio } from "@/lib/types";
import EmptyState from "../EmptyState";
import { StudioGridSkeleton } from "../Skeletons";
import StudioCard from "../StudioCard";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Studio[]>("/studios?limit=6&sort=top")
      .then(setStudios)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Featured studios</p>
          <h2 className="section-title mt-2">Top-rated rooms, ready this week</h2>
        </div>
        <Link href="/studios" className="btn btn-ghost">See every studio</Link>
      </div>
      {error ? (
        <EmptyState title="We couldn't load the studios" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
      ) : !studios ? (
        <StudioGridSkeleton />
      ) : studios.length === 0 ? (
        <EmptyState title="No studios listed yet" message="Be the first to list a space and start getting bookings." ctaLabel="Add a studio" ctaHref="/add-studio" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((s) => (
            <StudioCard key={s._id} studio={s} />
          ))}
        </div>
      )}
    </section>
  );
}
