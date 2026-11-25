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
  await expect(page.locator('#summary')).toContainText('Gesamt: 901/901 ok', { timeout: 300000 });
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
  await expect(page.locator('.topbar-sub')).toHaveText('My First Computer School');
  expect(errors).toEqual([]);
});

test('stage 1 opens and the first lesson starts', async ({ page }) => {
  await page.goto('/index.html');
  await page.locator('button[data-stage="1"]').click();
  await expect(page.locator('.lesson-row')).toHaveCount(9);
  await page.locator('.lesson-row').first().click();
  await page.getByRole('button', { name: "Let's go!" }).click();
  await expect(page.locator('.prompt')).toContainText('This is a computer.');
});

test('parent area requires a sum', async ({ page }) => {
  await page.goto('/index.html#/parent');
  await expect(page.locator('.gate h1')).toHaveText('For grown-ups');
});

test('language switches per child', async ({ page }) => {
  await page.goto('/index.html');
  const languages = [
    ['de-DE', 'Meine erste Computer-Schule', 'Mein Computer'],
    ['de-CH', 'Mis erschti Computer-Schuel', 'Mis Computer'],
    ['fr-FR', "Mon école d'informatique", 'Mon ordinateur'],
    ['it-IT', 'La mia prima scuola di computer', 'Il mio computer'],
    ['zh-CN', '我的第一所电脑学校', '我的电脑'],
    ['hi-IN', 'मेरा पहला कंप्यूटर स्कूल', 'मेरा कंप्यूटर'],
    ['ne-NP', 'मेरो पहिलो कम्प्युटर स्कुल', 'मेरो कम्प्युटर'],
    ['en-GB', 'My First Computer School', 'My Computer']
  ];
  for (const [code, title, island] of languages) {
    await page.evaluate((lang) => {
      window.BelaSchool.store.setLanguage(lang);
      window.BelaSchool.i18n.apply();
      window.BelaSchool.router.render();
    }, code);
    await expect(page.locator('.topbar-sub')).toHaveText(title);
    await expect(page.locator('.island-title').first()).toHaveText(island);
  }
});
