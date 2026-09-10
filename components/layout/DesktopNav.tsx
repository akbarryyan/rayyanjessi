"use client";

import Link from "next/link";
import { NAV_ITEMS, hrefFor } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { useActiveNav } from "./useActiveNav";

/**
 * Daftar tujuan di sisi kiri untuk layar besar (FR-009).
 *
 * Bobot visualnya sengaja ringan: tanpa latar, tanpa garis pemisah antar
 * butir, tanpa ikon. Ia harus terbaca sebagai daftar isi buku, bukan panel
 * navigasi aplikasi administratif.
 */
export function DesktopNav() {
  const active = useActiveNav();

  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col gap-1 overflow-y-auto px-6 py-10 lg:flex"
    >
      <p className="mb-6 font-display text-lg leading-tight text-ink">
        Dunia kecil kita
      </p>
      {NAV_ITEMS.map((item) => {
        const isActive = item.label === active;
        return (
          <Link
            key={item.label}
            href={hrefFor(item)}
            // Penanda posisi juga diumumkan, tidak hanya terlihat (FR-010).
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-sm py-1.5 text-base transition-colors duration-(--duration-quick) ease-out-soft",
              // Ditandai bobot huruf dan tanda pentung, bukan warna saja (FR-038).
              isActive
                ? "font-medium text-ink before:mr-2 before:content-['—']"
                : "text-ink-soft hover:text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
