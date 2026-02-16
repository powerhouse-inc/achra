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
    await expect(page.getByText('Purchase')).toHaveCount(3);
    await expect(page.getByText('More info')).toHaveCount(3);
    await expect(page.getByText('SNO Embryonic Hub')).toHaveCount(0);
    await expect(page.getByText('SNO Governors')).toHaveCount(0);
    await expect(page.getByText('Founders')).toHaveCount(0);
    await expect(page.getByText('Operators')).toHaveCount(0);
    await expect(page.getByText('Builders')).toHaveCount(2);
    await expect(page.getByText('Formation & Setup')).toHaveCount(3);
    await expect(page.getByText('Recurring Services')).toHaveCount(3);
});

test('should navigate to more info page by clicking on the "More Info" button', async ({ page }) => {
    await page.getByRole('tab', { name: 'Builders' }).click();
    await page.getByRole('link', { name: 'More Info' }).first().click();
    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8`);
});

test('should search a service by name', async ({ page }) => {
    await page.getByPlaceholder('Search...').fill('Sky Ecosystem');
    await expect(page.getByText('No services found')).toBeVisible();

    await page.getByPlaceholder('Search...').fill('COMMERCIAL OPERATIONAL HUB (OH)');
    await expect(page.getByText('Purchase')).toHaveCount(1);
});