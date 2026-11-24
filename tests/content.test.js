/**
 * content.test.js – prüft alle Lehrinhalte.
 * Läuft ohne Browser, weil Inhalte reine Daten sind.
 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { content, validate } = require('../js/content/index.js');

['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8', 'stage9']
  .forEach((name) => require(path.join(__dirname, '..', 'js', 'content', name + '.js')));

test('alle neun Stufen sind angemeldet', () => {
  assert.deepStrictEqual(content.stages.map((stage) => stage.id), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('Inhalte sind fehlerfrei', () => {
  const result = validate(content.stages);
  assert.deepStrictEqual(result.errors, []);
  assert.strictEqual(result.ok, true);
});

test('Aktivitätszahlen entsprechen der Spezifikation', () => {
  const counts = content.stages.map((stage) =>
    stage.lessons.reduce((sum, lesson) => sum + lesson.activities.length, 0));
  assert.deepStrictEqual(counts, [17, 13, 9, 12, 9, 12, 16, 7, 12]);
  assert.strictEqual(counts.reduce((a, b) => a + b, 0), 107);
});

test('jede Stufe hat genau einen Meilenstein', () => {
  content.stages.forEach((stage) => {
    const milestones = stage.lessons.filter((lesson) => lesson.milestone);
    assert.strictEqual(milestones.length, 1, 'Stufe ' + stage.id);
  });
});

test('jede Tastenübung in Stufe 3 verlangt zehn Anschläge', () => {
  const stage3 = content.stages.find((stage) => stage.id === 3);
  const drills = stage3.lessons
    .flatMap((lesson) => lesson.activities)
    .filter((activity) => activity.type === 'keyPress');
  assert.strictEqual(drills.length, 8);
  drills.forEach((activity) => assert.ok((activity.count || 0) >= 10, activity.id));
});

test('Tasten-Drills wechseln zwischen mehreren Tasten', () => {
  const drills = content.stages
    .flatMap((stage) => stage.lessons)
    .flatMap((lesson) => lesson.activities)
    .filter((activity) => activity.type === 'keyPress' && activity.pool);
  assert.ok(drills.length >= 8);
  drills.forEach((activity) => assert.ok(activity.pool.length >= 4, activity.id));
});

test('keine Platzhalter oder verbotenen Wörter', () => {
  const text = JSON.stringify(content.stages);
  assert.ok(!/coming soon|platzhalter|TODO|game over/i.test(text));
});

test('Stufe 7 enthält zwölf Rätsel', () => {
  const stage7 = content.stages.find((stage) => stage.id === 7);
  const puzzles = stage7.lessons
    .flatMap((lesson) => lesson.activities)
    .filter((activity) => activity.type === 'gridRun' && /^7-[1-3]-\d+$/.test(activity.id));
  assert.strictEqual(puzzles.length, 12);
});
