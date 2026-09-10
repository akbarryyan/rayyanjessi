"use client";

import { Button } from "./Button";

/**
 * Keadaan gagal (FR-023, FR-024).
 *
 * Kalimatnya dapat dibaca pasangan dan selalu menyertakan jalan keluar.
 * Nama teknis, kode internal, dan jejak kesalahan tidak pernah sampai ke sini —
 * itu urusan log, bukan urusan pembacanya.
 */
export function ErrorState({
  title = "Ada yang tidak beres sebentar.",
  lede = "Belum berhasil dimuat. Coba sekali lagi ya.",
  onRetry,
}: {
  title?: string;
  lede?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-lg border border-critical/25 bg-critical-soft px-6 py-12 text-center"
    >
      <p className="font-display text-2xl leading-snug text-ink">{title}</p>
      <p className="max-w-sm text-base leading-relaxed text-ink-soft">{lede}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Coba lagi
        </Button>
      ) : null}
    </div>
  );
}
