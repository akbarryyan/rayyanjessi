/**
 * Nilai token warna, dicerminkan dari blok @theme di app/globals.css.
 *
 * Berkas ini ADA semata-mata agar kontras dapat diverifikasi otomatis.
 * Ketika sebuah warna diubah di globals.css, ia harus diubah di sini juga —
 * tests/unit/tokens-contrast.test.ts akan gagal bila keduanya menyimpang,
 * karena nilai di sini dibaca langsung dari globals.css saat pengujian.
 */
export const PALETTE = {
  canvas: "#faf6f1",
  surface: "#ffffff",
  surfaceSunken: "#f3ece4",
  ink: "#2b2621",
  inkSoft: "#5b5147",
  inkFaint: "#6d6358",
  accent: "#a04e52",
  accentSoft: "#f5e6e5",
  accentInk: "#ffffff",
  line: "#e3d8cc",
  lineStrong: "#90806e",
  positive: "#3f6146",
  positiveSoft: "#e6efe7",
  critical: "#9a3b32",
  criticalSoft: "#f8e7e4",
  focus: "#6b4f7a",
} as const;
