import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('Operator')).toHaveCount(3);
});

test('should load the list of operators', async ({ page }) => {
    await expect(page.getByText('Powerhouse Genesis OH')).toBeVisible();
    await expect(page.getByText('Empowering you business with reliable bookkeeping, payroll, and tax solutions.')).toHaveCount(2);
    await expect(page.getByText('Active Since')).toHaveCount(2);
    await expect(page.getByText('JUL 2022')).toHaveCount(2);
    await expect(page.getByText('Setup Time')).toHaveCount(2);
    await expect(page.getByText('7 days')).toHaveCount(2);
    await expect(page.getByText('Recurring Cost')).toHaveCount(2);
    await expect(page.getByText('From $800/Month')).toBeVisible();
    await expect(page.getByText('Select Services')).toHaveCount(3);

    await expect(page.getByText('Accountable OPC')).toBeVisible();
    await expect(page.getByText('Active Since')).toHaveCount(2);
    await expect(page.getByText('From $500/Month')).toBeVisible();
});
