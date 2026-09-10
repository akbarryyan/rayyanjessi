import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  CONTRAST_MIN_LARGE_TEXT,
  CONTRAST_MIN_NORMAL_TEXT,
  contrastRatio,
} from "@/lib/tokens/contrast";
import { PALETTE } from "@/lib/tokens/palette";

/** Membaca nilai token warna langsung dari blok @theme pada globals.css. */
function readThemeColors(): Record<string, string> {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const colors: Record<string, string> = {};
  for (const [, name, value] of css.matchAll(
    /--color-([a-z-]+):\s*(#[0-9a-fA-F]{3,8});/g,
  )) {
    colors[name] = value;
  }
  return colors;
}

const NORMAL_TEXT_PAIRS: Array<[keyof typeof PALETTE, keyof typeof PALETTE]> = [
  ["ink", "canvas"],
  ["ink", "surface"],
  ["ink", "surfaceSunken"],
  ["inkSoft", "canvas"],
  ["inkSoft", "surface"],
  ["inkSoft", "surfaceSunken"],
  ["inkFaint", "canvas"],
  ["inkFaint", "surface"],
  ["accent", "canvas"],
  ["accent", "surface"],
  ["accent", "accentSoft"],
  ["accentInk", "accent"],
  ["positive", "positiveSoft"],
  ["positive", "surface"],
  ["critical", "criticalSoft"],
  ["critical", "surface"],
];

const UI_COMPONENT_PAIRS: Array<[keyof typeof PALETTE, keyof typeof PALETTE]> = [
  ["lineStrong", "canvas"],
  ["lineStrong", "surface"],
  ["focus", "canvas"],
  ["focus", "surface"],
];

describe("token warna", () => {
  it("nilai di lib/tokens/palette.ts tidak menyimpang dari app/globals.css", () => {
    const theme = readThemeColors();
    const mapping: Record<string, keyof typeof PALETTE> = {
      canvas: "canvas",
      surface: "surface",
      "surface-sunken": "surfaceSunken",
      ink: "ink",
      "ink-soft": "inkSoft",
      "ink-faint": "inkFaint",
      accent: "accent",
      "accent-soft": "accentSoft",
      "accent-ink": "accentInk",
      line: "line",
      "line-strong": "lineStrong",
      positive: "positive",
      "positive-soft": "positiveSoft",
      critical: "critical",
      "critical-soft": "criticalSoft",
      focus: "focus",
    };
    for (const [cssName, paletteKey] of Object.entries(mapping)) {
      expect(theme[cssName], `--color-${cssName} tidak ada di globals.css`).toBe(
        PALETTE[paletteKey],
      );
    }
  });

  it.each(NORMAL_TEXT_PAIRS)(
    "%s di atas %s memenuhi ambang teks normal 4.5:1",
    (fg, bg) => {
      const ratio = contrastRatio(PALETTE[fg], PALETTE[bg]);
      expect(
        ratio,
        `${fg} di atas ${bg} hanya ${ratio.toFixed(2)}:1`,
      ).toBeGreaterThanOrEqual(CONTRAST_MIN_NORMAL_TEXT);
    },
  );

  it.each(UI_COMPONENT_PAIRS)(
    "%s di atas %s memenuhi ambang komponen antarmuka 3:1",
    (fg, bg) => {
      const ratio = contrastRatio(PALETTE[fg], PALETTE[bg]);
      expect(
        ratio,
        `${fg} di atas ${bg} hanya ${ratio.toFixed(2)}:1`,
      ).toBeGreaterThanOrEqual(CONTRAST_MIN_LARGE_TEXT);
    },
  );
});
