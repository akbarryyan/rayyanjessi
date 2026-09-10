"use client";

import { useEffect, useState } from "react";

/**
 * Melaporkan section landing page yang sedang terlihat (FR-046).
 *
 * Dipakai penanda posisi navigasi ketika pengguna berada di landing page.
 * Mengembalikan null di halaman lain, atau ketika belum ada section yang
 * cukup terlihat.
 */
export function useVisibleSection(sectionIds: readonly string[]): string | null {
  const [visible, setVisible] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      // Diurutkan menurut posisinya di dokumen, bukan menurut urutan pada peta
      // navigasi. Keduanya bisa berbeda, dan yang menentukan "section terakhir"
      // adalah urutan di halaman.
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );

    if (elements.length === 0) return;

    // Di posisi paling atas, pengguna masih melihat pembuka halaman — belum
    // sampai ke section mana pun. Menandai section di sini menyesatkan.
    const EDGE_THRESHOLD_PX = 80;
    const onTop = () => window.scrollY <= EDGE_THRESHOLD_PX;

    // Di dasar halaman, section terakhir tidak pernah mencapai pita
    // pengamatan di sepertiga atas layar — ia akan selamanya tak tertandai.
    // Karena itu dasar halaman selalu menandai section terakhir.
    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - EDGE_THRESHOLD_PX;

    const handleScroll = () => {
      if (onTop()) {
        setVisible(null);
        return;
      }
      if (atBottom()) {
        setVisible(elements[elements.length - 1]?.id ?? null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        if (onTop()) {
          setVisible(null);
          return;
        }
        if (atBottom()) {
          setVisible(elements[elements.length - 1]?.id ?? null);
          return;
        }

        // Section terlihat yang paling dekat ke atas layar yang menang,
        // sehingga penandanya tidak melompat-lompat saat menggulir.
        const candidates = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (candidates[0]) setVisible(candidates[0].target.id);
      },
      {
        // Mengabaikan bagian atas layar agar section dianggap "terlihat"
        // ketika benar-benar sedang dibaca, bukan saat baru menyembul.
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    for (const el of elements) observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return visible;
}
