import { test, expect } from '@playwright/test';

test.describe('Tooltip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/tooltip/');
  });

  test('tooltip appears on hover with correct text', async ({ page }) => {
    const trigger = page.getByTestId('tooltip-top');
    await trigger.hover();
    const tooltip = page.locator('.nojs-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('Tooltip on top');
  });

  test('tooltip positions: each direction shows tooltip', async ({ page }) => {
    // Top
    await page.getByTestId('tooltip-top').hover();
    await expect(page.locator('.nojs-tooltip')).toBeVisible();
    await expect(page.locator('.nojs-tooltip')).toHaveText('Tooltip on top');
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // Bottom
    await page.getByTestId('tooltip-bottom').hover();
    await expect(page.locator('.nojs-tooltip')).toBeVisible();
    await expect(page.locator('.nojs-tooltip')).toHaveText('Tooltip on bottom');
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // Left
    await page.getByTestId('tooltip-left').hover();
    await expect(page.locator('.nojs-tooltip')).toBeVisible();
    await expect(page.locator('.nojs-tooltip')).toHaveText('Tooltip on left');
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // Right
    await page.getByTestId('tooltip-right').hover();
    await expect(page.locator('.nojs-tooltip')).toBeVisible();
    await expect(page.locator('.nojs-tooltip')).toHaveText('Tooltip on right');
  });

  test('popover opens on trigger click', async ({ page }) => {
    const trigger = page.getByTestId('popover-trigger');
    const popover = page.getByTestId('popover-content');

    await expect(popover).not.toBeVisible();
    await trigger.click();
    await expect(popover).toBeVisible();
  });

  test('popover closes on dismiss click', async ({ page }) => {
    const trigger = page.getByTestId('popover-trigger');
    const popover = page.getByTestId('popover-content');
    const dismiss = page.getByTestId('popover-dismiss');

    await trigger.click();
    await expect(popover).toBeVisible();
    await dismiss.click();
    await expect(popover).not.toBeVisible();
  });

  test('popover has ARIA attributes', async ({ page }) => {
    const trigger = page.getByTestId('popover-trigger');

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const popover = page.getByTestId('popover-content');
    await expect(popover).toHaveAttribute('role', 'dialog');
  });
});
