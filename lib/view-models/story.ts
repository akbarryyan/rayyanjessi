import type { SectionData } from "./index";

/** Jenis peristiwa, mengikuti docs/architecture.md §8. */
export type StoryEventType =
  | "first_met"
  | "first_chat"
  | "first_date"
  | "anniversary"
  | "birthday"
  | "trip"
  | "milestone"
  | "custom";

export const STORY_TYPE_LABELS: Record<StoryEventType, string> = {
  first_met: "Pertama bertemu",
  first_chat: "Obrolan pertama",
  first_date: "Kencan pertama",
  anniversary: "Hari jadi",
  birthday: "Ulang tahun",
  trip: "Perjalanan",
  milestone: "Tonggak",
  custom: "Lainnya",
};

export type StoryEvent = {
  id: string;
  title: string;
  /** Tanggal, sudah diformat untuk dibaca. */
  date: string;
  location: string | null;
  description: string | null;
  coverImage: string | null;
  type: StoryEventType;
};

export type StoryFilter = { value: string; label: string };

export type StoryViewModel = {
  /** Tanggal mulai hubungan, sudah diformat. */
  since: string;
  filters: readonly StoryFilter[];
  events: SectionData<StoryEvent[]>;
};
