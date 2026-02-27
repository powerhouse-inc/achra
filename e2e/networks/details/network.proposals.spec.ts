import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Temporarily skipped for the MVP.
    test.skip(true);

    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('should save in clipboard the proposals link', async ({ page }) => {
    await page.locator('#___SECTION___proposals *> div > span.inline-flex').click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse#proposals`);
});

test('should paginate proposals', async ({ page }) => {
    await expect(page.getByText('2.3: User Dashboard').first()).toBeVisible();
    await page.locator('section[id="___SECTION___proposals"] *> .swiper-pagination-bullet').last().click();

    await expect(page.getByText('2.3: User Dashboard').first()).toBeVisible();
});

// TODO: Check what is the data that should be displayed in the proposals
test('should contain 6 proposals', async ({ page }) => {
    await expect(page.getByText('2.3: User Dashboard').first()).toBeVisible();
    await expect(page.locator('#___SECTION___proposals *> .swiper *> .swiper-slide')).toHaveCount(6);
});

// TODO: Check what is the correct proposal details page
test.skip('should navigate to the prposal after clicking on the Details button', async ({ page }) => {
    // find the first proposal and click on the Details button
    await page.locator('#___SECTION___proposals *> .swiper *> .swiper-slide').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/proposal/2.3-user-dashboard`);
});