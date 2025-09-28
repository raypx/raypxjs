import { expect, test } from "@playwright/test";

test.describe("Application Health Check", () => {
  test("should load the homepage successfully", async ({ page }) => {
    await page.goto("/");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check that the page title is set
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).not.toBe("");

    // Check for common error indicators
    const errorMessages = page.locator("text=error", { timeout: 2000 });
    const count = await errorMessages.count();
    expect(count).toBe(0);
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");

    // Look for navigation elements (adjust selectors based on your app)
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
  });

  test("should respond to API healthcheck endpoint", async ({ request }) => {
    // Skip if no API app
    test.skip(!process.env.ENABLE_API_TESTS, "API tests are disabled");

    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("status");
  });
});
