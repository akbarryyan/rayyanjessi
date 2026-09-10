import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";
import { expectNoHorizontalScroll } from "./helpers/viewport";

const VARIANTS = ["typical", "longText", "noImages", "empty"] as const;

/**
 * Pemeriksaan yang berlaku untuk setiap bagian, dijalankan per bagian dan
 * bukan ditumpuk di akhir. Dengan enam belas bagian, menundanya berarti
 * menemukan enam belas masalah sekaligus di atas pola yang terlanjur sama.
 */
const SECTIONS = [
  { name: "Our Story", path: "/story" },
  { name: "Memories", path: "/memories" },
  { name: "Letters", path: "/letters" },
  { name: "Open When", path: "/open-when" },
  { name: "Next Trips", path: "/trips" },
  { name: "Trip Detail", path: "/trips/t1" },
  { name: "Places", path: "/places" },
  { name: "Soundtrack", path: "/soundtrack" },
] as const;

for (const section of SECTIONS) {
  test.describe(section.name, () => {
    for (const variant of VARIANTS) {
      test(`varian ${variant} tidak melebar pada 320px`, async ({ page }) => {
        await expectNoHorizontalScroll(page, `${section.path}?variant=${variant}`);
      });

      test(`@a11y varian ${variant} tidak melanggar aturan aksesibilitas`, async ({
        page,
      }) => {
        await expectNoA11yViolations(page, `${section.path}?variant=${variant}`);
      });
    }
  });
}

test.describe("Our Story", () => {
  test("lini masa tampil kronologis dengan jenis peristiwanya", async ({ page }) => {
    await page.goto("/story");
    const items = page.getByRole("listitem");
    await expect(items.first()).toContainText("Pertama bertemu");
    await expect(items.first()).toContainText("12 Maret 2024");
  });

  test("penyaring dapat dipilih dan keadaannya diumumkan", async ({ page }) => {
    await page.goto("/story");
    const group = page.getByRole("group", { name: "Saring lini masa" });
    const trips = group.getByRole("button", { name: "Perjalanan" });

    await expect(group.getByRole("button", { name: "Semua" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await trips.click();
    await expect(trips).toHaveAttribute("aria-pressed", "true");
  });

  test("keadaan kosong mengajak, bukan melapor", async ({ page }) => {
    await page.goto("/story?variant=empty");
    await expect(page.getByText("Ceritanya belum dimulai di sini.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Tambah momen pertama" }),
    ).toBeVisible();
  });
});

test.describe("Memories", () => {
  test("galeri menampilkan kenangan beserta tanggalnya", async ({ page }) => {
    await page.goto("/memories");
    await expect(page.getByRole("listitem")).toHaveCount(6);
    await expect(page.getByText("Sore yang panjang")).toBeVisible();
  });

  test("kenangan tanpa foto tetap tampil utuh", async ({ page }) => {
    await page.goto("/memories?variant=noImages");
    await expect(page.getByText("Belum ada fotonya")).toBeVisible();
    await expect(
      page.getByText("Tanpa foto pun tetap kenangan"),
    ).toBeVisible();
  });

  test("gambar dimuat bertahap agar halaman tetap ringan", async ({ page }) => {
    await page.goto("/memories");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute("loading", "lazy");
    }
  });
});

test.describe("Letters", () => {
  test("surat terjadwal tidak pernah membocorkan isinya", async ({ page }) => {
    await page.goto("/letters");

    const sealed = page.getByRole("listitem").filter({ hasText: "Terjadwal" });
    await expect(sealed).toContainText("Masih tersegel");
    await expect(sealed).toContainText("14 Februari 2027");
    await expect(sealed).toContainText("157 hari lagi");

    // Surat tersegel juga tidak boleh dapat dibuka.
    await expect(sealed.getByRole("link")).toHaveCount(0);
  });

  test("surat yang sudah bisa dibuka menampilkan cuplikan dan dapat dibuka", async ({
    page,
  }) => {
    await page.goto("/letters");
    const available = page
      .getByRole("listitem")
      .filter({ hasText: "Sudah bisa dibuka" });
    await expect(available).toContainText("harinya sedang tidak ramah");
    await expect(available.getByRole("link")).toHaveAttribute("href", "/letters/l1");
  });

  test("isi surat tersegel tidak ada di mana pun pada halaman", async ({ page }) => {
    await page.goto("/letters?variant=longText");
    const html = await page.content();
    // Fixture surat tersegel memang tidak membawa cuplikan; pastikan juga
    // tidak ada isi yang bocor lewat jalur lain.
    expect(html).not.toMatch(/hujan turun pelan sekali[\s\S]{0,80}Terjadwal/);
  });
});

test.describe("Open When", () => {
  test("membuka kartu memunculkan amplop dulu, bukan langsung isinya", async ({
    page,
  }) => {
    await page.goto("/open-when");
    await page.getByRole("button", { name: /Buka saat kamu lagi sedih/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Buka suratnya sekarang?");
    await expect(dialog.getByRole("button", { name: "Nanti saja" })).toBeVisible();
  });

  test("kartu yang pernah dibuka ditandai", async ({ page }) => {
    await page.goto("/open-when");
    const opened = page.getByRole("listitem").filter({ hasText: "Pernah dibuka" });
    await expect(opened.first()).toBeVisible();
  });
});

test.describe("Next Trips", () => {
  test("hitung mundur diberi makna, bukan angka telanjang", async ({ page }) => {
    await page.goto("/trips");
    const items = page.getByRole("listitem");
    await expect(items.filter({ hasText: "Bali" })).toContainText("42 hari lagi");
    await expect(items.filter({ hasText: "Yogyakarta" })).toContainText(
      "Sudah kita jalani.",
    );
  });

  test("perjalanan yang berlangsung hari ini ditandai khusus", async ({ page }) => {
    await page.goto("/trips?variant=longText");
    await expect(page.getByText("Hari ini!")).toBeVisible();
  });
});

test.describe("Trip Detail", () => {
  test("keempat bagian tersedia sebagai tab", async ({ page }) => {
    await page.goto("/trips/t1");
    const tabs = page.getByRole("tablist", { name: "Bagian perjalanan" });
    for (const label of ["Ringkasan", "Rencana", "Anggaran", "Daftar bawaan"]) {
      await expect(tabs.getByRole("tab", { name: label })).toBeVisible();
    }
  });

  test("anggaran menyebut angkanya dalam kalimat, bukan sebagai dasbor", async ({
    page,
  }) => {
    await page.goto("/trips/t1");
    await page.getByRole("tab", { name: "Anggaran" }).click();

    await expect(
      page.getByText(/Sudah terpakai .*Rp3\.250\.000.* dari Rp5\.000\.000/),
    ).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Anggaran terpakai" }),
    ).toHaveAttribute("aria-valuenow", "65");
  });

  test("perjalanan tanpa batas anggaran tetap menampilkan totalnya", async ({
    page,
  }) => {
    await page.goto("/trips/t1?variant=noImages");
    await page.getByRole("tab", { name: "Anggaran" }).click();

    await expect(page.getByText(/Tidak ada batas yang kita tetapkan/)).toBeVisible();
    // Tanpa batas, tidak ada perbandingan yang bisa ditampilkan.
    await expect(page.getByRole("progressbar")).toHaveCount(0);
  });

  test("anggaran yang lewat batas dikatakan dengan lembut", async ({ page }) => {
    await page.goto("/trips/t1?variant=longText");
    await page.getByRole("tab", { name: "Anggaran" }).click();
    await expect(page.getByText(/Sedikit lewat dari rencana/)).toBeVisible();
  });

  test("daftar bawaan dapat dicentang dan kemajuannya ikut berubah", async ({
    page,
  }) => {
    await page.goto("/trips/t1");
    await page.getByRole("tab", { name: "Daftar bawaan" }).click();

    await expect(page.getByText("4 dari 7 sudah beres.")).toBeVisible();
    await page.getByRole("checkbox", { name: "Bawa obat" }).check();
    await expect(page.getByText("5 dari 7 sudah beres.")).toBeVisible();
  });

  test("rencana harian dapat berpindah hari", async ({ page }) => {
    await page.goto("/trips/t1");
    await page.getByRole("tab", { name: "Rencana" }).click();

    await expect(page.getByText("Ke pantai")).toBeVisible();
    await page.getByRole("tab", { name: /Hari 2/ }).click();
    await expect(page.getByText("Jalan pagi")).toBeVisible();
  });
});

test.describe("Places", () => {
  test("tempat tampil beserta kapan pertama dikunjungi", async ({ page }) => {
    await page.goto("/places");
    await expect(page.getByText("Kafe favorit kita")).toBeVisible();
    await expect(page.getByText("Pertama ke sini 12 Februari 2025")).toBeVisible();
  });

  test("tempat tanpa alamat dan tanggal tetap tampil utuh", async ({ page }) => {
    await page.goto("/places?variant=noImages");
    await expect(page.getByText("Tempat yang belum sempat difoto")).toBeVisible();
  });
});

test.describe("Soundtrack", () => {
  test("cerita lagunya sejajar dengan judulnya, bukan disembunyikan", async ({
    page,
  }) => {
    await page.goto("/soundtrack");
    await expect(
      page.getByText(/Diputar berulang-ulang sepanjang jalan/),
    ).toBeVisible();
  });

  test("lagu tanpa cerita dan sampul tetap tampil", async ({ page }) => {
    await page.goto("/soundtrack?variant=noImages");
    await expect(page.getByText("Belum ada sampulnya")).toBeVisible();
  });
});

test.describe("Section pada landing page", () => {
  test("Waktu kita menyajikan durasi sebagai kalimat", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#our-time");
    await expect(section).toContainText("Kita sudah bersama 2 tahun, 3 bulan, 14 hari.");
    await expect(section).toContainText("805 hari kalau dihitung satu-satu");
  });

  test("tonggak yang belum tercapai ditandai berbeda", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#our-time");
    await expect(section).toContainText("✓ Setahun");
    await expect(section).toContainText("nanti, 24 Maret 2027");
  });

  test("Tanggal penting menonjolkan yang paling dekat", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#important-dates");
    await expect(section).toContainText("Paling dekat");
    await expect(section).toContainText("14 hari lagi");
  });

  test("Nanti merayakan butir yang tercapai", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#future");
    await expect(section).toContainText("Sudah kesampaian");
    await expect(section).toContainText("Beli kamera pertama kita");
  });

  test("Cuma kita bernada bermain, tanpa skor", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#just-for-us");
    await expect(section).toContainText("Pertanyaan hari ini");
    await expect(section).toContainText("Siapa yang lebih mungkin");
    // Tidak ada skor maupun papan peringkat (FR-028).
    await expect(section).not.toContainText(/skor|poin|peringkat/i);
  });

  test("pilihan pada permainan mengumumkan keadaannya", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#just-for-us");
    const choice = section.getByRole("button", { name: "Seblak" });
    await expect(choice).toHaveAttribute("aria-pressed", "false");
    await choice.click();
    await expect(choice).toHaveAttribute("aria-pressed", "true");
  });
});
