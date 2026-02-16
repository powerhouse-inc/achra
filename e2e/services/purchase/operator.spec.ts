import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
    await page.waitForLoadState('networkidle');

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('Operator')).toHaveCount(3);
    await expect(page.getByText('Lorem ipsum dolor sit amet consectetur. Massa id vitae turpis viverra tortor. Posuere non tempor volutpat purus arcu pulvinar viverra. Sed praesent in leo in. Mattis adipiscing proin lobortis facilisi etiam tellus. Pharetra scelerisque ornare lacus dolor consectetur. Quis pulvinar nam massa tristique tortor dui vitae lectus.')).toHaveCount(1);
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
    await expect(page.getByText('Configure Services')).toHaveCount(3);

    await expect(page.getByText('Accountable OPC')).toBeVisible();
    await expect(page.getByText('Active Since')).toHaveCount(2);
    await expect(page.getByText('From $500/Month')).toBeVisible();
});
