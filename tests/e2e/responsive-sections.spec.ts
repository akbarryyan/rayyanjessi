import { test } from "@playwright/test";
import {
  expectComfortableTouchTargets,
  expectNoHorizontalScroll,
} from "./helpers/viewport";

/** Pemeriksaan lebar menyeluruh atas setiap halaman bagian (T115). */
const ALL_PAGES = [
  "/",
  "/story",
  "/memories",
  "/letters",
  "/open-when",
  "/trips",
  "/trips/t1",
  "/places",
  "/soundtrack",
  "/ui-kit",
  "/ui-kit/sections",
];

for (const path of ALL_PAGES) {
  test(`${path} tidak melebar pada 320px, tablet, maupun desktop`, async ({ page }) => {
    await expectNoHorizontalScroll(page, path);
  });

  test(`${path} punya sasaran sentuh yang nyaman di ponsel`, async ({ page }) => {
    await expectComfortableTouchTargets(page, path);
  });
}
