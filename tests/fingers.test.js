/**
 * fingers.test.js – Zuordnung Taste → Hand und Finger.
 * Grundreihe (deutsche Tastatur): ASDF links, JKL rechts.
 */
const test = require('node:test');
const assert = require('node:assert');
const { FINGERS, HOME_KEYS, createMatcher } = require('../js/engines/homeRow.js');

test('linke Hand: A S D F', () => {
  assert.deepStrictEqual(FINGERS.a, { hand: 'left', finger: 'pinky' });
  assert.deepStrictEqual(FINGERS.s, { hand: 'left', finger: 'ring' });
  assert.deepStrictEqual(FINGERS.d, { hand: 'left', finger: 'middle' });
  assert.deepStrictEqual(FINGERS.f, { hand: 'left', finger: 'index' });
});

test('rechte Hand: J K L', () => {
  assert.deepStrictEqual(FINGERS.j, { hand: 'right', finger: 'index' });
  assert.deepStrictEqual(FINGERS.k, { hand: 'right', finger: 'middle' });
  assert.deepStrictEqual(FINGERS.l, { hand: 'right', finger: 'ring' });
  assert.deepStrictEqual(FINGERS['ö'], { hand: 'right', finger: 'pinky' });
});

test('G und H gehören zum Zeigefinger', () => {
  assert.deepStrictEqual(FINGERS.g, { hand: 'left', finger: 'index' });
  assert.deepStrictEqual(FINGERS.h, { hand: 'right', finger: 'index' });
});

test('obere Reihe: Q W O P', () => {
  assert.deepStrictEqual(FINGERS.q, { hand: 'left', finger: 'pinky' });
  assert.deepStrictEqual(FINGERS.w, { hand: 'left', finger: 'ring' });
  assert.deepStrictEqual(FINGERS.o, { hand: 'right', finger: 'ring' });
  assert.deepStrictEqual(FINGERS.p, { hand: 'right', finger: 'pinky' });
});

test('untere Reihe: M N gehören zum Zeigefinger', () => {
  assert.deepStrictEqual(FINGERS.m, { hand: 'right', finger: 'index' });
  assert.deepStrictEqual(FINGERS.n, { hand: 'right', finger: 'index' });
});

test('die Grundreihe hat neun Tasten', () => {
  assert.deepStrictEqual(HOME_KEYS, ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);
});

test('Sequenz-Matcher verlangt die richtige Reihenfolge', () => {
  const matcher = createMatcher('asdf');
  assert.strictEqual(matcher.press('s'), 'wrong');
  assert.strictEqual(matcher.index(), 0);
  assert.strictEqual(matcher.press('a'), 'correct');
  assert.strictEqual(matcher.press('s'), 'correct');
  assert.strictEqual(matcher.press('d'), 'correct');
  assert.strictEqual(matcher.press('f'), 'done');
});
