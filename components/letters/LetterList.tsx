import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { SectionData } from "@/lib/view-models";
import {
  LETTER_STATE_LABELS,
  type LetterSummary,
} from "@/lib/view-models/letters";

const TONE = {
  draft: "neutral",
  scheduled: "accent",
  available: "positive",
  opened: "neutral",
} as const;

/**
 * Kumpulan surat (FR-050).
 *
 * Surat terjadwal tidak pernah menampilkan cuplikan isinya — hanya kapan ia
 * terbuka. Ini bukan pilihan tampilan: isinya memang tidak boleh sampai ke
 * client sebelum waktunya (docs/architecture.md §10).
 */
export function LetterList({ data }: { data: SectionData<LetterSummary[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada surat di sini."
        lede="Mungkin ada yang ingin kamu tulis untuk dibaca nanti."
        action={<Button variant="secondary">Tulis surat</Button>}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.data.map((letter) => {
        const sealed = letter.state === "scheduled";
        const body = (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={TONE[letter.state]}>
                {LETTER_STATE_LABELS[letter.state]}
              </Badge>
              <span className="text-sm text-ink-faint">dari {letter.from}</span>
            </div>
            <p className="mt-3 font-display text-2xl leading-snug text-ink">
              {letter.title}
            </p>
            {sealed ? (
              <p className="mt-2 text-base text-ink-soft">
                Masih tersegel
                {letter.availableOn ? `, bisa dibuka ${letter.availableOn}` : ""}
                {letter.daysUntilAvailable !== null
                  ? ` — ${letter.daysUntilAvailable} hari lagi`
                  : ""}
                .
              </p>
            ) : letter.excerpt ? (
              <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft">
                &ldquo;{letter.excerpt}&rdquo;
              </p>
            ) : null}
          </>
        );

        return (
          <li key={letter.id}>
            {sealed ? (
              <Card className="p-6">{body}</Card>
            ) : (
              <Card interactive>
                <Link href={`/letters/${letter.id}`} className="block p-6">
                  {body}
                </Link>
              </Card>
            )}
          </li>
        );
      })}
    </ul>
  );
}
