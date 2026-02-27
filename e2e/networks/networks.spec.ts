import { test, expect } from '@playwright/test';

test('should navigate to the network page by clicking on the network card', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/networks`);

    await page.getByText('Explore Powerhouse').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});