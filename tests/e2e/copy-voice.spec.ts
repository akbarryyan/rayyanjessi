import { expect, test } from "@playwright/test";

/**
 * Suara produk, diperiksa pada teks yang benar-benar dibaca pasangan (T117,
 * FR-015, FR-024, FR-035, SC-006).
 *
 * Memeriksa kode sumber tidak cukup: pengenal seperti `state === "failed"`
 * bukan kalimat, sementara kalimat yang bermasalah bisa datang dari mana saja.
 */
const FORBIDDEN = [
  /no data found/i,
  /tidak ada data/i,
  /data tidak ditemukan/i,
  /\bnull\b/,
  /\bundefined\b/,
  /\bNaN\b/,
  /PrismaClient/i,
  /Error:\s/,
  /\b(ECONNREFUSED|ENOTFOUND|ETIMEDOUT)\b/,
  /\[object Object\]/,
];

const PAGES = [
  "/",
  "/?variant=empty",
  "/?variant=longText",
  "/story",
  "/story?variant=empty",
  "/memories",
  "/memories?variant=empty",
  "/letters",
  "/letters?variant=empty",
  "/open-when",
  "/open-when?variant=empty",
  "/trips",
  "/trips?variant=empty",
  "/trips/t1",
  "/trips/t1?variant=empty",
  "/places",
  "/places?variant=empty",
  "/soundtrack",
  "/soundtrack?variant=empty",
];

for (const path of PAGES) {
  test(`${path} tidak memuat kalimat bergaya sistem`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const text = await page.locator("body").innerText();

    for (const pattern of FORBIDDEN) {
      expect(text, `${path} memuat kalimat terlarang: ${pattern}`).not.toMatch(
        pattern,
      );
    }
  });
}
