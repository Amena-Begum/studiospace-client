import { ApertureIcon } from "./Logo";

export function PageSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="grid min-h-[55vh] place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 text-ink">
        <span className="inline-block animate-spin [animation-duration:2.4s]"><ApertureIcon size={52} /></span>
        <p className="font-display text-lg text-muted">{label}</p>
      </div>
    </div>
  );
}

export function StudioCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="skeleton aspect-[4/3] !rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-10 w-full !rounded-full" />
      </div>
    </div>
  );
}

export function StudioGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading studios">
      {Array.from({ length: count }).map((_, i) => (
        <StudioCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card flex gap-4 p-4">
          <div className="skeleton h-24 w-32 shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
