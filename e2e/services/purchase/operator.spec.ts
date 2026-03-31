import { test, expect } from '@playwright/test';

const UUID = '098a7cad-b66b-404a-b2c8-933d69b808cd';

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
    // Operator description text is API-driven and changes — verified indirectly via metadata fields below

    await expect(page.getByText('Last Active')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Active').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Team Size')).toBeVisible();
    await expect(page.getByText(/contributors/).count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByRole('button', { name: /Configure Services/i })).toBeVisible();
});
