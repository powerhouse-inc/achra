import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

// TODO: Check if the title and description will change depending on the network
test('should contract the top banner', async ({ page }) => {
    // const description = "Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans."
    const description = "Lorem ipsum dolor sit amet consectetur. In et sed malesuada ornare bibendum nisl egestas. Tellus semper facilisis elit mauris aliquam. Venenatis nunc sapien duis adipiscing proin mauris. Amet sed mauris natoque nisi porttitor montes. Elit vel euismod quis."
    await expect(page.getByText(description)).toBeVisible();

    await page.locator('div[data-slot="collapsible"] > button').click();
    await expect(page.getByText(description)).toBeHidden();

    await page.locator('div[data-slot="collapsible"] > button').click();
    await expect(page.getByText(description)).toBeVisible();
});