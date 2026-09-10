import type { SectionData } from "./index";

/* --- Our Places --- */

export type Place = {
  id: string;
  name: string;
  address: string | null;
  /** Tanggal pertama dikunjungi, sudah diformat. */
  firstVisited: string | null;
  image: string | null;
};

export type PlacesViewModel = {
  places: SectionData<Place[]>;
};

/* --- Our Soundtrack --- */

export type Song = {
  id: string;
  title: string;
  artist: string;
  /** Tautan untuk mendengarkan. Null bila belum diisi. */
  url: string | null;
  coverImage: string | null;
  /** Cerita di balik lagunya. Inilah yang membuatnya jurnal, bukan pemutar. */
  story: string | null;
};

export type SoundtrackViewModel = {
  songs: SectionData<Song[]>;
};

/* --- Our Future --- */

export type FutureCategory =
  | "bucket_list"
  | "destination"
  | "dream"
  | "goal"
  | "experience";

export const FUTURE_CATEGORY_LABELS: Record<FutureCategory, string> = {
  bucket_list: "Daftar impian",
  destination: "Tempat",
  dream: "Mimpi",
  goal: "Tujuan",
  experience: "Pengalaman",
};

export type FutureStatus = "planned" | "in_progress" | "completed";

export type FutureItem = {
  id: string;
  title: string;
  category: FutureCategory;
  status: FutureStatus;
  /** Target waktu, sudah diformat. Null bila tidak ditetapkan. */
  targetDate: string | null;
};

export type FutureViewModel = {
  items: SectionData<FutureItem[]>;
};

/* --- Just For Us --- */

export type JustForUsViewModel = {
  dailyQuestion: SectionData<{ id: string; question: string; answered: boolean }>;
  quiz: SectionData<{
    id: string;
    question: string;
    options: readonly string[];
  }>;
  moreLikely: SectionData<{
    id: string;
    question: string;
    /** Nama kedua anggota, ditambah pilihan "kita berdua". */
    options: readonly string[];
  }>;
};

/* --- Our Time --- */

export type OurTimeViewModel = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  since: string;
  /** Tonggak yang sudah terlewati. */
  milestones: ReadonlyArray<{ id: string; label: string; reached: boolean; on: string }>;
};

/* --- Important Dates --- */

export type ImportantDateType =
  | "anniversary"
  | "birthday"
  | "first_met"
  | "first_date"
  | "custom";

export const IMPORTANT_DATE_LABELS: Record<ImportantDateType, string> = {
  anniversary: "Hari jadi",
  birthday: "Ulang tahun",
  first_met: "Pertama bertemu",
  first_date: "Kencan pertama",
  custom: "Lainnya",
};

export type ImportantDate = {
  id: string;
  title: string;
  /** Tanggal, sudah diformat. */
  date: string;
  type: ImportantDateType;
  recurring: boolean;
  /** Sisa hari sampai kejadian berikutnya. */
  daysUntil: number;
};

export type ImportantDatesViewModel = {
  next: SectionData<ImportantDate>;
  all: SectionData<ImportantDate[]>;
};
