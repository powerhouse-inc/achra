import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase?step=summary`);

    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('PW')).toBeVisible();
    await expect(page.getByText('Powerhouse')).toBeVisible();
});

test('should load the summary data area', async ({ page }) => {
    await expect(page.getByText('Operational Hub for Open Source Builders')).toHaveCount(2);
    await expect(page.getByText('Resource Template')).toBeVisible();
    await expect(page.getByText('$550/mo')).toHaveCount(2);
    await expect(page.getByText('+ $3000 Setup')).toBeVisible();

    await expect(page.getByText('SNO Function')).toBeVisible();
    await expect(page.getByText('Legal Entity')).toBeVisible();
    await expect(page.getByText('Swiss Association')).toBeVisible();
    await expect(page.getByText('Team')).toHaveCount(5);
    await expect(page.getByText('Remote')).toBeVisible();
    await expect(page.getByText('Anonymity')).toBeVisible();
    await expect(page.getByText('Highest')).toBeVisible();

    await expect(page.getByText('Tier & Included Services')).toBeVisible();
    await expect(page.getByText('Selected Add-ons')).toBeVisible();
    await expect(page.getByText('Pricing Breakdown')).toBeVisible();
});