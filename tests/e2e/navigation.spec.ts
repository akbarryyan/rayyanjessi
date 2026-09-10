import { expect, test } from "@playwright/test";

const MOBILE = { width: 375, height: 812 };
const DESKTOP = { width: 1280, height: 900 };

test.describe("navigasi ponsel", () => {
  test.use({ viewport: MOBILE });

  test("berada di bawah layar dan memuat tujuan utama", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigasi utama" });
    await expect(nav).toBeVisible();

    for (const label of ["Beranda", "Kisah Kita", "Kenangan"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
    await expect(nav.getByRole("button", { name: "Lainnya" })).toBeVisible();

    // Navigasi menempel di bagian bawah viewport.
    const box = (await nav.boundingBox())!;
    expect(box.y + box.height).toBeGreaterThan(MOBILE.height - 4);
  });

  test("seluruh tujuan lain tercapai lewat Lainnya", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Navigasi utama" })
      .getByRole("button", { name: "Lainnya" })
      .click();

    const drawer = page.getByRole("dialog");
    for (const label of [
      "Surat",
      "Buka Saat",
      "Perjalanan",
      "Tempat",
      "Lagu Kita",
      "Nanti",
      "Cuma Kita",
      "Waktu Kita",
      "Tanggal Penting",
      "Pengaturan",
    ]) {
      await expect(drawer.getByRole("link", { name: label })).toBeVisible();
    }
  });
});

test.describe("navigasi layar besar", () => {
  test.use({ viewport: DESKTOP });

  test("seluruh tujuan tampil di sisi kiri", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigasi utama" });
    await expect(nav).toBeVisible();

    const links = nav.getByRole("link");
    await expect(links).toHaveCount(13);

    // Berada di sisi kiri layar.
    const box = (await nav.boundingBox())!;
    expect(box.x).toBeLessThan(40);
  });

  test("penanda posisi ditandai lebih dari sekadar warna", async ({ page }) => {
    await page.goto("/");
    // Di puncak landing page, Beranda-lah yang aktif.
    const active = page
      .getByRole("navigation", { name: "Navigasi utama" })
      .getByRole("link", { name: "Beranda" });

    // Diumumkan ke pembaca layar (FR-010).
    await expect(active).toHaveAttribute("aria-current", "page");

    // Dan ditandai bobot huruf, bukan warna saja (FR-038).
    const weight = await active.evaluate((el) => getComputedStyle(el).fontWeight);
    expect(Number(weight)).toBeGreaterThanOrEqual(500);
  });

  test("halaman detail tetap menandai bagian induknya", async ({ page }) => {
    await page.goto("/ui-kit");
    // /ui-kit berada di luar kerangka aplikasi, jadi tidak ada butir aktif.
    await expect(
      page.getByRole("navigation", { name: "Navigasi utama" }),
    ).toHaveCount(0);
  });
});
