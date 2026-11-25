/**
 * seed.test.js – Erst-Einrichtung aus bela.config.json.
 */
const test = require('node:test');
const assert = require('node:assert');
const { createStore, normalizeSeed, stateFromSeed, defaultState } = require('../js/core/progress.js');

function mem() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k)
  };
}

const SEED = {
  version: 1,
  activeProfile: 'p2',
  settings: { sound: false, speech: true, unknown: true },
  profiles: [
    { name: 'Mia', language: 'de' },
    { name: 'Ben', language: 'en', unlockAll: true }
  ]
};

test('Seed erzeugt Profile beim allerersten Start', () => {
  const store = createStore(mem(), { seed: SEED });
  const state = store.state();
  assert.deepStrictEqual(Object.keys(state.profiles), ['p1', 'p2']);
  assert.strictEqual(state.profiles.p1.name, 'Mia');
  assert.strictEqual(state.profiles.p1.language, 'de-DE');
  assert.strictEqual(state.profiles.p2.name, 'Ben');
  assert.strictEqual(state.profiles.p2.language, 'en-GB');
  assert.strictEqual(state.profiles.p2.unlockAll, true);
  assert.strictEqual(state.activeProfile, 'p2');
  assert.strictEqual(state.settings.sound, false);
  assert.strictEqual(state.settings.unknown, undefined);
});

test('jedes Kind startet bei null', () => {
  const state = createStore(mem(), { seed: SEED }).state();
  assert.strictEqual(state.profiles.p1.stars, 0);
  assert.deepStrictEqual(state.profiles.p1.unlocked, [1, 2]);
  assert.deepStrictEqual(state.profiles.p1.achievements, []);
});

test('alter Speicherschlüssel wird übernommen', () => {
  const st = mem();
  const old = defaultState(1000);
  old.profiles.p1.name = 'Alt';
  old.profiles.p1.stars = 4;
  st.setItem('bobbyschule.v1', JSON.stringify(old));

  const store = createStore(st);
  assert.strictEqual(store.profile().name, 'Alt');
  assert.strictEqual(store.profile().stars, 4);
  assert.ok(st.getItem('belaschule.v1'));
  assert.strictEqual(st.getItem('bobbyschule.v1'), null);
});

test('vorhandener Fortschritt gewinnt gegen den Seed', () => {
  const storage = mem();
  const first = createStore(storage);
  first.awardStars(7);
  first.renameProfile('p1', 'Alt');
  first.save();

  const second = createStore(storage, { seed: SEED });
  assert.strictEqual(second.profile().name, 'Alt');
  assert.strictEqual(second.profile().stars, 7);
  assert.deepStrictEqual(Object.keys(second.state().profiles), ['p1']);
});

test('ungültige Seeds fallen auf den Standard zurück', () => {
  assert.strictEqual(normalizeSeed(null), null);
  assert.strictEqual(normalizeSeed({ version: 2, profiles: [{ name: 'X' }] }), null);
  assert.strictEqual(normalizeSeed({ version: 1, profiles: [] }), null);

  const state = createStore(mem(), { seed: { version: 1, profiles: [] } }).state();
  assert.strictEqual(Object.keys(state.profiles).length, 1);
  assert.strictEqual(state.profiles.p1.name, '');
});

test('Ids werden normalisiert und auf acht Kinder begrenzt', () => {
  const many = { version: 1, profiles: Array.from({ length: 12 }, (_, i) => ({ name: 'K' + i })) };
  const seed = normalizeSeed(many);
  assert.strictEqual(seed.profiles.length, 8);
  assert.deepStrictEqual(seed.profiles.map((p) => p.id), ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8']);
  assert.strictEqual(seed.activeProfile, 'p1');
});

test('Namen werden gekürzt, Sprachen validiert', () => {
  const seed = normalizeSeed({
    version: 1,
    profiles: [{ name: '  Ein sehr langer Name mit mehr Zeichen  ', language: 'fr' }]
  });
  assert.strictEqual(seed.profiles[0].name.length, 20);
  assert.strictEqual(seed.profiles[0].language, 'fr-FR');

  const invalid = normalizeSeed({ version: 1, profiles: [{ language: 'xx' }] });
  assert.strictEqual(invalid.profiles[0].language, 'en-GB');

  const hindi = normalizeSeed({ version: 1, profiles: [{ language: 'hi' }] });
  assert.strictEqual(hindi.profiles[0].language, 'hi-IN');
  const nepali = normalizeSeed({ version: 1, profiles: [{ language: 'ne' }] });
  assert.strictEqual(nepali.profiles[0].language, 'ne-NP');
  const swiss = normalizeSeed({ version: 1, profiles: [{ language: 'gsw' }] });
  assert.strictEqual(swiss.profiles[0].language, 'de-CH');
});

test('stateFromSeed verändert den Seed nicht', () => {
  const before = JSON.stringify(SEED);
  const state = stateFromSeed(SEED, 1000);
  assert.strictEqual(JSON.stringify(SEED), before);
  assert.strictEqual(state.profiles.p1.name, 'Mia');
});
