import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);

    await page.getByText('Summary').click();
    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('Powerhouse Genesis OH')).toBeVisible();
});

test('should load the summary data area', async ({ page }) => {
    await expect(page.getByText('Operational Hub for Open Source Builders')).toBeVisible();
    await expect(page.getByText('Selected Resource')).toBeVisible();
    await expect(page.getByText('$350/mo')).toBeVisible();
    await expect(page.getByText('+ $3,000 Setup')).toBeVisible();

    await expect(page.getByText('Configuration')).toHaveCount(2);
    await expect(page.getByText('Legal Entity')).toHaveCount(2);
    await expect(page.getByText('Swiss Association')).toBeVisible();
    await expect(page.getByText('Anonymity Level')).toBeVisible();
    await expect(page.getByText('High (Standard)')).toBeVisible();

    await expect(page.getByText('Service Breakdown')).toBeVisible();
    await expect(page.getByText('Selected Tier')).toBeVisible();
    await expect(page.getByText('Team')).toBeVisible();
    await expect(page.getByText('Formation & Setup')).toBeVisible();
    await expect(page.getByText('One-time fee')).toBeVisible();
    await expect(page.getByText('$3,000')).toHaveCount(2);
    await expect(page.getByText('Recurring Base')).toBeVisible();
    await expect(page.getByText('Recurring Services')).toBeVisible();
    await expect(page.getByText('$300')).toBeVisible();
    await expect(page.getByText('Finance Pack')).toBeVisible();
    await expect(page.getByText('+$50')).toBeVisible();
});