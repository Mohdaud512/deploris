import { test, expect } from '@playwright/test';

test.describe('Newsletter double opt-in', () => {
  test('appears on /blog', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByText(/Deploris brief|Deploris Brief/)).toBeVisible();
  });
});
