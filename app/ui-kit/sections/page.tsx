import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Watak bagian — Our Little Universe",
  robots: { index: false, follow: false },
};

/**
 * Rujukan watak bagian (FR-026, T113).
 *
 * Halaman ini bukan hiasan: dengan enam belas bagian, watak yang tertukar
 * baru terlihat kalau semuanya dibaca berdampingan. Tautan varian ekstremnya
 * sekalian jadi jalan pintas untuk memeriksa tiap bagian dengan data yang
 * tidak rapi.
 */
const SECTIONS = [
  { name: "Home", character: "Gambaran hangat", path: "/" },
  { name: "Our Story", character: "Lini masa editorial", path: "/story" },
  { name: "Memories", character: "Album foto", path: "/memories" },
  { name: "Letters", character: "Surat pribadi", path: "/letters" },
  { name: "Open When", character: "Amplop interaktif", path: "/open-when" },
  { name: "Next Trips", character: "Jurnal perjalanan", path: "/trips" },
  { name: "Trip Itinerary", character: "Lini masa", path: "/trips/t1" },
  { name: "Trip Budget", character: "Catatan keuangan sederhana", path: "/trips/t1" },
  { name: "Trip Checklist", character: "Daftar tugas ringkas", path: "/trips/t1" },
  { name: "Our Places", character: "Koleksi tempat", path: "/places" },
  { name: "Our Soundtrack", character: "Jurnal musik", path: "/soundtrack" },
  { name: "Our Future", character: "Papan impian", path: "/#future" },
  { name: "Just For Us", character: "Interaksi bermain", path: "/#just-for-us" },
  { name: "Our Time", character: "Tampilan tenang", path: "/#our-time" },
  { name: "Important Dates", character: "Kalender hubungan", path: "/#important-dates" },
  { name: "Settings", character: "Antarmuka utilitas", path: "/settings" },
] as const;

const VARIANTS = ["typical", "longText", "noImages", "empty"] as const;

export default function SectionCharacterPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl leading-tight text-ink">
        Watak tiap bagian
      </h1>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-soft">
        Semua bagian memakai sistem desain yang sama, tetapi wataknya berbeda.
        Daftar ini dipakai untuk memastikan tidak ada dua bagian yang tertukar.
      </p>

      <ul className="mt-10 flex flex-col divide-y divide-line">
        {SECTIONS.map((section) => (
          <li key={section.name} className="py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <Link
                href={section.path}
                className="inline-flex min-h-11 items-center font-display text-xl text-ink underline underline-offset-4"
              >
                {section.name}
              </Link>
              <span className="text-base text-ink-soft">{section.character}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              {VARIANTS.map((variant) => (
                <Link
                  key={variant}
                  href={
                    section.path.includes("#")
                      ? `/?variant=${variant}${section.path.slice(section.path.indexOf("#"))}`
                      : `${section.path}?variant=${variant}`
                  }
                  className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                >
                  {variant}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
