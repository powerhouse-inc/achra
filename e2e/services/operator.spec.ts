import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/operators/powerhouse`);
});

test('should contain main elements', async ({ page }) => {
    await expect(page.getByText('Powerhouse').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Powerhouse is a team bringing a decentralized operations toolkit for open organizations')).toBeVisible();

    // NOTE: These metadata fields no longer exist in the current page design (as of 2026-03-16)
    // await expect(page.getByText('Last Active')).toBeVisible();
    // await expect(page.getByText('Status')).toBeVisible();
    // await expect(page.getByText('OpHub Member')).toBeVisible();
    // await expect(page.getByText('Team Size')).toBeVisible();

    await expect(page.getByText('Who we are')).toBeVisible();
    await expect(page.getByText('What we offer')).toBeVisible();
});

test('should contain services or resource links to resource items', async ({ page }) => {
    await expect(page.getByText('Purchase').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('More info').count()).resolves.toBeGreaterThanOrEqual(1);

    await expect(page.getByText('Formation & Setup').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Recurring Services').count()).resolves.toBeGreaterThanOrEqual(1);
});

test('should navigate to resource page by clicking on the "More Info" button', async ({ page }) => {
    page.getByRole('link', { name: 'More Info' }).first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8`);
});
