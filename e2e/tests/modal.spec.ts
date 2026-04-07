import { test, expect } from '@playwright/test';

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/modal/');
  });

  test('basic modal opens via button click and closes via close button', async ({ page }) => {
    const openBtn = page.getByTestId('open-basic');
    const modal = page.getByTestId('basic-modal');
    const closeBtn = page.getByTestId('close-basic');

    await expect(modal).not.toBeVisible();
    await openBtn.click();
    await expect(modal).toBeVisible();
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('modal has correct ARIA attributes', async ({ page }) => {
    const openBtn = page.getByTestId('open-basic');
    const modal = page.getByTestId('basic-modal');

    await openBtn.click();
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('no-escape modal: Escape does NOT close it, button close works', async ({ page }) => {
    const openBtn = page.getByTestId('open-no-escape');
    const modal = page.getByTestId('no-escape-modal');
    const closeBtn = page.getByTestId('close-no-escape');

    await openBtn.click();
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).toBeVisible();

    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('nested modals: open outer, then inner, close inner leaves outer open', async ({ page }) => {
    const openOuter = page.getByTestId('open-outer');
    const outerModal = page.getByTestId('outer-modal');
    const openInner = page.getByTestId('open-inner');
    const innerModal = page.getByTestId('inner-modal');
    const closeInner = page.getByTestId('close-inner');

    await openOuter.click();
    await expect(outerModal).toBeVisible();

    await openInner.click();
    await expect(innerModal).toBeVisible();

    await closeInner.click();
    await expect(innerModal).not.toBeVisible();
    await expect(outerModal).toBeVisible();
  });

  test('no-backdrop modal opens without backdrop element', async ({ page }) => {
    const openBtn = page.getByTestId('open-no-backdrop');
    const modal = page.getByTestId('no-backdrop-modal');

    await openBtn.click();
    await expect(modal).toBeVisible();

    const backdrop = page.locator('.nojs-modal-backdrop');
    await expect(backdrop).toHaveCount(0);
  });
});
