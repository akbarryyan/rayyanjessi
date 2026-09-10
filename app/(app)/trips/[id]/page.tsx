import { notFound } from "next/navigation";
import { Budget } from "@/components/trips/budget/Budget";
import { Checklist } from "@/components/trips/checklist/Checklist";
import { Itinerary } from "@/components/trips/itinerary/Itinerary";
import { TripHero } from "@/components/trips/TripHero";
import { Tabs } from "@/components/ui/Tabs";
import { resolveVariant } from "@/lib/fixtures/variant";
import {
  budgetFixtures,
  checklistFixtures,
  itineraryFixtures,
  tripsFixtures,
} from "@/lib/fixtures/trips";

/**
 * Detail perjalanan: Ringkasan, Rencana, Anggaran, dan Daftar bawaan dalam
 * satu halaman bertab (FR-052).
 *
 * UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120.
 */
export default async function TripDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const [{ id }, { variant }] = await Promise.all([params, searchParams]);
  const key = resolveVariant(variant);

  const trips = tripsFixtures[key].trips;
  const trip =
    trips.state === "ready"
      ? (trips.data.find((t) => t.id === id) ?? trips.data[0])
      : undefined;

  if (!trip) notFound();

  return (
    <div className="px-6 py-12">
      <TripHero trip={trip} />
      <div className="mt-10">
        <Tabs
          ariaLabel="Bagian perjalanan"
          items={[
            {
              value: "overview",
              label: "Ringkasan",
              content: (
                <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
                  <p className="max-w-prose">
                    {trip.title} — {trip.dateRange}.
                  </p>
                  {trip.checklistProgress ? (
                    <p>
                      Persiapan: {trip.checklistProgress.done} dari{" "}
                      {trip.checklistProgress.total} sudah beres.
                    </p>
                  ) : null}
                  {trip.budgetProgress ? (
                    <p>
                      Sudah terpakai {trip.budgetProgress.spentLabel}
                      {trip.budgetProgress.limitLabel
                        ? ` dari ${trip.budgetProgress.limitLabel}`
                        : ""}
                      .
                    </p>
                  ) : null}
                </div>
              ),
            },
            {
              value: "itinerary",
              label: "Rencana",
              content: <Itinerary data={itineraryFixtures[key].days} />,
            },
            {
              value: "budget",
              label: "Anggaran",
              content: <Budget vm={budgetFixtures[key]} />,
            },
            {
              value: "checklist",
              label: "Daftar bawaan",
              content: <Checklist vm={checklistFixtures[key]} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
