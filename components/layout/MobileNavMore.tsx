"use client";

import Link from "next/link";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { SECONDARY_MOBILE_ITEMS, hrefFor } from "@/lib/navigation";
import { cn } from "@/lib/cn";

/**
 * Jalan menuju seluruh tujuan yang tidak muat di navigasi bawah (FR-008).
 *
 * Memakai Drawer, sehingga perilaku fokus dan Escape-nya sama persis dengan
 * lapisan lain di aplikasi ini.
 */
export function MobileNavMore({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      title="Ke mana lagi?"
      trigger={
        <button
          type="button"
          className="flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs text-ink-soft"
        >
          <span aria-hidden="true" className="text-base leading-none">
            ⋯
          </span>
          Lainnya
        </button>
      }
    >
      <ul className="flex flex-col">
        {SECONDARY_MOBILE_ITEMS.map((item) => {
          const isActive = item.label === active;
          return (
            <li key={item.label}>
              <Link
                href={hrefFor(item)}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block min-h-12 border-b border-line py-3 text-base",
                  isActive
                    ? "font-medium text-ink before:mr-2 before:content-['—']"
                    : "text-ink-soft",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </Drawer>
  );
}
