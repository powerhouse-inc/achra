import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);

    await page.getByText('Select Services').click();
});

test('should contain the default selector values in the step', async ({ page }) => {
    await expect(page.getByText('SNO Function')).toBeVisible();
    await expect(page.getByText('Operational Hub')).toHaveCount(3);

    await expect(page.getByText('Legal Entity')).toHaveCount(2);
    await expect(page.getByText('Swiss Association')).toHaveCount(2);

    await expect(page.getByText('Team Structure')).toBeVisible();
    await expect(page.getByText('Remote Team')).toHaveCount(2);

    await expect(page.getByText('Anonymity Level')).toBeVisible();
    await expect(page.getByText('High (Standard)')).toHaveCount(2);
});

test('should contain the selector values in the step', async ({ page }) => {
    await expect(page.getByText('Service Catalog')).toBeVisible();
    await expect(page.getByText('Basic')).toHaveCount(2);
    await expect(page.getByText('$200/mo')).toHaveCount(3);
    await expect(page.getByText('Team')).toHaveCount(6);
    await expect(page.getByText('$300/mo')).toHaveCount(2);
    await expect(page.getByText('Premium')).toBeVisible();
    await expect(page.getByText('$500/mo')).toBeVisible();
    await expect(page.getByText('Enterprise')).toHaveCount(3);
    await expect(page.getByText('Custom')).toHaveCount(4);
});

test('should contain the legal setup in the step', async ({ page }) => {
    await expect(page.getByText('Legal Setup')).toBeVisible();
    await expect(page.getByText('Included')).toHaveCount(2);
    await expect(page.getByText('One-time: $3000')).toBeVisible();
    await expect(page.getByText('Needs Analysis')).toBeVisible();
    await expect(page.getByText('Incorporation Docs')).toHaveCount(2);
    await expect(page.getByText('Expedited')).toBeVisible();
    await expect(page.getByText('Custom')).toHaveCount(4);
    await expect(page.getByText('Total Setup Fee')).toBeVisible();
    await expect(page.getByText('$3000 flat fee (applied to all tiers)')).toBeVisible();
});

test('should contain the recurring operational service in the step', async ({ page }) => {
    await expect(page.getByText('Recurring Operational Service')).toBeVisible();
    await expect(page.getByText('Included')).toHaveCount(2);
    await expect(page.getByText('Contributor Contracting')).toBeVisible();
    await expect(page.getByText('Up to 3')).toBeVisible();
    await expect(page.getByText('Up to 6')).toBeVisible();
    await expect(page.getByText('Up to 10')).toBeVisible();
    await expect(page.getByText('> 10')).toBeVisible();
    await expect(page.getByText('Tax Administration')).toBeVisible();
    await expect(page.getByText('Dedicated Account Manager')).toBeVisible();
    await expect(page.getByText('Priority')).toHaveCount(2);
    await expect(page.getByText('Subtotal')).toHaveCount(3);
    await expect(page.getByText('$200')).toHaveCount(4);
    await expect(page.getByText('$300')).toHaveCount(5);
    await expect(page.getByText('$500')).toHaveCount(2);
    await expect(page.getByText('Custom')).toHaveCount(4);
});

test('should contain the finance pack in the step', async ({ page }) => {
    await expect(page.getByText('Finance Pack')).toHaveCount(2);
    await expect(page.getByText('+ $50/mo')).toHaveCount(2);
    await expect(page.getByText('Bank Account Setup')).toHaveCount(2);
    await expect(page.getByText('Optional')).toBeVisible();
    await expect(page.getByText('Priority')).toHaveCount(2);
    await expect(page.getByText('Custom')).toHaveCount(4);
    await expect(page.getByText('Crypto Payment')).toBeVisible();
    await expect(page.getByText('3 Accounts')).toHaveCount(2);
    await expect(page.getByText('Subtotal')).toHaveCount(3);
    await expect(page.getByText('$50')).toHaveCount(8);
});

test('should contain the hosting suite in the step', async ({ page }) => {
    await expect(page.getByText('Hosting Suite')).toBeVisible();
    await expect(page.getByText('+ $50/mo')).toBeVisible();
    await expect(page.getByText('Secure Email')).toBeVisible();
    await expect(page.getByText('3 Accounts')).toHaveCount(2);
    await expect(page.getByText('10 Accounts')).toBeVisible();
    await expect(page.getByText('Unlimited')).toHaveCount(2);
    await expect(page.getByText('Web Hosting')).toBeVisible();
    await expect(page.getByText('Subtotal')).toHaveCount(3);
    await expect(page.getByText('$0')).toHaveCount(4);
    await expect(page.getByText('Grand Total (Recurring)')).toBeVisible();
    await expect(page.getByText('$550/mo')).toBeVisible();
});

test('should contain the back button in the step', async ({ page }) => {
    await page.getByText('Back').click();
    await expect(page.getByText('Step 2 of 5')).toBeVisible();
});

test('should contain the continue button in the step', async ({ page }) => {
    await page.getByText('Continue').click();
    await expect(page.getByText('Step 4 of 5')).toBeVisible();
});

test('should contain the step indicator in the step', async ({ page }) => {
    await expect(page.getByText('Step 3 of 5')).toBeVisible();
});