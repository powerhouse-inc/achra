import { test, expect } from '@playwright/test';

test('should navigate to the network page by clicking on the network card', async ({ page }) => {
    await page.goto('https://staging.achra.com/networks');

    //TODO: refactor locator
    await page.locator('a[href="/network/powerhouse"]').first().click();

    await expect(page).toHaveURL('https://staging.achra.com/network/powerhouse');
});