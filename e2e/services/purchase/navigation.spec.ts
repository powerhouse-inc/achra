import { test, expect } from '@playwright/test';

const UUID = 'c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8';
const BASE_URL = `${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`;

test('should navigate back to product info from select operator step', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(`${BASE_URL}?step=product-info`);
    await expect(page.getByText('Product Info')).toBeVisible();
});

test('should navigate back to select operator from configure services step', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(`${BASE_URL}?step=select-operator`);
    await expect(page.getByText('Operator', { exact: true })).toBeVisible();
});

test('should mark completed steps when advancing through the flow', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Step 1 is active
    await expect(page).toHaveURL(/step=product-info/);

    // Advance to step 2
    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(`${BASE_URL}?step=select-operator`);

    // Advance to step 3
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL(`${BASE_URL}?step=configure-services`);

    // Advance to step 4
    await page.getByRole('button', { name: 'Continue' }).last().click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL(`${BASE_URL}?step=summary`);
});
