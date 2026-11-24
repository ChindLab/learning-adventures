/**
 * keyboard.test.js – die zufällige Tastenauswahl der Drills.
 */
const test = require('node:test');
const assert = require('node:assert');
const { pickFrom, normalize } = require('../js/engines/keyPress.js');

test('normalisiert Buchstaben, Leertaste und Sondertasten', () => {
  assert.strictEqual(normalize('A'), 'a');
  assert.strictEqual(normalize(' '), ' ');
  assert.strictEqual(normalize('Enter'), 'Enter');
});

test('wählt nur Tasten aus dem Vorrat', () => {
  const pool = ['a', 's', 'd', 'f'];
  for (let i = 0; i < 200; i++) {
    assert.ok(pool.includes(pickFrom(pool, null)));
  }
});

test('vermeidet dieselbe Taste zweimal hintereinander', () => {
  const pool = ['a', 's'];
  for (let i = 0; i < 100; i++) {
    assert.notStrictEqual(pickFrom(pool, 'a'), 'a');
  }
});

test('eine einzelne Taste bleibt stehen', () => {
  assert.strictEqual(pickFrom(['Enter'], 'Enter'), 'Enter');
});
