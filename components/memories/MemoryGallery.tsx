import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/cn";
import type { SectionData } from "@/lib/view-models";
import type { MemoryCard } from "@/lib/view-models/memories";

const ASPECT: Record<MemoryCard["aspect"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/**
 * Galeri kenangan (FR-049).
 *
 * Sisi gambarnya sengaja tidak diseragamkan — album foto tidak pernah rapi
 * seperti tabel, dan keseragaman justru membuatnya terasa seperti dasbor.
 *
 * Gambar dimuat bertahap agar halaman tetap ringan seiring bertambahnya
 * kenangan (FR-044).
 */
export function MemoryGallery({ data }: { data: SectionData<MemoryCard[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada kenangan di sini."
        lede="Mungkin kenangan favorit kita berikutnya belum sempat terjadi."
        action={<Button variant="secondary">Tambah kenangan</Button>}
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((memory) => (
        <li key={memory.id}>
          <Link
            href={`/memories/${memory.id}`}
            className="group block rounded-lg"
          >
            <div
              className={cn(
                "overflow-hidden rounded-lg border border-line bg-surface-sunken",
                ASPECT[memory.aspect],
              )}
            >
              {memory.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={memory.image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center p-6 text-center">
                  <span className="font-display text-lg leading-snug text-ink-faint">
                    Belum ada fotonya
                  </span>
                </div>
              )}
            </div>
            <p className="mt-3 font-display text-xl leading-snug text-ink">
              {memory.title}
            </p>
            <p className="mt-0.5 text-sm text-ink-faint">{memory.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
