/**
 * Konvensi view model (contracts/view-model.md, research.md R-002).
 *
 * Komponen bagian menerima datanya sebagai props bertipe eksplisit dan TIDAK
 * PERNAH mengambil data sendiri — tidak memanggil Prisma, `fetch`, maupun
 * server action. Satu-satunya tempat yang menyusun view model adalah halaman
 * yang merender bagian tersebut.
 *
 * Selama data model sebuah domain belum ada, halaman menyusun view model dari
 * fixture di lib/fixtures/. Ketika data model-nya mendarat, yang berubah hanya
 * penyusun di halaman — komponennya tidak (FR-063).
 */

/**
 * Ketiga keadaan yang wajib dapat dinyatakan setiap view model, dan wajib
 * ditangani komponennya.
 *
 * Keadaan "memuat" sengaja tidak ada di sini: ia ditangani di tingkat halaman
 * lewat loading.tsx dan Skeleton, bukan di dalam view model (FR-021).
 */
export type SectionData<T> =
  | { state: "empty" }
  | { state: "ready"; data: T }
  | { state: "failed"; reason: string };

export const empty = <T>(): SectionData<T> => ({ state: "empty" });
export const ready = <T>(data: T): SectionData<T> => ({ state: "ready", data });
export const failed = <T>(reason: string): SectionData<T> => ({
  state: "failed",
  reason,
});

/**
 * Daftar keadaan antarmuka yang wajib ditangani setiap bagian penting (FR-022).
 * Ditulis sebagai tipe agar tidak menjadi sekadar catatan yang mudah dilupakan.
 */
export type UiState =
  | "loading"
  | "ready"
  | "empty"
  | "failed"
  | "succeeded"
  | "editing"
  | "saving"
  | "deleting"
  | "disabled";
