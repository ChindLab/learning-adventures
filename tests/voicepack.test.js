/**
 * voicepack.test.js – the shipped Swiss German pack must be complete.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

require('../js/content/voicepack-de-CH.js');

test('the Swiss German voice pack maps spoken text to local MP3s', () => {
  const pack = globalThis.BelaSchool && globalThis.BelaSchool.voicePacks &&
    globalThis.BelaSchool.voicePacks['de-CH'];
  assert.ok(pack, 'de-CH voice pack');
  assert.strictEqual(pack.voice, 'Swiss-german-lady');
  const entries = Object.entries(pack.byText || {});
  assert.ok(entries.length >= 500, 'at least 500 recorded lines, got ' + entries.length);

  entries.forEach(([text, file]) => {
    assert.ok(text.trim(), 'text key');
    assert.ok(file.startsWith('assets/audio/de-CH/mp3/'), file);
    assert.ok(fs.existsSync(path.join(__dirname, '..', file)), 'missing ' + file);
  });
});
