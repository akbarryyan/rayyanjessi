import type { FixtureSet } from "./index";
import { LONG_TEXT, LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type { LettersViewModel } from "@/lib/view-models/letters";

export const lettersFixtures: FixtureSet<LettersViewModel> = {
  typical: {
    letters: ready([
      { id: "l1", title: "Untuk hari yang berat", from: "A", state: "available", excerpt: "Kalau kamu baca ini, berarti harinya sedang tidak ramah…", availableOn: null, daysUntilAvailable: null },
      { id: "l2", title: "Buat nanti", from: "A", state: "scheduled", excerpt: null, availableOn: "14 Februari 2027", daysUntilAvailable: 157 },
      { id: "l3", title: "Selamat pagi", from: "B", state: "opened", excerpt: "Semoga hari ini lebih pelan dari kemarin.", availableOn: null, daysUntilAvailable: null },
      { id: "l4", title: "Belum selesai", from: "B", state: "draft", excerpt: "Masih dipikirkan…", availableOn: null, daysUntilAvailable: null },
    ]),
  },
  longText: {
    letters: ready([
      { id: "l1", title: LONG_TITLE, from: "A", state: "available", excerpt: LONG_TEXT, availableOn: null, daysUntilAvailable: null },
      { id: "l2", title: LONG_TITLE, from: "B", state: "scheduled", excerpt: null, availableOn: "1 Januari 2030", daysUntilAvailable: 1208 },
    ]),
  },
  noImages: {
    letters: ready([
      { id: "l1", title: "Sekadar menyapa", from: "A", state: "opened", excerpt: "Tidak ada kabar penting, cuma kangen.", availableOn: null, daysUntilAvailable: null },
    ]),
  },
  empty: { letters: empty() },
};
