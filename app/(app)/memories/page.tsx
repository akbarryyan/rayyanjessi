import { MemoryGallery } from "@/components/memories/MemoryGallery";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { memoriesFixtures } from "@/lib/fixtures/memories";
import { resolveVariant } from "@/lib/fixtures/variant";

/** UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120. */
export default async function MemoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = memoriesFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Kenangan kita"
        lede="Hal-hal kecil yang sayang kalau sampai lupa."
        action={<Button>Tambah kenangan</Button>}
      />
      <MemoryGallery data={vm.memories} />
    </div>
  );
}
