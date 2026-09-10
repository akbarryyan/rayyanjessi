import { SongList } from "@/components/soundtrack/SongList";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { soundtrackFixtures } from "@/lib/fixtures/collections";
import { resolveVariant } from "@/lib/fixtures/variant";

/** UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120. */
export default async function SoundtrackPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = soundtrackFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Lagu kita"
        lede="Lagu-lagu yang ikut jadi bagian dari kita."
        action={<Button>Tambah lagu</Button>}
      />
      <SongList data={vm.songs} />
    </div>
  );
}
