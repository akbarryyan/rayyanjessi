import { LandingSection } from "@/components/layout/LandingSection";

/**
 * Landing page — satu halaman panjang berisi seluruh bagian yang ringkas,
 * disusun mengikuti alur PAST → NOW → FUTURE.
 *
 * Isi tiap section masih berupa rangka. Section diisi pada US7:
 * Our Future (T105), Just For Us (T107), Our Time (T109),
 * dan Important Dates (T111).
 */
export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 lg:py-16">
      <header className="pb-10">
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
          Dunia kecil kita
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
          Tempat kita menyimpan yang sudah lewat, yang sedang berjalan, dan yang
          masih ingin kita lakukan berdua.
        </p>
      </header>

      <LandingSection
        id="our-time"
        title="Waktu kita"
        lede="Sudah sejauh ini kita berjalan bersama."
      />

      <LandingSection
        id="important-dates"
        title="Tanggal penting"
        lede="Hari-hari yang tidak boleh terlewat begitu saja."
      />

      <LandingSection
        id="future"
        title="Nanti"
        lede="Hal-hal yang belum kita lakukan, tapi ingin."
      />

      <LandingSection
        id="just-for-us"
        title="Cuma kita"
        lede="Sudut kecil yang cuma milik kita berdua."
      />
    </div>
  );
}
