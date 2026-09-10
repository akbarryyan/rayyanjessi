import { test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";

/**
 * Pemindaian aksesibilitas menyeluruh atas setiap halaman bagian (T114).
 *
 * Tiap bagian sudah dipindai pada varian-variannya di sections.spec.ts;
 * berkas ini menjaga agar tidak ada halaman yang terlewat sama sekali —
 * termasuk halaman rujukan dan permukaan uji.
 */
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
  "/ui-kit/states",
];

for (const path of ALL_PAGES) {
  test(`@a11y ${path} tidak melanggar aturan aksesibilitas`, async ({ page }) => {
    await expectNoA11yViolations(page, path);
  });
}
