import { defineConfig, devices } from '@playwright/test'

const isCI = Boolean(process.env.CI)
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: 1,
  reporter: isCI
    ? [['list'], ['blob'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
          ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
          : undefined,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          env: { ...process.env, MOZ_DISABLE_CONTENT_SANDBOX: '1' },
          firefoxUserPrefs: {
            'gfx.webrender.force-disabled': true,
            'layers.acceleration.disabled': true,
          },
        },
      },
    },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
