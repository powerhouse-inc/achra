import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/powerhouse`);
});

test('should load the builder info', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    // Skills section is now populated — verify it is visible with at least one skill tag
    await expect(page.getByText('Skills').first()).toBeVisible();
    await expect(page.getByText('Facilitator').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('Powerhouse is a team bringing a decentralized operations toolkit for open organizations')).toHaveCount(1);
});

test('should load the builder description', async ({ page }) => {
    await expect(page.getByText('Powerhouse: Who we are')).toHaveCount(1);
    await expect(page.getByText('About Us')).toHaveCount(1);
    await expect(page.getByText('The new Powerhouse team uses its extensive knowledge and experience from its SES Core Unit and Maker Foundation days to contribute to the development of efficient and scalable decentralized organizations. It aims to work not just for Sky and its subDAOs, but as a fully independent service provider for the wider industry.')).toHaveCount(1);
    await expect(page.getByText('Services Offered')).toHaveCount(1);
    await expect(page.getByText('As an Ecosystem Actor, Powerhouse offers three categories of paid consultancy services. These services span various operational areas, from project management, to finances and transparency reporting, to legal-operational matters.')).toHaveCount(1);
    await expect(page.getByText('Decentralized Org Design and Business Process Analysis')).toHaveCount(1);
    await expect(page.getByText('Open and decentralized organizations are an emerging paradigm that can be difficult to get right at first. Sky has been one of the biggest pioneering experiments so far, achieving some successes but also laying bare the various challenges that these organizations may face.')).toHaveCount(1);
    await expect(page.getByText('Open-Source Software Development')).toHaveCount(1);
    await expect(page.getByText('To be successful, these organizations essentially need to trade traditional management oversight and extensive training programs with automated processes on their operational platform.')).toHaveCount(1);
    await expect(page.getByText('Operational Support and Coordination')).toHaveCount(1);
    await expect(page.getByText('One of the challenges of decentralized organizations is that they can introduce a lot of inefficiencies by forcing the contributor teams to take care of operational overhead tasks outside of their core competencies.')).toHaveCount(1);
});

test.skip('should load the builder projects', async ({ page }) => {
    await expect(page.getByText('Achra MVP dSpot Work')).toHaveCount(1);
    await expect(page.getByText('Achra MVP RGH Work')).toHaveCount(1);
    await expect(page.getByText('Achra MVP Sky Teams Work')).toHaveCount(1);
    await expect(page.getByText('View Project')).toHaveCount(3);
    await expect(page.getByText('Budget')).toHaveCount(4);
    await expect(page.getByText('USD')).toHaveCount(6);
    await expect(page.getByText('Status')).toHaveCount(3);
    await expect(page.getByText('DRAFT')).toHaveCount(3);
    await expect(page.getByText('Key Results')).toHaveCount(3);
});

test('should not load the builder projects for MVP', async ({ page }) => {
    await expect(page.getByText('Achra MVP dSpot Work')).toBeHidden();
    await expect(page.getByText('Achra MVP RGH Work')).toBeHidden();
    await expect(page.getByText('Achra MVP Sky Teams Work')).toBeHidden();
    await expect(page.getByText('View Project')).toBeHidden();
    await expect(page.getByText('Budget')).toBeVisible();
    await expect(page.getByText('USD')).toBeHidden();
    await expect(page.getByText('Status')).toBeHidden();
    await expect(page.getByText('DRAFT')).toBeHidden();
    await expect(page.getByText('Key Results')).toBeHidden();
});

test.skip('should load the builder key results', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.getByText('Key Results').first().click();

    await expect(page.getByPlaceholder('Search...')).toBeVisible();
    await expect(page.getByText('All Statuses')).toBeVisible();
    await expect(page.getByText('Results not found...')).toBeVisible();
});

test('should not load the builder key results for MVP', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page.getByText('Key Results')).toBeHidden();
});