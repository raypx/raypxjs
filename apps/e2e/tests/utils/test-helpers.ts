import type { Page } from "@playwright/test";
import { EMAIL_ADDRESSES } from "@raypx/shared";

/**
 * Common test utilities and helpers
 */

export class TestHelpers {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for the page to fully load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      // Adjust this logic based on your auth implementation
      const authToken = await this.page.evaluate(
        () =>
          localStorage.getItem("auth-token") ||
          sessionStorage.getItem("auth-token") ||
          document.cookie.includes("auth")
      );
      return !!authToken;
    } catch {
      return false;
    }
  }

  /**
   * Login with test credentials
   */
  async loginWithTestUser() {
    const testEmail = process.env.TEST_USER_EMAIL;
    const testPassword = process.env.TEST_USER_PASSWORD;

    if (!(testEmail && testPassword)) {
      throw new Error("Test credentials not configured");
    }

    await this.page.goto("/login");
    await this.page.fill('input[type="email"]', testEmail);
    await this.page.fill('input[type="password"]', testPassword);
    await this.page.click('button[type="submit"]');

    // Wait for redirect after login
    await this.page.waitForURL(/\/(dashboard|home)/);
  }

  /**
   * Logout user
   */
  async logout() {
    // Adjust selector based on your app
    const logoutButton = this.page.locator('[data-testid="logout-button"]');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }

    // Clear any stored auth data
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Take a screenshot with a descriptive name
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /**
   * Check for console errors
   */
  checkForConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];

    return new Promise((resolve) => {
      this.page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
        resolve(errors);
      });
    });
  }

  /**
   * Wait for an element to be visible with custom timeout
   */
  async waitForElement(selector: string, timeout = 10_000) {
    await this.page.locator(selector).waitFor({
      state: "visible",
      timeout,
    });
  }

  /**
   * Fill form with data
   */
  async fillForm(formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      await this.page.fill(`[name="${field}"]`, value);
    }
  }
}

/**
 * Create test user data
 */
export function createTestUser() {
  const timestamp = Date.now();
  return {
    email: `test-${timestamp}@${EMAIL_ADDRESSES.TEST.split("@")[1]}`,
    password: "TestPassword123!",
    name: `Test User ${timestamp}`,
  };
}

/**
 * Generate random test data
 */
export function generateTestData() {
  return {
    randomString: () => Math.random().toString(36).substring(7),
    randomEmail: () => `test-${Date.now()}@example.com`,
    randomPassword: () => `${Math.random().toString(36).substring(7)}A1!`,
  };
}
