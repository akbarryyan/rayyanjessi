import { expect, test } from "@playwright/test";

/**
 * Antarmuka tidak boleh punya animasi yang berjalan terus-menerus tanpa
 * dipicu (FR-032). Gerakan tanpa henti melelahkan dibaca, dan pada halaman
 * yang dimaksudkan untuk dikunjungi bertahun-tahun, ia jadi kebisingan.
 *
 * Pengecualian: penanda menunggu. Kerangka muat yang berdenyut dan pemintal
 * pada tombol yang sedang sibuk memang bergerak selama proses berlangsung —
 * keduanya dipicu keadaan menunggu, bukan oleh diamnya halaman. Keduanya
 * dikenali dari penanda yang memang sudah dipakai antarmuka: kelas denyut,
 * dan leluhur ber-aria-busy.
 */
const PAGES = ["/", "/ui-kit"];

for (const path of PAGES) {
  test(`${path} tidak menjalankan animasi saat diam`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    // Memberi waktu animasi kemunculan selesai.
    await page.waitForTimeout(1200);

    const running = await page.evaluate(() => {
      return document
        .getAnimations()
        .filter((a) => a.playState === "running")
        .map((a) => {
          const target = (a.effect as KeyframeEffect | null)?.target as
            | HTMLElement
            | null;
          const cls = (target?.className ?? "").toString();
          return {
            tag: target?.tagName.toLowerCase() ?? "?",
            cls: cls.slice(0, 50),
            isWaitingIndicator:
              cls.includes("animate-pulse") ||
              Boolean(target?.closest('[aria-busy="true"]')),
          };
        })
        .filter((a) => !a.isWaitingIndicator);
    });

    expect(
      running,
      `animasi masih berjalan saat halaman diam:\n` +
        running.map((a) => `  ${a.tag}.${a.cls}`).join("\n"),
    ).toEqual([]);
  });
}
