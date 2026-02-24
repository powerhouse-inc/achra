import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
    await page.waitForLoadState('networkidle');

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('Operator')).toHaveCount(4);
    await expect(page.getByText('Choose the operator that will manage your subscription. Your selected operator will handle day-to-day service administration, including billing adjustments and usage limit changes. Click "Configure Services" to proceed with your preferred operator.')).toHaveCount(1);
});

test('should load the list of operators', async ({ page }) => {
    await expect(page.getByText('Powerhouse')).toHaveCount(2);
    await expect(page.getByText('Powerhouse is a team bringing a decentralized operations toolkit for open organizations')).toBeVisible();

    await expect(page.getByText('Last Active')).toBeVisible();
    await expect(page.getByText('FEB 2026')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Active')).toHaveCount(2);
    await expect(page.getByText('Team Size')).toBeVisible();
    await expect(page.getByText('16 contributors')).toBeVisible();
    await expect(page.getByText('Configure Services')).toHaveCount(3);
});
