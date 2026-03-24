import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/`);
    await page.waitForLoadState('networkidle');
});

test('has a link to the Networks page', async ({ page }) => {
    await page.getByRole('link', { name: 'Networks', exact: true }).click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/networks`);
});

test('has a link to the Services page', async ({ page }) => {
    await page.getByRole('link', { name: 'Services', exact: true }).click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/services`);
});

test('has a link to the Use Cases page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Use Cases', exact: true }).click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/cases`);
});

test('has a link to the Networks page in the "For Organizations" section', async ({ page }) => {
    await page.getByText('For Organizations').first().click();

    await page.getByText('View networks').click();

    await expect(page).toHaveURL('https://achra.com/networks');
});

test('has a description in the "For Builders" section', async ({ page }) => {
    await page.getByText('For Builders').click();
    await expect(page.getByText('Discover active projects and roadmaps from leading network organizations. Focus on building with built-in operational support.')).toBeVisible({ timeout: 10000 });
});

test('has a link to the Services page in the "For Operators" section', async ({ page }) => {
    await page.getByText('For Operators').click();
    await page.getByText('Service Catalog').click();
    await expect(page).toHaveURL('https://achra.com/services');
});

test('has a link to the Use Cases page from the link "View Use Cases"', async ({ page }) => {
    await page.getByText('View Use Cases').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/cases`);
});

test('has a link to the Vetra page from the button "Start Building"', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Start Building').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://vetra.io/');
});

test('has a link to the Powerhouse SNO page from the link "Visit Powerhouse"', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Visit Powerhouse').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://powerhouse.io/');
});

// This needs a VPN, if it runs in a restricted region for the Cloudflare waitlist.
test('has a button to subscribe to the Powerhouse waitlist', async ({ page }) => {
    await page.getByPlaceholder('Drop your email for launch updates.').fill('test@test.com');
    await page.getByText('Get Notified').click();

    await expect(page.getByText('Thank you')).toBeVisible();
});