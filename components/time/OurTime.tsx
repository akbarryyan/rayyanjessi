import type { OurTimeViewModel } from "@/lib/view-models/collections";

/**
 * Penghitung waktu (FR-060).
 *
 * Disajikan sebagai kalimat yang tenang, bukan tiga kartu angka besar.
 * Total harinya disebut sesudahnya, karena angka itu baru berarti setelah
 * kalimatnya terbaca lebih dulu (Prinsip VII, FR-029).
 */
export function OurTime({ vm }: { vm: OurTimeViewModel }) {
  const parts = [
    vm.years > 0 && `${vm.years} tahun`,
    vm.months > 0 && `${vm.months} bulan`,
    `${vm.days} hari`,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="max-w-prose font-display text-3xl leading-snug text-ink sm:text-4xl">
          Kita sudah bersama {parts.join(", ")}.
        </p>
        <p className="mt-3 text-lg text-ink-soft">
          Sejak {vm.since} — {vm.totalDays.toLocaleString("id-ID")} hari kalau
          dihitung satu-satu.
        </p>
      </div>

      {vm.milestones.length > 0 ? (
        <ul className="flex flex-col divide-y divide-line">
          {vm.milestones.map((milestone) => (
            <li
              key={milestone.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
            >
              <span className="text-base text-ink">
                {milestone.reached ? "✓ " : "· "}
                {milestone.label}
              </span>
              <span className="text-sm text-ink-faint">
                {milestone.reached ? milestone.on : `nanti, ${milestone.on}`}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
