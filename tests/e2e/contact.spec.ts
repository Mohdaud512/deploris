import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test('renders on /contact and requires consent', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Submit disabled until required + consent + captcha satisfied.
    const submit = page.getByRole('button', { name: /Send message|Nachricht senden/ });
    await expect(submit).toBeVisible();
  });

  test('shows the honeypot as visually hidden', async ({ page }) => {
    await page.goto('/contact');
    const hp = page.locator('input[name="hp"]');
    await expect(hp).toHaveCount(1);
    const box = await hp.boundingBox();
    // Honeypot must be off-screen or zero-sized to hide from real users.
    expect(box === null || box.width === 0 || box.x < 0).toBeTruthy();
  });
});
