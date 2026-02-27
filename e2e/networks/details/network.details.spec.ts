import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Temporarily skipped for the MVP.
    test.skip(true);

    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

// TODO: Check if the title and description will change depending on the network
test('should contract the top banner', async ({ page }) => {
    const description = "Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans."
    await expect(page.getByText(description)).toBeVisible();

    //TODO: refactor locator
    await page.locator('div[data-slot="collapsible"] > button').click();
    await expect(page.getByText(description)).toBeHidden();

    //TODO: refactor locator
    await page.locator('div[data-slot="collapsible"] > button').click();
    await expect(page.getByText(description)).toBeVisible();
});