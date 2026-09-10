import type { ReactNode } from "react";

/**
 * Pembuka setiap bagian (FR-013).
 *
 * Kalimat pengantarnya bukan hiasan: ia yang membuat sebuah halaman terasa
 * sebagai tempat, bukan sebagai daftar record.
 */
export function PageHeader({
  title,
  lede,
  action,
}: {
  title: string;
  /** Satu kalimat bernada personal yang menjelaskan tempat ini. */
  lede: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-4xl leading-tight text-ink">{title}</h1>
        <p className="mt-2 max-w-prose text-lg leading-relaxed text-ink-soft">
          {lede}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
