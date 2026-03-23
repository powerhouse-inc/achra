import { test, expect } from '@playwright/test';

const UUID = 'bb1d3128-9695-4bfd-93d1-9e980fa14de2';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Select an operator' }).click();
    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('Operator').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Choose the operator that will manage your subscription. Your selected operator will handle day-to-day service administration, including billing adjustments and usage limit changes. Click "Configure Services" to proceed with your preferred operator.')).toBeVisible();
});

test('should load the list of operators', async ({ page }) => {
    await expect(page.getByText('Powerhouse').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Powerhouse is a team bringing a decentralized operations toolkit for open organizations')).toBeVisible();

    await expect(page.getByText('Last Active')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Active').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Team Size')).toBeVisible();
    await expect(page.getByText(/contributors/).count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByRole('button', { name: /Configure Services/i })).toBeVisible();
});
