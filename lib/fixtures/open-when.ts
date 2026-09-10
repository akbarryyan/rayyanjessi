import type { FixtureSet } from "./index";
import { LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type { OpenWhenViewModel } from "@/lib/view-models/open-when";

export const openWhenFixtures: FixtureSet<OpenWhenViewModel> = {
  typical: {
    triggers: ready([
      { id: "ow1", emblem: "💔", title: "Kamu lagi sedih", opened: false },
      { id: "ow2", emblem: "🌙", title: "Kamu susah tidur", opened: false },
      { id: "ow3", emblem: "🥺", title: "Kamu kangen aku", opened: true },
      { id: "ow4", emblem: "🫂", title: "Kamu butuh dipeluk", opened: false },
      { id: "ow5", emblem: "🎉", title: "Kamu lagi senang", opened: false },
      { id: "ow6", emblem: "❤️", title: "Kamu perlu diingatkan aku sayang kamu", opened: true },
    ]),
  },
  longText: {
    triggers: ready([
      { id: "ow1", emblem: "💔", title: LONG_TITLE, opened: false },
    ]),
  },
  noImages: {
    triggers: ready([
      { id: "ow1", emblem: "🌙", title: "Kamu susah tidur", opened: false },
    ]),
  },
  empty: { triggers: empty() },
};
