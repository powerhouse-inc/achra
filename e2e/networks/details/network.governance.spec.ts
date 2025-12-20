import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.achra.com/network/powerhouse');
});

test('should save in clipboard the governance link', async ({ page }) => {
    await page.locator('#___SECTION___governance > div:nth-child(1) > div > span.inline-flex').first().click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain('https://staging.achra.com/network/powerhouse#governance');
});