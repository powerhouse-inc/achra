import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/powerhouse/budget-statements`);
});

test('should load the builder info', async ({ page }) => {
    await expect(page.getByText('Facilitator')).toHaveCount(2);
    await expect(page.getByText('Backend Development')).toHaveCount(2);
    await expect(page.getByText('Full Stack Development')).toHaveCount(2);
    await expect(page.getByText('Devops Engineering')).toHaveCount(2);
    await expect(page.getByText('Smart Contract Development')).toHaveCount(2);
    await expect(page.getByText('UI/UX Design')).toHaveCount(2);
    await expect(page.getByText('Technical Writing')).toHaveCount(2);
    await expect(page.getByText('QA Testing')).toHaveCount(2);
    await expect(page.getByText('Data Engineering')).toHaveCount(2);
    await expect(page.getByText('Security Engineering')).toHaveCount(2);
});

test('should load the builder links', async ({ page }) => {
    await page.getByText('Links').hover();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Website')).toBeVisible();
    await expect(page.getByText('Forum')).toBeVisible();
    await expect(page.getByText('Discord')).toHaveCount(2);
    await expect(page.getByText('Twitter')).toHaveCount(2);
    await expect(page.getByText('GitHub')).toBeVisible();
});

test('should navigate to the previous month', async ({ page }) => {
    await expect(page.getByText('JAN 2026')).toBeVisible();
    await page.locator('div.flex.gap-2 > a:nth-child(1)').click();
    await expect(page.getByText('DEC 2025')).toBeVisible();
});

test('should navigate to the next month', async ({ page }) => {
    await expect(page.getByText('JAN 2026')).toBeVisible();
    await page.locator('div.flex.gap-2 > a:nth-child(2)').click();
    await expect(page.getByText('FEB 2026')).toBeVisible();
});

test('should load the MakerDAO Funding Overview', async ({ page }) => {
    await expect(page.getByText('MakerDAO Funding Overview')).toBeVisible();
    await expect(page.getByText('Totals funds made available to Powerhouse over its entire lifetime , since June 2021.')).toHaveCount(1);
    await expect(page.getByText('*All values are converted to USDS')).toHaveCount(1);
    await expect(page.getByText('9 Apr 2025')).toBeVisible();
    await expect(page.getByText('Initial Lifetime Balance')).toBeVisible();
    await expect(page.getByText('2,924,160')).toBeVisible();
    await expect(page.getByText('USD')).toHaveCount(25);
    await expect(page.getByText('-791,666')).toBeVisible();
    await expect(page.getByText('Net Change')).toHaveCount(2);
    await expect(page.getByText('Extra Funds Made Available')).toBeVisible();
    await expect(page.getByText('500,000')).toBeVisible();
    await expect(page.getByText('Funds Returned via DSSBlow')).toBeVisible();
    await expect(page.getByText('291,666')).toBeVisible();
    await expect(page.getByText('New Lifetime Balance')).toBeVisible();
    await expect(page.getByText('3,215,826')).toBeVisible();
});

test('should load View Transaction History', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    page.getByText('View Transaction History').click();

    await expect(page.getByText('Top-up')).toBeVisible();
    await expect(page.getByText('02-Oct-2024 09:08 UTC')).toBeVisible();
    await expect(page.getByText('0x4e289cf451b243...')).toBeVisible();
    await expect(page.getByText('Recipient Address')).toBeVisible();
    await expect(page.getByText('PullUp Labs Operational')).toHaveCount(2);
    await expect(page.getByText('0x42ad...f94c')).toHaveCount(2);
    await expect(page.getByText('Amount')).toBeVisible();
    await expect(page.getByText('275,000')).toHaveCount(3);

    page.getByText('View Transaction History').click();

    await expect(page.getByText('Top-up')).toBeHidden();
    await expect(page.getByText('04-Nov-2024 22:17 UTC')).toBeHidden();
    await expect(page.getByText('0xc78c5d81042ce1...')).toBeHidden();
    await expect(page.getByText('Recipient Address')).toBeHidden();
    await expect(page.getByText('Powerhouse Genesis Operational Hub Association')).toBeHidden();
    await expect(page.getByText('0xf130...0460')).toBeHidden();
    await expect(page.getByText('Amount')).toBeHidden();
    await expect(page.getByText('291,667')).toBeHidden();
});

test('should load MakerDAO Funding Overview info', async ({ page }) => {
    const info = "Monitor funds made available to Ecosystem Actors, track spending, returns, and reserves, differentiate internal/external transactions, and gain insights into changes in MakerDAO's Lifetime Balances.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('div > div:nth-child(4) > div > div > div > div > div > button > svg').first().hover();
    await expect(page.getByText(info)).toBeVisible();
});

test('should load the Total Reserves', async ({ page }) => {
    await expect(page.getByText('Total Reserves')).toBeVisible();
    await expect(page.getByText('On-Chain and off-chain reserves accessible to the Powerhouse Team.')).toHaveCount(1);
    await expect(page.getByText('Include Off-Chain Reserves')).toBeHidden();
    await expect(page.getByText('9 Sep 2024')).toBeVisible();
    await expect(page.getByText('-383,425')).toBeVisible();
    await expect(page.getByText('Initial Reserves')).toBeVisible();
    await expect(page.getByText('695,388')).toHaveCount(2);
    await expect(page.getByText('Inflow')).toHaveCount(2);
    await expect(page.getByText('275,000')).toHaveCount(2);
    await expect(page.getByText('Outflow')).toHaveCount(2);
    await expect(page.getByText('658,425')).toHaveCount(2);
    await expect(page.getByText('New Reserves')).toBeVisible();
    await expect(page.getByText('311,963')).toHaveCount(2);
});

test.skip('should include off-chain reserves', async ({ page }) => {
    await expect(page.getByText('-286,223')).toBeVisible();
    await page.locator('#off-chain-reserves').check();
    await expect(page.getByText('185,652')).toBeVisible();
});

test('should load Total Reserves info', async ({ page }) => {
    const info = "Explore on and off-chain balances in DAI and other currencies, identify the flow of funds and track the total inflow from the Maker Protocol to internal operational wallets, as well as the outflow to external wallets (e.g., Payment Processor) wallets.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > div > div:nth-child(4) > div > div:nth-child(2) > div > div > div > button > svg').first().hover();
    await expect(page.getByText(info)).toBeVisible();
});

test('should load the On Chain Reserves', async ({ page }) => {
    await expect(page.getByText('On Chain Reserves')).toBeVisible();
    await expect(page.getByText('Unspent On-Chain reserves to the Powerhouse Team.')).toHaveCount(1);
    await expect(page.getByText('PullUp Labs Operational')).toBeVisible();
    await expect(page.getByText('Initial Balance')).toBeVisible();
    await expect(page.getByText('New Balance')).toBeVisible();
});

test.skip('should expand accordion for On Chain Reserves with multiple wallets', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Powerhouse Operational')).toBeHidden();
    await page.locator('body > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div').click();

    await expect(page.getByText('Powerhouse Operational')).toBeVisible();
    await expect(page.getByText('0x8ec6...0260')).toBeVisible();
    await expect(page.getByText('Inflow')).toHaveCount(5);
    await expect(page.getByText('491,569')).toHaveCount(1);
    await expect(page.getByText('New Balance')).toHaveCount(4);
    await expect(page.getByText('502,050')).toHaveCount(1);

    await expect(page.getByText('Internal Transaction')).toHaveCount(2);
    await expect(page.getByText('16-Nov-2024 09:53 UTC')).toHaveCount(1);
    await expect(page.getByText('0xa10f5ed561ada6...')).toHaveCount(1);
    await expect(page.getByText('Recipient Address')).toHaveCount(6);
    await expect(page.getByText('Accountable Payment Processor 2')).toHaveCount(3);
    await expect(page.getByText('0x62da...b8b2')).toHaveCount(3);
    await expect(page.getByText('Amount')).toHaveCount(8);
    await expect(page.getByText('228,125')).toHaveCount(1);

    await expect(page.getByText('14-Oct-2024 19:20 UTC')).toHaveCount(1);
    await expect(page.getByText('0x59128979788351...')).toHaveCount(1);
    await expect(page.getByText('243,751')).toHaveCount(1);

    await expect(page.getByText('External Transaction')).toHaveCount(5);
    await expect(page.getByText('14-Oct-2024 19:15 UTC')).toHaveCount(1);
    await expect(page.getByText('0x81c3f30e119211...')).toHaveCount(1);
    await expect(page.getByText('External Address')).toHaveCount(5);
    await expect(page.getByText('0x0b83...8b4f')).toHaveCount(1);
    await expect(page.getByText('19,693')).toHaveCount(1);

    await expect(page.getByText('Initial Balance')).toHaveCount(6);
    await expect(page.getByText('993,619')).toHaveCount(4);

    await expect(page.getByText('Powerhouse Genesis Operational Hub Association')).toHaveCount(1);
    await expect(page.getByText('0xf130...0460')).toHaveCount(1);
    await expect(page.getByText('291,837')).toHaveCount(3);
    await expect(page.getByText('86,491')).toHaveCount(1);
    await expect(page.getByText('205,345')).toHaveCount(1);

    await expect(page.getByText('16-Nov-2024 09:58 UTC')).toHaveCount(3);
    await expect(page.getByText('0x36768ccc471879...')).toHaveCount(3);
    await expect(page.getByText('0x3cf6...c03f')).toHaveCount(4);
    await expect(page.getByText('19,668')).toHaveCount(1);

    await expect(page.getByText('Sender Address')).toHaveCount(2);
    await expect(page.getByText('170')).toHaveCount(1);
    await expect(page.getByText('17,377')).toHaveCount(1);

    await expect(page.getByText('16-Nov-2024 09:57 UTC')).toHaveCount(1);
    await expect(page.getByText('0xaab6a679188b84...')).toHaveCount(1);
    await expect(page.getByText('49,446')).toHaveCount(1);

    await expect(page.getByText('Top-up')).toHaveCount(1);
    await expect(page.getByText('04-Nov-2024 22:17 UTC')).toHaveCount(1);
    await expect(page.getByText('0xc78c5d81042ce1...')).toHaveCount(1);
    await expect(page.getByText('Launch Project')).toHaveCount(1);
    await expect(page.getByText('0x3c51...d02f')).toHaveCount(1);
    await expect(page.getByText('291,667')).toHaveCount(1);
});

test('should expand accordion for On Chain Reserves with a single wallet', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    page.getByText('PullUp Labs Operational').click();

    await expect(page.getByText('Top-up')).toHaveCount(1);
    await expect(page.getByText('02-Oct-2024 09:08 UTC')).toHaveCount(1);
    await expect(page.getByText('0x4e289cf451b243...')).toHaveCount(1);
    await expect(page.getByText('Sender Address')).toHaveCount(1);
    await expect(page.getByText('Launch Project')).toHaveCount(1);
    await expect(page.getByText('0x3c51...d02f')).toHaveCount(1);
    await expect(page.getByText('Amount')).toHaveCount(8);
    await expect(page.getByText('275,000')).toHaveCount(3);

    await expect(page.getByText('External Transaction')).toHaveCount(7);
    await expect(page.getByText('25-Sep-2024 05:56 UTC')).toHaveCount(4);
    await expect(page.getByText('0x43350d5e8c0d9b...')).toHaveCount(4);
    await expect(page.getByText('Recipient Address')).toHaveCount(7);
    await expect(page.getByText('External Address')).toHaveCount(7);
    await expect(page.getByText('0x27f0...3f15')).toHaveCount(1);
    await expect(page.getByText('366,625')).toHaveCount(1);

    await expect(page.getByText('0xb6f7...3b8d')).toHaveCount(2);
    await expect(page.getByText('70,000')).toHaveCount(1);
    await expect(page.getByText('0xf27c...c948')).toHaveCount(1);
    await expect(page.getByText('28,200')).toHaveCount(2);
    await expect(page.getByText('0x81f7...53c1')).toHaveCount(2);
    await expect(page.getByText('28,600')).toHaveCount(1);
    await expect(page.getByText('0x3abcef73f93045...')).toHaveCount(3);
    await expect(page.getByText('80,000')).toHaveCount(1);
    await expect(page.getByText('0x48b8...b06c')).toHaveCount(1);
    await expect(page.getByText('56,800')).toHaveCount(1);
});

test('should load accordion for Growth', async ({ page }) => {
    const info = "Track and analyze the movement of On-Chain assets.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > div > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(1) > div > button > svg').hover();
    await expect(page.getByText(info)).toBeVisible();
});

test.skip('should load Off Chain Reserves', async ({ page }) => {
    await expect(page.getByText('Off Chain Reserves')).toBeVisible();
    await expect(page.getByText('Unspent Off-Chain reserves to the Powerhouse Team.')).toHaveCount(1);
    await expect(page.getByText('Accountable Payment Processor 2')).toBeVisible();
    await expect(page.getByText('0x62da...b8b2')).toBeVisible();
    await expect(page.getByText('1,511,997')).toBeVisible();
    await expect(page.getByText('471,876')).toBeVisible();
    await expect(page.getByText('1,983,872')).toBeVisible();
});

test.skip('should load Off Chain Reserves info', async ({ page }) => {
    const info = "Discover essential details about the off-chain balances.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > svg').last().hover();
    await expect(page.getByText(info)).toBeVisible();
});

test.skip('should load the Off Chain Reserves transactions', async ({ page }) => {
    await page.getByText('Accountable Payment Processor 2').click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Top-up')).toHaveCount(2);
    await expect(page.getByText('16-Nov-2024 09:53 UTC')).toBeVisible();
    await expect(page.getByText('0xa10f5ed561ada6...')).toBeVisible();
    await expect(page.getByText('Sender Address')).toHaveCount(2);
    await expect(page.getByText('Powerhouse Operational')).toHaveCount(2);
    await expect(page.getByText('0x8ec6...0260')).toHaveCount(2);
    await expect(page.getByText('228,125')).toBeVisible();
    await expect(page.getByText('0x59128979788351...')).toBeVisible();
    await expect(page.getByText('243,751')).toBeVisible();
});

test('should load Reported Expenses Comparison main data', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Reported Expenses Comparison')).toBeVisible();
    await expect(page.getByText('Reported actuals compared to expense and revenue transactions.')).toHaveCount(1);
    await expect(page.getByText('Reported Actuals')).toHaveCount(3);
    await expect(page.getByText('Net Expense Transactions')).toBeVisible();
    await expect(page.getByText('On-chain only')).toBeHidden();
    await expect(page.getByText('Difference')).toHaveCount(2);
    await expect(page.getByText('Including off-chain')).toBeHidden();
    await expect(page.getByText('Sep-2024')).toHaveCount(2);
    await expect(page.getByText('165,000.00')).toHaveCount(2);
    await expect(page.getByText('Aug-2024')).toHaveCount(2);
    await expect(page.getByText('158,800.00')).toBeVisible();
    await expect(page.getByText('Jul-2024')).toHaveCount(2);
    await expect(page.getByText('130,200.00')).toBeVisible();
    await expect(page.getByText('0.00%')).toHaveCount(5);
    await expect(page.getByText('Totals')).toHaveCount(3);
    await expect(page.getByText('454,000.00 USD')).toBeVisible();
});

test('should load Reported Expenses Comparison info', async ({ page }) => {
    const info = "Understand the differences between reported and net transactions. Easily spot variations and improve financial tracking for comprehensive expense and revenue analysis.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > div > div:nth-child(4) > div > div > div > div > button > svg').hover();
    await expect(page.getByText(info)).toBeVisible();
});

test.skip('should load the On-chain only info', async ({ page }) => {
    const info = "On-Chain view offers valuable insights into On-Chain dynamics, but excludes external (off-chain) transactions.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > div > div > div > div > div > div > div > table > thead > tr:nth-child(2) > th:nth-child(1) > div > svg').hover();
    await expect(page.getByText(info)).toBeVisible();
});

test.skip('should load the Including off-chain info', async ({ page }) => {
    const info = "Enhance financial tracking and expense analysis by including off-chain transactions.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > div > div > div > div > div > div > div > table > thead > tr:nth-child(2) > th:nth-child(3) > div > svg').hover();
    await expect(page.getByText(info)).toBeVisible();
});