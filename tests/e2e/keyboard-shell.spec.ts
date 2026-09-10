import { test } from "@playwright/test";
import { expectKeyboardNavigable } from "./helpers/keyboard";

test("landing page dapat ditelusuri sepenuhnya dengan papan ketik", async ({ page }) => {
  await expectKeyboardNavigable(page, "/", { minControls: 4 });
});

test("halaman peraga dapat ditelusuri sepenuhnya dengan papan ketik", async ({ page }) => {
  await expectKeyboardNavigable(page, "/ui-kit", { minControls: 8 });
});
