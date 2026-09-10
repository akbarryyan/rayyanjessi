import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";
import type { SectionData } from "@/lib/view-models";
import type { RecentMemory } from "@/lib/view-models/home";

export function RecentMemories({
  data,
}: {
  data: SectionData<RecentMemory[]>;
}) {
  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada kenangan yang tersimpan."
        lede="Mungkin kenangan favorit kita berikutnya belum sempat terjadi."
        action={<Button variant="secondary">Tambah yang pertama</Button>}
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((memory) => (
        <li key={memory.id}>
          <Card interactive className="h-full">
            <Link href={`/memories/${memory.id}`} className="block p-5">
              {memory.image ? null : (
                <Avatar name={memory.title} size={44} className="mb-4" />
              )}
              <p className="font-display text-xl leading-snug text-ink">
                {memory.title}
              </p>
              <p className="mt-1 text-sm text-ink-faint">{memory.date}</p>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}
