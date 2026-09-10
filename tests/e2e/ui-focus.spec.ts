import { expect, test } from "@playwright/test";

test.describe("fokus papan ketik", () => {
  test("setiap kendali interaktif dapat menerima fokus dan terlihat", async ({ page }) => {
    await page.goto("/ui-kit");

    const controls = page.locator(
      "button:not([disabled]), input:not([disabled]):not([readonly]), textarea:not([disabled]), [role='tab']",
    );
    const count = await controls.count();
    expect(count).toBeGreaterThan(10);

    for (let i = 0; i < count; i++) {
      const control = controls.nth(i);
      await control.focus();
      await expect(control).toBeFocused();

      // Garis fokus global memberi outline yang terlihat (FR-037).
      const outlineWidth = await control.evaluate(
        (el) => getComputedStyle(el).outlineWidth,
      );
      expect(
        parseFloat(outlineWidth),
        `kendali ke-${i} tidak punya garis fokus`,
      ).toBeGreaterThan(0);
    }
  });
});
