import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('should contract the top banner', async ({ page }) => {
    const description = "The Powerhouse dashboard provides an overview of the builder teams and their financial data within the Powerhouse network. This portal tracks technical expertise, team information, and monthly financial reporting to maintain transparency across all active workstreams. It serves as the primary tool for monitoring team capabilities and fiscal oversight for every project operating under the Powerhouse network."
    await expect(page.getByText(description)).toBeVisible();

    await page.locator('div[data-slot="collapsible"] > button').click();
    await expect(page.getByText(description)).toBeHidden();

    await page.locator('div[data-slot="collapsible"] > button').click();
    await expect(page.getByText(description)).toBeVisible();
});