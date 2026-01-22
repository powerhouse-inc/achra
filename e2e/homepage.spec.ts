import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/`);
});

test('has a link to the Networks page', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('a.framer-11lmli7.framer-122cz0u').getByText('Networks').click();

    await expect(page).toHaveURL('https://staging.achra.com/networks');
});

test.skip('has a link to the Workstreams page', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('a.framer-1rjqhys.framer-122cz0u').getByText('Workstreams').click();

    await expect(page).toHaveURL('https://staging.achra.com/workstreams');
});

test('has a link to the Services page', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('a.framer-18lak58.framer-122cz0u').getByText('Services').click();

    await expect(page).toHaveURL('https://staging.achra.com/services');
});

test('has a link to the Use Cases page', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('a.framer-1cgu14x.framer-122cz0u').getByText('Use Cases').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/cases`);
});

test('has a link to the Networks page in the "For Organizations" section', async ({ page }) => {
    await page.getByText('For Organizations').first().click();

    await page.getByText('View networks').click();

    await expect(page).toHaveURL('https://staging.achra.com/networks');
});

test.skip('has a link to the Networks page from the button "Create your own"', async ({ page }) => {
    await page.getByText('For Organizations').first().click();

    await page.getByText('Create your own').click();

    await expect(page).toHaveURL('https://staging.achra.com/networks');
});

test('has a link to the Workstreams page in the "For Builders" section', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.waitForLoadState('networkidle');
    await page.getByText('For Builders').click();
    await expect(page.getByText('Builder Opportunities')).toBeVisible();

    // TODO: Check if this should redirect to the staging environment.
    await page.getByText('Builder Opportunities').click()
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://achra.com/workstreams');
});

test.skip('has a link to the Workstreams page for Open From Proposals from the button "Create your own"', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByText('For Builders').click();

    await page.getByText('Sign up').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=OPEN_FOR_PROPOSALS`);
});

test('has a link to the Services page in the "For Operators" section', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.waitForLoadState('networkidle');
    await page.getByText('For Operators').click();
    await expect(page.getByText('Service Catalog')).toBeVisible();

    // TODO: Check if this should redirect to the staging environment.
    await page.getByText('Service Catalog').click()
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://achra.com/services');
});

test.skip('has a link to the SNOs page from the button "Learn more about SNOs"', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.waitForLoadState('networkidle');
    await page.getByText('Learn more about SNOs').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://www.scalablenetwork.org/');
});

test('has a link to the Use Cases page from the link "View Use Cases"', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByText('View Use Cases').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/cases`);
});

test.skip('has a link to the Vetra page from the button "Start Building"', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.waitForLoadState('networkidle');
    await page.getByText('Start Building').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://staging.vetra.io/');
});

test('has a link to the Powerhouse SNO page from the link "Visit Powerhouse"', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.waitForLoadState('networkidle');
    await page.getByText('Visit Powerhouse').click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://powerhousesno.org/');
});

// This needs a VPN, if it is run in Belarus.
test('has a button to subscribe to the Powerhouse waitlist', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder('Drop your email for launch updates.').fill('test@test.com');
    await page.getByText('Get Notified').click();

    await expect(page.getByText('Thank you')).toBeVisible();
});