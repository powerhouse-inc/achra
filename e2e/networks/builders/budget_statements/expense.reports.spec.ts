import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/powerhouse/budget-statements?section=expense-reports`);
});

test('should load the builder info', async ({ page }) => {
    await expect(page.getByText('CES Core Unit on-chain transaction history')).toBeVisible();
});
