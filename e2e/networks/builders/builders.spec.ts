import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.achra.com/network/powerhouse/builders');
});

test('should have the main elements', async ({ page }) => {
    await expect(page.getByText('Powerhouse')).toHaveCount(3);
    await expect(page.getByText('Builders')).toHaveCount(6);
    await expect(page.getByText('Read more')).toBeVisible();
    await expect(page.getByText('Ecosystem Actors serve as external entities offering valuable services to both Maker Core and SubDAOs. These actors are further classified into two categories: Advisory Ecosystem Actors and Active Ecosystem Actors.')).toBeVisible();
    await expect(page.getByText('Active Ecosystem Actors work according to the specifications of Scope Alignment Artifacts to receive funding for performing specific projects such as developing new features, data collection, marketing, growth, and other operational activities that benefit the Sky Ecosystem.')).toBeVisible();
    await expect(page.getByText('In contrast, Advisory Council Member Ecosystem Actors engage in research and offer guidance to the Sky Ecosystem, contributing to the refinement of Scopes Artifacts and their underlying procedures.')).toBeVisible();

    await expect(page.getByPlaceholder('Search...')).toBeVisible();
    await expect(page.getByText('Scopes')).toHaveCount(1);
    await expect(page.getByText('Builder Skills')).toHaveCount(1);

    await expect(page.getByRole('button', { name: 'Builders' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skills' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Scope' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Last Modified' })).toBeVisible();
});

test('should load all builder names', async ({ page }) => {
    await expect(page.getByText('PW Powerhouse')).toHaveCount(2);
    await expect(page.getByText('BAI BAI')).toHaveCount(2);
    await expect(page.getByText('TP teep')).toHaveCount(2);
    await expect(page.getByText('LIB liberuum')).toHaveCount(2);
    await expect(page.getByText('AP apeiron')).toHaveCount(2);
});

test('should load all builder statuses', async ({ page }) => {
    await expect(page.getByText('COMPLETED')).toHaveCount(0);
    await expect(page.getByText('ON HOLD')).toHaveCount(0);
    await expect(page.getByText('ARCHIVED')).toHaveCount(0);
    await expect(page.getByText('ACTIVE')).toHaveCount(12);
    await expect(page.getByText('INACTIVE')).toHaveCount(2);
});

test('should load all builder skills', async ({ page }) => {
    await expect(page.getByText('Full Stack Development')).toHaveCount(9);
    await expect(page.getByText('Data Engineering')).toHaveCount(6);

    await expect(page.getByText('QA Testing')).toHaveCount(3);
    await expect(page.getByText('Technical Writing')).toHaveCount(3);

    await page.locator('table > tbody > tr:nth-child(1) > td > a > div > div.hidden > div:nth-child(2) > div').click();
    await expect(page.getByText('UI/UX Design')).toHaveCount(1);
});

test.skip('should load all builder scopes', async ({ page }) => {
    await expect(page.getByText('ACC')).toHaveCount(16);
    await expect(page.getByText('STA')).toHaveCount(6);
    await expect(page.getByText('SUP')).toHaveCount(9);
    await expect(page.getByText('Stability Scope')).toHaveCount(1);
    await expect(page.getByText('Support Scope')).toHaveCount(2);
    await expect(page.getByText('Protocol Scope')).toHaveCount(1);
    await expect(page.getByText('Governance Scope')).toHaveCount(1);
    await expect(page.getByText('Accessibility Scope')).toHaveCount(4);
});

test('should load all last modified values', async ({ page }) => {
    await expect(page.getByText('2 Days Ago')).toHaveCount(8);
    await expect(page.getByText('14 Hours Ago')).toHaveCount(2);
    await expect(page.getByText('16-DEC-2025')).toHaveCount(4);
    await expect(page.getByText('18-DEC-2025')).toHaveCount(1);
});

test('should load all builder links', async ({ page }) => {
    await expect(page.getByText('Links')).toHaveCount(10);

    await page.getByText('Links').first().hover();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Website')).toBeVisible();
    await expect(page.getByText('Forum')).toBeVisible();
    await expect(page.getByText('Discord')).toBeVisible();
    await expect(page.getByText('Twitter')).toBeVisible();
    await expect(page.getByText('GitHub')).toBeVisible();
});

test('should redirect to the link of the builder website', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Links').first().hover();
    await page.waitForTimeout(1000);
    await page.getByText('Website').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://app.aave.com/');
});

test('should redirect to the link of the builder forum', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Links').first().hover();
    await page.waitForTimeout(1000);
    await page.getByText('Forum').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://governance.aave.com/t/arc-spark-lend-profit-share-proposal/11615/');
});

test('should redirect to the link of the builder discord', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Links').first().hover();
    await page.waitForTimeout(1000);
    await page.getByText('Discord').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://discord.com/');
});

test('should redirect to the link of the builder twitter', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Links').first().hover();
    await page.waitForTimeout(1000);
    await page.getByText('Twitter').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://x.com/');
});

test('should redirect to the link of the builder github', async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");

    await page.getByText('Links').first().hover();
    await page.waitForTimeout(1000);
    await page.getByText('GitHub').first().click();

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL('https://github.com/');
});

test('should sort builders by name in ascending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Builders' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('AP apeiron')).toBeVisible();
});

test('should sort builders by name in descending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Builders' }).click();
    await page.getByRole('button', { name: 'Builders' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('TP teep')).toBeVisible();
});

test('should sort builders by skills in ascending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Skills' }).click();
    await expect(page.locator('tbody > tr:nth-child(1) > td:nth-child(2)')).toBeEmpty();
});

test('should sort builders by skills in descending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Skills' }).click();
    await page.getByRole('button', { name: 'Skills' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('Full Stack Development')).toBeVisible();
});

test.skip('should sort builders by scope in ascending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Scope' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('Support Scope')).toBeVisible();
});

test.skip('should sort builders by scope in descending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Scope' }).click();
    await page.getByRole('button', { name: 'Scope' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('ACC')).toBeVisible();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('STA')).toBeVisible();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('SUP')).toBeVisible();
});

test('should sort builders by last modified in ascending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Last Modified' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('14 Hours Ago')).toBeVisible();
});

// TODO: Now all fields have the same Last Modified value, so we need to check this test later
test('should sort builders by last modified in descending order', async ({ page }) => {
    await page.getByRole('button', { name: 'Last Modified' }).click();
    await page.getByRole('button', { name: 'Last Modified' }).click();
    await expect(page.locator('tbody > tr:nth-child(1)').getByText('2 Days Ago')).toBeVisible();
});

test('should reset all sorting of builders', async ({ page }) => {
    await page.getByPlaceholder('Search...').fill('Dewiz');
    await page.getByText('Builder Skills').click();
    await page.getByText('Select All').click();
    await expect(page).toHaveURL(`https://staging.achra.com/network/powerhouse/builders?search=Dewiz&builderSkills=BACKEND_DEVELOPMENT,DATA_ENGINEERING,DEVOPS_ENGINEERING,FRONTEND_DEVELOPMENT,FULL_STACK_DEVELOPMENT,QA_TESTING,SECURITY_ENGINEERING,SMART_CONTRACT_DEVELOPMENT,TECHNICAL_WRITING,UI_UX_DESIGN`);

    await page.getByText('Reset Filter').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(`https://staging.achra.com/network/powerhouse/builders`);
});