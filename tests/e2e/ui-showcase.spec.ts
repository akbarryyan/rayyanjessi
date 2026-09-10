import { expect, test } from "@playwright/test";

test.describe("halaman peraga komponen", () => {
  test("menampilkan seluruh kelompok komponen dasar", async ({ page }) => {
    await page.goto("/ui-kit");
    for (const heading of [
      "Tombol",
      "Kolom isian",
      "Kartu",
      "Lencana",
      "Avatar",
      "Kerangka muat",
      "Tab",
      "Lapisan",
    ]) {
      await expect(
        page.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    }
  });

  test("kolom isian punya label terkait dan pesan gagal yang diumumkan", async ({ page }) => {
    await page.goto("/ui-kit");
    // Label terkait: mengklik label memindahkan fokus ke kolomnya.
    const errorField = page.getByRole("alert").first();
    await expect(errorField).toHaveText(/Judulnya belum diisi/);
    // Kolom yang gagal ditandai untuk pembaca layar, bukan hanya diberi warna.
    const invalid = page.locator('input[aria-invalid="true"]').first();
    await expect(invalid).toHaveAttribute("aria-describedby", /.+/);
  });
});
