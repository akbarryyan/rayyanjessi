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

/**
 * Di mana tiap keadaan ditangani. Dicatat di sini agar sebuah bagian tidak
 * diam-diam melewatkan salah satunya.
 *
 * | Keadaan   | Ditangani oleh                                        |
 * |-----------|-------------------------------------------------------|
 * | loading   | `loading.tsx` pada route, lewat `PageSkeleton`         |
 * | ready     | komponen bagian, dari `SectionData` bertanda `ready`   |
 * | empty     | `EmptyState`, dari `SectionData` bertanda `empty`      |
 * | failed    | `error.tsx` pada route, atau `ErrorState` di dalamnya  |
 * | succeeded | `Toast` varian berhasil                               |
 * | editing   | formulir bagian                                       |
 * | saving    | `Button` dengan prop `loading`                         |
 * | deleting  | `ConfirmDialog` dengan prop `pending`                  |
 * | disabled  | `Button` dan kendali isian dengan prop `disabled`      |
 */
export const UI_STATE_OWNERS: Record<UiState, string> = {
  loading: "loading.tsx + PageSkeleton",
  ready: "komponen bagian",
  empty: "EmptyState",
  failed: "error.tsx + ErrorState",
  succeeded: "Toast",
  editing: "formulir bagian",
  saving: "Button loading",
  deleting: "ConfirmDialog pending",
  disabled: "Button/kendali disabled",
};
