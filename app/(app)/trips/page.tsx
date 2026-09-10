import { TripList } from "@/components/trips/TripList";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveVariant } from "@/lib/fixtures/variant";
import { tripsFixtures } from "@/lib/fixtures/trips";

/** UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120. */
export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = tripsFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Perjalanan"
        lede="Yang sedang kita rencanakan, dan yang sudah lewat."
        action={<Button>Rencanakan perjalanan</Button>}
      />
      <TripList data={vm.trips} />
    </div>
  );
}
