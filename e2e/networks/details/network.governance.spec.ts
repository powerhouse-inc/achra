import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);

    test.skip(true);
});

test('should save in clipboard the governance link', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('#___SECTION___governance > div:nth-child(1) > div > span.inline-flex').first().click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse#governance`);
});