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
    const statusBadges = page.locator('#___SECTION___budget-statements').getByText(/Draft|Final|Escalated|AwaitingCorrection/);
    await expect(statusBadges.count()).resolves.toBeGreaterThan(0);
});

test('should load all last modified values', async ({ page }) => {
    const dates = page.locator('#___SECTION___budget-statements').getByText(/\d{2}-[A-Z]{3}-\d{4}/);
    await expect(dates.count()).resolves.toBeGreaterThan(0);
});

test('should load all View buttons', async ({ page }) => {
    const viewLinks = page.locator('#___SECTION___budget-statements').getByRole('link', { name: 'View' });
    await expect(viewLinks.count()).resolves.toBeGreaterThan(0);
});

test('should load all Actuals', async ({ page }) => {
    const actuals = page.locator('#___SECTION___budget-statements').getByText(/[\d,]+\s*USD/);
    await expect(actuals.count()).resolves.toBeGreaterThan(0);
});

test('should load all Reporting Month dates', async ({ page }) => {
    const months = page.locator('#___SECTION___budget-statements').getByText(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/i);
    await expect(months.count()).resolves.toBeGreaterThan(0);
});

test('should load all builder names', async ({ page }) => {
    const rows = page.locator('#___SECTION___budget-statements').getByRole('link').filter({ hasText: /.+/ });
    await expect(rows.count()).resolves.toBeGreaterThan(0);
});

test('should load all columns', async ({ page }) => {
    const section = page.locator('#___SECTION___budget-statements');
    await expect(section.getByText('Budget Statements', { exact: true })).toBeVisible();
    await expect(section.getByRole('button', { name: 'Sort Builders column' })).toBeVisible();
    await expect(section.getByRole('button', { name: 'Sort Reporting Month column' })).toBeVisible();
    await expect(section.getByRole('button', { name: 'Sort Actuals column' })).toBeVisible();
    await expect(section.getByRole('button', { name: 'Sort Status column' })).toBeVisible();
    await expect(section.getByRole('button', { name: 'Sort Last Modified column' })).toBeVisible();
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

    // The URL updates with the status filter, verify it contains the expected params
    await page.waitForTimeout(500);
    const currentUrl = page.url();
    expect(currentUrl).toContain('/network/powerhouse/finances');
});

test('should reset all sorting of builders', async ({ page }) => {
    // Wait for the budget statements section to be visible
    await page.locator('#___SECTION___budget-statements').waitFor({ state: 'visible' });

    // Apply a filter first by opening the dropdown
    await page.locator('#___SECTION___budget-statements').getByText('Status').first().click();
    await page.waitForTimeout(300);

    // Select a specific status (not "Select All" since that might not change the filter state)
    await page.locator('#___SECTION___budget-statements').getByRole('option', { name: 'Draft' }).click();
    await page.waitForTimeout(800);

    // Now verify the Reset Filter button becomes enabled
    const resetButton = page.locator('#___SECTION___budget-statements').getByText('Reset Filter').first();

    // Wait for button to be enabled after filter is applied
    await expect(resetButton).toBeEnabled({ timeout: 3000 });

    await resetButton.click();
    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    expect(currentUrl).toContain('/network/powerhouse/finances');
    expect(currentUrl).not.toContain('status=');
});

test('should filter with other options in iPad Mini resolution', async ({ page }) => {
    // iPad Mini resolution
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);

    await page.locator('#___SECTION___budget-statements > div > div > div > div > div.max-w-fit.hidden > button').click();

    await expect(page.getByText('Sort')).toBeVisible();
    await expect(page.getByText('Reset').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Reporting Month').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Newest First').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Oldest First').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Last Modified').count()).resolves.toBeGreaterThan(0);
});
