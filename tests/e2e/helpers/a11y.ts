import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/**
 * Memindai sebuah halaman terhadap aturan aksesibilitas, mencakup kontras
 * dan penanda semantik (FR-041, FR-042).
 *
 * Pelanggarannya dilaporkan beserta elemen penyebabnya, agar kegagalannya
 * dapat langsung ditindak.
 */
export async function expectNoA11yViolations(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const summary = results.violations.map((v) => {
    const nodes = v.nodes
      .slice(0, 3)
      .map((n) => `      ${n.target.join(" ")}`)
      .join("\n");
    return `  ${v.id} [${v.impact}] ${v.help}\n${nodes}`;
  });

  expect(summary, `${path}\n${summary.join("\n")}`).toEqual([]);
}
