import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/powerhouse/budget-statements?section=expense-reports&viewMonth=Dec2025`);
});

test('should load the totals summary', async ({ page }) => {
    await expect(page.getByText('Actuals - Dec 2025 Totals')).toBeVisible();
    await expect(page.getByText('Wallet')).toBeVisible();
    await expect(page.getByText('Mthly Budget')).toHaveCount(2);
    await expect(page.getByText('Forecast')).toHaveCount(12);
    await expect(page.getByText('Actuals')).toHaveCount(14);
    await expect(page.getByText('Difference')).toHaveCount(12);
    await expect(page.getByText('Payments')).toHaveCount(12);

    await expect(page.getByText('Powerhouse Genesis Operational Hub')).toHaveCount(3);
    await expect(page.getByText('0xF13..A0460')).toHaveCount(2);
    await expect(page.getByText('424,477.00')).toHaveCount(5);
    await expect(page.getByText('396,985.55')).toHaveCount(5);
    await expect(page.getByText('208,421.50')).toHaveCount(10);
    await expect(page.getByText('188,564.05')).toHaveCount(5);
    await expect(page.getByText('208,421.50')).toHaveCount(10);

    await expect(page.getByText('Total')).toHaveCount(4);
});

test('should load the breakdown', async ({ page }) => {
    await expect(page.getByText('Actuals - Dec 2025 Breakdown')).toBeVisible();

    await expect(page.getByText('Expense Category')).toBeVisible();
    await expect(page.getByText('Budget Allocation')).toHaveCount(10);
    await expect(page.getByText('Forecast')).toHaveCount(12);
    await expect(page.getByText('Actuals')).toHaveCount(14);
    await expect(page.getByText('Difference')).toHaveCount(12);
    await expect(page.getByText('Comments')).toHaveCount(10);
    await expect(page.getByText('Payments')).toHaveCount(12);

    await expect(page.getByText('Headcount Expenses')).toHaveCount(10);
    await expect(page.getByText('Compensation & Benefits')).toHaveCount(4);
    await expect(page.getByText('Travel & Entertainment')).toHaveCount(4);
    await expect(page.getByText('Non-Headcount Expenses')).toHaveCount(7);
    await expect(page.getByText('Professional Services')).toHaveCount(4);
    await expect(page.getByText('Admin Expense')).toHaveCount(4);
    await expect(page.getByText('Software Development Expense')).toHaveCount(4);
    await expect(page.getByText('Marketing Expense')).toHaveCount(4);
    await expect(page.getByText('Gas Expense')).toHaveCount(4);
    await expect(page.getByText('Software Expense')).toHaveCount(4);
    await expect(page.getByText('Total')).toHaveCount(4);

    await expect(page.getByText('225,600.00')).toHaveCount(2);
    await expect(page.getByText('11,000.00')).toHaveCount(2);
    await expect(page.getByText('50,000.00')).toHaveCount(2);
    await expect(page.getByText('1,500.00')).toHaveCount(2);
    await expect(page.getByText('120,677.00')).toHaveCount(2);
    await expect(page.getByText('9,000.00')).toHaveCount(2);
    await expect(page.getByText('200.00')).toHaveCount(2);
    await expect(page.getByText('6,500.00')).toHaveCount(2);
    await expect(page.getByText('424,477.00')).toHaveCount(5);

    await expect(page.getByText('215,463.23')).toHaveCount(2);
    await expect(page.getByText('12,052.32')).toHaveCount(4);
    await expect(page.getByText('34,920.00')).toHaveCount(4);
    await expect(page.getByText('2,050.00')).toHaveCount(2);
    await expect(page.getByText('30,000.00')).toHaveCount(4);
    await expect(page.getByText('0.00')).toHaveCount(60);
    await expect(page.getByText('102,500.00')).toHaveCount(4);
    await expect(page.getByText('396,985.55')).toHaveCount(5);

    await expect(page.getByText('206,262.80')).toHaveCount(4);
    await expect(page.getByText('2,158.70')).toHaveCount(4);
    await expect(page.getByText('208,421.50')).toHaveCount(10);

    await expect(page.getByText('9,200.43')).toHaveCount(2);
    await expect(page.getByText('12,052.32')).toHaveCount(4);
    await expect(page.getByText('-108.70')).toHaveCount(2);
    await expect(page.getByText('30,000.00')).toHaveCount(4);
    await expect(page.getByText('102,500.00')).toHaveCount(4);
    await expect(page.getByText('188,564.05')).toHaveCount(5);

    await expect(page.getByText('206,262.80')).toHaveCount(4);
});