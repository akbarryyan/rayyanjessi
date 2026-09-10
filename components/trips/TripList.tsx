import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { SectionData } from "@/lib/view-models";
import { TRIP_STATUS_LABELS, type TripSummary } from "@/lib/view-models/trips";
import { countdownLabel } from "./TripHero";

export function TripList({ data }: { data: SectionData<TripSummary[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada rencana jalan-jalan."
        lede="Ke mana enaknya kita berikutnya?"
        action={<Button variant="secondary">Rencanakan perjalanan</Button>}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.data.map((trip) => (
        <li key={trip.id}>
          <Card interactive>
            <Link href={`/trips/${trip.id}`} className="block p-6">
              <p className="text-sm text-ink-faint">
                {TRIP_STATUS_LABELS[trip.status]}
              </p>
              <p className="mt-1 font-display text-2xl leading-snug text-ink">
                {trip.destination}
              </p>
              <p className="mt-2 text-base text-accent">{countdownLabel(trip)}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{trip.dateRange}</p>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}
