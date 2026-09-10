import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import {
  IMPORTANT_DATE_LABELS,
  type ImportantDatesViewModel,
} from "@/lib/view-models/collections";

/** Kalimat hitung mundur. Angkanya diberi makna, bukan telanjang. */
function untilLabel(daysUntil: number): string {
  if (daysUntil === 0) return "Hari ini!";
  if (daysUntil === 1) return "Besok.";
  return `${daysUntil} hari lagi`;
}

/**
 * Kalender hubungan (FR-061).
 *
 * Tanggal terdekat ditonjolkan lebih dulu — itu satu-satunya yang biasanya
 * benar-benar dicari orang saat membuka halaman ini.
 */
export function ImportantDates({ vm }: { vm: ImportantDatesViewModel }) {
  if (vm.all.state === "failed") return <ErrorState />;

  if (vm.all.state === "empty") {
    return (
      <EmptyState
        title="Belum ada tanggal yang ditandai."
        lede="Ada tanggal yang tidak boleh kita lupakan?"
        action={<Button variant="secondary">Tambah tanggal</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {vm.next.state === "ready" ? (
        <Card className="p-6">
          <p className="text-sm uppercase tracking-wide text-ink-faint">
            Paling dekat
          </p>
          <p className="mt-2 font-display text-3xl leading-tight text-ink">
            {vm.next.data.title}
          </p>
          <p className="mt-2 text-lg text-accent">
            {untilLabel(vm.next.data.daysUntil)}
          </p>
          <p className="mt-0.5 text-base text-ink-soft">{vm.next.data.date}</p>
        </Card>
      ) : null}

      <ul className="flex flex-col divide-y divide-line">
        {vm.all.data.map((date) => (
          <li
            key={date.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 py-4"
          >
            <span className="min-w-0 flex-1 text-base text-ink">
              {date.title}
            </span>
            <Badge>{IMPORTANT_DATE_LABELS[date.type]}</Badge>
            <span className="text-sm text-ink-faint">{date.date}</span>
            {date.recurring ? (
              <span className="text-sm text-ink-faint">tiap tahun</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
