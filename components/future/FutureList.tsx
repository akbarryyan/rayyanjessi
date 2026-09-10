import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/cn";
import type { SectionData } from "@/lib/view-models";
import {
  FUTURE_CATEGORY_LABELS,
  type FutureItem,
} from "@/lib/view-models/collections";

/**
 * Papan impian (FR-058).
 *
 * Butir yang tercapai dirayakan, bukan sekadar dicoret — itu yang membedakan
 * papan impian dari daftar tugas.
 */
export function FutureList({ data }: { data: SectionData<FutureItem[]> }) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada yang kita tulis di sini."
        lede="Mimpikan sesuatu berdua, sekecil apa pun."
        action={<Button variant="secondary">Tambah satu</Button>}
      />
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-line">
      {data.data.map((item) => (
        <li key={item.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-4">
          <span aria-hidden="true" className="text-lg">
            {item.status === "completed" ? "❤️" : "☐"}
          </span>
          <span
            className={cn(
              "min-w-0 flex-1 text-base text-ink",
              item.status === "completed" && "text-ink-soft",
            )}
          >
            {item.title}
          </span>
          {item.status === "completed" ? (
            <Badge tone="positive">Sudah kesampaian</Badge>
          ) : item.status === "in_progress" ? (
            <Badge tone="accent">Sedang jalan</Badge>
          ) : (
            <Badge>{FUTURE_CATEGORY_LABELS[item.category]}</Badge>
          )}
          {item.targetDate ? (
            <span className="text-sm text-ink-faint">{item.targetDate}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
