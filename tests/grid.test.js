/**
 * grid.test.js – der Block-Interpreter.
 */
const test = require('node:test');
const assert = require('node:assert');
const { runProgram } = require('../js/engines/gridRun.js');

function config(overrides) {
  return Object.assign({
    grid: { w: 5, h: 5 },
    start: { x: 0, y: 0, dir: 'E' },
    goal: { x: 4, y: 0 },
    walls: [],
    stars: [],
    requiredStars: 0
  }, overrides || {});
}

test('vorwärts geht einen Schritt', () => {
  const result = runProgram(config(), [{ type: 'forward' }]);
  assert.strictEqual(result.final.x, 1);
  assert.strictEqual(result.final.y, 0);
});

test('drehen ändert nur die Richtung', () => {
  const result = runProgram(config(), [{ type: 'right' }]);
  assert.strictEqual(result.final.x, 0);
  assert.strictEqual(result.final.dir, 'S');
});

test('eine Wand stoppt den Lauf', () => {
  const result = runProgram(config({ walls: [[1, 0]] }), [{ type: 'forward' }]);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.reason, 'wall');
  assert.strictEqual(result.final.x, 0);
});

test('springen überspringt ein Feld', () => {
  const result = runProgram(config({ goal: { x: 2, y: 0 } }), [{ type: 'jump' }]);
  assert.strictEqual(result.final.x, 2);
  assert.strictEqual(result.ok, true);
});

test('Stern sammeln', () => {
  const result = runProgram(
    config({ goal: { x: 2, y: 0 }, stars: [[1, 0]], requiredStars: 1 }),
    [{ type: 'forward' }, { type: 'collect' }, { type: 'forward' }]
  );
  assert.deepStrictEqual(result.collected, ['1,0']);
  assert.strictEqual(result.ok, true);
});

test('Wiederholung führt den Block mehrfach aus', () => {
  const result = runProgram(config({ goal: { x: 3, y: 0 } }),
    [{ type: 'repeat', times: 3, body: [{ type: 'forward' }] }]);
  assert.strictEqual(result.final.x, 3);
});

test('Wenn Wand, dann rechts drehen', () => {
  const result = runProgram(config({ walls: [[1, 0]], goal: { x: 0, y: 2 } }), [
    { type: 'if', condition: 'wall', body: [{ type: 'right' }] },
    { type: 'forward' }, { type: 'forward' }
  ]);
  assert.strictEqual(result.final.dir, 'S');
  assert.strictEqual(result.final.y, 2);
  assert.strictEqual(result.ok, true);
});

test('Wenn keine Wand, dann passiert nichts', () => {
  const result = runProgram(config(), [
    { type: 'if', condition: 'wall', body: [{ type: 'right' }] },
    { type: 'forward' }
  ]);
  assert.strictEqual(result.final.dir, 'E');
  assert.strictEqual(result.final.x, 1);
});

test('fehlende Sterne zählen nicht als Erfolg', () => {
  const result = runProgram(
    config({ goal: { x: 1, y: 0 }, stars: [[0, 0]], requiredStars: 1 }),
    [{ type: 'forward' }]
  );
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.reason, 'stars');
});

test('am Ziel ist Schluss, auch wenn mehr Blöcke daliegen', () => {
  const result = runProgram(config({ goal: { x: 2, y: 0 } }), [
    { type: 'forward' }, { type: 'forward' }, { type: 'forward' }
  ]);
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.reason, 'goal');
  assert.strictEqual(result.steps.length, 2);
  assert.strictEqual(result.final.x, 2);
});

test('Endlosschleifen werden bei 200 Schritten gestoppt', () => {
  const inner = { type: 'repeat', times: 4, body: [{ type: 'forward' }] };
  const level2 = { type: 'repeat', times: 4, body: [inner] };
  const level3 = { type: 'repeat', times: 4, body: [level2] };
  const level4 = { type: 'repeat', times: 4, body: [level3] };
  const result = runProgram(config({ grid: { w: 400, h: 4 }, goal: { x: 0, y: 0 } }), [level4]);
  assert.strictEqual(result.reason, 'cap');
  assert.strictEqual(result.ok, false);
});
