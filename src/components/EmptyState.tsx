import Link from "next/link";
import { ApertureIcon } from "./Logo";

interface Props {
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref?: string;
  onCta?: () => void;
}

export default function EmptyState({ title, message, ctaLabel, ctaHref, onCta }: Props) {
  return (
    <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-12 text-center">
      <span className="mb-4 text-muted"><ApertureIcon size={44} /></span>
      <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-muted">{message}</p>
      {ctaHref ? (
        <Link href={ctaHref} className="btn btn-primary mt-6">{ctaLabel}</Link>
      ) : (
        <button type="button" onClick={onCta} className="btn btn-primary mt-6">{ctaLabel}</button>
      )}
    </div>
  );
}
