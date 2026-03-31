import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/network/powerhouse/builders/powerhouse-rgh`);
    await page.waitForLoadState('networkidle');
});

test('should load the builder info', async ({ page }) => {
    // Skills section is now populated — verify it is visible with at least one skill tag
    await expect(page.getByText('Skills').first()).toBeVisible();
    await expect(page.getByText('Full Stack Development').count()).resolves.toBeGreaterThan(0);
    await expect(page.getByText('The Powerhouse Revenue Generating Hub (RGH) drives commercial sustainability for the Powerhouse ecosystem by developing and operating revenue-generating products, services, and partnerships that fund ongoing development and ecosystem growth')).toHaveCount(1);
});

test('should load the builder description', async ({ page }) => {
    await expect(page.getByText('Powerhouse RGH: Who we are')).toHaveCount(1);
    await expect(page.getByText('About Us')).toHaveCount(1);
    await expect(page.getByText('The Powerhouse Revenue Generating Hub (RGH) is the commercial arm of the Powerhouse ecosystem. Our mandate is to ensure long-term sustainability by building, operating, and scaling revenue streams that fund continued development and ecosystem expansion.')).toHaveCount(1);
    await expect(page.getByText('What We Do')).toHaveCount(1);
    await expect(page.getByText('We identify, develop, and manage products and services that generate revenue while advancing the Powerhouse mission. We operate at the intersection of business development, product strategy, and operations — turning the platform\'s capabilities into viable commercial offerings.')).toHaveCount(1);
    await expect(page.getByText('Commercial Products & Services')).toHaveCount(1);
    await expect(page.getByText('We package Powerhouse\'s core technology into commercial products and managed services. This includes hosted infrastructure offerings, premium support tiers, custom document model development, and white-label solutions for organizations adopting decentralized operations.')).toHaveCount(1);
    await expect(page.getByText('Business Development & Partnerships')).toHaveCount(1);
    await expect(page.getByText('We cultivate strategic commercial relationships — from enterprise clients and protocol partnerships to integration deals and co-development agreements. We focus on sustainable revenue relationships that create mutual value.')).toHaveCount(1);
    await expect(page.getByText('Revenue Operations')).toHaveCount(1);
    await expect(page.getByText('We manage the full lifecycle of commercial engagements: pricing strategy, contract management, billing operations, customer success, and financial reporting. We ensure revenue streams are predictable, well-documented, and transparently reported to the ecosystem.')).toHaveCount(1);
    await expect(page.getByText('Strategic Planning')).toHaveCount(1);
    await expect(page.getByText('We continuously evaluate market opportunities, competitive landscape, and ecosystem needs to inform our commercial roadmap. We balance short-term revenue generation with long-term strategic positioning to ensure the Powerhouse ecosystem remains competitive and financially sustainable.')).toHaveCount(1);
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
