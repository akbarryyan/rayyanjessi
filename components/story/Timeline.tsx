import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { SectionData } from "@/lib/view-models";
import {
  STORY_TYPE_LABELS,
  type StoryEvent,
} from "@/lib/view-models/story";

/**
 * Lini masa editorial (FR-048).
 *
 * Bukan daftar kartu berjajar: satu garis menurun dengan simpul di tiap
 * peristiwa, sehingga urutannya terbaca sebagai perjalanan, bukan sebagai
 * tabel yang diputar 90 derajat.
 */
export function Timeline({ data }: { data: SectionData<StoryEvent[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Ceritanya belum dimulai di sini."
        lede="Tandai satu momen, dan sisanya akan menyusul sendiri."
        action={<Button variant="secondary">Tambah momen pertama</Button>}
      />
    );
  }

  return (
    <ol className="relative flex flex-col gap-10 border-l border-line pl-6 sm:pl-8">
      {data.data.map((event) => (
        <li key={event.id} className="relative">
          {/* Simpul pada garis. Dekoratif, jadi disembunyikan dari pembaca layar. */}
          <span
            aria-hidden="true"
            className="absolute -left-[1.8rem] top-2 size-2.5 rounded-full bg-accent sm:-left-[2.3rem]"
          />
          <p className="text-sm text-ink-faint">{event.date}</p>
          <h3 className="mt-1 font-display text-2xl leading-snug text-ink">
            {event.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{STORY_TYPE_LABELS[event.type]}</Badge>
            {event.location ? (
              <span className="text-sm text-ink-faint">{event.location}</span>
            ) : null}
          </div>
          {event.description ? (
            <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-soft">
              {event.description}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
