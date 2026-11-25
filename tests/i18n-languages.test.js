/**
 * i18n-languages.test.js – French, Italian, Chinese, Hindi and Nepali overlays.
 * English is the source; each file must cover every stage/lesson/activity.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { content } = require('../js/content/index.js');

['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8', 'stage9']
  .forEach((name) => require(path.join(__dirname, '..', 'js', 'content', name + '.js')));
require('../js/content/bobby-lines.js');

const CODES = ['fr', 'it', 'zh', 'hi', 'ne'];

CODES.forEach((code) => {
  test(code + ' translation file exists and covers every activity', () => {
    const file = path.join(__dirname, '..', 'i18n', code + '.js');
    assert.ok(fs.existsSync(file), 'missing i18n/' + code + '.js');
    require(file);

    const translation = content.translations[code];
    assert.ok(translation, 'content.translations.' + code);
    assert.ok(Object.keys(translation.stages).length === 9, 'nine stages');
    const expectedLessons = content.baseStages.reduce((sum, stage) => sum + stage.lessons.length, 0);
    assert.strictEqual(Object.keys(translation.lessons).length, expectedLessons, 'every lesson');
    assert.ok(Object.keys(translation.activities).length === 109, '109 activities');
    assert.ok(Object.keys(translation.lexicon).length >= 30, 'label lexicon');

    content.baseStages.forEach((stage) => {
      stage.lessons.forEach((lesson) => {
        assert.ok(translation.lessons[lesson.id], 'lesson ' + lesson.id);
        lesson.activities.forEach((activity) => {
          const entry = translation.activities[activity.id];
          assert.ok(entry, 'activity ' + activity.id);
          assert.ok(entry.title, 'title ' + activity.id);
          assert.ok(entry.speech, 'speech ' + activity.id);
          assert.ok(entry.prompt, 'prompt ' + activity.id);
          if (activity.points) {
            assert.strictEqual(entry.points.length, activity.points.length, 'points ' + activity.id);
          }
          if (activity.deck) {
            assert.strictEqual(entry.deck.length, activity.deck.length, 'deck ' + activity.id);
          }
        });
      });
    });
  });

  test(code + ' has a UI dictionary and Bobby lines', () => {
    const ui = content.ui && content.ui[code];
    assert.ok(ui, 'content.ui.' + code);
    assert.ok(Object.keys(ui).length >= 145, 'UI keys');
    assert.ok(ui['Back to the map'], 'Back to the map');
    ['Good to see you, {name}!', '{n} stars', '{title} is finished.',
      'Put {n} on the plate', 'Type {word}'].forEach((key) => {
      assert.ok(ui[key], 'UI placeholder: ' + key);
    });
    const bobby = content.bobbyFor && content.bobbyFor[code];
    assert.ok(bobby && bobby.welcome, 'bobby welcome');
    assert.ok(bobby.correct.length >= 3, 'bobby correct lines');
    assert.ok(typeof bobby.stageDone === 'function', 'bobby stageDone');
  });
});
