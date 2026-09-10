import type { SectionData } from "./index";

export type OpenWhenTrigger = {
  id: string;
  /** Lambang yang mewakili suasananya. */
  emblem: string;
  /** "Kamu lagi sedih", "Kamu kangen", dan seterusnya. */
  title: string;
  /** Sudah pernah dibuka sebelumnya. */
  opened: boolean;
};

export type OpenWhenLetter = {
  id: string;
  title: string;
  body: string;
  from: string;
};

export type OpenWhenViewModel = {
  triggers: SectionData<OpenWhenTrigger[]>;
};
