import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    //await page.goto(`${process.env.HOMEPAGE_REMOTE_URL}/services/sno-embryonic-hub/purchase`);
    await page.goto("https://achra-git-feat-implementconfirmationstepn-84ae00-powerhouse-dao.vercel.app/services/sno-embryonic-hub/purchase");
    https://achra-git-feat-implementconfirmationstepn-84ae00-powerhouse-dao.vercel.app/services/sno-embryonic-hub/purchase

    await page.getByText('Confirmation').click();
    await page.waitForTimeout(1000);
});

test('should load the section main content', async ({ page }) => {
    await expect(page.getByText('Request Successfully Sent!')).toBeVisible();
    await expect(page.getByText('Thank you Name*!')).toBeVisible();
    await expect(page.getByText('We have emailed the summary to email@powerhouse.inc*')).toBeVisible();
    await expect(page.getByText('We will contact you shortly to schedule an introduction meeting!')).toBeVisible();
});