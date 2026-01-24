import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);


});

test('should load the section main content', async ({ page }) => {
    await page.getByText('Confirmation').click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Request Successfully Sent!')).toBeVisible();
    await expect(page.getByText('Thank you !')).toBeVisible();
    await expect(page.getByText('We have emailed the summary to email@powerhouse.inc*')).toBeVisible();
    await expect(page.getByText('We will contact you shortly to schedule an introduction meeting!')).toBeVisible();
});

test('should load the data provided in the previous step', async ({ page }) => {
    const name = 'tester';
    const email = 'test@test.com';

    await page.getByText('Summary').click();
    await page.waitForTimeout(1000);

    await page.locator('#summary-name').fill(name);
    await page.locator('#summary-email').fill(email);
    await page.getByText('Submit Request').click();
    await page.waitForTimeout(1000);

    await expect(page.getByText(`Thank you ${name}!`)).toBeVisible();
    await expect(page.getByText(`We have emailed the summary to ${email}`)).toBeVisible();
});