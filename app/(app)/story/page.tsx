import { StoryFilters } from "@/components/story/StoryFilters";
import { Timeline } from "@/components/story/Timeline";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { storyFixtures } from "@/lib/fixtures/story";
import { resolveVariant } from "@/lib/fixtures/variant";

/**
 * UTANG YANG DISENGAJA: view model-nya masih disusun dari fixture, karena
 * data model Our Story belum ada. Yang berubah kelak hanya penyusun di bawah
 * (FR-063). Dihitung oleh T120.
 */
export default async function StoryPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = storyFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Kisah kita"
        lede={`Setiap babak membawa kita sampai di sini. Sejak ${vm.since}.`}
        action={<Button>Tambah momen</Button>}
      />
      <div className="pb-8">
        <StoryFilters filters={vm.filters} />
      </div>
      <Timeline data={vm.events} />
    </div>
  );
}
