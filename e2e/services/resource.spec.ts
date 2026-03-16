import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub`);
});

// NOTE: This resource (sno-embryonic-hub) no longer exists in the application (404 Page not found as of 2026-03-16)
// The test should be updated or removed once the new resource structure is confirmed
test.skip('should contain all elements', async ({ page }) => {
    await expect(page.getByText('SNO Embryonic Hub')).toBeVisible();
    await expect(page.getByText('Founders')).toBeVisible();
    await expect(page.getByText('SNO Governors')).toBeVisible();

    await expect(page.getByText('Formation & Setup')).toBeVisible();
    await expect(page.getByText('Recurring Services')).toBeVisible();

    await expect(page.getByText('Legal needs analysis').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Entity incorporation').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Payment processor setup').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Contributor on-boarding').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Wind-down planning').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Contracts administration').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Payment processing').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Transparency reporting').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Tax administration & filing').count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByText('Accountable OPC').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Powerhouse Genesis OH').count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByText('Accountable').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Budgeting').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Forecasting').count()).resolves.toBeGreaterThanOrEqual(1);
});

test.skip('should contain 1 purchase button', async ({ page }) => {
    await expect(page.getByText('Purchase')).toHaveCount(1);
});