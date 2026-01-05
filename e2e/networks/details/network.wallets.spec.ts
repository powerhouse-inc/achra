import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('should save in clipboard the wallets link', async ({ page }) => {
    await page.locator('#___SECTION___wallets > div > span.inline-flex').first().click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse#wallets`);
});