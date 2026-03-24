import { test, expect } from '@playwright/test';

const UUID = '098a7cad-b66b-404a-b2c8-933d69b808cd';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/${UUID}/purchase`);
    await page.waitForLoadState('networkidle');
});

test('should contain main elements', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Book a Call' })).toBeVisible();
    await expect(page.getByText('Operational Hub').count()).resolves.toBeGreaterThanOrEqual(1);
    await expect(page.getByText('A turnkey legal and operational setup for open-source builder teams — entity formation, invoicing, payouts, and compliance bundled under one roof.')).toBeVisible();

    await expect(page.getByText('A ready-to-use operational setup that gives open-source and public-goods builder teams the legal and financial infrastructure to receive funding, pay contributors, and operate compliantly from day one.')).toBeVisible();
    await expect(page.getByText('Structured as a Swiss Association — a cost-efficient, privacy-preserving legal form with strong international recognition — the Operational Hub reduces personal liability for contributors, simplifies compliance, and provides a professional foundation for teams that are already doing the work.')).toBeVisible();

    await expect(page.getByRole('tab', { name: /Product Info/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Select Operator/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Configure Services/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Summary/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Confirmation/ })).toBeVisible();
});
