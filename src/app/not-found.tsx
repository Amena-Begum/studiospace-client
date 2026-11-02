import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
      <div>
        <p className="eyebrow">Error 404 · Scene not found</p>
        <h1 className="section-title mt-3">That set has been struck.</h1>
        <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">
          The page you are looking for isn&apos;t on today&apos;s schedule. It may have moved, or the link may be mistyped.
        </p>
        <Link href="/" className="btn btn-primary mt-8">Return to Home</Link>
      </div>
      <svg viewBox="0 0 420 320" role="img" aria-label="An empty film studio with a spotlight and a clapperboard" className="w-full text-ink">
        <rect x="20" y="248" width="380" height="14" rx="7" fill="var(--surface-2)" />
        <path d="M110 40 L310 40 L370 248 L50 248 Z" fill="var(--accent)" opacity="0.12" />
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M210 20 V60" />
          <rect x="170" y="60" width="80" height="44" rx="10" fill="var(--surface)" />
          <circle cx="210" cy="82" r="13" />
          <path d="M184 104 L160 150 M236 104 L260 150" />
          <rect x="130" y="170" width="160" height="78" rx="6" fill="var(--surface)" />
          <path d="M130 196 H290" />
          <path d="M130 170 L150 150 L190 170 L210 150 L250 170 L270 150 L290 170" fill="var(--surface-2)" />
          <path d="M150 220 H210 M150 232 H250" />
        </g>
        <circle cx="210" cy="82" r="5" fill="var(--accent)" />
        <text x="210" y="304" textAnchor="middle" fontFamily="var(--font-fraunces), serif" fontSize="22" fill="currentColor">Take 404 · cut!</text>
      </svg>
    </section>
  );
}
