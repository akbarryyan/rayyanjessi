import { expect, test } from "@playwright/test";

/**
 * Kalimat yang tidak boleh muncul di antarmuka: gaya pesan sistem, nama
 * teknis, dan jejak kesalahan (FR-015, FR-024, SC-006).
 */
const FORBIDDEN = [
  /no data found/i,
  /tidak ada data/i,
  /data tidak ditemukan/i,
  /\bnull\b/,
  /\bundefined\b/,
  /PrismaClient/i,
  /\bstack\b.*\bat\b/i,
  /Error:\s/,
  /\b(ECONNREFUSED|ENOTFOUND|ETIMEDOUT)\b/,
];

test.describe("pola halaman", () => {
  test("pengantar, keadaan kosong, dan keadaan gagal tampil", async ({ page }) => {
    await page.goto("/ui-kit");

    await expect(
      page.getByRole("heading", { name: "Kenangan kita" }),
    ).toBeVisible();
    await expect(page.getByText("Belum ada apa-apa di sini.")).toBeVisible();

    // Dibatasi ke ErrorState: halaman ini juga memuat pesan kegagalan kolom
    // isian yang sama-sama ber-role alert.
    await expect(
      page.getByRole("alert").filter({ hasText: "Ada yang tidak beres" }),
    ).toBeVisible();
  });

  test("keadaan kosong selalu menawarkan satu langkah berikutnya", async ({ page }) => {
    await page.goto("/ui-kit");
    await expect(
      page.getByRole("button", { name: "Tambah yang pertama" }),
    ).toBeVisible();
  });

  test("tidak ada kalimat bergaya sistem di seluruh halaman", async ({ page }) => {
    await page.goto("/ui-kit");
    const text = await page.locator("body").innerText();

    for (const pattern of FORBIDDEN) {
      expect(text, `kalimat terlarang ditemukan: ${pattern}`).not.toMatch(pattern);
    }
  });
});
