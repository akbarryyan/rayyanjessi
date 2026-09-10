import type { ReactNode } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/**
 * Kerangka bersama seluruh halaman bagian (FR-007, FR-009).
 *
 * Ruang bawah disisakan agar navigasi ponsel tidak menutupi akhir isi
 * halaman.
 *
 * Lebar isi dibatasi agar baris teks tidak membentang dari tepi ke tepi pada
 * layar sangat lebar (FR-034). Batas ini sengaja longgar: halaman galeri
 * membutuhkan ruang, dan pembatasan yang lebih ketat untuk teks panjang
 * diterapkan per halaman lewat `max-w-prose`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <DesktopNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-6xl flex-1 pb-24 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
