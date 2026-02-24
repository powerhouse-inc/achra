import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/finances`);
    await page.waitForLoadState('networkidle');
});

test('should save in clipboard the finances link', async ({ page }) => {
    await page.locator('#___SECTION___budget-statements *> span.inline-flex').click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/finances#budget-statements`);
});

test('should load all builder statuses', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/finances#budget-statements`);
    await expect(page.getByText('COMPLETED')).toHaveCount(0);
    await expect(page.getByText('ON HOLD')).toHaveCount(0);
    await expect(page.getByText('ARCHIVED')).toHaveCount(0);
    await expect(page.getByText('ACTIVE')).toHaveCount(0);
    await expect(page.getByText('INACTIVE')).toHaveCount(0);
    await expect(page.getByText('DRAFT')).toHaveCount(9);
    await expect(page.getByText('FINAL')).toHaveCount(18);
});

test('should load all last modified values', async ({ page }) => {
    await expect(page.getByText('06-FEB-2026')).toHaveCount(5);
});

test('should load all View buttons', async ({ page }) => {
    await expect(page.getByText('View')).toHaveCount(9);
});

test('should load all Actuals', async ({ page }) => {
    await expect(page.getByText('298,859 USD')).toHaveCount(3);
    await expect(page.getByText('248,771 USD')).toHaveCount(3);
});

test('should load all Reporting Month dates', async ({ page }) => {
    await expect(page.getByText('Oct 2025')).toHaveCount(6);
    await expect(page.getByText('Nov 2025')).toHaveCount(6);
});

test('should load all builder names', async ({ page }) => {
    await expect(page.getByText('PW')).toHaveCount(10);
    await expect(page.getByText('Powerhouse')).toHaveCount(13);
});

test('should load all columns', async ({ page }) => {
    await expect(page.locator('#___SECTION___budget-statements *> th').getByText('Contributors')).toBeVisible();
    await expect(page.locator('#___SECTION___budget-statements *> th').getByText('Actuals')).toBeVisible();
    await expect(page.locator('#___SECTION___budget-statements *> th').getByText('Reporting Month')).toBeVisible();
    await expect(page.locator('#___SECTION___budget-statements *> th').getByText('Last Modified')).toBeVisible();
    await expect(page.locator('#___SECTION___budget-statements *> th').getByText('Status')).toBeVisible();
});

test('should load info tooltip', async ({ page }) => {
    await page.locator('#___SECTION___budget-statements *> div.cursor-pointer > div.hidden').hover();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Access detailed insights into budget reporting activities, including contributors, reporting month, actual expenditures, status, and recent modifications.')).toHaveCount(2);
    await expect(page.getByText('Click "View" to dive into specific financial data by department, enabling effective monitoring and management of fiscal operations.')).toHaveCount(2);
});

test('should not load budget statements period', async ({ page }) => {
    await expect(page.locator('#___SECTION___budget-statements').getByText('JAN - DEC 2025')).toBeHidden();
});

test('should filter by status all builder statuses', async ({ page }) => {
    await page.getByText('Status').first().click();
    await page.getByRole('option', { name: 'Select All' }).click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/finances?status=DRAFT,FINAL,REVIEW`);
});

test('should reset all sorting of builders', async ({ page }) => {
    await page.locator('#___SECTION___budget-statements *> div.hidden > button:nth-child(2)').click();
    await page.getByRole('option', { name: 'Net Protocol Outflow' }).click();
    await page.locator('#___SECTION___budget-statements').getByText('Status').first().click();
    await page.locator('#___SECTION___budget-statements').getByRole('option', { name: 'Select All' }).click();
    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/finances?metrics=Net+Protocol+Outflow&status=DRAFT,FINAL,REVIEW`);

    await page.locator('#___SECTION___budget-statements').getByText('Reset Filter').first().click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/finances`);
});

test('should filter with other options in iPad Mini resolution', async ({ page }) => {
    // iPad Mini resolution
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);

    await page.locator('#___SECTION___budget-statements > div > div > div > div > div.max-w-fit.hidden > button').click();

    await expect(page.getByText('Sort')).toBeVisible();
    await expect(page.getByText('Reset')).toHaveCount(2);
    await expect(page.getByText('Reporting Month')).toHaveCount(20);
    await expect(page.getByText('Newest First')).toHaveCount(2);
    await expect(page.getByText('Oldest First')).toHaveCount(2);
    await expect(page.getByText('Last Modified')).toHaveCount(11);
});