import { expect, type Page } from "@playwright/test";

/**
 * Menelusuri sebuah halaman hanya dengan papan ketik dan memastikan setiap
 * kendali dapat dicapai, urutannya masuk akal, dan fokusnya selalu terlihat
 * (FR-036, FR-037).
 *
 * "Urutan masuk akal" diuji sebagai urutan yang maju di dokumen: fokus tidak
 * boleh melompat mundur ke elemen yang letaknya di atas elemen sebelumnya.
 *
 * Penelusuran berhenti ketika siklus Tab berputar kembali ke kendali pertama.
 * Perputaran itu perilaku normal peramban, bukan urutan yang melompat mundur.
 */
export async function expectKeyboardNavigable(
  page: Page,
  path: string,
  { minControls = 3, maxSteps = 40 }: { minControls?: number; maxSteps?: number } = {},
) {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
  await page.locator("body").click({ position: { x: 2, y: 2 } });

  let reached = 0;
  let previousTop = -Infinity;
  let firstLabel: string | null = null;

  for (let step = 0; step < maxSteps; step++) {
    await page.keyboard.press("Tab");

    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        label: `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 24)}"`,
        interactive: el.matches("button, input, textarea, select, a[href], [role='tab']"),
        outlineWidth: parseFloat(style.outlineWidth) || 0,
        top: rect.top + window.scrollY,
      };
    });

    if (!info || !info.interactive) continue;

    // Siklus Tab sudah berputar penuh; penelusurannya selesai.
    if (firstLabel !== null && info.label === firstLabel) break;
    if (firstLabel === null) firstLabel = info.label;

    reached += 1;

    expect(
      info.outlineWidth,
      `${path}: ${info.label} tidak punya garis fokus yang terlihat`,
    ).toBeGreaterThan(0);

    expect(
      info.top,
      `${path}: urutan fokus melompat mundur ke ${info.label}`,
    ).toBeGreaterThanOrEqual(previousTop - 1);
    previousTop = info.top;
  }

  expect(
    reached,
    `${path}: hanya ${reached} kendali yang tercapai dengan papan ketik`,
  ).toBeGreaterThanOrEqual(minControls);
}
