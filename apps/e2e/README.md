# E2E Tests for Raypx

End-to-end tests using Playwright for the Raypx application suite.

## Quick Start

```bash
# Install dependencies (from root)
pnpm install

# Install Playwright browsers
pnpm --filter @raypx/e2e run install-browsers

# Run tests
pnpm test:e2e

# Run tests with UI
pnpm test:e2e:ui

# Run tests in headed mode (visible browser)
pnpm test:e2e:headed

# View test report
pnpm test:e2e:report
```

## Configuration

### Environment Variables

Create a `.env.local` file in this directory to configure test settings:

```bash
# Feature flags - enable/disable specific test suites
ENABLE_AUTH_TESTS=true
ENABLE_AI_TESTS=false
ENABLE_BILLING_TESTS=false

# Test environment
PLAYWRIGHT_BASE_URL=http://localhost:3000
PLAYWRIGHT_SERVER_COMMAND=pnpm dev --filter @raypx/web

# Test credentials (for auth tests)
TEST_USER_EMAIL=test@raypx.com  # Use your configured domain
TEST_USER_PASSWORD=testpassword123
```

### Feature Flags

Tests are organized with feature flags to allow selective testing:

- `ENABLE_AUTH_TESTS`: Authentication flow tests
- `ENABLE_AI_TESTS`: AI functionality tests
- `ENABLE_BILLING_TESTS`: Payment and billing tests

## Test Structure

```
tests/
├── auth/                 # Authentication tests
│   └── auth-flow.spec.ts
├── utils/                # Test utilities and helpers
│   └── test-helpers.ts
└── healthcheck.spec.ts   # Basic application health tests
```

## Writing Tests

### Basic Test Structure

```typescript
import { expect, test } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    // Test implementation
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### Using Test Helpers

```typescript
import { TestHelpers } from './utils/test-helpers';

test('authenticated test', async ({ page }) => {
  const helpers = new TestHelpers(page);

  // Login with test user
  await helpers.loginWithTestUser();

  // Your test logic
  await page.goto('/dashboard');
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
});
```

### Feature-Specific Tests

Use the `test.skip()` pattern for conditional tests:

```typescript
test('AI feature test', async ({ page }) => {
  test.skip(!process.env.ENABLE_AI_TESTS, 'AI tests are disabled');

  // AI-specific test logic
});
```

## Browser Support

Tests run on multiple browsers by default:

- Chromium (Desktop)
- Firefox (Desktop)
- WebKit/Safari (Desktop)
- Mobile Chrome
- Mobile Safari

Configure browsers in `playwright.config.ts`.

## CI/CD Integration

The configuration includes CI-specific settings:

- Retry failed tests 2 times on CI
- Single worker on CI for stability
- GitHub Actions reporter
- Automatic server startup

## Debugging

### Debug Mode

```bash
# Run tests in debug mode
pnpm --filter @raypx/e2e run test:debug
```

### Screenshots and Traces

- Screenshots are automatically taken on test failures
- Traces are recorded on first retry
- Reports include visual debugging information

### Local Development

For local development, you can:

1. Start the dev server manually: `pnpm dev`
2. Run tests against running server: `pnpm test:e2e`
3. Use headed mode to see browser: `pnpm test:e2e:headed`

## Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Wait for elements** instead of using fixed timeouts
3. **Group related tests** in describe blocks
4. **Use feature flags** for conditional testing
5. **Keep tests isolated** - each test should be independent
6. **Use meaningful test names** that describe the expected behavior

## Troubleshooting

### Common Issues

**Tests failing locally but passing in CI:**
- Check environment variables
- Ensure consistent data state
- Verify browser versions

**Slow test execution:**
- Reduce parallel workers
- Optimize test selectors
- Remove unnecessary waits

**Authentication issues:**
- Verify test credentials
- Check auth flow implementation
- Review session management