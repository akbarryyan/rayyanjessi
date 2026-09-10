import type { FixtureSet } from "./index";

/**
 * Membaca `?variant=` dari alamat halaman.
 *
 * Dipakai halaman-halaman yang masih berjalan di atas fixture agar varian
 * ekstrem — teks sangat panjang, tanpa gambar, daftar kosong — dapat dibuka
 * dan diuji. Ketika data model domainnya mendarat, pemanggilan ini ikut
 * hilang bersama fixture-nya.
 */
export type VariantKey = keyof FixtureSet<unknown>;

const KEYS: readonly VariantKey[] = ["typical", "longText", "noImages", "empty"];

export function resolveVariant(value: string | undefined): VariantKey {
  return KEYS.includes(value as VariantKey) ? (value as VariantKey) : "typical";
}
