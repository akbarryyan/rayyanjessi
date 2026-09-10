import { expect, test } from "@playwright/test";

test.describe("keadaan memuat", () => {
  test("kerangka halaman muncul sebelum isinya siap", async ({ page }) => {
    // Halaman ditunda agar kerangka muatnya sempat terlihat.
    await page.goto("/ui-kit/states?delay=2000", { waitUntil: "commit" });

    // Yang muncul lebih dulu adalah kerangka, bukan layar kosong (FR-021).
    await expect(page.getByText("Sedang memuat")).toBeAttached({ timeout: 5000 });

    // Lalu isinya menggantikan kerangka itu.
    await expect(
      page.getByRole("heading", { name: "Keadaan halaman" }),
    ).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Sedang memuat")).toHaveCount(0);
  });

  test("kerangka muat diumumkan sebagai sedang sibuk", async ({ page }) => {
    await page.goto("/ui-kit/states?delay=2000", { waitUntil: "commit" });
    await expect(page.locator('[aria-busy="true"]')).toBeAttached({ timeout: 5000 });
  });
});
