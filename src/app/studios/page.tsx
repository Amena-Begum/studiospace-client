"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";
import { StudioGridSkeleton } from "@/components/Skeletons";
import StudioCard from "@/components/StudioCard";
import { api } from "@/lib/api";
import { CATEGORIES, type Studio } from "@/lib/types";

function Explore() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") || "All";
  const [query, setQuery] = useState("");
  const [studios, setStudios] = useState<Studio[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Studio[]>("/studios").then(setStudios).catch((e) => setError(e.message));
  }, []);

  const setCategory = (c: string) => {
    router.replace(c === "All" ? "/studios" : `/studios?category=${encodeURIComponent(c)}`, { scroll: false });
  };

  const shown = useMemo(() => {
    if (!studios) return [];
    const q = query.trim().toLowerCase();
    return studios.filter(
      (s) => (category === "All" || s.category === category) && (!q || `${s.title} ${s.location} ${s.category}`.toLowerCase().includes(q)),
    );
  }, [studios, category, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Explore studios</p>
      <h1 className="section-title mt-2">Every room on StudioSpace</h1>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${category === c ? "border-accent bg-accent text-accentink" : "border-line bg-surface hover:border-ink"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <label htmlFor="search" className="sr-only">Search studios</label>
          <input id="search" className="field pl-10" placeholder="Search by name or location" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="mt-8">
        {error ? (
          <EmptyState title="We couldn't load the studios" message={error} ctaLabel="Try again" onCta={() => location.reload()} />
        ) : !studios ? (
          <StudioGridSkeleton count={6} />
        ) : studios.length === 0 ? (
          <EmptyState title="No studios here yet" message="Nobody has listed a space so far. You could be the first." ctaLabel="Add a studio" ctaHref="/add-studio" />
        ) : shown.length === 0 ? (
          <EmptyState
            title="No studios match that search"
            message="Try a different word or switch category to see more rooms."
            ctaLabel="Show all studios"
            onCta={() => {
              setQuery("");
              setCategory("All");
            }}
          />
        ) : (
          <>
            <p className="mb-5 text-sm font-semibold text-muted" aria-live="polite">{shown.length} {shown.length === 1 ? "studio" : "studios"}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((s) => (
                <StudioCard key={s._id} studio={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><StudioGridSkeleton /></div>}>
      <Explore />
    </Suspense>
  );
}
