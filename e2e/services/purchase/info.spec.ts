import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);
});

test('should contain main elements', async ({ page }) => {
    await expect(page.getByText('SNO Embryonic Hub')).toBeVisible();
    await expect(page.getByText('Founders')).toBeVisible();
    await expect(page.getByText('SNO Governors')).toBeVisible();
    await expect(page.getByText('Embryonic legal entity for early-stage networks with coverage of all the major functions.')).toBeVisible();

    await expect(page.getByText('Product Info')).toBeVisible();
    await expect(page.getByText('Select Operator')).toBeVisible();
    await expect(page.getByText('Select Services')).toBeVisible();
    await expect(page.getByText('Summary')).toBeVisible();
    await expect(page.getByText('Confirmation')).toBeVisible();

    await expect(page.getByText('Step 1 of 5')).toBeVisible();
});