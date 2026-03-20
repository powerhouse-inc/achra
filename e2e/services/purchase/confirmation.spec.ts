import { test, expect } from '@playwright/test';

const UUID = '712241c4-33ce-40de-94eb-f029b44f4a2d';

async function navigateToSummary(page: any) {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`);
    await page.waitForLoadState('networkidle');
    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Configure Services' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Continue' }).last().click();
    await page.waitForTimeout(1500);
}

test('should show confirmation after submitting the form', async ({ page }) => {
    await navigateToSummary(page);

    const ts = Date.now();
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill(`tester-${ts}`);
    await page.getByRole('textbox', { name: /Team Name/i }).fill(`test-team-${ts}`);
    await page.getByRole('textbox', { name: 'Email' }).fill(`test+${ts}@test.com`);
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForTimeout(4000);

    await expect(
        page.getByText(/Request Successfully Sent/i).or(page.getByText(/Thank you/i)).first()
    ).toBeVisible();
});

test('should show confirmation message with submitted email', async ({ page }) => {
    await navigateToSummary(page);

    const ts = Date.now();
    const email = `test+${ts}@test.com`;
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill(`tester-${ts}`);
    await page.getByRole('textbox', { name: /Team Name/i }).fill(`test-team-${ts}`);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('button', { name: /Submit Request/i }).click();
    await page.waitForTimeout(4000);

    await expect(
        page.getByText(new RegExp(email, 'i')).or(page.getByText(/emailed the summary/i))
    ).toBeVisible();
});

test('should load empty state for unexisting service', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);
    await page.waitForTimeout(1000);

    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByText('The page you are looking for does not exist or has been moved.')).toBeVisible();
});
