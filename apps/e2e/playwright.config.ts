import { defineConfig, devices } from "@playwright/test";
import { config as dotenvConfig } from "dotenv";

// Load environment variables
dotenvConfig();
dotenvConfig({ path: ".env.local" });

// Feature flags for conditional testing
const enableAuthTests = (process.env.ENABLE_AUTH_TESTS ?? "true") === "true";
const enableAITests = process.env.ENABLE_AI_TESTS === "true";
const enableBillingTests = process.env.ENABLE_BILLING_TESTS === "true";

const testIgnore: string[] = [];

if (!enableAuthTests) {
  console.log(
    "Auth tests are disabled. To enable them, set ENABLE_AUTH_TESTS=true.",
    `Current value: "${process.env.ENABLE_AUTH_TESTS}"`
  );
  testIgnore.push("**/auth*.spec.ts");
}

if (!enableAITests) {
  console.log(
    "AI tests are disabled. To enable them, set ENABLE_AI_TESTS=true.",
    `Current value: "${process.env.ENABLE_AI_TESTS}"`
  );
  testIgnore.push("**/ai*.spec.ts");
}

if (!enableBillingTests) {
  console.log(
    "Billing tests are disabled. To enable them, set ENABLE_BILLING_TESTS=true.",
    `Current value: "${process.env.ENABLE_BILLING_TESTS}"`
  );
  testIgnore.push("**/billing*.spec.ts");
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"],
    ["github"], // For GitHub Actions
    ["list"], // For console output
  ],
  /* Ignore feature-specific tests based on environment variables */
  testIgnore,
  /* Global timeout for each test */
  timeout: 30 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /* Navigation timeout */
    navigationTimeout: 15 * 1000,

    /* Action timeout */
    actionTimeout: 10 * 1000,
  },

  /* Global expect timeout */
  expect: {
    timeout: 5 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },

    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.PLAYWRIGHT_SERVER_COMMAND
    ? {
        cwd: "../../",
        command: process.env.PLAYWRIGHT_SERVER_COMMAND,
        url: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
        timeout: 120 * 1000,
      }
    : undefined,
});
