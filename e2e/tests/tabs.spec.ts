import { test, expect } from '@playwright/test';

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/tabs/');
  });

  test('first tab is active by default and first panel is visible', async ({ page }) => {
    const tabs = page.getByTestId('basic-tabs');
    await expect(tabs).toBeVisible();

    const tabOverview = page.getByTestId('tab-overview');
    await expect(tabOverview).toHaveAttribute('aria-selected', 'true');

    const panelOverview = page.getByTestId('panel-overview');
    await expect(panelOverview).toBeVisible();

    const panelDetails = page.getByTestId('panel-details');
    await expect(panelDetails).toBeHidden();

    const panelSettings = page.getByTestId('panel-settings');
    await expect(panelSettings).toBeHidden();
  });

  test('clicking second tab switches panel content', async ({ page }) => {
    const tabDetails = page.getByTestId('tab-details');
    await tabDetails.click();

    await expect(tabDetails).toHaveAttribute('aria-selected', 'true');

    const tabOverview = page.getByTestId('tab-overview');
    await expect(tabOverview).toHaveAttribute('aria-selected', 'false');

    const panelOverview = page.getByTestId('panel-overview');
    await expect(panelOverview).toBeHidden();

    const panelDetails = page.getByTestId('panel-details');
    await expect(panelDetails).toBeVisible();
  });

  test('preselected tabs="1" starts with second tab active', async ({ page }) => {
    const preselected = page.getByTestId('preselected-tabs');
    await expect(preselected).toBeVisible();

    const tabs = preselected.locator('[role="tab"]');
    const firstTab = tabs.nth(0);
    const secondTab = tabs.nth(1);

    await expect(firstTab).toHaveAttribute('aria-selected', 'false');
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');

    const panels = preselected.locator('[role="tabpanel"]');
    const firstPanel = panels.nth(0);
    const secondPanel = panels.nth(1);

    await expect(firstPanel).toBeHidden();
    await expect(secondPanel).toBeVisible();
  });

  test('disabled tab cannot be clicked and has aria-disabled', async ({ page }) => {
    const disabledTab = page.getByTestId('disabled-tab');
    await expect(disabledTab).toHaveAttribute('aria-disabled', 'true');

    await disabledTab.click({ force: true });

    const disabledTabs = page.getByTestId('disabled-tabs');
    const firstTab = disabledTabs.locator('[role="tab"]').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('ARIA: tab has role="tab", panel has role="tabpanel", tablist has role="tablist"', async ({ page }) => {
    const basicTabs = page.getByTestId('basic-tabs');

    const tablist = basicTabs.locator('[role="tablist"]');
    await expect(tablist).toBeVisible();

    const tabOverview = page.getByTestId('tab-overview');
    await expect(tabOverview).toHaveRole('tab');

    const panelOverview = page.getByTestId('panel-overview');
    await expect(panelOverview).toHaveRole('tabpanel');

    const allTabs = basicTabs.locator('[role="tab"]');
    await expect(allTabs).toHaveCount(3);

    const allPanels = basicTabs.locator('[role="tabpanel"]');
    expect(await allPanels.count() + await basicTabs.locator('[role="tabpanel"][hidden]').count()).toBeGreaterThanOrEqual(3);
  });

  test('keyboard: Arrow keys navigate between tabs', async ({ page }) => {
    const tabOverview = page.getByTestId('tab-overview');
    await tabOverview.focus();

    await page.keyboard.press('ArrowRight');
    const tabDetails = page.getByTestId('tab-details');
    await expect(tabDetails).toBeFocused();

    await page.keyboard.press('ArrowRight');
    const tabSettings = page.getByTestId('tab-settings');
    await expect(tabSettings).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(tabDetails).toBeFocused();
  });
});
