import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase`);
});

test('should contain main elements', async ({ page }) => {
    await expect(page.getByText('Operational Hub')).toHaveCount(5);
    await expect(page.getByText('A ready-to-use operational setup that gives open-source and public-goods builder teams the legal and financial infrastructure to receive funding, pay contributors, and operate compliantly from day one. Structured as a Swiss Association — a cost-efficient, privacy-preserving legal form with strong international recognition — the Operational Hub reduces personal liability for contributors, simplifies compliance, and provides a professional foundation for teams that are already doing the work.')).toBeVisible();
    await expect(page.getByText('A turnkey legal and operational setup for open-source builder teams — entity formation, invoicing, payouts, and compliance bundled under one roof.')).toBeVisible();
    await expect(page.getByText('Book a Call')).toBeVisible();

    await expect(page.getByText('Product Info')).toBeVisible();
    await expect(page.getByText('Select Operator')).toBeVisible();
    await expect(page.getByText('Configure Services')).toBeVisible();
    await expect(page.getByText('Summary')).toBeVisible();
    await expect(page.getByText('Confirmation')).toBeVisible();
});