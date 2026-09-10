import { TriggerCards } from "@/components/open-when/TriggerCards";
import { PageHeader } from "@/components/ui/PageHeader";
import { openWhenFixtures } from "@/lib/fixtures/open-when";
import { resolveVariant } from "@/lib/fixtures/variant";

/** UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120. */
export default async function OpenWhenPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = openWhenFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Buka saat…"
        lede="Untuk saat-saat ketika kamu butuh sedikit bagian dari aku."
      />
      <TriggerCards data={vm.triggers} />
    </div>
  );
}
