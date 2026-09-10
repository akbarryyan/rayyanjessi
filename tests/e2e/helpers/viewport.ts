import { expect, type Page } from "@playwright/test";

/** Lebar terkecil yang wajib didukung (FR-033). */
export const VIEWPORTS = {
  mobile: { width: 320, height: 640 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 900 },
} as const;

export type ViewportName = keyof typeof VIEWPORTS;

/**
 * Memastikan sebuah halaman tidak menghasilkan scroll mendatar pada seluruh
 * lebar yang wajib didukung (FR-033, FR-034).
 *
 * Ketika ada yang melebar, elemen penyebabnya ikut dilaporkan — tanpa itu,
 * kegagalannya hanya berupa dua angka yang tidak menunjukkan apa pun.
 */
export async function expectNoHorizontalScroll(page: Page, path: string) {
  for (const [name, size] of Object.entries(VIEWPORTS)) {
    await page.setViewportSize(size);
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const offenders: string[] = [];
      if (doc.scrollWidth > doc.clientWidth) {
        for (const el of Array.from(document.querySelectorAll("*"))) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            const tag = el.tagName.toLowerCase();
            const cls = (el.className || "").toString().slice(0, 60);
            offenders.push(`${tag}.${cls} (kanan ${Math.round(r.right)})`);
          }
        }
      }
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        offenders: offenders.slice(0, 5),
      };
    });

    expect(
      overflow.scrollWidth,
      `${path} melebar di ${name} (${size.width}px): ` +
        `${overflow.scrollWidth} > ${overflow.clientWidth}\n` +
        overflow.offenders.map((o) => `  - ${o}`).join("\n"),
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);
  }
}

/** Memastikan sasaran sentuh cukup besar di ponsel (FR-035). */
export async function expectComfortableTouchTargets(page: Page, path: string) {
  await page.setViewportSize(VIEWPORTS.mobile);
  await page.goto(path);

  const tooSmall = await page.evaluate(() => {
    const MIN = 44;
    const small: string[] = [];
    const controls = document.querySelectorAll(
      "button:not([disabled]), a[href], [role='tab']",
    );
    for (const el of Array.from(controls)) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue; // tersembunyi
      if (r.height < MIN) {
        small.push(
          `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 24)}" tinggi ${Math.round(r.height)}px`,
        );
      }
    }
    return small;
  });

  expect(tooSmall, tooSmall.join("\n")).toEqual([]);
}
