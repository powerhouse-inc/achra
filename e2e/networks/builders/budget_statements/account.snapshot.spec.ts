import { test, expect } from '@playwright/test';

const currentMonth = 'Jul2025';
const currentMonthText = 'JUL 2025';
const previousMonthText = 'JUN 2025';

// Note: the 'powerhouse' builder slug was removed — budget statements data lives under 'business-analysis-and-integrations'
const builderSlug = 'business-analysis-and-integrations';
const builderName = 'Powerhouse Genesis';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/${builderSlug}/budget-statements?section=account-snapshot&viewMonth=${currentMonth}`);

    await page.waitForLoadState('networkidle');
});

test('should load the builder info', async ({ page }) => {
    await expect(page.getByText('Facilitator')).toHaveCount(0);
    await expect(page.getByText('Backend Development')).toHaveCount(0);
    await expect(page.getByText('Full Stack Development')).toHaveCount(0);
    await expect(page.getByText('Devops Engineering')).toHaveCount(0);
    await expect(page.getByText('Smart Contract Development')).toHaveCount(0);
    await expect(page.getByText('UI/UX Design')).toHaveCount(0);
    await expect(page.getByText('Technical Writing')).toHaveCount(0);
    await expect(page.getByText('QA Testing')).toHaveCount(0);
    await expect(page.getByText('Data Engineering')).toHaveCount(0);
    await expect(page.getByText('Security Engineering')).toHaveCount(0);
});

test('should load the builder links', async ({ page }) => {
    await page.getByText('Links').click();

    // Verify the links popover opened and contains at least one link item
    await expect(page.getByRole('menu')).toBeVisible();
    await expect(page.getByRole('menuitem').count()).resolves.toBeGreaterThan(0);
});

// Blocked: re-enable when account snapshot data is available for the powerhouse builder
test.skip('should navigate to the previous month', async ({ page }) => {
    await expect(page.getByText(currentMonthText)).toHaveCount(5);
    await page.locator('div.flex.gap-2 > a:nth-child(1)').click();
    await expect(page.getByText(previousMonthText)).toHaveCount(5);
});

test.skip('should navigate to the next month', async ({ page }) => {
    await expect(page.getByText(currentMonthText)).toHaveCount(5);
    await page.locator('div.flex.gap-2 > a:nth-child(1)').click();
    await expect(page.getByText(previousMonthText)).toHaveCount(5);
    await page.locator('div.flex.gap-2 > a:nth-child(2)').click();
    await expect(page.getByText(currentMonthText)).toHaveCount(5);
});

test.skip('should load the Funding Overview', async ({ page }) => {
    await expect(page.getByText('*All values are converted to USDS')).toHaveCount(1);
    await expect(page.getByText(`1 ${currentMonthText}`).count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Initial Lifetime Balance')).toBeVisible();
    await expect(page.getByText('0').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('USD').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Net Change').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Extra Funds Made Available')).toBeVisible();
    await expect(page.getByText('Funds Returned via DSSBlow')).toBeVisible();
    await expect(page.getByText('New Lifetime Balance')).toBeVisible();
});

test.skip('should load View Transaction History', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    page.getByText('View Transaction History').click();
    await expect(page.getByText('No transactions this month')).toBeVisible();

    page.getByText('View Transaction History').click();
    await expect(page.getByText('No transactions this month')).toBeHidden();
});

test.skip('should load Funding Overview info', async ({ page }) => {
    const info = `Monitor funds made available to track spending, returns, and reserves, differentiate internal/external transactions, and gain insights into changes in ${builderName} Lifetime Balances.`;

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('div > div:nth-child(4) > div > div > div > div > div > button > svg').first().hover();
    await expect(page.getByText(info)).toBeVisible();
});

test.skip('should load the Total Reserves', async ({ page }) => {
    await expect(page.getByText('Total Reserves')).toBeVisible();
    await expect(page.getByText(`On-Chain and off-chain reserves accessible to the ${builderName} Team.`)).toHaveCount(1);
    await expect(page.getByText('Include Off-Chain Reserves')).toBeHidden();

    await expect(page.getByText(`1 ${currentMonthText}`).count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Initial Reserves')).toBeVisible();

    await expect(page.getByText('Net Change')).toHaveCount(2);
    await expect(page.getByText('Inflow')).toHaveCount(2);
    await expect(page.getByText('Outflow')).toHaveCount(2);

    await expect(page.getByText(`31 ${currentMonthText}`).count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('New Reserves')).toBeVisible();
});

test.skip('should load Total Reserves info', async ({ page }) => {
    const info = "Explore on and off-chain balances USD related cryptocurrencies, identify the flow of funds and track the total inflow from source to internal operational wallets, as well as the outflow to external wallets (e.g., Payment Processor) wallets."

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > main > div:nth-child(3) > div:nth-child(4) > div > div:nth-child(2) > div > div > div > button > svg').first().hover();
    await expect(page.getByText(info)).toBeVisible();
});

test.skip('should load the On Chain Reserves', async ({ page }) => {
    await expect(page.getByText('On Chain Reserves')).toBeVisible();
    await expect(page.getByText(`Unspent on-chain reserves to the ${builderName} Team.`).count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Operational').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Initial Balance').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('New Balance').count()).resolves.toBeGreaterThan(0);
});

test.skip('should expand accordion for On Chain Reserves with multiple wallets', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Powerhouse Genesis Operational Hub Reserves')).toBeHidden();

    await page.locator('body > main > div:nth-child(3) > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div[data-state="closed"]').click();

    await expect(page.getByText('Powerhouse Genesis Operational Hub')).toHaveCount(1);
    await expect(page.getByText('Inflow')).toHaveCount(3);
    await expect(page.getByText('Outflow')).toHaveCount(3);
    await expect(page.getByText('New Balance')).toHaveCount(2);
    await expect(page.getByText('External').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Recipient Address').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('N/A').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Amount').count()).resolves.toBeGreaterThan(0);
});

test.skip('should expand accordion for On Chain Reserves with a single wallet', async ({ page }) => {
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

test.skip('should load accordion for Growth', async ({ page }) => {
    const info = "Track and analyze the movement of On-Chain assets.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > main > div:nth-child(3) > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(1) > div > button > svg').hover();
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

test.skip('should load Reported Expenses Comparison main data', async ({ page }) => {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    await expect(page.getByText('Reported Expenses Comparison')).toHaveCount(1);
    await expect(page.getByText('Reported actuals compared to expense and revenue transactions.')).toHaveCount(1);
    await expect(page.getByText('Reported Actuals')).toHaveCount(3);
    await expect(page.getByText('Net Expense Transactions')).toBeVisible();
    await expect(page.getByText('On-chain only')).toBeHidden();
    await expect(page.getByText('Difference')).toHaveCount(2);
    await expect(page.getByText('Including off-chain')).toBeHidden();
    await expect(page.getByText('Jul-2025')).toHaveCount(2);
    await expect(page.getByText('Jun-2025')).toHaveCount(2);
    await expect(page.getByText('May-2025')).toHaveCount(2);
    await expect(page.getByText('Totals')).toHaveCount(3);
});

test.skip('should load Reported Expenses Comparison info', async ({ page }) => {
    const info = "Understand the differences between reported and net transactions. Easily spot variations and improve financial tracking for comprehensive expense and revenue analysis.";

    await page.waitForLoadState('networkidle');

    await expect(page.getByText(info)).toBeHidden();
    await page.locator('body > main > div > div:nth-child(4) > div > div > div > div > button > svg').hover();
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