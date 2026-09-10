import type { FixtureSet } from "./index";
import { LONG_TEXT, LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type {
  FutureViewModel,
  ImportantDatesViewModel,
  JustForUsViewModel,
  OurTimeViewModel,
  PlacesViewModel,
  SoundtrackViewModel,
} from "@/lib/view-models/collections";

export const placesFixtures: FixtureSet<PlacesViewModel> = {
  typical: {
    places: ready([
      { id: "p1", name: "Kafe favorit kita", address: "Jakarta Selatan", firstVisited: "12 Februari 2025", image: null },
      { id: "p2", name: "Bangku di taman", address: "Bandung", firstVisited: "3 Mei 2025", image: null },
      { id: "p3", name: "Warung mi tengah malam", address: null, firstVisited: "21 Juli 2025", image: null },
    ]),
  },
  longText: {
    places: ready([
      { id: "p1", name: LONG_TITLE, address: LONG_TITLE, firstVisited: "12 Februari 2025", image: null },
    ]),
  },
  noImages: {
    places: ready([
      { id: "p1", name: "Tempat yang belum sempat difoto", address: null, firstVisited: null, image: null },
    ]),
  },
  empty: { places: empty() },
};

export const soundtrackFixtures: FixtureSet<SoundtrackViewModel> = {
  typical: {
    songs: ready([
      { id: "s1", title: "Lagu di perjalanan pertama", artist: "Entah siapa", url: null, coverImage: null, story: "Diputar berulang-ulang sepanjang jalan, sampai hafal sendiri." },
      { id: "s2", title: "Yang kamu nyanyikan salah lirik", artist: "Entah siapa", url: null, coverImage: null, story: "Dan sampai sekarang aku masih ingat versimu." },
    ]),
  },
  longText: {
    songs: ready([
      { id: "s1", title: LONG_TITLE, artist: LONG_TITLE, url: null, coverImage: null, story: LONG_TEXT },
    ]),
  },
  noImages: {
    songs: ready([
      { id: "s1", title: "Belum ada sampulnya", artist: "Entah siapa", url: null, coverImage: null, story: null },
    ]),
  },
  empty: { songs: empty() },
};

export const futureFixtures: FixtureSet<FutureViewModel> = {
  typical: {
    items: ready([
      { id: "f1", title: "Lihat matahari terbit di Jepang", category: "destination", status: "planned", targetDate: null },
      { id: "f2", title: "Belajar masak bareng", category: "experience", status: "in_progress", targetDate: null },
      { id: "f3", title: "Naik gunung sekali saja", category: "bucket_list", status: "planned", targetDate: "2027" },
      { id: "f4", title: "Beli kamera pertama kita", category: "goal", status: "completed", targetDate: null },
    ]),
  },
  longText: {
    items: ready([
      { id: "f1", title: LONG_TITLE, category: "dream", status: "planned", targetDate: "Suatu hari nanti" },
    ]),
  },
  noImages: {
    items: ready([
      { id: "f1", title: "Sesuatu yang sederhana", category: "experience", status: "completed", targetDate: null },
    ]),
  },
  empty: { items: empty() },
};

export const justForUsFixtures: FixtureSet<JustForUsViewModel> = {
  typical: {
    dailyQuestion: ready({ id: "q1", question: "Satu hal yang ingin kita alami bersama tahun ini apa?", answered: false }),
    quiz: ready({ id: "z1", question: "Makanan favoritku apa?", options: ["Nasi goreng", "Mi ayam", "Seblak", "Bakso"] }),
    moreLikely: ready({ id: "w1", question: "Siapa yang lebih mungkin lupa menaruh ponsel?", options: ["A", "B", "Kita berdua"] }),
  },
  longText: {
    dailyQuestion: ready({ id: "q1", question: LONG_TEXT, answered: true }),
    quiz: ready({ id: "z1", question: LONG_TITLE, options: [LONG_TITLE, "Bukan itu"] }),
    moreLikely: ready({ id: "w1", question: LONG_TITLE, options: ["A", "B", "Kita berdua"] }),
  },
  noImages: {
    dailyQuestion: ready({ id: "q1", question: "Apa yang bikin kamu senyum hari ini?", answered: false }),
    quiz: empty(),
    moreLikely: empty(),
  },
  empty: { dailyQuestion: empty(), quiz: empty(), moreLikely: empty() },
};

export const ourTimeFixtures: FixtureSet<OurTimeViewModel> = {
  typical: {
    years: 2, months: 3, days: 14, totalDays: 805, since: "28 Juni 2024",
    milestones: [
      { id: "ms1", label: "100 hari", reached: true, on: "6 Oktober 2024" },
      { id: "ms2", label: "Setahun", reached: true, on: "28 Juni 2025" },
      { id: "ms3", label: "500 hari", reached: true, on: "10 November 2025" },
      { id: "ms4", label: "Dua tahun", reached: true, on: "28 Juni 2026" },
      { id: "ms5", label: "1000 hari", reached: false, on: "24 Maret 2027" },
    ],
  },
  longText: {
    years: 12, months: 11, days: 30, totalDays: 4747, since: "1 Januari 2014",
    milestones: [{ id: "ms1", label: LONG_TITLE, reached: true, on: "1 Januari 2015" }],
  },
  noImages: {
    years: 0, months: 0, days: 1, totalDays: 1, since: "9 September 2026",
    milestones: [{ id: "ms1", label: "100 hari", reached: false, on: "18 Desember 2026" }],
  },
  empty: { years: 0, months: 0, days: 0, totalDays: 0, since: "10 September 2026", milestones: [] },
};

export const importantDatesFixtures: FixtureSet<ImportantDatesViewModel> = {
  typical: {
    next: ready({ id: "d1", title: "Ulang tahun kamu", date: "24 September", type: "birthday", recurring: true, daysUntil: 14 }),
    all: ready([
      { id: "d1", title: "Ulang tahun kamu", date: "24 September", type: "birthday", recurring: true, daysUntil: 14 },
      { id: "d2", title: "Hari jadi kita", date: "28 Juni", type: "anniversary", recurring: true, daysUntil: 291 },
      { id: "d3", title: "Pertama bertemu", date: "12 Maret", type: "first_met", recurring: true, daysUntil: 183 },
    ]),
  },
  longText: {
    next: ready({ id: "d1", title: LONG_TITLE, date: "24 September", type: "custom", recurring: false, daysUntil: 0 }),
    all: ready([{ id: "d1", title: LONG_TITLE, date: "24 September", type: "custom", recurring: false, daysUntil: 0 }]),
  },
  noImages: {
    next: ready({ id: "d1", title: "Hari jadi kita", date: "28 Juni", type: "anniversary", recurring: true, daysUntil: 1 }),
    all: ready([{ id: "d1", title: "Hari jadi kita", date: "28 Juni", type: "anniversary", recurring: true, daysUntil: 1 }]),
  },
  empty: { next: empty(), all: empty() },
};
