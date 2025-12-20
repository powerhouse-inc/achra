import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.achra.com/network/powerhouse');
});

test('should save in clipboard the finances link', async ({ page }) => {
    await page.locator('#___SECTION___finances *> span.inline-flex').click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

    expect(clipboardContent).toContain('https://staging.achra.com/network/powerhouse#finances');
});

test('should display stats for Sky Ecosystem Finances', async ({ page }) => {
    await expect(page.getByText('USDS Spent:')).toBeHidden();
    await page.waitForTimeout(3000);

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(1)').hover({
        position: { x: 100, y: 120 },
    });
    await expect(page.getByText('650,000.00')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(1)').hover({
        position: { x: 180, y: 120 },
    });
    await expect(page.getByText('890,000.00')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(1)').hover({
        position: { x: 280, y: 120 },
    });
    await expect(page.getByText('1,150,000.00')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(1)').hover({
        position: { x: 280, y: 120 },
    });
    await expect(page.getByText('1,150,000.00')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(1)').hover({
        position: { x: 380, y: 120 },
    });
    await expect(page.getByText('1,480,000.00')).toBeVisible();
});

test('should display stats for Realized Expenses - Actuals', async ({ page }) => {
    await expect(page.getByText('Legay Core Units:')).toBeHidden();
    await page.waitForTimeout(3000);

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 100, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('167,294.68')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 135, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('1,300,576.61')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 170, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('2,276,184.24')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 210, y: 120 },
    });
    await expect(page.getByText('Q1-2022')).toBeVisible();
    await expect(page.getByText('4,363,027.53')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 250, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('6,264,623.09')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 290, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('8,068,610.28')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 330, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('7,899,673.89')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 370, y: 120 },
    });
    await expect(page.getByText('Q1-2023')).toBeVisible();
    await expect(page.getByText('5,191,647.49')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 440, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('62,093.12')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 480, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('446,726.05')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 520, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('447,976.05')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 560, y: 120 },
    });
    await expect(page.getByText('Q1-2024')).toBeVisible();
    await expect(page.getByText('664,655.62')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 600, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('1,345,705.45')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 640, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('933,381.69')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 660, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('495,018.29')).toBeVisible();
});

test('should display stats for Realized Expenses - Payments', async ({ page }) => {
    await page.locator('#___SECTION___finances *> div.items-end > button:nth-child(2)').click();

    await expect(page.getByText('Legay Core Units:')).toBeHidden();
    await page.waitForTimeout(3000);

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 70, y: 120 },
    });
    await expect(page.getByText('Q1-2021')).toBeVisible();
    await expect(page.getByText('55,866.75')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 100, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('1,205,772.066')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 135, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('3,472,705.203')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 170, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('6,752,594.964')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 210, y: 120 },
    });
    await expect(page.getByText('Q1-2022')).toBeVisible();
    await expect(page.getByText('11,945,556.303')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 250, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('7,901,045.123')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 290, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('9,743,521.611')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 330, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('7,352,978.408')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 370, y: 120 },
    });
    await expect(page.getByText('Q1-2023')).toBeVisible();
    await expect(page.getByText('9,780,753.772')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 440, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('527,679.413')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 480, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('-147,255.832')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 520, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('163,209.956')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 560, y: 120 },
    });
    await expect(page.getByText('Q1-2024')).toBeVisible();
    await expect(page.getByText('228,939.053')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 600, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('112,786.941')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 640, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('59,433.822')).toBeVisible();
});

test('should display stats for Operational Reserves', async ({ page }) => {
    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2) *> div.items-center > button:nth-child(2)').click();

    await expect(page.getByText('Legay Core Units:')).toBeHidden();
    await page.waitForTimeout(3000);

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 70, y: 120 },
    });
    await expect(page.getByText('Q1-2021')).toBeVisible();
    await expect(page.getByText('44,133.25')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 100, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('3,848,190.642')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 135, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('8,463,347.376')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 170, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('9,432,662.121')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 210, y: 120 },
    });
    await expect(page.getByText('Q1-2022')).toBeVisible();
    await expect(page.getByText('15,226,096.629')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 250, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('16,921,274.161')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 290, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('17,252,690.47')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 330, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('13,579,212.383')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 370, y: 120 },
    });
    await expect(page.getByText('Q1-2023')).toBeVisible();
    await expect(page.getByText('11,933,527.76')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 440, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('441,943.87')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 480, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('147,255.832')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 520, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('-15,954.124')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 560, y: 120 },
    });
    await expect(page.getByText('Q1-2024')).toBeVisible();
    await expect(page.getByText('-12,667.347')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 600, y: 120 },
    });
    await expect(page.getByText('Q2').nth(4)).toBeVisible();
    await expect(page.getByText('-18,023.398')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 640, y: 120 },
    });
    await expect(page.getByText('Q3').nth(4)).toBeVisible();
    await expect(page.getByText('-33,373.22')).toBeVisible();

    await page.locator('#___SECTION___finances > div:nth-child(2) > div:nth-child(2)').hover({
        position: { x: 660, y: 120 },
    });
    await expect(page.getByText('Q4').nth(4)).toBeVisible();
    await expect(page.getByText('-33,373.22')).toBeVisible();
});