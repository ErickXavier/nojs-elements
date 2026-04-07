import { test, expect } from '@playwright/test';

test.describe('Skeleton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/skeleton/');
  });

  test('skeleton is visible when loading is true', async ({ page }) => {
    const heading = page.getByTestId('text-heading');
    await expect(heading).toBeVisible();

    // Should have the nojs-skeleton class applied
    await expect(heading).toHaveClass(/\bnojs-skeleton\b/);
  });

  test('toggle button flips loading state and skeleton disappears', async ({ page }) => {
    const heading = page.getByTestId('text-heading');
    const paragraph = page.getByTestId('text-paragraph');
    const toggleBtn = page.getByTestId('toggle-loading');

    // Initially skeleton is active
    await expect(heading).toHaveClass(/\bnojs-skeleton\b/);
    await expect(paragraph).toHaveClass(/\bnojs-skeleton\b/);

    // Click toggle to set loading = false
    await toggleBtn.click();

    // After deactivation, nojs-skeleton class is removed (nojs-skeleton-fade may be present briefly)
    await expect(heading).not.toHaveClass(/\bnojs-skeleton\b/, { timeout: 3000 });
    await expect(paragraph).not.toHaveClass(/\bnojs-skeleton\b/, { timeout: 3000 });

    // Click again to re-enable
    await toggleBtn.click();
    await expect(heading).toHaveClass(/\bnojs-skeleton\b/);
  });

  test('multi-line skeleton generates correct number of skeleton-line elements', async ({ page }) => {
    const multiline = page.getByTestId('multiline-skeleton');
    await expect(multiline).toBeVisible();

    const lines = multiline.locator('.nojs-skeleton-line');
    await expect(lines).toHaveCount(4);
  });

  test('circle skeleton has the correct class', async ({ page }) => {
    const circle = page.getByTestId('circle-skeleton');
    await expect(circle).toBeVisible();
    await expect(circle).toHaveClass(/nojs-skeleton-circle/);
  });

  test('rect skeleton is visible', async ({ page }) => {
    const rect = page.getByTestId('rect-skeleton');
    await expect(rect).toBeVisible();
    await expect(rect).toHaveClass(/\bnojs-skeleton\b/);
  });

  test('hidden content reveals when skeleton is removed', async ({ page }) => {
    const heading = page.getByTestId('text-heading');
    const toggleBtn = page.getByTestId('toggle-loading');

    // While loading, styled as skeleton
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/\bnojs-skeleton\b/);

    // Toggle off loading
    await toggleBtn.click();

    // Content should now be fully visible without skeleton styling
    await expect(heading).toBeVisible();
    await expect(heading).not.toHaveClass(/\bnojs-skeleton\b/, { timeout: 3000 });
    await expect(heading).toHaveText('Welcome to NoJS Elements');
  });
});
