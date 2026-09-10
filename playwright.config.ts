import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
// Harus "localhost", bukan "127.0.0.1": Next dev server memperlakukan
// 127.0.0.1 sebagai origin asing dan memblokir aset client-nya, sehingga
// React tidak pernah ter-hydrate dan seluruh interaksi mati.
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
