"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS, activeNavLabel } from "@/lib/navigation";
import { useVisibleSection } from "./useVisibleSection";

const SECTION_IDS = NAV_ITEMS.flatMap((i) =>
  i.destination.kind === "section" ? [i.destination.sectionId] : [],
);

/** Label butir navigasi yang sedang aktif, atau null. */
export function useActiveNav(): string | null {
  const pathname = usePathname();
  const visibleSection = useVisibleSection(SECTION_IDS);
  return activeNavLabel(pathname, visibleSection);
}
