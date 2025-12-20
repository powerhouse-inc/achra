import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.achra.com/services');
});

test('should contain all tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'SNO Governors' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Founders' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Operators' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Builders' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab')).toHaveCount(5);
});

test('should contain search input', async ({ page }) => {
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
});

test('should contain services or resource links to resource items', async ({ page }) => {
    await expect(page.getByText('Purchase')).toHaveCount(6);
    await expect(page.getByText('More info')).toHaveCount(6);
    await expect(page.getByText('SNO Embryonic Hub')).toHaveCount(1);
    await expect(page.getByText('SNO Governors')).toHaveCount(6);
    await expect(page.getByText('Founders')).toHaveCount(2);
    await expect(page.getByText('Operators')).toHaveCount(3);
    await expect(page.getByText('Builders')).toHaveCount(3);
    await expect(page.getByText('Formation & Setup')).toHaveCount(6);
    await expect(page.getByText('Recurring Services')).toHaveCount(6);
});

test('should navigate to more info page by clicking on the "More Info" button', async ({ page }) => {
    await page.getByRole('tab', { name: 'SNO Governors' }).click();
    await page.getByRole('link', { name: 'More Info' }).first().click();
    await expect(page).toHaveURL(`https://staging.achra.com/services/sno-embryonic-hub`);
});