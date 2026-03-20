import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/712241c4-33ce-40de-94eb-f029b44f4a2d/purchase`);
    await page.waitForLoadState('networkidle');

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Continue' }).last().click();
    await page.waitForTimeout(1500);
});

test('should load the operator and service info', async ({ page }) => {
    await expect(page.getByText('Powerhouse').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByRole('heading', { name: 'Operational Hub' })).toBeVisible();
    await expect(page.getByText('RESOURCE TEMPLATE')).toBeVisible();
});

test('should load the configuration values', async ({ page }) => {
    await expect(page.getByText('SNO Function')).toBeVisible();
    await expect(page.getByText('Legal Entity')).toBeVisible();
    await expect(page.getByText('Swiss Association')).toBeVisible();
    await expect(page.getByText('Team', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Remote')).toBeVisible();
    await expect(page.getByText('Anonymity')).toBeVisible();
});

test('should load the pricing summary', async ({ page }) => {
    await expect(page.getByText('PRICING SUMMARY').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Entity & Compliance Foundation')).toBeVisible();
    await expect(page.getByText('$3,000')).toBeVisible();
});

test('should load the submission form', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Team Name/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Submit Request/i })).toBeVisible();
});

test('should show validation errors when submitting empty required fields', async ({ page }) => {
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Team name must be at least 2 characters.')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
});

test.skip('should show error and stay on summary when submitting duplicate data', async ({ page }) => {
    // TODO: Backend behavior changed — duplicate submissions now advance to step=confirmation
    // instead of showing an error on step=summary. Re-evaluate expected behavior with PM.
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill('tester');
    await page.getByRole('textbox', { name: /Team Name/i }).fill('test team');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForTimeout(4000);

    // Should not advance to confirmation step
    await expect(page).toHaveURL(/step=summary/);
    // Should show an error message
    await expect(page.getByText(/error/i).first()).toBeVisible();
});
