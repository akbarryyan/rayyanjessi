import { expect, test } from "@playwright/test";

test.describe("konfirmasi menghapus", () => {
  test("menyebutkan apa saja yang ikut terhapus sebelum aksi dijalankan", async ({
    page,
  }) => {
    await page.goto("/ui-kit");
    await page.getByRole("button", { name: "Hapus kenangan" }).click();

    const dialog = page.getByRole("alertdialog").or(page.getByRole("dialog"));
    await expect(dialog).toBeVisible();

    // Bukan sekadar bertanya "yakin?" — dampaknya disebut (FR-018).
    await expect(dialog).toContainText(/beserta semua fotonya akan hilang/);
    await expect(dialog).toContainText(/tidak bisa dikembalikan/);

    await expect(dialog.getByRole("button", { name: "Batal" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Ya, hapus" })).toBeVisible();
  });

  test("membatalkan tidak menjalankan aksinya", async ({ page }) => {
    await page.goto("/ui-kit");
    const trigger = page.getByRole("button", { name: "Hapus kenangan" });
    await trigger.click();

    await page.getByRole("button", { name: "Batal" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    // Tidak ada pemberitahuan keberhasilan, karena tidak ada yang dihapus.
    await expect(page.getByText("Kenangannya sudah dihapus.")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});
