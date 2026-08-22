export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** ISO 3166-1 alpha-2 code → flag emoji (e.g. "us" → 🇺🇸). */
export function codeToFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  const base = 0x1f1e6;
  const chars = code
    .toUpperCase()
    .split("")
    .map((c) => base + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...chars);
}

export function parseFeatures(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export function formatDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Status → tailwind color token for tracking badges. */
export function statusStyle(status: string): { dot: string; text: string; bg: string } {
  const s = status.toLowerCase();
  if (s.includes("deliver") && !s.includes("out"))
    return { dot: "bg-success", text: "text-success", bg: "bg-success/10" };
  if (s.includes("out for"))
    return { dot: "bg-accent", text: "text-accent", bg: "bg-accent/10" };
  if (s.includes("hold") || s.includes("delay"))
    return { dot: "bg-danger", text: "text-danger", bg: "bg-danger/10" };
  if (s.includes("customs"))
    return { dot: "bg-warning", text: "text-warning", bg: "bg-warning/10" };
  return { dot: "bg-brand", text: "text-brand", bg: "bg-brand/10" };
}
