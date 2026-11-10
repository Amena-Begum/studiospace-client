import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
      <div>
        <p className="eyebrow">Error 404 · Page not found</p>
        <h1 className="section-title mt-3">This street doesn't lead anywhere.</h1>
        <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">
          The page you are looking for isn&apos;t in our neighbourhood. It may have moved, or the link may be mistyped.
        </p>
        <Link href="/" className="btn btn-primary mt-8">Return to Home</Link>
      </div>
      <svg viewBox="0 0 420 320" role="img" aria-label="A small house with an empty doorway and a question mark" className="w-full text-ink">
        <rect x="20" y="268" width="380" height="14" rx="7" fill="var(--surface-2)" />
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M80 140 L210 40 L340 140 V268 H80 Z" fill="var(--surface)" />
          <path d="M60 148 L210 32 L360 148" />
          <path d="M180 268 V196 a30 30 0 0 1 60 0 V268" fill="var(--surface-2)" />
          <rect x="105" y="170" width="48" height="48" rx="4" />
          <rect x="267" y="170" width="48" height="48" rx="4" />
        </g>
        <path d="M200 160 c0-14 22-14 22 0 c0 9-12 10-12 22" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" fill="none" transform="translate(0 52)" />
        <circle cx="210" cy="244" r="4" fill="var(--accent)" />
        <text x="210" y="306" textAnchor="middle" fontFamily="var(--font-fraunces), serif" fontSize="22" fill="currentColor">Nobody home · 404</text>
      </svg>
    </section>
  );
}
