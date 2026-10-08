import { test, expect } from '@playwright/test';

test.describe('Quote wizard', () => {
  test('progresses through steps', async ({ page }) => {
    await page.goto('/quote');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('button', { name: /Next|Weiter/ }).click();
    await expect(page.getByText(/scope|Anforderungen/i)).toBeVisible();
    await page.getByRole('button', { name: /Back|Zurück/ }).click();
    await expect(page.getByText(/service line|Leistungsfeld/i)).toBeVisible();
  });
});
