import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.achra.com/network/powerhouse/workstream/powerhouse-workstream-24');
});

test('has a breadcrumb to go back to the network page', async ({ page }) => {
    await page.locator('span.cursor-pointer').first().click();

    await expect(page).toHaveURL('https://staging.achra.com/network/powerhouse');
});

test('should navigate to the Initial Proposal page by clicking on the Initial Proposal link', async ({ page }) => {
    await page.getByText('View Proposal').first().click();

    await expect(page).toHaveURL(`https://staging.achra.com/network/powerhouse/workstream/powerhouse-workstream-24/initial-proposal`);
});