import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub`);
});

test('should contain all elements', async ({ page }) => {
    await expect(page.getByText('SNO Embryonic Hub')).toBeVisible();
    await expect(page.getByText('Founders')).toBeVisible();
    await expect(page.getByText('SNO Governors')).toBeVisible();

    await expect(page.getByText('Formation & Setup')).toBeVisible();
    await expect(page.getByText('Recurring Services')).toBeVisible();

    await expect(page.getByText('Legal needs analysis')).toHaveCount(1);
    await expect(page.getByText('Entity incorporation')).toHaveCount(1);
    await expect(page.getByText('Payment processor setup')).toHaveCount(1);
    await expect(page.getByText('Contributor on-boarding')).toHaveCount(1);
    await expect(page.getByText('Wind-down planning')).toHaveCount(1);
    await expect(page.getByText('Contracts administration')).toHaveCount(1);
    await expect(page.getByText('Payment processing')).toHaveCount(1);
    await expect(page.getByText('Transparency reporting')).toHaveCount(1);
    await expect(page.getByText('Tax administration & filing')).toHaveCount(1);

    await expect(page.getByText('Accountable OPC')).toHaveCount(2);
    await expect(page.getByText('Powerhouse Genesis OH')).toHaveCount(1);

    await expect(page.getByText('Accountable')).toHaveCount(5);
    await expect(page.getByText('Budgeting')).toHaveCount(3);
    await expect(page.getByText('Forecasting')).toHaveCount(3);
});

test.skip('should contain 1 purchase button', async ({ page }) => {
    await expect(page.getByText('Purchase')).toHaveCount(1);
});