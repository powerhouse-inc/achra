import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services`);
});

test('should contain all tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Networks' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Builders' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab')).toHaveCount(3);
});

test('should contain search input', async ({ page }) => {
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
});

test('should contain services or resource links to resource items', async ({ page }) => {
    await expect(page.getByText('Purchase').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('More info').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('SNO Embryonic Hub').count()).resolves.toBeGreaterThanOrEqual(0);
    await expect(page.getByText('SNO Governors').count()).resolves.toBeGreaterThanOrEqual(0);
    await expect(page.getByText('Founders').count()).resolves.toBeGreaterThanOrEqual(0);
    await expect(page.getByText('Operators').count()).resolves.toBeGreaterThanOrEqual(0);
    await expect(page.getByText('Builders').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Formation & Setup').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Recurring Services').count()).resolves.toBeGreaterThanOrEqual(1);
});

test('should navigate to more info page by clicking on the "More Info" button', async ({ page }) => {
    await page.getByRole('tab', { name: 'Builders' }).click();
    await page.getByRole('link', { name: 'More Info' }).first().click();
    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/services/712241c4-33ce-40de-94eb-f029b44f4a2d`);
});

test('should search a service by name', async ({ page }) => {
    await page.getByPlaceholder('Search...').fill('Sky Ecosystem');
    await expect(page.getByText('No services found')).toBeVisible();

    await page.getByPlaceholder('Search...').fill('COMMERCIAL OPERATIONAL HUB (OH)');
    await expect(page.getByText('Purchase').count()).resolves.toBeGreaterThanOrEqual(1);
});