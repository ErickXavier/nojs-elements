import { test, expect } from '@playwright/test';

test.describe('Split', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/split/');
  });

  test('horizontal split renders two panes side by side', async ({ page }) => {
    const split = page.getByTestId('h-split');
    await expect(split).toBeVisible();

    const left = page.getByTestId('h-pane-left');
    const right = page.getByTestId('h-pane-right');
    await expect(left).toBeVisible();
    await expect(right).toBeVisible();

    const leftBox = await left.boundingBox();
    const rightBox = await right.boundingBox();
    expect(leftBox).toBeTruthy();
    expect(rightBox).toBeTruthy();

    // Left pane should be to the left of the right pane
    expect(leftBox!.x).toBeLessThan(rightBox!.x);
    // Both should be at roughly the same vertical position (side by side)
    expect(Math.abs(leftBox!.y - rightBox!.y)).toBeLessThan(5);
  });

  test('gutter element exists between panes with role="separator"', async ({ page }) => {
    const split = page.getByTestId('h-split');
    const gutter = split.locator('[role="separator"]');
    await expect(gutter.first()).toBeVisible();
  });

  test('vertical split renders panes stacked', async ({ page }) => {
    const split = page.getByTestId('v-split');
    await expect(split).toBeVisible();

    const top = page.getByTestId('v-pane-top');
    const bottom = page.getByTestId('v-pane-bottom');
    await expect(top).toBeVisible();
    await expect(bottom).toBeVisible();

    const topBox = await top.boundingBox();
    const bottomBox = await bottom.boundingBox();
    expect(topBox).toBeTruthy();
    expect(bottomBox).toBeTruthy();

    // Top pane should be above the bottom pane
    expect(topBox!.y).toBeLessThan(bottomBox!.y);
    // Both should be at roughly the same horizontal position (stacked)
    expect(Math.abs(topBox!.x - bottomBox!.x)).toBeLessThan(5);
  });

  test('three panes render correctly with gutter between each pair', async ({ page }) => {
    const split = page.getByTestId('three-split');
    await expect(split).toBeVisible();

    // Should have 3 panes
    const panes = split.locator('[pane]');
    await expect(panes).toHaveCount(3);

    // Should have 2 gutters (between pane 1-2 and pane 2-3)
    const gutters = split.locator('[role="separator"]');
    await expect(gutters).toHaveCount(2);
  });

  test('panes have correct initial sizes', async ({ page }) => {
    const split = page.getByTestId('h-split');
    const splitBox = await split.boundingBox();
    expect(splitBox).toBeTruthy();

    const left = page.getByTestId('h-pane-left');
    const right = page.getByTestId('h-pane-right');
    const leftBox = await left.boundingBox();
    const rightBox = await right.boundingBox();
    expect(leftBox).toBeTruthy();
    expect(rightBox).toBeTruthy();

    // Left pane should be roughly 30% of the split width (allowing for gutter)
    const totalWidth = splitBox!.width;
    const leftRatio = leftBox!.width / totalWidth;
    expect(leftRatio).toBeGreaterThan(0.2);
    expect(leftRatio).toBeLessThan(0.4);

    // Right pane should be roughly 70%
    const rightRatio = rightBox!.width / totalWidth;
    expect(rightRatio).toBeGreaterThan(0.55);
    expect(rightRatio).toBeLessThan(0.8);
  });

  test('ARIA: gutter has aria-orientation and tabindex="0"', async ({ page }) => {
    const split = page.getByTestId('h-split');
    const gutter = split.locator('[role="separator"]').first();
    await expect(gutter).toBeVisible();
    await expect(gutter).toHaveAttribute('aria-orientation');
    await expect(gutter).toHaveAttribute('tabindex', '0');
  });
});
