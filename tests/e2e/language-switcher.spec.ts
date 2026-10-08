import { test, expect } from '@playwright/test';

test('language switcher navigates EN → DE and back', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', /en/);
  await page.getByRole('button', { name: /DE/i, exact: true }).click();
  await expect(page).toHaveURL(/\/de/);
  await expect(page.locator('html')).toHaveAttribute('lang', /de/);
  await page.getByRole('button', { name: /EN/i, exact: true }).click();
  await expect(page).toHaveURL(/^https?:\/\/[^/]+\/?$/);
});
