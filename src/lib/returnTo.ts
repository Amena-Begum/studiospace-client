// Where to send someone after they log in. Only same-site paths are allowed, and never the auth pages themselves.
export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  if (/^\/(login|register)(\/|\?|#|$)/.test(next)) return "/";
  return next;
}

// The page the visitor is on right now (path, query and section), used when they press Login or Register.
export function authHref(base: "/login" | "/register"): string {
  if (typeof window === "undefined") return base;
  const { pathname, search, hash } = window.location;
  // On an auth page already: keep whatever destination was passed along.
  const target = /^\/(login|register)/.test(pathname) ? new URLSearchParams(search).get("next") : pathname + search + hash;
  const next = safeNext(target);
  return next === "/" ? base : `${base}?next=${encodeURIComponent(next)}`;
}
