import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/networks`);

    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
});

test('has footer links', async ({ page }) => {
    await expect(page.getByText('X (Twitter)')).toBeVisible();
    await expect(page.getByText('Discord')).toBeVisible();
    await expect(page.getByText('Powered by')).toBeVisible();
});

test('has a link for Twitter', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('X (Twitter)').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://x.com/PowerhouseDAO');
});

test('has a link for Discord', async ({ page }) => {
    const discordLink = page.getByText('Discord');
    await expect(discordLink).toHaveAttribute('href', 'https://discord.com/invite/pwQJwgaQKd');
});

test('has a link for Powerhouse', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Powered by').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://powerhouse.io/');
});