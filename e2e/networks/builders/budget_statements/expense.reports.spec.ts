import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/powerhouse/budget-statements?section=expense-reports`);
});

test('should load the section top content', async ({ page }) => {
    await expect(page.getByText('CES Core Unit on-chain transaction history')).toBeVisible();
});

test('should load the totals summary', async ({ page }) => {
    await expect(page.getByText('Actuals - Dec 2024 Totals')).toBeVisible();
    await expect(page.getByText('Wallet')).toBeVisible();
    await expect(page.getByText('Mthly Budget')).toHaveCount(13);
    await expect(page.getByText('Forecast')).toHaveCount(15);
    await expect(page.getByText('Actuals')).toHaveCount(14);
    await expect(page.getByText('Difference')).toHaveCount(15);
    await expect(page.getByText('Payments')).toHaveCount(13);

    await expect(page.getByText('Powerhouse (Dai)')).toHaveCount(3);
    await expect(page.getByText('0x8ec..80260')).toHaveCount(2);
    await expect(page.getByText('0.00')).toHaveCount(46);
    await expect(page.getByText('192,296.66')).toHaveCount(6);
    await expect(page.getByText('202,877.05')).toHaveCount(6);
    await expect(page.getByText('-10,580.39')).toHaveCount(6);
    await expect(page.getByText('170,050.71')).toHaveCount(4);

    await expect(page.getByText('Ph-genesis Ops Hub (Dai)')).toHaveCount(3);
    await expect(page.getByText('0xf13..a0460')).toHaveCount(2);
    await expect(page.getByText('291,666.67')).toHaveCount(4);
    await expect(page.getByText('165,070.01')).toHaveCount(2);
    await expect(page.getByText('158,505.97')).toHaveCount(4);
    await expect(page.getByText('6,564.04')).toHaveCount(2);

    await expect(page.getByText('Total')).toHaveCount(7);
    await expect(page.getByText('357,366.67')).toHaveCount(2);
    await expect(page.getByText('361,383.02')).toHaveCount(2);
    await expect(page.getByText('-4,016.35')).toHaveCount(2);
    await expect(page.getByText('328,556.68')).toHaveCount(2);
});
