import { test } from '@playwright/test';

test('inspect operator list - contributors count', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/712241c4-33ce-40de-94eb-f029b44f4a2d/purchase`);
    await page.waitForLoadState('networkidle');
    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    const text = await page.evaluate(() => document.body.innerText);
    const contributors = text.match(/\d+ contributors/g);
    console.log('Contributors found:', contributors);
    const teamSize = text.match(/Team Size[\s\S]{0,50}/);
    console.log('Team size context:', teamSize?.[0]);
});

test('inspect annual billing discount', async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/712241c4-33ce-40de-94eb-f029b44f4a2d/purchase`);
    await page.waitForLoadState('networkidle');
    await page.getByText('Select Operator').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /Configure Services/i }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('radio', { name: 'Annual' }).first().click();
    await page.waitForTimeout(500);
    const text = await page.evaluate(() => document.body.innerText);
    const savings = text.match(/Save \d+%/g);
    const prices = text.match(/\$\d+\/mo/g);
    console.log('Savings found:', savings);
    console.log('Prices found:', prices);
});
