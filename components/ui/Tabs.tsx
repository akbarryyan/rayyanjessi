"use client";

import { Tabs as RadixTabs } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { value: string; label: string; content: ReactNode };

/**
 * Tab yang dapat digulir mendatar di layar ponsel (FR-052).
 * Penanda tab aktif memakai garis bawah dan bobot huruf, tidak hanya
 * warna (FR-038).
 */
export function Tabs({
  items,
  defaultValue,
  ariaLabel,
}: {
  items: readonly TabItem[];
  defaultValue?: string;
  ariaLabel: string;
}) {
  return (
    <RadixTabs.Root defaultValue={defaultValue ?? items[0]?.value}>
      <RadixTabs.List
        aria-label={ariaLabel}
        className="-mx-4 flex gap-1 overflow-x-auto border-b border-line px-4"
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-base text-ink-soft",
              "transition-colors duration-(--duration-quick) ease-out-soft",
              "data-[state=active]:border-accent data-[state=active]:font-medium data-[state=active]:text-ink",
            )}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="pt-6">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
