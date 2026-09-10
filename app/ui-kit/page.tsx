import type { Metadata } from "next";
import { ShowcaseClient } from "./ShowcaseClient";

export const metadata: Metadata = {
  title: "Peraga komponen — Our Little Universe",
  robots: { index: false, follow: false },
};

/**
 * Halaman peraga komponen (FR-005, research.md R-006).
 *
 * Hanya menampilkan komponen dan data contoh. Tidak pernah menampilkan data
 * hubungan yang sebenarnya (Prinsip I).
 */
export default function ComponentShowcasePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header>
        <h1 className="font-display text-4xl leading-tight text-ink">
          Peraga komponen
        </h1>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-soft">
          Semua komponen dasar beserta keadaannya, di satu tempat. Halaman ini
          dipakai untuk memeriksa konsistensi, dan tidak pernah memuat isi
          hubungan yang sebenarnya.
        </p>
      </header>
      <ShowcaseClient />
    </main>
  );
}
