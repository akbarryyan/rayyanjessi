"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion/durations";
import type { ChecklistViewModel } from "@/lib/view-models/trips";

/**
 * Daftar bawaan sebelum berangkat (FR-055).
 *
 * Penugasan ditampilkan sebagai nama di sebelah tugasnya, bukan sebagai
 * kolom terpisah — daftar ini untuk dua orang, bukan papan kerja tim.
 *
 * Animasi centangnya (T062) memakai Framer Motion dan otomatis dipangkas
 * ketika preferensi kurangi-gerak menyala.
 */
export function Checklist({ vm }: { vm: ChecklistViewModel }) {
  const initial = vm.items.state === "ready" ? vm.items.data : [];
  const [items, setItems] = useState(initial);

  if (vm.items.state === "failed") return <ErrorState />;

  if (vm.items.state === "empty") {
    return (
      <EmptyState
        title="Belum ada yang perlu disiapkan."
        lede="Kalau nanti kepikiran sesuatu, catat di sini."
        action={<Button variant="secondary">Tambah satu</Button>}
      />
    );
  }

  const done = items.filter((i) => i.done).length;

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-base text-ink-soft">
        {done} dari {items.length} sudah beres.
      </p>

      <ul className="flex flex-col divide-y divide-line">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex min-h-14 cursor-pointer items-center gap-3 py-2">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
                className="size-5 shrink-0 accent-[var(--color-accent)]"
              />
              <motion.span
                animate={{ opacity: item.done ? 0.55 : 1 }}
                transition={{ duration: DURATION.quick, ease: EASE.outSoft }}
                className={cn(
                  "min-w-0 flex-1 text-base text-ink",
                  item.done && "line-through",
                )}
              >
                {item.title}
              </motion.span>
              {item.assignedTo ? (
                <span className="shrink-0 text-sm text-ink-faint">
                  {item.assignedTo}
                </span>
              ) : null}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
