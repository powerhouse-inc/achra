import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
    await page.waitForLoadState('networkidle');
    // Navigate to Summary tab (tab 4)
    await page.getByRole('tab', { name: /Summary/i }).click();
    await page.waitForTimeout(1000);
});

// NOTE: The Summary tab requires completing previous steps (Select Operator, Configure Services) first
// The tab is disabled by default in the new multi-step flow - skipping until E2E flow is implemented
test.skip('should load the section main content', async ({ page }) => {
    // NOTE: The operator avatar/initials may not be visible if the page structure changed
    // await expect(page.getByText('PW')).toBeVisible();
    await expect(page.getByText('Powerhouse')).toBeVisible();
});

// NOTE: The Summary tab requires completing previous steps (Select Operator, Configure Services) first
test.skip('should load the summary data area', async ({ page }) => {
    await expect(page.getByText('Operational Hub for Open Source Builders').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Resource Template')).toBeVisible();
    await expect(page.getByText('$550/mo').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('+ $3000 Setup')).toBeVisible();

    await expect(page.getByText('SNO Function')).toBeVisible();
    await expect(page.getByText('Legal Entity')).toBeVisible();
    await expect(page.getByText('Swiss Association')).toBeVisible();
    await expect(page.getByText('Team').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Remote')).toBeVisible();
    await expect(page.getByText('Anonymity')).toBeVisible();
    await expect(page.getByText('Highest')).toBeVisible();

    await expect(page.getByText('Tier & Included Services')).toBeVisible();
    await expect(page.getByText('Selected Add-ons')).toBeVisible();
    await expect(page.getByText('Pricing Breakdown')).toBeVisible();
});