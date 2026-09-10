import { LetterList } from "@/components/letters/LetterList";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { lettersFixtures } from "@/lib/fixtures/letters";
import { resolveVariant } from "@/lib/fixtures/variant";

/** UTANG YANG DISENGAJA: masih memakai fixture. Lihat FR-063 dan T120. */
export default async function LettersPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const vm = lettersFixtures[resolveVariant(variant)];

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Surat"
        lede="Hal-hal yang lebih enak ditulis daripada diucapkan."
        action={<Button>Tulis surat</Button>}
      />
      <LetterList data={vm.letters} />
    </div>
  );
}
