import Link from "next/link";

// A house (the mohalla, or neighbourhood) with a heart at its centre.
export function MarkIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 15 L16 4.5 L28 15 V27 H4 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M16 23.2 C10.6 19.6 10.2 15.6 12.6 14.2 C14.1 13.3 15.5 14.1 16 15.2 C16.5 14.1 17.9 13.3 19.4 14.2 C21.8 15.6 21.4 19.6 16 23.2 Z" fill="var(--accent)" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-ink ${className}`} aria-label="Mohalla home">
      <MarkIcon />
      <span className="font-display text-[1.45rem] font-semibold tracking-tight">Mohalla</span>
    </Link>
  );
}
