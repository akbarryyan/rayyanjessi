/**
 * Peta navigasi — satu daftar tujuan yang dipakai navigasi ponsel maupun
 * layar besar, sehingga keduanya tidak dapat menyimpang.
 *
 * Menambah bagian baru dilakukan dengan menambah butir di sini, bukan dengan
 * menulis tautan lepas di komponen navigasi (contracts/navigation.md).
 */

export type NavDestination =
  | { kind: "section"; sectionId: string }
  | { kind: "page"; path: string };

export type NavItem = {
  /** Nama yang dibaca pasangan. */
  label: string;
  destination: NavDestination;
  /** Tampil langsung di navigasi bawah ponsel, atau di balik "Lainnya" (FR-008). */
  primaryOnMobile: boolean;
};

/**
 * Pembagian tujuan mengikuti research.md R-001: bagian yang isinya ringkas
 * menjadi section pada landing page, bagian yang butuh ruang penuh mendapat
 * halaman tersendiri.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Beranda", destination: { kind: "page", path: "/" }, primaryOnMobile: true },
  { label: "Kisah Kita", destination: { kind: "page", path: "/story" }, primaryOnMobile: true },
  { label: "Kenangan", destination: { kind: "page", path: "/memories" }, primaryOnMobile: true },
  { label: "Surat", destination: { kind: "page", path: "/letters" }, primaryOnMobile: false },
  { label: "Buka Saat", destination: { kind: "page", path: "/open-when" }, primaryOnMobile: false },
  { label: "Perjalanan", destination: { kind: "page", path: "/trips" }, primaryOnMobile: false },
  { label: "Tempat", destination: { kind: "page", path: "/places" }, primaryOnMobile: false },
  { label: "Lagu Kita", destination: { kind: "page", path: "/soundtrack" }, primaryOnMobile: false },
  { label: "Nanti", destination: { kind: "section", sectionId: "future" }, primaryOnMobile: false },
  { label: "Cuma Kita", destination: { kind: "section", sectionId: "just-for-us" }, primaryOnMobile: false },
  { label: "Waktu Kita", destination: { kind: "section", sectionId: "our-time" }, primaryOnMobile: false },
  { label: "Tanggal Penting", destination: { kind: "section", sectionId: "important-dates" }, primaryOnMobile: false },
  { label: "Pengaturan", destination: { kind: "page", path: "/settings" }, primaryOnMobile: false },
] as const;

export const PRIMARY_MOBILE_ITEMS = NAV_ITEMS.filter((i) => i.primaryOnMobile);
export const SECONDARY_MOBILE_ITEMS = NAV_ITEMS.filter((i) => !i.primaryOnMobile);

/** Alamat yang dituju sebuah butir navigasi. */
export function hrefFor(item: NavItem): string {
  return item.destination.kind === "page"
    ? item.destination.path
    : `/#${item.destination.sectionId}`;
}

/**
 * Menentukan butir navigasi yang sedang aktif (FR-010, FR-046).
 *
 * Tujuan bertipe `page` ditentukan route aktif. Tujuan bertipe `section`
 * ditentukan section yang sedang terlihat, dan hanya berlaku ketika pengguna
 * memang sedang berada di landing page.
 */
export function activeNavLabel(
  pathname: string,
  visibleSectionId: string | null,
): string | null {
  const onLanding = pathname === "/";

  if (onLanding && visibleSectionId) {
    const section = NAV_ITEMS.find(
      (i) => i.destination.kind === "section" && i.destination.sectionId === visibleSectionId,
    );
    if (section) return section.label;
  }

  // Route terpanjang yang cocok menang, sehingga /memories/123 tetap menandai "Kenangan".
  const page = NAV_ITEMS.filter((i) => i.destination.kind === "page")
    .filter((i) => {
      const path = (i.destination as { kind: "page"; path: string }).path;
      return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
    })
    .sort(
      (a, b) =>
        (b.destination as { path: string }).path.length -
        (a.destination as { path: string }).path.length,
    )[0];

  return page?.label ?? null;
}
