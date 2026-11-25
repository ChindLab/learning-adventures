/**
 * speech.test.js – Auswahl der deutschen Stimme.
 */
const test = require('node:test');
const assert = require('node:assert');
const speech = require('../js/core/speech.js');

test.beforeEach(() => speech.setLanguage('de-DE'));

test('Enhanced schlägt die Standardstimme', () => {
  const enhanced = speech.rankVoice({ name: 'Anna (Enhanced)', lang: 'de-DE', localService: true });
  const plain = speech.rankVoice({ name: 'Anna', lang: 'de-DE', localService: true });
  assert.ok(enhanced > plain);
});

test('Spaß-Stimmen werden erkannt und abgewertet', () => {
  assert.ok(speech.isNovelty({ name: 'Grandma (German (Germany))' }));
  const grandma = speech.rankVoice({ name: 'Grandma (German)', lang: 'de-DE' });
  const anna = speech.rankVoice({ name: 'Anna', lang: 'de-DE' });
  assert.ok(grandma < anna);
});

test('andere Sprachen werden abgewertet', () => {
  speech.setLanguage('de-DE');
  assert.ok(speech.rankVoice({ name: 'Samantha', lang: 'en-US' }) <
            speech.rankVoice({ name: 'Anna', lang: 'de-DE' }));
  assert.strictEqual(speech.rankVoice({ name: 'Amelie', lang: 'fr-FR' }), -100);
});

test('de-DE vor de-AT', () => {
  speech.setLanguage('de-DE');
  assert.ok(speech.rankVoice({ name: 'A', lang: 'de-DE' }) > speech.rankVoice({ name: 'B', lang: 'de-AT' }));
});

test('auf Englisch gewinnt die englische Stimme', () => {
  speech.setLanguage('en-GB');
  assert.ok(speech.rankVoice({ name: 'Daniel', lang: 'en-GB' }) >
            speech.rankVoice({ name: 'Anna', lang: 'de-DE' }));
  speech.setLanguage('de-DE');
});

test('Französisch, Italienisch und Chinesisch behalten ihre Stimme', () => {
  [
    ['fr-FR', 'Amelie'],
    ['it-IT', 'Alice'],
    ['zh-CN', 'Ting-Ting']
  ].forEach(([tag, name]) => {
    speech.setLanguage(tag);
    assert.strictEqual(speech.language(), tag);
    assert.ok(speech.rankVoice({ name: name, lang: tag }) >
              speech.rankVoice({ name: 'Anna', lang: 'de-DE' }));
    assert.strictEqual(speech.rankVoice({ name: 'Anna', lang: 'de-DE' }), -100);
  });
  speech.setLanguage('de-DE');
});

test('Sprachkürzel werden auf die Standardstimme erweitert', () => {
  assert.strictEqual(speech.setLanguage('fr') || speech.language(), 'fr-FR');
  assert.strictEqual(speech.setLanguage('it') || speech.language(), 'it-IT');
  assert.strictEqual(speech.setLanguage('zh') || speech.language(), 'zh-CN');
  assert.strictEqual(speech.setLanguage('hi') || speech.language(), 'hi-IN');
  assert.strictEqual(speech.setLanguage('ne') || speech.language(), 'ne-NP');
  assert.strictEqual(speech.setLanguage('gsw') || speech.language(), 'de-CH');
  speech.setLanguage('de-DE');
});

test('Hindi, Nepali und Schweizerdeutsch bewerten ihre eigenen Stimmen', () => {
  speech.setLanguage('hi-IN');
  assert.ok(speech.rankVoice({ name: 'Lekha', lang: 'hi-IN' }) >
            speech.rankVoice({ name: 'Anna', lang: 'de-DE' }));
  speech.setLanguage('ne-NP');
  assert.ok(speech.rankVoice({ name: 'Nepali', lang: 'ne-NP' }) >
            speech.rankVoice({ name: 'Lekha', lang: 'hi-IN' }));
  speech.setLanguage('de-CH');
  assert.ok(speech.rankVoice({ name: 'Swiss', lang: 'de-CH' }) >
            speech.rankVoice({ name: 'Anna', lang: 'de-DE' }));
  speech.setLanguage('de-DE');
});
