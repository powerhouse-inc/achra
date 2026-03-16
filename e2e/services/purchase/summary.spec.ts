import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
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
