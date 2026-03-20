import { test, expect } from '@playwright/test';

const SERVICE_UUID = '712241c4-33ce-40de-94eb-f029b44f4a2d';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/${SERVICE_UUID}`);
    await page.waitForLoadState('networkidle');
});

test('should contain main elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Operational Hub' })).toBeVisible();
    await expect(page.getByText('A turnkey legal and operational setup for open-source builder teams')).toBeVisible();

    await expect(page.getByRole('link', { name: /Book a Call/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Purchase/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Self Assessment Checklist/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'FAQ' }).first()).toBeVisible();
});

test('should contain accordion sections', async ({ page }) => {
    await expect(page.getByText('Why a Swiss Association?')).toBeVisible();
    await expect(page.getByText(/What.s Included/i)).toBeVisible();
    await expect(page.getByText('Privacy & Liability Protection')).toBeVisible();
});

test('should contain the Purchase section with an operator', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Purchase' })).toBeVisible();
    await expect(page.getByText('Powerhouse').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByRole('link', { name: /Configure Services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /More Info/i })).toBeVisible();
});

test('should contain the FAQ section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'FAQ' })).toBeVisible();
    await expect(page.getByText('What is an Operational Hub?')).toBeVisible();
    await expect(page.getByText('Who is this for?')).toBeVisible();
    await expect(page.getByText('How does setup work?')).toBeVisible();
});
