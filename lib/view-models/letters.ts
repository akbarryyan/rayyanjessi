import type { SectionData } from "./index";

/** Keadaan surat, mengikuti docs/architecture.md §10. */
export type LetterState = "draft" | "scheduled" | "available" | "opened";

export const LETTER_STATE_LABELS: Record<LetterState, string> = {
  draft: "Draf",
  scheduled: "Terjadwal",
  available: "Sudah bisa dibuka",
  opened: "Sudah dibaca",
};

export type LetterSummary = {
  id: string;
  title: string;
  from: string;
  state: LetterState;
  /**
   * Cuplikan pembuka. WAJIB null untuk surat yang belum boleh dibuka —
   * isinya tidak boleh sampai ke client sebelum waktunya.
   */
  excerpt: string | null;
  /** Kapan surat terjadwal dapat dibuka, sudah diformat. */
  availableOn: string | null;
  /** Sisa hari sampai surat terjadwal terbuka. */
  daysUntilAvailable: number | null;
};

export type LettersViewModel = {
  letters: SectionData<LetterSummary[]>;
};
