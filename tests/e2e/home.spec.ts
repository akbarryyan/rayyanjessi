import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";
import { expectNoHorizontalScroll } from "./helpers/viewport";

/**
 * Varian fixture diuji satu per satu. Rancangan yang hanya benar untuk data
 * rapi bukan rancangan yang selesai — teks sangat panjang, tanpa gambar, dan
 * daftar kosong sama nyatanya.
 */
const VARIANTS = ["typical", "longText", "noImages", "empty"] as const;

test.describe("Home", () => {
  test("menampilkan sapaan dan durasi hubungan sebagai kalimat", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Selamat pagi/,
    );
    // Durasinya kalimat, bukan tiga kartu angka (FR-029, Prinsip VII).
    await expect(
      page.getByText(/Kita sudah bersama .* sejak/),
    ).toBeVisible();
  });

  test("perjalanan terdekat memberi makna pada angkanya", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("42 hari lagi")).toBeVisible();
    await expect(page.getByText("Bali")).toBeVisible();
  });

  test("surat tersegel tidak membocorkan isinya", async ({ page }) => {
    await page.goto("/?variant=longText");
    await expect(page.getByText("Suratnya masih tersegel.")).toBeVisible();
    await expect(page.getByText(/Bisa dibuka 14 Februari 2027/)).toBeVisible();
    // Cuplikan isinya tidak boleh muncul di mana pun.
    await expect(page.getByText(/hujan turun pelan sekali/)).toHaveCount(0);
  });

  test("keadaan kosong tetap menawarkan langkah berikutnya", async ({ page }) => {
    await page.goto("/?variant=empty");
    await expect(page.getByText("Belum ada rencana jalan-jalan.")).toBeVisible();
    await expect(page.getByText("Belum ada kenangan yang tersimpan.")).toBeVisible();
    await expect(page.getByText("Belum ada surat.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Rencanakan perjalanan" }),
    ).toBeVisible();
  });

  for (const variant of VARIANTS) {
    test(`varian ${variant} tidak melebar pada 320px`, async ({ page }) => {
      await expectNoHorizontalScroll(page, `/?variant=${variant}`);
    });

    test(`@a11y varian ${variant} tidak melanggar aturan aksesibilitas`, async ({
      page,
    }) => {
      await expectNoA11yViolations(page, `/?variant=${variant}`);
    });
  }
});
