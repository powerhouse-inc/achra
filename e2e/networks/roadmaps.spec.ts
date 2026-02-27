import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Temporarily skipped for the MVP.
    test.skip(true);

    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/roadmaps`);
});

test('has a breadcrumb to go back to the network page', async ({ page }) => {
    // TODO: refactor locator
    await page.locator('li[data-slot="breadcrumb-item"]').getByText("Powerhouse").click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('can search for a roadmap', async ({ page }) => {
    // focus on search input
    // type 'querty'
    // assert: check if there is an empty state, because no roadmap should have that name
});

test('can filter roadmaps by status', async ({ page }) => {
    // focus on status filter
    // select 'In Progress' and wait for the page to load
    // assert: check if there is at least 1 roadmap in the list
});

test('the logo navigates to the network page', async ({ page }) => {
    // TODO: refactor locator
    await page.locator('.bg-secondary > div.flex').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('the workstream name navigates to the workstream page', async ({ page }) => {
    // TODO: refactor locator
    await page.locator('.bg-secondary > a').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/workstream/powerhouse-workstream-2024`);
});

test('navigates to the Roadmap details page', async ({ page }) => {
    // TODO: refactor locator
    await page.locator('a[href*="powerhouse-team-2024-roadmap-af7da134"]').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/roadmap/powerhouse-team-2024-roadmap-af7da134`);
});

test('navigates to the milenstone details in the Roadmap details page', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('div.hidden *> a[href*="#PROD"]').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/roadmap/powerhouse-team-2024-roadmap-af7da134#PROD`);
});

test('should display hidden members', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('div.swiper-slide.swiper-slide-active.flex').getByText('+2').first().hover();

    await expect(page.getByText('meraki')).toHaveCount(2);
});

test('should redirect to the link of the key result', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    //TODO: refactor locator
    await page.locator('div.swiper-wrapper *> div.milestone-latest-key-results *> li').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://github.com/makerdao-ses/ecosystem-dashboard/releases/tag/v0.33.0');
});

test('loads more roadmaps', async ({ page }) => {
    // await page.goto('https://staging.achra.com/network/powerhouse/roadmaps');
    // click on the "Load more" button
    // assert: check if there are more roadmaps in the list
});