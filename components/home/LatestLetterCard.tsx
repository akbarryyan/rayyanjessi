import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";
import type { SectionData } from "@/lib/view-models";
import type { LatestLetter } from "@/lib/view-models/home";

export function LatestLetterCard({ data }: { data: SectionData<LatestLetter> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada surat."
        lede="Mungkin ada yang ingin kamu tulis untuk dibaca nanti."
        action={<Button variant="secondary">Tulis surat</Button>}
      />
    );
  }

  const letter = data.data;

  // Surat tersegel tidak pernah menampilkan isinya — hanya kapan ia terbuka.
  if (letter.isSealed) {
    return (
      <Card className="p-6">
        <p className="text-sm uppercase tracking-wide text-ink-faint">
          Ada surat untukmu
        </p>
        <p className="mt-3 font-display text-2xl leading-snug text-ink">
          Suratnya masih tersegel.
        </p>
        {letter.availableOn ? (
          <p className="mt-2 text-base text-ink-soft">
            Bisa dibuka {letter.availableOn}.
          </p>
        ) : null}
      </Card>
    );
  }

  return (
    <Card interactive>
      <Link href={`/letters/${letter.id}`} className="block p-6">
        <p className="text-sm uppercase tracking-wide text-ink-faint">
          Surat dari {letter.from}
        </p>
        <p className="mt-3 max-w-prose font-display text-2xl leading-snug text-ink">
          &ldquo;{letter.excerpt}&rdquo;
        </p>
        <p className="mt-4 text-base text-accent">Baca suratnya →</p>
      </Link>
    </Card>
  );
}
