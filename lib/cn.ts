/** Penggabung className sederhana. Cukup untuk kebutuhan proyek ini. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
