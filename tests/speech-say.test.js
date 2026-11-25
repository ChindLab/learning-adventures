/**
 * speech-say.test.js – rapid lines must not queue a stale utterance.
 *
 * Chrome can wedge when cancel() and speak() are called back-to-back. The
 * app speaks on every tap, so a later line must win cleanly.
 */
const test = require('node:test');
const assert = require('node:assert');

function FakeSpeech() {
  this.speaking = false;
  this.pending = false;
  this.calls = [];
}
FakeSpeech.prototype.cancel = function () {
  this.calls.push('cancel');
  this.speaking = false;
  this.pending = false;
};
FakeSpeech.prototype.speak = function (utterance) {
  this.calls.push('speak:' + utterance.text);
  this.speaking = true;
};
FakeSpeech.prototype.getVoices = function () {
  return [{ name: 'Lekha', lang: 'hi-IN', voiceURI: 'Lekha', localService: true }];
};
FakeSpeech.prototype.addEventListener = function () {};

test('rapid speech keeps only the latest line', async () => {
  const fake = new FakeSpeech();
  globalThis.speechSynthesis = fake;
  globalThis.SpeechSynthesisUtterance = function (text) { this.text = text; };
  globalThis.addEventListener = function () {};

  const path = require.resolve('../js/core/speech.js');
  delete require.cache[path];
  const speech = require(path);
  speech.setLanguage('hi-IN');

  speech.say('first');
  speech.say('second');
  speech.say('third');
  await new Promise((resolve) => setTimeout(resolve, 150));

  assert.deepStrictEqual(fake.calls, ['speak:first', 'cancel', 'speak:third']);

  delete globalThis.speechSynthesis;
  delete globalThis.SpeechSynthesisUtterance;
  delete globalThis.addEventListener;
  delete require.cache[path];
});
