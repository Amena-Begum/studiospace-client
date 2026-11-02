"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// When a link such as /#about is followed from another page, scroll to the section once the home page has rendered.
export default function HashScroller() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 20) requestAnimationFrame(attempt);
    };
    const t = setTimeout(attempt, 60);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}
