import type { FixtureSet } from "./index";
import { LONG_TEXT, LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type { HomeViewModel } from "@/lib/view-models/home";

/**
 * Data contoh untuk Home.
 *
 * Tidak memuat data hubungan yang sebenarnya (Prinsip I). Nama, tempat, dan
 * tanggalnya sengaja dibuat netral.
 */

const greeting = {
  timeOfDay: "Selamat pagi",
  names: ["A", "B"] as [string, string],
  today: "Kamis, 10 September 2026",
};

const duration = { years: 2, months: 3, days: 14, since: "28 Juni 2024" };

export const homeFixtures: FixtureSet<HomeViewModel> = {
  typical: {
    greeting,
    duration,
    dailyQuestion: ready({
      id: "q1",
      question: "Satu hal yang ingin kita alami bersama tahun ini apa?",
      answered: false,
    }),
    upcomingTrip: ready({
      id: "t1",
      destination: "Bali",
      dateRange: "12 — 16 Desember 2026",
      daysToGo: 42,
      coverImage: null,
    }),
    recentMemories: ready([
      { id: "m1", title: "Sore yang panjang", date: "12 Agustus 2026", image: null },
      { id: "m2", title: "Hujan di teras", date: "3 Agustus 2026", image: null },
      { id: "m3", title: "Kopi yang kedua", date: "28 Juli 2026", image: null },
    ]),
    latestLetter: ready({
      id: "l1",
      excerpt: "Ada yang ingin aku ceritakan, tapi nanti saja…",
      from: "A",
      isSealed: false,
      availableOn: null,
    }),
    futureGlimpse: ready({ id: "f1", title: "Lihat matahari terbit di Jepang" }),
  },

  longText: {
    greeting: { ...greeting, names: [LONG_TITLE.slice(0, 40), "B"] },
    duration,
    dailyQuestion: ready({ id: "q1", question: LONG_TEXT, answered: true }),
    upcomingTrip: ready({
      id: "t1",
      destination: LONG_TITLE,
      dateRange: "12 — 16 Desember 2026",
      daysToGo: 0,
      coverImage: null,
    }),
    recentMemories: ready([
      { id: "m1", title: LONG_TITLE, date: "12 Agustus 2026", image: null },
    ]),
    latestLetter: ready({
      id: "l1",
      excerpt: LONG_TEXT,
      from: "A",
      isSealed: true,
      availableOn: "14 Februari 2027",
    }),
    futureGlimpse: ready({ id: "f1", title: LONG_TITLE }),
  },

  noImages: {
    greeting,
    duration,
    dailyQuestion: ready({ id: "q1", question: "Apa yang bikin kamu senyum hari ini?", answered: false }),
    upcomingTrip: ready({
      id: "t1",
      destination: "Bandung",
      dateRange: "1 — 3 Oktober 2026",
      daysToGo: 7,
      coverImage: null,
    }),
    recentMemories: ready([
      { id: "m1", title: "Jalan pagi", date: "1 September 2026", image: null },
    ]),
    latestLetter: ready({ id: "l1", excerpt: "Selamat pagi, kamu.", from: "B", isSealed: false, availableOn: null }),
    futureGlimpse: ready({ id: "f1", title: "Belajar masak bareng" }),
  },

  empty: {
    greeting,
    duration: { years: 0, months: 0, days: 1, since: "9 September 2026" },
    dailyQuestion: empty(),
    upcomingTrip: empty(),
    recentMemories: empty(),
    latestLetter: empty(),
    futureGlimpse: empty(),
  },
};
