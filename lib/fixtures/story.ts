import type { FixtureSet } from "./index";
import { LONG_TEXT, LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type { StoryViewModel } from "@/lib/view-models/story";

const filters = [
  { value: "all", label: "Semua" },
  { value: "milestone", label: "Tonggak" },
  { value: "trip", label: "Perjalanan" },
  { value: "anniversary", label: "Hari jadi" },
] as const;

export const storyFixtures: FixtureSet<StoryViewModel> = {
  typical: {
    since: "28 Juni 2024",
    filters,
    events: ready([
      { id: "e1", title: "Pertama bertemu", date: "12 Maret 2024", location: "Jakarta", description: "Hujan, dan kita sama-sama telat.", coverImage: null, type: "first_met" },
      { id: "e2", title: "Obrolan yang kepanjangan", date: "15 Maret 2024", location: null, description: "Sampai lupa waktu.", coverImage: null, type: "first_chat" },
      { id: "e3", title: "Kencan pertama", date: "28 Juni 2024", location: "Bandung", description: null, coverImage: null, type: "first_date" },
      { id: "e4", title: "Perjalanan pertama kita", date: "3 Januari 2025", location: "Yogyakarta", description: "Kereta pagi, dan kopi yang kedinginan.", coverImage: null, type: "trip" },
    ]),
  },
  longText: {
    since: "28 Juni 2024",
    filters,
    events: ready([
      { id: "e1", title: LONG_TITLE, date: "12 Maret 2024", location: LONG_TITLE, description: LONG_TEXT, coverImage: null, type: "milestone" },
    ]),
  },
  noImages: {
    since: "28 Juni 2024",
    filters,
    events: ready([
      { id: "e1", title: "Hari biasa yang jadi istimewa", date: "1 Mei 2025", location: null, description: null, coverImage: null, type: "custom" },
      { id: "e2", title: "Setahun kita", date: "28 Juni 2025", location: null, description: null, coverImage: null, type: "anniversary" },
    ]),
  },
  empty: { since: "9 September 2026", filters, events: empty() },
};
