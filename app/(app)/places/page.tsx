import { PlaceList } from "@/components/places/PlaceList";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { placesFixtures } from "@/lib/fixtures/collections";
import { resolveVariant } from "@/lib/fixtures/variant";

/** UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120. */
export default async function PlacesPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = placesFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Tempat kita"
        lede="Titik-titik di peta yang jadi punya arti."
        action={<Button>Tambah tempat</Button>}
      />
      <PlaceList data={vm.places} />
    </div>
  );
}
