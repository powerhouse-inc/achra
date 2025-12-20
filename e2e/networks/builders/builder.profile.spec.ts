import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://staging.achra.com/network/powerhouse/builders/builder-1');
});

test('should load the builder info', async ({ page }) => {
    await expect(page.getByText('PH')).toHaveCount(2);
    await expect(page.getByText('Powerhouse')).toHaveCount(13);
    await expect(page.getByText('ACCEPTED')).toHaveCount(2);
    await expect(page.getByText('Since 25-may-2021')).toHaveCount(2);
    await expect(page.getByText('Technical')).toHaveCount(4);
    await expect(page.getByText('Growth')).toHaveCount(4);
    await expect(page.getByText('Support')).toHaveCount(6);
    await expect(page.getByText('Operational')).toHaveCount(12);
    await expect(page.getByText('Lorem ipsum dolor sit amet consectetur. Quisque et venenatis hac vel est aenean dui. Enim eu venenatis tristique aliquet tincidunt lacus. Donec etiam nunc mi lacus libero purus. Sed faucibus fringilla aliquet ac bibendum lorem sed amet. Convallis.')).toHaveCount(7);
});

test('should load the builder description', async ({ page }) => {
    await expect(page.getByText('Powerhouse: Who we are')).toHaveCount(2);
    await expect(page.getByText('About Us')).toHaveCount(2);
    await expect(page.getByText('The new Powerhouse team uses its extensive knowledge and experience from its SES Core Unit and Maker Foundation days to contribute to the development of efficient and scalable decentralized organizations. It aims to work not just for Sky and its subDAOs, but as a fully independent service provider for the wider industry.')).toHaveCount(2);
    await expect(page.getByText('Services Offered')).toHaveCount(2);
    await expect(page.getByText('As an Ecosystem Actor, Powerhouse offers three categories of paid consultancy services. These services span various operational areas, from project management, to finances and transparency reporting, to legal-operational matters.')).toHaveCount(2);
    await expect(page.getByText('Decentralized Org Design and Business Process Analysis')).toHaveCount(2);
    await expect(page.getByText('Open and decentralized organizations are an emerging paradigm that can be difficult to get right at first. Sky has been one of the biggest pioneering experiments so far, achieving some successes but also laying bare the various challenges that these organizations may face.')).toHaveCount(2);
    await expect(page.getByText('Open-Source Software Development')).toHaveCount(2);
    await expect(page.getByText('To be successful, these organizations essentially need to trade traditional management oversight and extensive training programs with automated processes on their operational platform.')).toHaveCount(2);
    await expect(page.getByText('Operational Support and Coordination')).toHaveCount(2);
    await expect(page.getByText('One of the challenges of decentralized organizations is that they can introduce a lot of inefficiencies by forcing the contributor teams to take care of operational overhead tasks outside of their core competencies.')).toHaveCount(2);
});

test('should load the builder projects', async ({ page }) => {
    await expect(page.getByText('Front-end Development')).toHaveCount(3);
    await expect(page.getByText('PRJ-1')).toHaveCount(3);
    await expect(page.getByText('View Project')).toHaveCount(6);
    await expect(page.getByText('Budget')).toHaveCount(8);
    await expect(page.getByText('DAI')).toHaveCount(6);
    await expect(page.getByText('Status')).toHaveCount(6);
    await expect(page.getByText('DRAFT')).toHaveCount(6);
    await expect(page.getByText('Key Results')).toHaveCount(6);
});

test('should load the builder key results', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByText('Key Results').first().click();

    await expect(page.getByPlaceholder('Search...')).toBeVisible();
    await expect(page.getByText('All Statuses')).toBeVisible();
    await expect(page.getByText('Results not found...')).toBeVisible();
});