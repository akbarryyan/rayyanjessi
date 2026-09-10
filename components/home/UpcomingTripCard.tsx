import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";
import type { SectionData } from "@/lib/view-models";
import type { UpcomingTrip } from "@/lib/view-models/home";

/** Kalimat hitung mundur. Angkanya diberi makna, bukan ditampilkan telanjang. */
function countdownLabel(daysToGo: number): string {
  if (daysToGo === 0) return "Hari ini!";
  if (daysToGo === 1) return "Besok.";
  if (daysToGo < 0) return "Sudah lewat.";
  return `${daysToGo} hari lagi`;
}

export function UpcomingTripCard({ data }: { data: SectionData<UpcomingTrip> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada rencana jalan-jalan."
        lede="Ke mana enaknya kita berikutnya?"
        action={
          <Button variant="secondary">
            Rencanakan perjalanan
          </Button>
        }
      />
    );
  }

  const trip = data.data;
  return (
    <Card interactive className="overflow-hidden">
      <Link href={`/trips/${trip.id}`} className="block p-6">
        <p className="text-sm uppercase tracking-wide text-ink-faint">
          Perjalanan kita berikutnya
        </p>
        <p className="mt-2 font-display text-3xl leading-tight text-ink">
          {trip.destination}
        </p>
        <p className="mt-3 text-lg text-accent">{countdownLabel(trip.daysToGo)}</p>
        <p className="mt-1 text-base text-ink-soft">{trip.dateRange}</p>
      </Link>
    </Card>
  );
}
