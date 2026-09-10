import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("@a11y halaman peraga tidak melanggar aturan aksesibilitas", async ({ page }) => {
  await page.goto("/ui-kit");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const summary = results.violations.map(
    (v) => `${v.id} (${v.nodes.length} elemen): ${v.help}`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
});
