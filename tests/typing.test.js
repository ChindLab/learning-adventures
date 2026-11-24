/**
 * typing.test.js – Buchstaben-Matcher.
 */
const test = require('node:test');
const assert = require('node:assert');
const { createMatcher } = require('../js/engines/typeText.js');

test('Groß- und Kleinschreibung ist egal', () => {
  const matcher = createMatcher('CAT');
  assert.strictEqual(matcher.press('c'), 'correct');
  assert.strictEqual(matcher.press('A'), 'correct');
  assert.strictEqual(matcher.press('t'), 'done');
  assert.ok(matcher.isDone());
});

test('ein falscher Buchstabe schiebt nicht weiter', () => {
  const matcher = createMatcher('SUN');
  assert.strictEqual(matcher.press('x'), 'wrong');
  assert.strictEqual(matcher.index(), 0);
  assert.strictEqual(matcher.press('s'), 'correct');
  assert.strictEqual(matcher.index(), 1);
});

test('Backspace geht einen Schritt zurück', () => {
  const matcher = createMatcher('EI');
  matcher.press('e');
  matcher.backspace();
  assert.strictEqual(matcher.index(), 0);
  assert.strictEqual(matcher.press('e'), 'correct');
});

test('nach dem letzten Buchstaben ist Schluss', () => {
  const matcher = createMatcher('AB');
  matcher.press('a');
  assert.strictEqual(matcher.press('b'), 'done');
  assert.strictEqual(matcher.press('c'), 'done');
});
