import type { FixtureSet } from "./index";
import { LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type { MemoriesViewModel } from "@/lib/view-models/memories";

export const memoriesFixtures: FixtureSet<MemoriesViewModel> = {
  typical: {
    memories: ready([
      { id: "m1", title: "Sore yang panjang", date: "12 Agustus 2026", image: null, aspect: "landscape" },
      { id: "m2", title: "Hujan di teras", date: "3 Agustus 2026", image: null, aspect: "portrait" },
      { id: "m3", title: "Kopi yang kedua", date: "28 Juli 2026", image: null, aspect: "square" },
      { id: "m4", title: "Jalan pagi", date: "14 Juli 2026", image: null, aspect: "landscape" },
      { id: "m5", title: "Malam yang sepi", date: "2 Juli 2026", image: null, aspect: "portrait" },
      { id: "m6", title: "Sarapan kesiangan", date: "21 Juni 2026", image: null, aspect: "square" },
    ]),
  },
  longText: {
    memories: ready([
      { id: "m1", title: LONG_TITLE, date: "12 Agustus 2026", image: null, aspect: "landscape" },
      { id: "m2", title: LONG_TITLE, date: "3 Agustus 2026", image: null, aspect: "portrait" },
    ]),
  },
  noImages: {
    memories: ready([
      { id: "m1", title: "Tanpa foto pun tetap kenangan", date: "1 Juni 2026", image: null, aspect: "square" },
    ]),
  },
  empty: { memories: empty() },
};
