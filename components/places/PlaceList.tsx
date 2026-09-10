import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { SectionData } from "@/lib/view-models";
import type { Place } from "@/lib/view-models/collections";

/** Koleksi tempat (FR-056). Tanggal pertama dikunjungi jadi jangkar ceritanya. */
export function PlaceList({ data }: { data: SectionData<Place[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada tempat yang tercatat."
        lede="Tempat biasa pun jadi istimewa kalau kita pernah ke sana bareng."
        action={<Button variant="secondary">Tambah tempat</Button>}
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((place) => (
        <li key={place.id}>
          <Card className="h-full p-6">
            <p className="font-display text-xl leading-snug text-ink">
              {place.name}
            </p>
            {place.address ? (
              <p className="mt-1 text-sm text-ink-faint">{place.address}</p>
            ) : null}
            {place.firstVisited ? (
              <p className="mt-4 text-sm text-ink-soft">
                Pertama ke sini {place.firstVisited}
              </p>
            ) : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}
