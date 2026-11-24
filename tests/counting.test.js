/**
 * counting.test.js – kleine Rechenlogik.
 */
const test = require('node:test');
const assert = require('node:assert');
const { arithmetic } = require('../js/engines/countObjects.js');

test('plus', () => {
  assert.strictEqual(arithmetic({ mode: 'add', a: 2, b: 1 }).result, 3);
  assert.strictEqual(arithmetic({ mode: 'add', a: 3, b: 3 }).result, 6);
});

test('minus wird nie negativ', () => {
  const result = arithmetic({ mode: 'sub', a: 5, b: 2 });
  assert.strictEqual(result.result, 3);
  assert.strictEqual(arithmetic({ mode: 'sub', a: 1, b: 4 }).result, 0);
});

test('Ausdruck ist deutsch lesbar', () => {
  const result = arithmetic({ mode: 'sub', a: 5, b: 2 });
  assert.strictEqual(result.expression, '5 − 2');
});
