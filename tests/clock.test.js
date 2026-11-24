/**
 * clock.test.js – Anzeige der Aufgabenzeit.
 */
const test = require('node:test');
const assert = require('node:assert');
const { formatClock } = require('../js/core/app.js');

test('null Sekunden', () => {
  assert.strictEqual(formatClock(0), '0:00');
});

test('Sekunden werden zweistellig', () => {
  assert.strictEqual(formatClock(7000), '0:07');
  assert.strictEqual(formatClock(59000), '0:59');
  assert.strictEqual(formatClock(59999), '0:59');
});

test('Minuten und Sekunden', () => {
  assert.strictEqual(formatClock(67000), '1:07');
  assert.strictEqual(formatClock(600000), '10:00');
  assert.strictEqual(formatClock(3599000), '59:59');
});

test('Unsinn wird zu 0:00', () => {
  assert.strictEqual(formatClock(-5000), '0:00');
  assert.strictEqual(formatClock('abc'), '0:00');
  assert.strictEqual(formatClock(undefined), '0:00');
});
