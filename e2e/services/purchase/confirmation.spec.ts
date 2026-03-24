import { test, expect } from '@playwright/test';

const UUID = '098a7cad-b66b-404a-b2c8-933d69b808cd';

async function navigateToSummary(page: any) {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Select an operator' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Continue' }).last().click();
    await page.waitForTimeout(1500);
}

test.skip('should show confirmation after submitting the form', async ({ page }) => {
    // TODO: Backend returns "Operator drive not found for resource template 098a7cad-b66b-404a-b2c8-933d69b808cd"
    // Form submission succeeds (HTTP 200) but success:false in response, page stays at step=summary.
    // Re-enable once the backend operator drive is configured for this service.
    await navigateToSummary(page);

    const ts = Date.now();
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill(`tester-${ts}`);
    await page.getByRole('textbox', { name: /Team Name/i }).fill(`test-team-${ts}`);
    await page.getByRole('textbox', { name: 'Email' }).fill(`test+${ts}@test.com`);
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForTimeout(8000);

    await expect(
        page.getByText(/Request Successfully Sent/i).or(page.getByText(/Thank you/i)).first()
    ).toBeVisible({ timeout: 10000 });
});

test.skip('should show confirmation message with submitted email', async ({ page }) => {
    // TODO: Backend returns "Operator drive not found for resource template 098a7cad-b66b-404a-b2c8-933d69b808cd"
    // Form submission succeeds (HTTP 200) but success:false in response, page stays at step=summary.
    // Re-enable once the backend operator drive is configured for this service.
    await navigateToSummary(page);

    const ts = Date.now();
    const email = `test+${ts}@test.com`;
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill(`tester-${ts}`);
    await page.getByRole('textbox', { name: /Team Name/i }).fill(`test-team-${ts}`);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForTimeout(8000);

    const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(
        page.getByText(new RegExp(escapedEmail, 'i')).or(page.getByText(/emailed the summary/i))
    ).toBeVisible({ timeout: 10000 });
});

test('should load empty state for unexisting service', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);
    await page.waitForTimeout(1000);

    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByText('The page you are looking for does not exist or has been moved.')).toBeVisible();
});
