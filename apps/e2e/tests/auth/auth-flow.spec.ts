import { expect, test } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.describe.configure({ mode: "serial" });

  test("should show login page when not authenticated", async ({ page }) => {
    await page.goto("/login");

    // Check that login form is visible
    const loginForm = page.locator("form");
    await expect(loginForm).toBeVisible();

    // Check for email and password fields
    const emailField = page.locator('input[type="email"]');
    const passwordField = page.locator('input[type="password"]');

    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
  });

  test("should show signup page", async ({ page }) => {
    await page.goto("/signup");

    // Check that signup form is visible
    const signupForm = page.locator("form");
    await expect(signupForm).toBeVisible();
  });

  test("should redirect to login when accessing protected route", async ({ page }) => {
    // Try to access a protected route (adjust URL based on your app)
    await page.goto("/dashboard");

    // Should redirect to login
    await page.waitForURL("**/login**");
    expect(page.url()).toContain("login");
  });

  // Add more auth tests as needed
  test.skip(
    !process.env.ENABLE_AUTH_TESTS,
    "should successfully login with valid credentials",
    async ({ page }) => {
      // Skip by default - enable when you have test credentials
      const testEmail = process.env.TEST_USER_EMAIL;
      const testPassword = process.env.TEST_USER_PASSWORD;

      if (!(testEmail && testPassword)) {
        test.skip(true, "Test credentials not provided");
      }

      await page.goto("/login");

      await page.fill('input[type="email"]', testEmail);
      await page.fill('input[type="password"]', testPassword);

      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Should redirect to dashboard or home
      await page.waitForURL("**/dashboard**");
      expect(page.url()).toContain("dashboard");
    }
  );
});
