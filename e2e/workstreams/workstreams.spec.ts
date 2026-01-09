import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams`);
});

test('should not display workstreams by non-existent workstream title', async ({ page }) => {
    const workstreamTitle = 'querty';
    await page.locator('input[type="search"]').fill(workstreamTitle);

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?search=${workstreamTitle}`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

test.skip('should display an existing workstream by title', async ({ page }) => {
    await page.locator('input[type="search"]').fill('Spark');

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?search=Spark`);
    await expect(page.getByText('Powerhouse Workstream 24')).toBeHidden();
    await expect(page.getByText('Spark Workstream 2025')).toBeVisible();
});

test.skip('should display workstreams by status RFP DRAFT', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-slot="command-group"]').getByText('RFP DRAFT').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=RFP_DRAFT`);
    await expect(page.getByText('Powerhouse Workstream 24')).toBeHidden();
    await expect(page.getByText('Spark Workstream 2025')).toBeVisible();
});

// TODO: This workstream was removed in the staging environment. 
// A new test should be created to display an empty state.
test.skip('should display workstreams by status PREWORK RFC', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-slot="command-group"]').getByText('PREWORK RFC').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=PREWORK_RFC`);
    await expect(page.getByText('Powerhouse Workstream 24')).toBeHidden();
    await expect(page.getByText('BOCA-RFP')).toBeVisible();
});

test('should not display any workstreams by status RFP CANCELLED', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.getByText('RFP CANCELLED').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=RFP_CANCELLED`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

test.skip('should display workstreams by status OPEN FOR PROPOSALS', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-slot="command-group"]').getByText('OPEN FOR PROPOSALS').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=OPEN_FOR_PROPOSALS`);
    await expect(page.getByText('Powerhouse Workstream 24')).toBeHidden();
    await expect(page.getByText('Grove WS1')).toBeVisible();
});

// TODO: This workstream was removed in the staging environment. 
// A new test should be created to display an empty state.
test.skip('should display workstreams by status PROPOSAL SUBMITTED', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-slot="command-group"]').getByText('PROPOSAL SUBMITTED').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=PROPOSAL_SUBMITTED`);
    await expect(page.getByText('Powerhouse Workstream 24')).toBeHidden();
    await expect(page.getByText('memo-workstream')).toBeVisible();
});

test.skip('should display workstreams by status AWARDED', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-value="AWARDED"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=AWARDED`);
    await expect(page.getByText('Powerhouse Workstream 24')).toBeVisible();
});

test('should not display any workstreams by status IN PROGRESS', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.getByText('IN PROGRESS').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=IN_PROGRESS`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

test('should not display any workstreams by status FINISHED', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-value="FINISHED"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=FINISHED`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

test('should not display any workstreams by status NOT AWARDED', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.locator('div[data-value="NOT_AWARDED"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=NOT_AWARDED`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

test('should display all workstreams by status', async ({ page }) => {
    await page.getByText('All Statuses').click();
    await page.getByText('Select All').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?statuses=RFP_DRAFT,PREWORK_RFC,RFP_CANCELLED,OPEN_FOR_PROPOSALS,PROPOSAL_SUBMITTED,AWARDED,IN_PROGRESS,FINISHED,NOT_AWARDED`);
});

test('should display workstreams by network Powerhouse', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="powerhouse"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=powerhouse`);
    await expect(page.getByText('Powerhouse Workstream 2024')).toBeVisible();
});

test.skip('should display workstreams by network Spark', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="spark"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=spark`);
    await expect(page.getByText('Spark Workstream 2025')).toBeVisible();
});

test.skip('should display workstreams by network Grove', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="grove"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=grove`);
    await expect(page.getByText('Grove WS1')).toBeVisible();
});

test.skip('should display workstreams by network Sky', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="sky"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=sky`);
    await expect(page.getByText('sky ws')).toBeVisible();
});

test.skip('should not display any workstreams by network DeFi Legal Commons (DLC)', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="defi-legal-commons-(dlc)"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=defi-legal-commons-(dlc)`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

// TODO: This network was removed in the staging environment.
test.skip('should display workstreams by network Liberuum network', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="liberuum-network"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=liberuum-network`);
    await expect(page.getByText('liberuum workstream')).toBeVisible();
});

// TODO: This network was removed in the staging environment.
test.skip('should not display any workstreams by network Willow', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="willow"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=willow`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

// TODO: This network was removed in the staging environment.
test.skip('should not display any workstreams by network Teeps Global Network of Talented Consultants', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.getByText('Teeps Global Network of Talented Consultants').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=teeps-global-network-of-talented-consultants`);
    await expect(page.getByText('No workstreams found')).toBeVisible();
});

test('should display all workstreams by network', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="__select_all__"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/workstreams?networks=powerhouse`);
});

test('should navigate to the network page by clicking on the logo', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="powerhouse"]').click();
    await page.locator('a[href="/network/powerhouse"]').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse`);
});

test('should navigate to the workstream page by clicking on the workstream name', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="powerhouse"]').click();
    await page.getByText('Powerhouse Workstream 2024').click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/workstream/powerhouse-workstream-2024`);
});

test('should navigate to the RFP page by clicking on the RFP link', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="powerhouse"]').click();
    await expect(page.getByText('Spark Workstream 2025')).toBeHidden();

    await page.getByText('Issuer').click();
    await page.getByText('RFP Details').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/workstream/powerhouse-workstream-2024/rfp`);
});

test('should navigate to the Initial Proposal page by clicking on the Initial Proposal link', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="powerhouse"]').click();
    await expect(page.getByText('Spark Workstream 2025')).toBeHidden();

    await page.getByText('Issuer').click();
    await page.getByText('View Proposal').first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/workstream/powerhouse-workstream-2024/initial-proposal`);
});

test('should display more workstreams by clicking on the Load More button', async ({ page }) => {
    await page.getByText('All Networks').click();
    await page.locator('div[data-value="powerhouse"]').click();
    await expect(page.getByText('Spark Workstream 2025')).toBeHidden();

    await page.getByText('Load More').click();
    await expect(page.getByText('PEA10')).toHaveCount(2);
});