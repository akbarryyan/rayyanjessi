import { test } from "@playwright/test";
import {
  expectComfortableTouchTargets,
  expectNoHorizontalScroll,
} from "./helpers/viewport";

const PAGES = ["/", "/ui-kit"];

for (const path of PAGES) {
  test(`${path} tidak melebar pada 320px, tablet, maupun desktop`, async ({ page }) => {
    await expectNoHorizontalScroll(page, path);
  });

  test(`${path} punya sasaran sentuh yang nyaman di ponsel`, async ({ page }) => {
    await expectComfortableTouchTargets(page, path);
  });
}
