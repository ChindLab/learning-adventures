// Browser smoke tests — optional, not a project dependency.
//
// Setup:
//   npm i -D @playwright/test && npx playwright install chromium
//   npm run serve            (terminal 1)
//   npx playwright test      (terminal 2)
//
// These check the shell. Every activity is covered by selftest.html, which runs
// first in this file.

const { test, expect } = require('@playwright/test');

test('self-test is completely green', async ({ page }) => {
  await page.goto('/selftest.html');
  await expect(page.locator('#summary')).toContainText('Gesamt: 219/219 ok', { timeout: 60000 });
  await expect(page.locator('#failures li')).toHaveCount(0);
});

test('app loads without console errors and shows nine stages', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('favicon')) {
      errors.push(message.text());
    }
  });

  await page.goto('/index.html');
  await expect(page.locator('.island')).toHaveCount(9);
  await expect(page.locator('.topbar-name')).toHaveText('Bela');
  expect(errors).toEqual([]);
});

test('stage 1 opens and the first lesson starts', async ({ page }) => {
  await page.goto('/index.html');
  await page.locator('button[data-stage="1"]').click();
  await expect(page.locator('.lesson-row')).toHaveCount(9);
  await page.locator('.lesson-row').first().click();
  await page.getByRole('button', { name: 'Los geht es!' }).click();
  await expect(page.locator('.prompt')).toContainText('Das ist ein Computer.');
});

test('parent area requires a sum', async ({ page }) => {
  await page.goto('/index.html#/parent');
  await expect(page.locator('.gate h1')).toHaveText('Für Erwachsene');
});

test('language switches per child', async ({ page }) => {
  await page.goto('/index.html');
  await page.evaluate(() => {
    window.BelaSchool.store.setLanguage('en');
    window.BelaSchool.router.render();
  });
  await expect(page.locator('.topbar-sub')).toHaveText('My First Computer School');
  await expect(page.locator('.island-title').first()).toHaveText('My Computer');
  await page.evaluate(() => {
    window.BelaSchool.store.setLanguage('de');
    window.BelaSchool.router.render();
  });
  await expect(page.locator('.island-title').first()).toHaveText('Mein Computer');
});
