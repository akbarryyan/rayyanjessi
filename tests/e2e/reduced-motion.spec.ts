import { expect, test } from "@playwright/test";

/**
 * Membuktikan janji FR-030: ketika preferensi kurangi-gerak menyala, gerakan
 * ditiadakan atau disederhanakan, dan TIDAK ADA fungsi yang hilang.
 *
 * Bagian kedua itu yang paling mudah dilanggar diam-diam — animasi dimatikan
 * dengan cara yang juga mematikan kemunculan isinya.
 */
test.use({ reducedMotion: "reduce" });

test.describe("preferensi kurangi-gerak menyala", () => {
  test("durasi transisi dipangkas", async ({ page }) => {
    await page.goto("/ui-kit");

    const duration = await page
      .getByRole("button", { name: "Utama" })
      .evaluate((el) => getComputedStyle(el).transitionDuration);

    // Aturan global memangkasnya ke nilai yang praktis nol.
    expect(parseFloat(duration)).toBeLessThan(0.05);
  });

  test("isi yang beranimasi tetap terlihat", async ({ page }) => {
    await page.goto("/ui-kit");
    // Kartu dibungkus FadeIn; ia harus tetap tampil, bukan tertinggal
    // transparan karena animasinya dimatikan.
    const card = page.getByText("Sore yang panjang").first();
    await expect(card).toBeVisible();
    const opacity = await card.evaluate(
      (el) => getComputedStyle(el.closest("div")!).opacity,
    );
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
  });

  test("dialog tetap dapat dibuka dan ditutup", async ({ page }) => {
    await page.goto("/ui-kit");
    await page.getByRole("button", { name: "Buka modal" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("toast tetap muncul dan terbaca", async ({ page }) => {
    await page.goto("/ui-kit");
    await page.getByRole("button", { name: "Toast berhasil" }).click();
    await expect(page.getByText("Kenangannya tersimpan.").first()).toBeVisible();
  });
});
