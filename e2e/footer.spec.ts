import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/`);

    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
});

test('has footer links', async ({ page }) => {
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Explore Achra')).toBeVisible();
    await expect(page.getByText('Explore Vetra')).toBeVisible();
    await expect(page.getByText('Use Cases').last()).toBeVisible();

    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByText('About us')).toBeVisible();
    await expect(page.getByText('Academy')).toBeVisible();
});

test('has a link for Explore Achra', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Explore Achra').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    // TODO: Check if this should redirect to the staging environment.
    await expect(newTab).toHaveURL('https://achra.com/workstreams');
});

test('has a link for Explore Vetra', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Explore Vetra').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    // TODO: Check if this should redirect to the staging environment.
    await expect(newTab).toHaveURL('https://staging.vetra.io/');
});

test('has a link for Use Cases', async ({ page }) => {
    await page.getByText('Use Cases').last().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/cases`);
});

test('has a link for About us', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('About us').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://powerhousesno.org/');
});

test('has a link for Academy', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Academy').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    // TODO: Check if this should redirect to the staging environment.
    await expect(newTab).toHaveURL('https://staging.powerhouse.academy/');
});