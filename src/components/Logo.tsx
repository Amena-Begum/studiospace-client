import Link from "next/link";

export function ApertureIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M16 2 L22.5 14" />
        <path d="M28.2 9 L15 10" />
        <path d="M28.2 23 L21 11.6" />
        <path d="M16 30 L9.5 18" />
        <path d="M3.8 23 L17 22" />
        <path d="M3.8 9 L11 20.4" />
      </g>
      <circle cx="16" cy="16" r="2.2" fill="var(--accent)" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-ink ${className}`} aria-label="StudioSpace home">
      <ApertureIcon />
      <span className="font-display text-[1.45rem] font-semibold tracking-tight">StudioSpace</span>
    </Link>
  );
}
