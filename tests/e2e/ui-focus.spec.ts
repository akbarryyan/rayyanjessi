import { expect, test } from "@playwright/test";

test.describe("fokus papan ketik", () => {
  test("menelusuri seluruh kendali dengan Tab, fokusnya selalu terlihat", async ({
    page,
  }) => {
    await page.goto("/ui-kit");

    const controls = page.locator(
      "button:not([disabled]), input:not([disabled]):not([readonly]), textarea:not([disabled]), [role='tab']",
    );
    const total = await controls.count();
    expect(total).toBeGreaterThan(10);

    // Fokus digerakkan dengan Tab, bukan .focus() programatik: garis fokus
    // memakai :focus-visible, yang bergantung pada modalitas input terakhir.
    // Menekan Tab adalah satu-satunya cara menguji ini dengan andal.
    await page.locator("body").click({ position: { x: 2, y: 2 } });

    const seen = new Set<string>();
    for (let step = 0; step < 40; step++) {
      await page.keyboard.press("Tab");

      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const style = getComputedStyle(el);
        return {
          key: `${el.tagName}:${(el.textContent ?? "").slice(0, 24)}`,
          interactive: el.matches(
            "button, input, textarea, select, a[href], [role='tab']",
          ),
          outlineWidth: parseFloat(style.outlineWidth) || 0,
          outlineStyle: style.outlineStyle,
        };
      });

      if (!info || !info.interactive) continue;
      seen.add(info.key);

      expect(
        info.outlineWidth,
        `kendali "${info.key}" tidak punya garis fokus yang terlihat`,
      ).toBeGreaterThan(0);
      expect(info.outlineStyle).not.toBe("none");
    }

    // Penelusuran benar-benar melewati banyak kendali, bukan berhenti di satu.
    expect(seen.size).toBeGreaterThan(8);
  });
});
