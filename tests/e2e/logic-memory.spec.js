const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const BOARDS = [
  { prompt: 'Turn over two matching cards.', pairs: 4, next: 'Turn over two matching numbers.' },
  { prompt: 'Turn over two matching numbers.', pairs: 6, next: 'Remember each command block.' },
  { prompt: 'Remember each command block.', pairs: 8, next: null }
];

function trackErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('favicon')) {
      errors.push(message.text());
    }
  });
  return errors;
}

async function openWorkshop(page, options = {}) {
  const lang = options.lang || 'en-GB';
  await page.goto('/index.html');
  await page.evaluate(({ language, reducedMotion }) => {
    const NS = window.BelaSchool;
    NS.store.setLanguage(language);
    NS.store.setSetting('sound', false);
    NS.store.setSetting('speech', false);
    NS.store.setSetting('effects', !reducedMotion);
    NS.store.setSetting('reducedMotion', reducedMotion);
    NS.i18n.apply();
    NS.ui.setFast(true);
    NS.router.go('#/lesson/6-11');
  }, { language: lang, reducedMotion: !!options.reducedMotion });
  if (options.start !== false) {
    await page.locator('.activity-host button').click();
  }
}

async function moveFocus(page, from, to) {
  if (to === from) { return; }
  const key = to > from ? 'Tab' : 'Shift+Tab';
  for (let step = 0; step < Math.abs(to - from); step += 1) {
    await page.keyboard.press(key);
  }
}

test('Logic Memory boards support mouse play and gentle retries', async ({ page }) => {
  const errors = trackErrors(page);
  await openWorkshop(page);

  for (const board of BOARDS) {
    await expect(page.locator('.prompt')).toHaveText(board.prompt);
    await expect(page.locator('.memory-card')).toHaveCount(board.pairs * 2);

    const first = page.locator('.memory-card[data-pair="0"]').first();
    const second = page.locator('.memory-card[data-pair="1"]').first();
    await first.click();
    await second.click();
    await expect(first).not.toHaveClass(/is-open/);
    await expect(second).not.toHaveClass(/is-open/);
    await expect(page.locator('.memory-card.is-matched')).toHaveCount(0);

    for (let pair = 0; pair < board.pairs; pair += 1) {
      const cards = page.locator('.memory-card[data-pair="' + pair + '"]');
      await cards.nth(0).click();
      await cards.nth(1).click();
      if (pair < board.pairs - 1) {
        await expect(cards.nth(0)).toHaveClass(/is-matched/);
        await expect(cards.nth(1)).toHaveClass(/is-matched/);
      } else if (board.next) {
        await expect(page.locator('.prompt')).toHaveText(board.next);
      } else {
        await expect(page.locator('.celebrate')).toContainText('Memory Workshop is finished.');
      }
    }
  }

  await expect(page.locator('.celebrate')).toContainText('Memory Workshop is finished.');
  expect(errors).toEqual([]);
});

test('Logic Memory boards can be completed with keyboard only', async ({ page }) => {
  const errors = trackErrors(page);
  await openWorkshop(page);

  for (const board of BOARDS) {
    await expect(page.locator('.prompt')).toHaveText(board.prompt);
    const cards = page.locator('.memory-card');
    const order = await cards.evaluateAll((nodes) => nodes.map((node) => Number(node.dataset.pair)));

    for (let pair = 0; pair < board.pairs; pair += 1) {
      const firstIndex = order.indexOf(pair);
      const secondIndex = order.indexOf(pair, firstIndex + 1);
      await cards.first().focus();
      await moveFocus(page, 0, firstIndex);
      await page.keyboard.press('Enter');
      await moveFocus(page, firstIndex, secondIndex);
      await page.keyboard.press('Enter');
      if (pair < board.pairs - 1) {
        await expect(cards.nth(firstIndex)).toHaveClass(/is-matched/);
        await expect(cards.nth(secondIndex)).toHaveClass(/is-matched/);
      } else if (board.next) {
        await expect(page.locator('.prompt')).toHaveText(board.next);
      } else {
        await expect(page.locator('.celebrate')).toContainText('Memory Workshop is finished.');
      }
    }
  }

  await expect(page.locator('.celebrate')).toContainText('Memory Workshop is finished.');
  expect(errors).toEqual([]);
});

test('Logic Memory workshop and command labels appear in all eight languages', async ({ page }) => {
  const errors = trackErrors(page);
  const translations = [
    ['en-GB', 'Memory Workshop', 'Remember each command block.', 'Forward'],
    ['de-DE', 'Memory-Werkstatt', 'Merk dir jeden Befehlsblock.', 'Vorwärts'],
    ['de-CH', 'Memory-Werkstatt', 'Merk dir alli Befehlsblöck.', 'Vorwärts'],
    ['fr-FR', 'Atelier mémoire', 'Mémorise chaque bloc de commande.', 'Avancer'],
    ['it-IT', 'Laboratorio della memoria', 'Ricorda ogni blocco di comando.', 'Avanti'],
    ['zh-CN', '记忆练习坊', '记住每一个指令块。', '向前'],
    ['hi-IN', 'याद की प्रैक्टिस', 'हर कमांड ब्लॉक याद रखो।', 'आगे'],
    ['ne-NP', 'स्मृति अभ्यास', 'हरेक कमान्ड ब्लक याद राख।', 'अगाडि']
  ];

  for (const [lang, lessonTitle, codePrompt, forwardLabel] of translations) {
    await openWorkshop(page, { lang, start: false });
    await expect(page.locator('.screen-title')).toHaveText(lessonTitle);
    await page.locator('.activity-host button').click();
    await page.locator('.skip-btn').click();
    await page.locator('.skip-btn').click();
    await expect(page.locator('.prompt')).toHaveText(codePrompt);
    const forwardCard = page.locator('.memory-card[data-pair="0"]').first();
    await forwardCard.click();
    await expect(forwardCard.locator('.card-face span')).toHaveText(forwardLabel);
  }

  expect(errors).toEqual([]);
});

test.describe('Logic Memory touch and offline use', () => {
  test.use({ hasTouch: true, viewport: { width: 375, height: 812 } });

  test('hardest board stays touch friendly with reduced motion', async ({ page }) => {
    const errors = trackErrors(page);
    await openWorkshop(page, { reducedMotion: true });
    await page.locator('.skip-btn').click();
    await page.locator('.skip-btn').click();
    await expect(page.locator('.prompt')).toHaveText(BOARDS[2].prompt);

    const layout = await page.evaluate(() => {
      const grid = document.querySelector('.memory-grid');
      const cards = [...document.querySelectorAll('.memory-card')].map((card) => {
        const rect = card.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
      return {
        columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
        cards,
        viewport: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth
      };
    });
    expect(layout.columns).toBe(2);
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewport);
    layout.cards.forEach((card) => {
      expect(card.width).toBeGreaterThanOrEqual(64);
      expect(card.height).toBeGreaterThanOrEqual(64);
    });

    for (let pair = 0; pair < BOARDS[2].pairs; pair += 1) {
      const cards = page.locator('.memory-card[data-pair="' + pair + '"]');
      await cards.nth(0).tap();
      await cards.nth(1).tap();
    }

    await expect(page.locator('.celebrate')).toContainText('Memory Workshop is finished.');
    expect(errors).toEqual([]);
  });

  test('Memory workshop loads and plays directly from a file URL', async ({ page }) => {
    const errors = trackErrors(page);
    const remoteRequests = [];
    page.on('request', (request) => {
      if (/^https?:/.test(request.url())) { remoteRequests.push(request.url()); }
    });
    const fileUrl = pathToFileURL(path.resolve(__dirname, '../../index.html')).href;
    await page.goto(fileUrl);
    await expect(page.locator('.island')).toHaveCount(9);
    await page.evaluate(() => {
      const NS = window.BelaSchool;
      NS.store.setSetting('sound', false);
      NS.store.setSetting('speech', false);
      NS.ui.setFast(true);
      NS.router.go('#/lesson/6-11');
    });
    await page.locator('.activity-host button').click();
    await expect(page.locator('.prompt')).toHaveText(BOARDS[0].prompt);
    await expect(page.locator('.memory-card')).toHaveCount(8);
    const pair = page.locator('.memory-card[data-pair="0"]');
    await pair.nth(0).click();
    await pair.nth(1).click();
    await expect(pair.nth(0)).toHaveClass(/is-matched/);
    await expect(pair.nth(1)).toHaveClass(/is-matched/);
    expect(remoteRequests).toEqual([]);
    expect(errors).toEqual([]);
  });
});
