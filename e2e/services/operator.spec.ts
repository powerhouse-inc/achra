import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/operators/accountable-opc`);
});

test('should contain main elements', async ({ page }) => {
    await expect(page.getByText('Accountable OPC')).toBeVisible();
    await expect(page.getByText('Who we are')).toBeVisible();
    await expect(page.getByText('What we offer')).toBeVisible();
    await expect(page.getByText('Load More')).toBeVisible();
    await expect(page.getByText('Active Since')).toBeVisible();
    await expect(page.getByText('Min Engagement')).toBeVisible();
    await expect(page.getByText('Team Size')).toBeVisible();
    await expect(page.getByText('Empowering you business with reliable bookkeeping, payroll, and tax solutions.')).toBeVisible();
    await expect(page.getByText('Lorem ipsum dolor sit amet consectetur. Ac proin mi netus dui tempus mi massa duis nam. Turpis rhoncus viverra eget urna eleifend senectus massa sit. Netus felis amet ipsum hendrerit diam arcu. Sed amet quam pellentesque neque massa lectus. Tortor nisl a nec odio id aenean integer sit quam. Ornare amet nisl in arcu elit. A maecenas nunc egestas a suspendisse eget. Velit libero ante vel sed. Pretium faucibus lorem vitae nunc sollicitudin arcu cursus hac. Felis at a enim tempor. Consectetur tellus mauris leo in hendrerit molestie tellus risus mi. Sit non auctor proin arcu senectus varius porttitor elementum pretium. Gravida duis ipsum sit tristique auctor enim tortor vel amet.')).toBeVisible();
});

test('should contain services or resource links to resource items', async ({ page }) => {
    await expect(page.getByText('Purchase')).toHaveCount(6);
    await expect(page.getByText('More info')).toHaveCount(6);
    await expect(page.getByText('SNO Embryonic Hub')).toHaveCount(1);
    await expect(page.getByText('SNO Governors')).toHaveCount(5);
    await expect(page.getByText('Founders')).toHaveCount(1);
    await expect(page.getByText('Operators')).toHaveCount(2);
    await expect(page.getByText('Builders')).toHaveCount(2);
    await expect(page.getByText('Formation & Setup')).toHaveCount(6);
    await expect(page.getByText('Recurring Services')).toHaveCount(6);
    await expect(page.getByText('Legal needs analysis')).toHaveCount(6);
    await expect(page.getByText('Entity incorporation')).toHaveCount(6);
    await expect(page.getByText('Payment processor setup')).toHaveCount(6);
    await expect(page.getByText('Contributor on-boarding')).toHaveCount(6);
    await expect(page.getByText('Wind-down planning')).toHaveCount(6);
    await expect(page.getByText('Contracts administration')).toHaveCount(6);
    await expect(page.getByText('Payment processing')).toHaveCount(7);
    await expect(page.getByText('Transparency reporting')).toHaveCount(6);
    await expect(page.getByText('Tax administration & filing')).toHaveCount(6);
});

test('should navigate to resource page by clicking on the "More Info" button', async ({ page }) => {
    page.getByRole('link', { name: 'More Info' }).first().click();

    await expect(page).toHaveURL(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub`);
});
