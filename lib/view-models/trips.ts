import type { SectionData } from "./index";

export type TripStatus = "planned" | "ongoing" | "completed" | "cancelled";

export const TRIP_STATUS_LABELS: Record<TripStatus, string> = {
  planned: "Direncanakan",
  ongoing: "Sedang berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export type TripSummary = {
  id: string;
  title: string;
  destination: string;
  dateRange: string;
  status: TripStatus;
  /** Sisa hari. 0 hari ini, negatif sudah lewat. */
  daysToGo: number;
  coverImage: string | null;
  /** Ringkasan kemajuan, ditampilkan pada hero. */
  budgetProgress: { spentLabel: string; limitLabel: string | null; percent: number | null } | null;
  checklistProgress: { done: number; total: number } | null;
};

export type TripsViewModel = {
  trips: SectionData<TripSummary[]>;
};

/* --- Itinerary --- */

export type TripActivity = {
  id: string;
  /** Jam mulai, sudah diformat. Contoh: "09:00". */
  startTime: string;
  title: string;
  location: string | null;
  /** Perkiraan biaya, sudah diformat. Null bila tidak diisi. */
  estimatedCost: string | null;
};

export type TripDay = {
  id: string;
  /** "Hari 1" */
  label: string;
  /** Tanggal, sudah diformat. */
  date: string;
  title: string | null;
  activities: TripActivity[];
};

export type ItineraryViewModel = {
  days: SectionData<TripDay[]>;
};

/* --- Budget --- */

export type ExpenseCategory =
  | "transportation"
  | "accommodation"
  | "food"
  | "activity"
  | "shopping"
  | "other";

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  transportation: "Transportasi",
  accommodation: "Penginapan",
  food: "Makan",
  activity: "Kegiatan",
  shopping: "Belanja",
  other: "Lain-lain",
};

export type Expense = {
  id: string;
  title: string;
  category: ExpenseCategory;
  /** Jumlah, sudah diformat sebagai mata uang. */
  amountLabel: string;
  /** Porsi terhadap total, 0..1. Dipakai penanda kemajuan. */
  share: number;
};

export type BudgetViewModel = {
  /** Null bila perjalanan ini tidak menetapkan batas anggaran. */
  limitLabel: string | null;
  spentLabel: string;
  /** Null bila tidak ada batas anggaran untuk dibandingkan. */
  percentOfLimit: number | null;
  byCategory: Array<{ category: ExpenseCategory; amountLabel: string; share: number }>;
  expenses: SectionData<Expense[]>;
};

/* --- Checklist --- */

export type ChecklistItem = {
  id: string;
  title: string;
  done: boolean;
  /** Nama penerima tugas, atau null bila belum ditugaskan. */
  assignedTo: string | null;
};

export type ChecklistViewModel = {
  items: SectionData<ChecklistItem[]>;
  progress: { done: number; total: number };
};
