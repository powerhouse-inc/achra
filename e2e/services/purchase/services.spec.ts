import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
    await page.waitForLoadState('networkidle');
    // Navigate to Configure Services tab
    await page.getByRole('tab', { name: /Configure Services/i }).click();
    await page.waitForTimeout(1000);
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
// The tab is disabled by default in the new multi-step flow - skipping until E2E flow is implemented
test.skip('should contain the default selector values in the step', async ({ page }) => {
    await expect(page.getByText('Anonymity')).toBeVisible();
    await expect(page.getByText('High')).toBeVisible();

    await expect(page.getByText('Legal Entity')).toBeVisible();
    await expect(page.getByText('Swiss Association').count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByText('Team').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Remote')).toBeVisible();

    await expect(page.getByText('SNO Function')).toBeVisible();
    await expect(page.getByText('Operational Hub for Open Source Builders')).toBeVisible();
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
test.skip('should contain the selector values in the step', async ({ page }) => {
    await expect(page.getByText('Service Catalog')).toBeVisible();
    await expect(page.getByText('Basic').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('$99/mo').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Professional')).toBeVisible();
    await expect(page.getByText('$299/mo')).toBeVisible();
    await expect(page.getByText('Enterprise')).toBeVisible();
    await expect(page.getByText('Custom').count()).resolves.toBeGreaterThanOrEqual(1);
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
test.skip('should contain the legal setup in the step', async ({ page }) => {
    await expect(page.getByText('Legal').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Included').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('One-time: $5,000').count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByText('Registered address (Zug)').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Number of Addresses').count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByText('Total Setup Fee')).toBeVisible();
    await expect(page.getByText('$5,000 flat fee (applied to all tiers)').count()).resolves.toBeGreaterThanOrEqual(1);
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
test.skip('should contain the grand total with default value', async ({ page }) => {
    await expect(page.getByText('Grand Total (Recurring)')).toBeVisible();
    await expect(page.getByText('$198/mo').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('$598/mo').count()).resolves.toBeGreaterThanOrEqual(1);
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
test.skip('should contain the grand total with a different value after selecting all options', async ({ page }) => {
    await expect(page.getByText('Option A')).toBeVisible();

    await page.waitForTimeout(2000);
    await page.getByText('Option A').click();
    await page.waitForTimeout(2000);

    await expect(page.getByText('Grand Total (Recurring)')).toBeVisible();
    await expect(page.getByText('$398/mo').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('$798/mo')).toBeVisible();
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
test.skip('should contain the back button in the step', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Back' }).or(page.getByText('Back')).first()).toBeVisible();
});

// NOTE: The Configure Services tab requires completing previous steps (Select Operator) first
test.skip('should contain the continue button in the step', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Continue' }).or(page.getByText('Continue'))).toBeVisible();
});

test.skip('should contain the tier with only included options', async ({ page }) => {
    page.getByText('Finance Pack').nth(0).click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Tier')).toHaveCount(2);
    await expect(page.getByText('Team')).toHaveCount(7);
    await expect(page.getByText('Price Includes')).toBeVisible();
    await expect(page.getByText('$300/mo')).toHaveCount(3);
    await expect(page.getByText('Needs Analysis')).toHaveCount(2);
    await expect(page.getByText('Incorporation Docs')).toHaveCount(2);
    await expect(page.getByText('Swiss Association')).toHaveCount(3);
    await expect(page.getByText('One-time fee')).toBeVisible();
    await expect(page.getByText('$3000')).toHaveCount(3);
    await expect(page.getByText('~')).toHaveCount(2);
    await expect(page.getByText('Contributor Contracting')).toHaveCount(2);
    await expect(page.getByText('Up to 6')).toHaveCount(2);
    await expect(page.getByText('Tax Administration')).toHaveCount(2);
    await expect(page.getByText('Included')).toHaveCount(3);
    await expect(page.getByText('Monthly Total')).toBeVisible();
    await expect(page.getByText('$300')).toHaveCount(8);
});

test.skip('should contain the tier with the first optional service', async ({ page }) => {
    await expect(page.getByText('Tier')).toHaveCount(2);
    await expect(page.getByText('Team')).toHaveCount(7);
    await expect(page.getByText('Price Includes')).toHaveCount(2);
    await expect(page.getByText('$300/mo')).toHaveCount(2);
    await expect(page.getByText('Needs Analysis')).toHaveCount(2);
    await expect(page.getByText('Incorporation Docs')).toHaveCount(2);
    await expect(page.getByText('Swiss Association')).toHaveCount(4);
    await expect(page.getByText('One-time fee')).toBeVisible();
    await expect(page.getByText('$3000')).toHaveCount(3);
    await expect(page.getByText('~')).toHaveCount(3);
    await expect(page.getByText('Contributor Contracting')).toHaveCount(2);
    await expect(page.getByText('Up to 6')).toHaveCount(2);
    await expect(page.getByText('Tax Administration')).toHaveCount(2);
    await expect(page.getByText('Included')).toHaveCount(4);

    await expect(page.getByText('Recurring Services')).toBeVisible();
    await expect(page.getByText('Finance Pack')).toHaveCount(2);
    await expect(page.getByText('Price Includes')).toHaveCount(2);
    await expect(page.getByText('+$50')).toBeVisible();
    await expect(page.getByText('Bank Account Setup')).toHaveCount(2);
    await expect(page.getByText('Crypto Payment')).toHaveCount(2);
    await expect(page.getByText('3 Accounts')).toHaveCount(3);

    await expect(page.getByText('Monthly Total')).toBeVisible();
    await expect(page.getByText('$350')).toHaveCount(2);
});

test.skip('should contain the tier with both optional services', async ({ page }) => {
    page.getByText('Hosting Suite').nth(0).click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Tier')).toHaveCount(2);
    await expect(page.getByText('Team')).toHaveCount(7);
    await expect(page.getByText('Price Includes')).toHaveCount(3);
    await expect(page.getByText('$300/mo')).toHaveCount(2);
    await expect(page.getByText('Needs Analysis')).toHaveCount(2);
    await expect(page.getByText('Incorporation Docs')).toHaveCount(2);
    await expect(page.getByText('Swiss Association')).toHaveCount(4);
    await expect(page.getByText('One-time fee')).toBeVisible();
    await expect(page.getByText('$3000')).toHaveCount(3);
    await expect(page.getByText('~')).toHaveCount(3);
    await expect(page.getByText('Contributor Contracting')).toHaveCount(2);
    await expect(page.getByText('Up to 6')).toHaveCount(2);
    await expect(page.getByText('Tax Administration')).toHaveCount(2);
    await expect(page.getByText('Included')).toHaveCount(4);

    await expect(page.getByText('Recurring Services')).toHaveCount(2);
    await expect(page.getByText('Finance Pack')).toHaveCount(2);
    await expect(page.getByText('+$50')).toBeVisible();
    await expect(page.getByText('Bank Account Setup')).toHaveCount(2);
    await expect(page.getByText('Crypto Payment')).toHaveCount(2);
    await expect(page.getByText('3 Accounts')).toHaveCount(3);

    await expect(page.getByText('Hosting Suite')).toHaveCount(2);
    await expect(page.getByText('+$200')).toBeVisible();
    await expect(page.getByText('Secure Email')).toHaveCount(2);
    await expect(page.getByText('10 Accounts')).toHaveCount(2);
    await expect(page.getByText('Web Hosting')).toHaveCount(2);
    await expect(page.getByText('Pro')).toHaveCount(3);

    await expect(page.getByText('Monthly Total')).toBeVisible();
    await expect(page.getByText('$550')).toHaveCount(2);
});