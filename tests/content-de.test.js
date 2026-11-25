/**
 * content-de.test.js – English is the source; German (de-DE) is the overlay in i18n/de-DE.js.
 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { content } = require('../js/content/index.js');

['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8', 'stage9']
  .forEach((name) => require(path.join(__dirname, '..', 'js', 'content', name + '.js')));
require('../js/content/bobby-lines.js');
require('../i18n/de-DE.js');

test('English is the default source', () => {
  content.applyLanguage('en-GB');
  assert.strictEqual(content.findStage(1).title, 'My Computer');
  assert.strictEqual(content.findStage(3).title, 'Keyboard Adventures');
  assert.strictEqual(content.findStage(9).title, 'Finger Training');
  assert.strictEqual(content.activity('1-2-2').prompt, 'Where is the monitor?');
  assert.strictEqual(content.activity('4-3-1').letters[0].word, 'Queen');
  assert.strictEqual(content.activity('4-6-1').words[0].text, 'CAT');
});

test('German is a translation overlay', () => {
  content.applyLanguage('de-DE');
  assert.strictEqual(content.findStage(1).title, 'Mein Computer');
  assert.strictEqual(content.findStage(2).title, 'Maus-Abenteuer');
  assert.strictEqual(content.findStage(6).title, 'Logik-Spiele');
  assert.strictEqual(content.findStage(9).title, 'Finger-Training');
  assert.strictEqual(content.activity('1-2-2').prompt, 'Wo ist der Monitor?');
  assert.strictEqual(content.activity('4-3-1').letters[0].word, 'Qualle');
  assert.strictEqual(content.activity('4-6-1').words[0].text, 'KATZE');
  content.applyLanguage('en-GB');
});

test('German labels come from the lexicon', () => {
  content.applyLanguage('de-DE');
  const labels = content.activity('1-3-2').options.map((option) => option.label);
  assert.ok(labels.includes('Tastatur'));
  assert.ok(labels.includes('Maus'));
  const butterflies = content.activity('2-5-1');
  assert.strictEqual(butterflies.items[0].label, 'Schmetterling');
  assert.strictEqual(butterflies.targets[0].label, 'Blume');
  content.applyLanguage('en-GB');
});

test('Logic Memory translates its lesson and command labels', () => {
  content.applyLanguage('de-DE');
  assert.strictEqual(content.findLesson('6-11').lesson.title, 'Memory-Werkstatt');
  assert.strictEqual(content.activity('6-11-1').prompt, 'Decke zwei gleiche Karten auf.');
  assert.deepStrictEqual(content.activity('6-11-3').pairs.map((pair) => pair.a.label), [
    'Vorwärts', 'Zurück', 'Links drehen', 'Rechts drehen',
    'Springen', 'Wiederholen', 'Wenn', 'Sammeln'
  ]);
  content.applyLanguage('en-GB');
});

test('every activity and lesson has a German translation', () => {
  content.baseStages.forEach((stage) => {
    stage.lessons.forEach((lesson) => {
      assert.ok(content.translations['de-DE'].lessons[lesson.id], 'lesson ' + lesson.id);
      lesson.activities.forEach((activity) => {
        assert.ok(content.translations['de-DE'].activities[activity.id], 'activity ' + activity.id);
      });
    });
  });
  assert.ok(content.translations['de-DE'].stages[1]);
  assert.strictEqual(Object.keys(content.translations['de-DE'].activities).length, 112);
});

test('Bobby speaks German in German mode', () => {
  assert.ok(content.bobbyEn.welcome.indexOf('Hello') === 0);
  content.applyLanguage('de-DE');
  assert.strictEqual(content.bobby, content.bobbyDe);
  assert.ok(content.bobby.welcome.indexOf('Hallo') === 0);
  assert.strictEqual(content.bobby.welcomeNamed('Mia'), 'Hallo, Mia! Ich bin Bobby.');
  assert.ok(content.bobby.stageDone('Logik-Spiele').indexOf('Logik-Spiele') !== -1);
  content.applyLanguage('en-GB');
  assert.strictEqual(content.bobby, content.bobbyEn);
});
