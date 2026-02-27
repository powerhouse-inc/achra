import { test, expect } from '@playwright/test';

const network = 'powerhouse';
const networkName = 'Powerhouse';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/${network}`);
});

test('should contract the top banner', async ({ page }) => {
    const description = `The ${networkName} dashboard provides an overview of the builder teams and their financial data within the ${networkName} network. This portal tracks technical expertise, team information, and monthly financial reporting to maintain transparency across all active workstreams. It serves as the primary tool for monitoring team capabilities and fiscal oversight for every project operating under the ${networkName} network.`
    await expect(page.getByText(description)).toBeVisible();

    await page.locator('main.container button').first().click();
    await expect(page.getByText(description)).toBeHidden();

    await page.locator('main.container button').first().click();
    await expect(page.getByText(description)).toBeVisible();
});