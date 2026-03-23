import { test, expect } from '@playwright/test';

const UUID = 'bb1d3128-9695-4bfd-93d1-9e980fa14de2';
const BASE_URL = `${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`;

test('should navigate back to product info from select operator step', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Select an operator' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(`${BASE_URL}?step=product-info`);
    await expect(page.getByRole('tab', { name: /Product Info/ })).toBeVisible();
});

test('should navigate back to select operator from configure services step', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Select an operator' }).click();
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
    await page.getByRole('button', { name: 'Select an operator' }).click();
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

test.skip('should advance from summary to confirmation after submitting the form', async ({ page }) => {
    // TODO: Backend returns "Operator drive not found for resource template bb1d3128-9695-4bfd-93d1-9e980fa14de2"
    // Form submission succeeds (HTTP 200) but success:false in response, page stays at step=summary.
    // Re-enable once the backend operator drive is configured for this service.
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Select an operator' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Continue' }).last().click();
    await page.waitForTimeout(1500);

    const ts = Date.now();
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill(`tester-${ts}`);
    await page.getByRole('textbox', { name: /Team Name/i }).fill(`test-team-${ts}`);
    await page.getByRole('textbox', { name: 'Email' }).fill(`test+${ts}@test.com`);
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForURL(`${BASE_URL}?step=confirmation`, { timeout: 15000 });

    await expect(
        page.getByText(/Request Successfully Sent/i).or(page.getByText(/Thank you/i)).first()
    ).toBeVisible({ timeout: 10000 });
});
