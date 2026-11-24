/**
 * speech.test.js – Auswahl der deutschen Stimme.
 */
const test = require('node:test');
const assert = require('node:assert');
const speech = require('../js/core/speech.js');

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
