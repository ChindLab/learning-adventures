/**
 * speech-pack.test.js – pre-recorded voice packs beat TTS when present.
 */
const test = require('node:test');
const assert = require('node:assert');

test('a matching voice-pack line plays audio and falls back cleanly', () => {
  const previous = globalThis.BelaSchool;
  const audioInstances = [];
  class FakeAudio {
    constructor(src) {
      this.src = src;
      this.paused = true;
      this.currentTime = 0;
      audioInstances.push(this);
    }
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
  }

  globalThis.BelaSchool = {
    voicePacks: {
      'de-CH': {
        byText: { 'Hallo': 'assets/audio/de-CH/mp3/hallo.mp3' }
      }
    }
  };
  globalThis.Audio = FakeAudio;

  const path = require.resolve('../js/core/speech.js');
  delete require.cache[path];
  const speech = require(path);
  speech.setLanguage('de-CH');

  speech.say('  Hallo  ');
  assert.strictEqual(audioInstances.length, 1);
  assert.strictEqual(audioInstances[0].src, 'assets/audio/de-CH/mp3/hallo.mp3');
  assert.strictEqual(audioInstances[0].paused, false);

  speech.say('Unbekannt');
  assert.strictEqual(audioInstances.length, 1, 'missing line must not create audio');

  speech.cancel();
  assert.strictEqual(audioInstances[0].paused, true);

  delete require.cache[path];
  delete globalThis.Audio;
  if (previous === undefined) { delete globalThis.BelaSchool; }
  else { globalThis.BelaSchool = previous; }
});
