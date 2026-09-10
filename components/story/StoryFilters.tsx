"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { StoryFilter } from "@/lib/view-models/story";

/**
 * Penyaring lini masa (FR-048).
 *
 * Dapat digulir mendatar di ponsel, dan pilihan aktifnya ditandai lebih dari
 * sekadar warna (FR-038).
 */
export function StoryFilters({ filters }: { filters: readonly StoryFilter[] }) {
  const [active, setActive] = useState(filters[0]?.value);

  return (
    <div
      role="group"
      aria-label="Saring lini masa"
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1"
    >
      {filters.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setActive(filter.value)}
            className={cn(
              "min-h-11 whitespace-nowrap rounded-full border px-4 text-sm",
              "transition-colors duration-(--duration-quick) ease-out-soft",
              isActive
                ? "border-accent bg-accent-soft font-medium text-accent"
                : "border-line-strong text-ink-soft hover:text-ink",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
