// Event dates are plain "YYYY-MM-DD" strings, so they are formatted without going through a timezone.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function dayAndMonth(iso: string): { day: string; month: string } {
  const [, m, d] = iso.split("-").map(Number);
  return { day: String(d ?? ""), month: MONTHS[(m ?? 1) - 1] ?? "" };
}

// Today in Dhaka, matching the server, so the form's earliest allowed date agrees with the API.
export function todayISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export function tomorrowISO(): string {
  const d = new Date(`${todayISO()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
