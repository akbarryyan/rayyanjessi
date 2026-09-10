"use client";

import Link from "next/link";
import { PRIMARY_MOBILE_ITEMS, hrefFor } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { useActiveNav } from "./useActiveNav";
import { MobileNavMore } from "./MobileNavMore";

/**
 * Navigasi bawah untuk layar ponsel (FR-007, FR-008).
 *
 * Berisi tujuan yang paling sering dibuka, ditambah satu jalan menuju
 * sisanya. Tinggi tiap sasaran sentuh dijaga agar nyaman dengan ibu jari
 * (FR-035).
 */
export function MobileNav() {
  const active = useActiveNav();

  return (
    <nav
      aria-label="Navigasi utama"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface lg:hidden",
        // Menghormati area aman di ponsel berlayar penuh.
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      {PRIMARY_MOBILE_ITEMS.map((item) => {
        const isActive = item.label === active;
        return (
          <Link
            key={item.label}
            href={hrefFor(item)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs",
              "transition-colors duration-(--duration-quick) ease-out-soft",
              // Ditandai garis atas dan bobot huruf, bukan warna saja (FR-038).
              isActive
                ? "border-t-2 border-accent font-medium text-ink"
                : "border-t-2 border-transparent text-ink-soft",
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <MobileNavMore active={active} />
    </nav>
  );
}
