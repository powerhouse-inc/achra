import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/operators/powerhouse`);
    await page.waitForLoadState('networkidle');
});

test('should load the operator info', async ({ page }) => {
    await expect(page.getByText('Powerhouse').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Powerhouse is a team bringing a decentralized operations toolkit for open organizations')).toBeVisible();
    await expect(page.getByText('Who we are')).toBeVisible();
    await expect(page.getByText('What we offer')).toBeVisible();
});

test('should load the operator description', async ({ page }) => {
    await expect(page.getByText('About Us')).toBeVisible();
    await expect(page.getByText('Services Offered')).toBeVisible();
    await expect(page.getByText('Decentralized Org Design and Business Process Analysis')).toBeVisible();
    await expect(page.getByText('Open-Source Software Development')).toBeVisible();
    await expect(page.getByText('Operational Support and Coordination')).toBeVisible();
});

test('should contain service listings with purchase and info links', async ({ page }) => {
    await expect(page.getByText('Purchase').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('More info').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Formation & Setup').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('Recurring Services').count()).resolves.toBeGreaterThanOrEqual(1);
});

test('should navigate to resource page by clicking on the "More Info" button', async ({ page }) => {
    await page.getByRole('link', { name: 'More Info' }).first().click();
    await expect(page).toHaveURL(/\/services\/[0-9a-f-]{36}$/);
});
