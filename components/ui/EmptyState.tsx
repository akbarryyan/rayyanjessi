import type { ReactNode } from "react";

/**
 * Keadaan kosong yang tetap terasa mengundang (FR-014, FR-015).
 *
 * Tidak pernah berbunyi seperti pesan sistem. Selalu menyertakan satu aksi
 * yang relevan, sehingga halaman kosong tetap menawarkan langkah berikutnya.
 */
export function EmptyState({
  title,
  lede,
  action,
}: {
  title: string;
  lede: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line-strong bg-surface-sunken px-6 py-14 text-center">
      <p className="font-display text-2xl leading-snug text-ink">{title}</p>
      <p className="max-w-sm text-base leading-relaxed text-ink-soft">{lede}</p>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
