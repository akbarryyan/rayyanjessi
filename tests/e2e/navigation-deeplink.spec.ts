import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 900 } });

test.describe("tautan ke section landing page", () => {
  test("berpindah ke section memperbarui alamat halaman", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Navigasi utama" })
      .getByRole("link", { name: "Nanti" })
      .click();

    await expect(page).toHaveURL(/#future$/);
  });

  test("alamat section dapat dibuka langsung", async ({ page }) => {
    await page.goto("/#future");

    const section = page.locator("#future");
    await expect(section).toBeVisible();

    // Section-nya benar-benar berada di dalam layar setelah dituju.
    // Tidak dituntut menempel ke puncak: ketika halaman lebih pendek dari
    // yang dibutuhkan, peramban memang berhenti di batas gulir maksimum.
    const box = (await section.boundingBox())!;
    const viewport = page.viewportSize()!;
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeLessThan(viewport.height);
  });

  test("di puncak halaman, yang aktif adalah Beranda dan bukan section", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigasi utama" });
    await expect(nav.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("penanda posisi mengikuti section yang terlihat", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigasi utama" });

    // Digulir ke dasar halaman: section terakhir yang harus tertandai.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(nav.getByRole("link", { name: "Cuma Kita" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    // Kembali ke puncak: penandanya lepas dari section.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(nav.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
