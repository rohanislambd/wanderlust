/** Backend stores either a raw day count ("7") or a ready-made label ("7 Days/6 Nights"). */
export function formatDuration(duration: string): string {
  const trimmed = duration.trim()
  if (/days?|nights?/i.test(trimmed)) return trimmed

  const days = Number(trimmed)
  if (!Number.isFinite(days) || days <= 0) return trimmed || "—"

  const nights = Math.max(days - 1, 0)
  return `${days} Day${days > 1 ? "s" : ""}/${nights} Night${nights === 1 ? "" : "s"}`
}