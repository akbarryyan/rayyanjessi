/**
 * Konvensi data contoh (research.md R-002).
 *
 * ATURAN:
 * 1. Fixture TIDAK BOLEH memuat data hubungan yang sebenarnya (Prinsip I).
 * 2. Fixture TIDAK BOLEH dipakai di luar halaman peraga, kecuali pada bagian
 *    yang data modelnya memang belum ada — dan setiap pemakaian semacam itu
 *    tercatat sebagai utang pada plan.md.
 * 3. Setiap fixture WAJIB menyertakan varian ekstrem, agar rancangannya tidak
 *    hanya benar untuk data yang rapi.
 */

/** Varian yang wajib disediakan setiap fixture. */
export type FixtureSet<T> = {
  /** Data yang wajar, untuk tampilan sehari-hari. */
  typical: T;
  /** Teks sangat panjang, untuk menguji pemotongan dan pembungkusan. */
  longText: T;
  /** Tanpa gambar sama sekali. */
  noImages: T;
  /** Daftar kosong, untuk menguji empty state. */
  empty: T;
};

/** Teks panjang siap pakai untuk varian longText. */
export const LONG_TEXT =
  "Sore itu hujan turun pelan sekali, dan kita berdua memutuskan untuk tetap " +
  "duduk di teras sambil menunggu langit berhenti menangis, tanpa benar-benar " +
  "membicarakan apa pun yang penting, hanya menemani satu sama lain sampai " +
  "cangkir kopi yang kedua ikut kedinginan di atas meja kayu itu";

export const LONG_TITLE =
  "Hari ketika kita menunggu hujan berhenti di teras rumah nenek dan malah keterusan";
