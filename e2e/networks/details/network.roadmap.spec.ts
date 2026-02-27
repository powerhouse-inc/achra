import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Temporarily skipped for the MVP.
    test.skip(true);

    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('should save in clipboard the roadmap link', async ({ page }) => {
    await page.locator('#___SECTION___roadmap *> span.inline-flex').click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse#roadmap`);
});

test('should display second roadmap after clicking on the second tab', async ({ page }) => {
    await expect(page.locator('div.swiper-wrapper').getByText('DOP')).toBeVisible();

    //TODO: refactor locator
    await page.locator('section[id="___SECTION___roadmap"] *> div[role="tablist"] *> button').last().click();

    await expect(page.locator('div.swiper-wrapper').getByText('AMVP-1')).toBeVisible();
});

test('should navigate to the network details page by clicking on the Details link', async ({ page }) => {
    // TODO: refactor locator
    await page.locator('div.swiper-wrapper *> div[data-slot="card-header"] > a').getByText('Details').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/roadmap/powerhouse-team-2024-roadmap-af7da134#DOP`);
});

test('should display hidden members', async ({ page }) => {
    //TODO: refactor locator
    await page.locator('div.swiper-slide.swiper-slide-active.flex').getByText('+2').first().hover();

    await expect(page.getByText('meraki')).toHaveCount(2);
});

test('should redirect to the link of the key result', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    //TODO: refactor locator
    await page.waitForLoadState('networkidle');
    await page.locator('div.swiper-wrapper *> div.milestone-latest-key-results *> li').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://github.com/makerdao-ses/ecosystem-dashboard/releases/tag/v0.33.0');
});

test('should paginate roadmaps', async ({ page }) => {
    await expect(page.locator('div.swiper-wrapper').getByText('PMC')).toBeHidden();
    await page.locator('section[id="___SECTION___roadmap"] *> .swiper-pagination-bullet').last().click();

    await expect(page.locator('div.swiper-wrapper').getByText('PMC')).toBeVisible();
});

test('should contain the required data for a roadmap', async ({ page }) => {
    const roadmapDescription = "Make Achra the official transparency reporting platform for Powerhouse, SKY, and its Prime Agents as required by the Atlas. The expectation is from launch day onwards, all the network administration teams, the project/product managers, the builders and the finance operators are using Achra and the associated Connect apps on a daily basis to keep track of work and finances. "
    await page.locator('#___SECTION___roadmap *> button:nth-child(2)').click();
    await expect(page.getByText(roadmapDescription)).toBeVisible();
});