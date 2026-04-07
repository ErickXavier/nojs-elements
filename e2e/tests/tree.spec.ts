import { test, expect } from '@playwright/test';

test.describe('Tree', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/tree/');
  });

  test('tree has role="tree" and branches have role="treeitem"', async ({ page }) => {
    const basicTree = page.getByTestId('basic-tree');
    await expect(basicTree).toHaveRole('tree');

    // The [branch] span itself gets role="treeitem", not its parent <li>
    const branchDocuments = page.getByTestId('branch-documents');
    await expect(branchDocuments).toHaveRole('treeitem');
  });

  test('collapsed branch hides subtree content', async ({ page }) => {
    const branchWork = page.getByTestId('branch-work');
    await expect(branchWork).toHaveAttribute('aria-expanded', 'false');

    // Subtree is a sibling <ul> next to the <span branch>
    const subtree = branchWork.locator('~ [subtree]');
    await expect(subtree).toHaveAttribute('aria-hidden', 'true');
  });

  test('clicking branch toggles expand/collapse', async ({ page }) => {
    const branchDownloads = page.getByTestId('branch-downloads');
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'false');

    await branchDownloads.click();
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'true');

    const subtree = branchDownloads.locator('~ [subtree]');
    await expect(subtree).toHaveAttribute('aria-hidden', 'false');

    await branchDownloads.click();
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'false');
    await expect(subtree).toHaveAttribute('aria-hidden', 'true');
  });

  test('branch="expanded" starts expanded', async ({ page }) => {
    const branchDocuments = page.getByTestId('branch-documents');
    await expect(branchDocuments).toHaveAttribute('aria-expanded', 'true');

    const subtree = branchDocuments.locator('~ [subtree]');
    await expect(subtree).toHaveAttribute('aria-hidden', 'false');
  });

  test('keyboard: Enter/Space toggles branch, ArrowRight expands, ArrowLeft collapses', async ({ page }) => {
    const branchDownloads = page.getByTestId('branch-downloads');
    await branchDownloads.focus();

    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'false');

    await page.keyboard.press('Enter');
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Space');
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('ArrowLeft');
    await expect(branchDownloads).toHaveAttribute('aria-expanded', 'false');
  });

  test('deep nesting renders correctly at 4 levels', async ({ page }) => {
    const deepTree = page.getByTestId('deep-tree');
    await expect(deepTree).toBeVisible();

    const level1 = deepTree.locator('[branch]').first();
    await expect(level1).toHaveAttribute('aria-expanded', 'true');

    const allBranches = deepTree.locator('[branch]');
    await expect(allBranches).toHaveCount(4);

    const level4Branch = deepTree.locator('[branch]').nth(3);
    await expect(level4Branch).toBeVisible();

    await level4Branch.click();
    await expect(level4Branch).toHaveAttribute('aria-expanded', 'true');

    await expect(deepTree.getByText('Leaf Node A')).toBeVisible();
    await expect(deepTree.getByText('Leaf Node B')).toBeVisible();
  });
});
