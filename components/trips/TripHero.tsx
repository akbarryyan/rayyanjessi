import { Badge } from "@/components/ui/Badge";
import {
  TRIP_STATUS_LABELS,
  type TripSummary,
} from "@/lib/view-models/trips";

/** Kalimat hitung mundur (FR-052). Angkanya diberi makna, bukan telanjang. */
export function countdownLabel(trip: TripSummary): string {
  if (trip.status === "cancelled") return "Batal.";
  if (trip.status === "completed") return "Sudah kita jalani.";
  if (trip.daysToGo === 0) return "Hari ini!";
  if (trip.daysToGo === 1) return "Besok.";
  if (trip.daysToGo < 0) return "Sudah lewat.";
  return `${trip.daysToGo} hari lagi`;
}

/**
 * Hero perjalanan (FR-052).
 *
 * Gambar sampul jadi fokus visualnya. Ketika belum ada sampul, yang tampil
 * adalah nama tujuan berukuran besar — bukan kotak abu-abu kosong.
 */
export function TripHero({ trip }: { trip: TripSummary }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface-sunken">
      <div className="flex min-h-56 flex-col justify-end gap-2 p-8">
        <Badge tone={trip.status === "completed" ? "neutral" : "accent"}>
          {TRIP_STATUS_LABELS[trip.status]}
        </Badge>
        <p className="font-display text-4xl leading-tight text-ink sm:text-5xl">
          {trip.destination}
        </p>
        <p className="text-lg text-accent">{countdownLabel(trip)}</p>
        <p className="text-base text-ink-soft">{trip.dateRange}</p>
      </div>
    </div>
  );
}
