import { test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";

test("@a11y landing page tidak melanggar aturan aksesibilitas", async ({ page }) => {
  await expectNoA11yViolations(page, "/");
});

test("@a11y halaman peraga tidak melanggar aturan aksesibilitas", async ({ page }) => {
  await expectNoA11yViolations(page, "/ui-kit");
});
