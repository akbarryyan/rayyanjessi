import type { SectionData } from "./index";

/**
 * Bentuk data yang diterima komponen Home (FR-047, FR-063).
 *
 * Field-nya memakai istilah yang dipahami pasangan, bukan istilah database.
 * Pengenal hanya ada bila dibutuhkan untuk menyusun tautan, dan tidak pernah
 * ditampilkan (contracts/view-model.md).
 */

export type Greeting = {
  /** "Selamat pagi", "Selamat sore", dan seterusnya. */
  timeOfDay: string;
  /** Nama panggilan kedua anggota. */
  names: [string, string];
  /** Tanggal hari ini, sudah diformat untuk dibaca. */
  today: string;
};

export type RelationshipDuration = {
  years: number;
  months: number;
  days: number;
  /** Tanggal mulai, sudah diformat. */
  since: string;
};

export type UpcomingTrip = {
  id: string;
  destination: string;
  /** Rentang tanggal, sudah diformat. Contoh: "12 — 16 Desember 2026". */
  dateRange: string;
  /** Sisa hari. 0 berarti hari ini, negatif berarti sudah berlalu. */
  daysToGo: number;
  coverImage: string | null;
};

export type RecentMemory = {
  id: string;
  title: string;
  /** Tanggal, sudah diformat. */
  date: string;
  image: string | null;
};

export type LatestLetter = {
  id: string;
  /** Cuplikan pembuka, bukan seluruh isinya. */
  excerpt: string;
  from: string;
  /** Surat yang belum waktunya ditampilkan tersegel. */
  isSealed: boolean;
  /** Kapan surat tersegel dapat dibuka, sudah diformat. */
  availableOn: string | null;
};

export type FutureGlimpse = {
  id: string;
  title: string;
};

export type DailyQuestion = {
  id: string;
  question: string;
  /** Sudah dijawab oleh anggota yang sedang memakai perangkat ini. */
  answered: boolean;
};

export type HomeViewModel = {
  greeting: Greeting;
  duration: RelationshipDuration;
  dailyQuestion: SectionData<DailyQuestion>;
  upcomingTrip: SectionData<UpcomingTrip>;
  recentMemories: SectionData<RecentMemory[]>;
  latestLetter: SectionData<LatestLetter>;
  futureGlimpse: SectionData<FutureGlimpse>;
};
