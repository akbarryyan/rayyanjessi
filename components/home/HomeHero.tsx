import type { Greeting, RelationshipDuration } from "@/lib/view-models/home";

/**
 * Pembuka Home (FR-047).
 *
 * Durasi hubungan disajikan sebagai kalimat, bukan angka statistik —
 * "sudah 2 tahun 3 bulan 14 hari" bukan tiga kartu berisi angka besar
 * (Prinsip VII, FR-029).
 */
export function HomeHero({
  greeting,
  duration,
}: {
  greeting: Greeting;
  duration: RelationshipDuration;
}) {
  const parts = [
    duration.years > 0 && `${duration.years} tahun`,
    duration.months > 0 && `${duration.months} bulan`,
    `${duration.days} hari`,
  ].filter(Boolean) as string[];

  return (
    <header className="pb-12">
      <p className="text-base text-ink-faint">{greeting.today}</p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
        {greeting.timeOfDay}, {greeting.names[0]} &amp; {greeting.names[1]}.
      </h1>
      <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
        Kita sudah bersama {parts.join(", ")} — sejak {duration.since}.
      </p>
    </header>
  );
}
