import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
});

test('should load the section main content without provided data', async ({ page }) => {
    await page.getByText('Confirmation').click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Request Successfully Sent!')).toBeVisible();
    await expect(page.getByText('Thank you !')).toBeVisible();
    await expect(page.getByText('We have emailed the summary to ')).toBeVisible();
    await expect(page.getByText('We will contact you shortly to schedule an introduction meeting!')).toBeVisible();
});

test('should load the data provided in the previous step', async ({ page }) => {
    const name = 'tester';
    const team = 'test team';
    const email = 'test@test.com';

    await page.getByText('Summary').click();
    await page.waitForTimeout(1000);

    await page.locator('#submit-request-name').fill(name);
    await page.locator('#submit-request-team-name').fill(team);
    await page.locator('#submit-request-email').fill(email);
    await page.getByText('Submit Request').click();
    await page.waitForTimeout(1000);

    await expect(page.getByText(`Thank you ${name}!`)).toBeVisible();
    await expect(page.getByText(`We have emailed the summary to ${email}`)).toBeVisible();
});

test('should load empty state for unexisting service', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);
    await page.waitForTimeout(1000);

    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByText('The page you are looking for does not exist or has been moved.')).toBeVisible();
});