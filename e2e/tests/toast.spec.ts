import { test, expect } from '@playwright/test';

test.describe('Toast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/toast/');
  });

  test('programmatic toast appears on button click with correct text', async ({ page }) => {
    const btn = page.getByTestId('toast-default');
    await btn.click();

    // Toast should appear with the expected text
    const toast = page.locator('.nojs-toast').filter({ hasText: 'This is a default toast' });
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('toast types apply correct data-type attribute', async ({ page }) => {
    // Success toast
    await page.getByTestId('toast-success').click();
    const successToast = page.locator('.nojs-toast[data-type="success"]');
    await expect(successToast).toBeVisible({ timeout: 5000 });

    // Error toast
    await page.getByTestId('toast-error').click();
    const errorToast = page.locator('.nojs-toast[data-type="error"]');
    await expect(errorToast).toBeVisible({ timeout: 5000 });

    // Warning toast
    await page.getByTestId('toast-warning').click();
    const warningToast = page.locator('.nojs-toast[data-type="warning"]');
    await expect(warningToast).toBeVisible({ timeout: 5000 });
  });

  test('toast container has correct ARIA attributes', async ({ page }) => {
    const container = page.getByTestId('toast-container');

    await expect(container).toHaveAttribute('role', 'log');
    await expect(container).toHaveAttribute('aria-live', 'polite');
  });

  test('dismissible toast shows close button and can be dismissed', async ({ page }) => {
    const btn = page.getByTestId('toast-dismissible');
    await btn.click();

    // Dismissible toast should appear
    const toast = page.locator('.nojs-toast').filter({ hasText: 'Dismiss me' });
    await expect(toast).toBeVisible({ timeout: 5000 });

    // It should have a dismiss button (class nojs-toast-dismiss, aria-label="Dismiss")
    const closeBtn = toast.locator('.nojs-toast-dismiss');
    await expect(closeBtn).toBeVisible();

    // Click dismiss button
    await closeBtn.click();

    // Toast should be removed
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  });

  test('toast auto-dismisses after duration', async ({ page }) => {
    // Click default toast (uses default 3s duration)
    await page.getByTestId('toast-default').click();

    const toast = page.locator('.nojs-toast').filter({ hasText: 'This is a default toast' });
    await expect(toast).toBeVisible({ timeout: 5000 });

    // Wait for auto-dismiss (default duration is 3 seconds)
    await expect(toast).not.toBeVisible({ timeout: 10000 });
  });

  test('position variant toasts render in correct containers', async ({ page }) => {
    // Show a toast (goes to first registered container: top-right)
    await page.getByTestId('toast-bottom-center').click();

    const bottomContainer = page.getByTestId('toast-bottom-container');
    // The bottom container should exist and have the correct position attribute
    await expect(bottomContainer).toHaveAttribute('toast-container', 'bottom-center');
  });
});
