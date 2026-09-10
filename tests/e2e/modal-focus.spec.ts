import { expect, test } from "@playwright/test";

test.describe("lapisan dialog", () => {
  test("modal menahan fokus, tertutup dengan Escape, dan mengembalikan fokus", async ({ page }) => {
    await page.goto("/ui-kit");
    const trigger = page.getByRole("button", { name: "Buka modal" });
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Fokus tidak boleh keluar dari dialog.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      const inside = await dialog.evaluate((el) =>
        el.contains(document.activeElement),
      );
      expect(inside, `fokus keluar dialog pada tekanan Tab ke-${i + 1}`).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("laci berperilaku sama dengan modal", async ({ page }) => {
    await page.goto("/ui-kit");
    const trigger = page.getByRole("button", { name: "Buka laci" });
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
