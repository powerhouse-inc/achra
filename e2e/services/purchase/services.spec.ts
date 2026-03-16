import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
    await page.waitForLoadState('networkidle');

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
});

test('should contain the billing toggle', async ({ page }) => {
    await expect(page.getByRole('radio', { name: 'Quarterly' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Annual' })).toBeVisible();
});

test('should contain the tier pricing table', async ({ page }) => {
    await expect(page.getByRole('radiogroup').getByText('Essentials')).toBeVisible();
    await expect(page.getByRole('radiogroup').getByText('Starter')).toBeVisible();
    await expect(page.getByRole('radiogroup').getByText('Standard')).toBeVisible();
    await expect(page.getByRole('radiogroup').getByText('Custom').first()).toBeVisible();
});

test('should contain the entity and compliance section', async ({ page }) => {
    await expect(page.getByText('Entity & Compliance Foundation')).toBeVisible();
    await expect(page.getByText('Registered address (Zug)').count()).resolves.toBeGreaterThanOrEqual(1);
});

test('should contain the grand total row', async ({ page }) => {
    await expect(page.getByText('Grand Total (Recurring)')).toBeVisible();
});

test('should contain the continue button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Continue' }).last()).toBeVisible();
});
