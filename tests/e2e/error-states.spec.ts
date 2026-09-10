import { expect, test } from "@playwright/test";

test.describe("keadaan gagal", () => {
  test("kegagalan halaman menampilkan kalimat terbaca beserta cara mencoba lagi", async ({
    page,
  }) => {
    await page.goto("/ui-kit/states?fail=1");

    // Dibatasi ke ErrorState milik aplikasi: di mode pengembangan, Next juga
    // menampilkan overlay error-nya sendiri yang sama-sama ber-role alert.
    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Ada yang tidak beres" });
    await expect(alert).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Coba lagi" }),
    ).toBeVisible();
  });

  test("kegagalan tidak membocorkan detail internal", async ({ page }) => {
    await page.goto("/ui-kit/states?fail=1");
    // Dibaca dari ErrorState-nya sendiri, bukan dari seluruh body: overlay
    // error milik Next hanya ada di mode pengembangan dan tidak pernah ikut
    // ter-deploy.
    const shown = await page
      .getByRole("alert")
      .filter({ hasText: "Ada yang tidak beres" })
      .innerText();

    // Pesan error aslinya tidak boleh sampai ke pembaca (FR-024).
    expect(shown).not.toMatch(/Kegagalan yang disengaja/);
    expect(shown).not.toMatch(/Error:/);
    expect(shown).not.toMatch(/\bat\s+\w+\s*\(/); // jejak tumpukan
  });

  test("aksi yang gagal mengembalikan tombolnya ke keadaan semula", async ({ page }) => {
    await page.goto("/ui-kit");

    // Dibatasi ke bagiannya sendiri: halaman peraga juga memuat tombol
    // contoh yang memang selamanya dalam keadaan memuat.
    const section = page.locator("section").filter({ hasText: "Aksi yang gagal" });
    const button = section.getByRole("button", { name: "Simpan kenangan" });

    await button.click();
    // Selama berlangsung, tombolnya menandai dirinya sibuk.
    await expect(section.locator('button[aria-busy="true"]')).toBeAttached();

    // Setelah gagal: alasannya disampaikan, dan tombolnya kembali dapat ditekan.
    await expect(page.getByText(/Belum tersimpan/).first()).toBeVisible();

    // Dan alasannya juga diumumkan ke pembaca layar, bukan hanya terlihat.
    await expect(
      page.locator('[aria-live]').filter({ hasText: "Belum tersimpan" }),
    ).toBeAttached();
    await expect(button).toBeEnabled();
    await expect(button).not.toHaveAttribute("aria-busy", "true");
    await expect(section.locator('button[aria-busy="true"]')).toHaveCount(0);
  });
});
