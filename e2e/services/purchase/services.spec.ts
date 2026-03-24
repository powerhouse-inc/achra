import { test, expect } from '@playwright/test';

const UUID = '098a7cad-b66b-404a-b2c8-933d69b808cd';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Select an operator' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
});

test('should contain the billing toggle', async ({ page }) => {
    await expect(page.getByRole('radio', { name: 'Quarterly' }).first()).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Annual' }).first()).toBeVisible();
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
    await expect(page.getByRole('radiogroup').getByText('Essentials')).toBeVisible();
    await expect(page.getByRole('radiogroup').getByText('Starter')).toBeVisible();
    await expect(page.getByRole('radiogroup').getByText('Standard')).toBeVisible();
});

test('should contain the continue button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Continue' }).last()).toBeVisible();
});

test('should update grand total when selecting Starter tier', async ({ page }) => {
    await page.getByRole('radiogroup').getByText('Starter').click();
    await page.waitForTimeout(500);
    await expect(page.getByText('$750/mo').last()).toBeVisible();
});

test('should show annual discount when switching to Annual billing', async ({ page }) => {
    await page.getByRole('radiogroup').getByText('Starter').click();
    await page.waitForTimeout(500);
    await page.getByRole('radio', { name: 'Annual' }).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText('$713/mo').last()).toBeVisible();
});
