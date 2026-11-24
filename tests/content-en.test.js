/**
 * content-en.test.js – englische Übersetzungsschicht.
 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { content } = require('../js/content/index.js');

['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8', 'stage9']
  .forEach((name) => require(path.join(__dirname, '..', 'js', 'content', name + '.js')));
require('../js/content/bobby-lines.js');
require('../js/content/en.js');

test('alle Stufen sind übersetzt', () => {
  content.applyLanguage('en');
  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((id) => {
    const stage = content.findStage(id);
    assert.ok(stage.en !== false, String(id));
    assert.ok(/^[A-Za-z]/.test(stage.title), 'stage ' + id + ' title');
  });
  assert.strictEqual(content.findStage(1).title, 'My Computer');
  assert.strictEqual(content.findStage(3).title, 'Keyboard Adventures');
  assert.strictEqual(content.findStage(4).title, 'Letters & Typing');
  assert.strictEqual(content.findStage(5).title, 'Numbers');
  assert.strictEqual(content.findStage(7).title, 'Programming Games');
  assert.strictEqual(content.findStage(8).title, 'My First JavaScript');
  content.applyLanguage('de');
});

test('Beschriftungen kommen aus dem Wörterbuch', () => {
  content.applyLanguage('en');
  const activity = content.activity('1-3-2');
  const labels = activity.options.map((option) => option.label);
  assert.ok(labels.includes('Keyboard'));
  assert.ok(labels.includes('Mouse'));
  const stage2 = content.activity('2-5-1');
  assert.strictEqual(stage2.items[0].label, 'Butterfly');
  assert.strictEqual(stage2.targets[0].label, 'Flower');
  content.applyLanguage('de');
});

test('englische Buchstaben und Wörter', () => {
  content.applyLanguage('en');
  const alphabet = content.activity('4-3-1').letters;
  assert.strictEqual(alphabet[0].word, 'Queen');
  assert.strictEqual(alphabet[0].art, 'krone');
  const words = content.activity('4-6-1').words;
  assert.strictEqual(words[0].text, 'CAT');
  content.applyLanguage('de');
});

test('jede Aktivität hat einen englischen Text', () => {
  content.baseStages.forEach((stage) => {
    stage.lessons.forEach((lesson) => {
      assert.ok(content.en.lessons[lesson.id], 'lesson ' + lesson.id);
      lesson.activities.forEach((activity) => {
        assert.ok(content.en.activities[activity.id], 'activity ' + activity.id);
      });
    });
  });
});

test('englische Bobby-Sätze existieren', () => {
  assert.ok(content.bobbyEn.welcome.indexOf('Hello') === 0);
  content.applyLanguage('en');
  assert.strictEqual(content.bobby, content.bobbyEn);
  content.applyLanguage('de');
  assert.strictEqual(content.bobby, content.bobbyDe);
});
