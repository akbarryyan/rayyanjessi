import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { SectionData } from "@/lib/view-models";
import type { Song } from "@/lib/view-models/collections";

/**
 * Jurnal musik (FR-057).
 *
 * Ceritanya diletakkan sejajar dengan judul lagu, bukan disembunyikan di
 * balik ketukan — itu yang membedakannya dari pemutar musik. Tanpa cerita,
 * sebuah lagu di sini hanya baris kosong.
 */
export function SongList({ data }: { data: SectionData<Song[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada lagu yang tersimpan."
        lede="Pasti ada satu lagu yang mengingatkan kamu pada kita."
        action={<Button variant="secondary">Tambah lagu</Button>}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {data.data.map((song) => (
        <li key={song.id}>
          <Card className="p-6">
            <p className="font-display text-2xl leading-snug text-ink">
              {song.title}
            </p>
            <p className="mt-0.5 text-base text-ink-faint">{song.artist}</p>
            {song.story ? (
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft">
                &ldquo;{song.story}&rdquo;
              </p>
            ) : null}
            {song.url ? (
              <p className="mt-4">
                <a
                  href={song.url}
                  className="text-base text-accent underline underline-offset-4"
                >
                  Dengarkan
                </a>
              </p>
            ) : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}
