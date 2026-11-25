/**
 * progress.test.js – Fortschritt, Profile, Sicherung.
 */
const test = require('node:test');
const assert = require('node:assert');
const { createStore } = require('../js/core/progress.js');

function mem() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k)
  };
}

test('Standard: ein Profil, null Sterne, Stufe 1-2 offen', () => {
  const s = createStore(mem()).state();
  assert.strictEqual(s.version, 1);
  assert.strictEqual(s.activeProfile, 'p1');
  assert.deepStrictEqual(Object.keys(s.profiles), ['p1']);
  assert.strictEqual(s.profiles.p1.stars, 0);
  assert.deepStrictEqual(s.profiles.p1.unlocked, [1, 2]);
});

test('Speichern und Laden', () => {
  const back = mem();
  const a = createStore(back);
  a.awardStars(4);
  a.renameProfile('p1', 'Mia');
  a.save();
  const b = createStore(back);
  assert.strictEqual(b.profile().stars, 4);
  assert.strictEqual(b.profile().name, 'Mia');
});

test('Kaputtes JSON wird ersetzt und gesichert', () => {
  const st = mem();
  st.setItem('belaschule.v1', '{nope');
  const store = createStore(st);
  assert.strictEqual(store.profile().stars, 0);
  assert.ok(st.getItem('belaschule.broken'));
});

test('Dieselbe Aktivität zählt nur einmal', () => {
  const store = createStore(mem());
  assert.strictEqual(store.completeActivity(1, '1-1', '1-1-1').awarded, true);
  assert.strictEqual(store.completeActivity(1, '1-1', '1-1-1').awarded, false);
  assert.strictEqual(store.profile().stars, 1);
});

test('Meilenstein schaltet die nächste Stufe frei', () => {
  const store = createStore(mem());
  store.completeMilestone(2, 's2');
  assert.ok(store.isUnlocked(3));
  assert.deepStrictEqual(store.profile().achievements, ['s2']);
  assert.strictEqual(store.profile().stars, 2);
});

test('Profile sind getrennt, Einstellungen gemeinsam', () => {
  const store = createStore(mem());
  store.awardStars(5);
  store.completeMilestone(1, 's1');
  store.setSetting('sound', false);
  store.addProfile('Ben');
  assert.strictEqual(store.profile().stars, 0);
  assert.deepStrictEqual(store.profile().unlocked, [1, 2]);
  assert.strictEqual(store.state().settings.sound, false);
  store.setActiveProfile('p1');
  assert.strictEqual(store.profile().stars, 7);
  assert.ok(store.isUnlocked(2));
});

test('Das letzte Profil kann nicht gelöscht werden', () => {
  const store = createStore(mem());
  assert.strictEqual(store.removeProfile('p1').ok, false);
  assert.strictEqual(store.listProfiles().length, 1);
});

test('Sicherung exportieren und laden, Müll wird abgelehnt', () => {
  const store = createStore(mem());
  store.awardStars(7);
  const backup = store.exportJSON();
  const other = createStore(mem());
  assert.deepStrictEqual(other.importJSON('{kaputt'), { ok: false, error: 'json' });
  assert.deepStrictEqual(other.importJSON('{"version":1,"profiles":{}}'), { ok: false, error: 'shape' });
  assert.strictEqual(other.profile().stars, 0);
  assert.deepStrictEqual(other.importJSON(backup), { ok: true });
  assert.strictEqual(other.profile().stars, 7);
});

test('Zurücksetzen: aktives Profil oder alles', () => {
  const store = createStore(mem());
  store.awardStars(3);
  store.addProfile('Ben');
  store.awardStars(2);
  store.resetActiveProfile();
  assert.strictEqual(store.profile().stars, 0);
  assert.strictEqual(store.state().profiles.p1.stars, 3);
  store.resetAll();
  assert.strictEqual(store.profile().stars, 0);
  assert.strictEqual(store.listProfiles().length, 1);
});

test('Speicherfehler wirft nicht', () => {
  const st = mem();
  st.setItem = () => { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; };
  const store = createStore(st);
  assert.doesNotThrow(() => store.save());
  assert.strictEqual(store.profile().stars, 0);
  assert.strictEqual(store.persistFailed, true);
});

test('Uhr zählt nur bei laufender Zeit', () => {
  let t = 1000;
  const store = createStore(mem(), { now: () => t });
  store.beginSession();
  store.clock.start();
  t = 4500;
  store.clock.stop();
  assert.strictEqual(store.profile().stats.playMs, 3500);
  assert.strictEqual(store.profile().stats.sessions, 1);
  store.beginSession();
  assert.strictEqual(store.profile().stats.sessions, 1);
});

test('Sprache pro Profil', () => {
  const store = createStore(mem());
  assert.strictEqual(store.profile().language, 'en-GB');
  store.setLanguage('de');
  assert.strictEqual(store.profile().language, 'de-DE');
  store.addProfile('Ben');
  assert.strictEqual(store.profile().language, 'en-GB');
  store.setActiveProfile('p1');
  assert.strictEqual(store.profile().language, 'de-DE');
  store.setLanguage('fr');
  assert.strictEqual(store.profile().language, 'fr-FR');
  store.setLanguage('zh');
  assert.strictEqual(store.profile().language, 'zh-CN');
  store.setLanguage('hi');
  assert.strictEqual(store.profile().language, 'hi-IN');
  store.setLanguage('ne');
  assert.strictEqual(store.profile().language, 'ne-NP');
  store.setLanguage('gsw');
  assert.strictEqual(store.profile().language, 'de-CH');
  store.setLanguage('klingon');
  assert.strictEqual(store.profile().language, 'en-GB');
});

test('alte Sprachkürzel werden migriert', () => {
  const st = mem();
  st.setItem('belaschule.v1', JSON.stringify({
    version: 1,
    activeProfile: 'p1',
    settings: {},
    profiles: { p1: { language: 'de', stages: {}, stars: 0, achievements: [], unlocked: [1, 2] } }
  }));
  const store = createStore(st);
  assert.strictEqual(store.profile().language, 'de-DE');
});

test('Spielzeit wird pro Aufgabe gesammelt', () => {
  const store = createStore(mem());
  store.recordActivityTime(1, '1-1', '1-1-1', 5000);
  store.recordActivityTime(1, '1-1', '1-1-1', 2500);
  store.recordActivityTime(1, '1-1', '1-1-2', 1000);
  const lesson = store.profile().stages['1'].lessons['1-1'];
  assert.strictEqual(lesson.ms, 8500);
  assert.deepStrictEqual(lesson.times, { '1-1-1': 7500, '1-1-2': 1000 });
});

test('richtige und falsche Anschläge werden getrennt gezählt', () => {
  const store = createStore(mem());
  store.recordOutcome(3, '3-1', 10, 4);
  const lesson = store.profile().stages['3'].lessons['3-1'];
  assert.strictEqual(lesson.correct, 10);
  assert.strictEqual(lesson.attempts, 14);
  assert.strictEqual(store.profile().stats.correct, 10);
  assert.strictEqual(store.profile().stats.attempts, 14);
});

test('unsinnige Anschlagzahlen werden ignoriert', () => {
  const store = createStore(mem());
  store.recordOutcome(3, '3-1', 'viele', -2);
  store.recordOutcome(3, '3-1', 0, 0);
  assert.strictEqual(store.profile().stages['3'], undefined);
});

test('Spielzeit bleibt im eigenen Profil', () => {  const store = createStore(mem());
  store.recordActivityTime(1, '1-1', '1-1-1', 4000);
  store.addProfile('Ben');
  store.recordActivityTime(1, '1-1', '1-1-1', 1000);
  assert.strictEqual(store.profile().stages['1'].lessons['1-1'].ms, 1000);
  store.setActiveProfile('p1');
  assert.strictEqual(store.profile().stages['1'].lessons['1-1'].ms, 4000);
});

test('ungültige Zeiten werden ignoriert', () => {
  const store = createStore(mem());
  store.recordActivityTime(1, '1-1', '1-1-1', -50);
  store.recordActivityTime(1, '1-1', '1-1-1', 'abc');
  assert.strictEqual(store.profile().stages['1'], undefined);
});

test('alte Lektionen ohne Zeiten bleiben lesbar', () => {
  const st = mem();
  const store = createStore(st);
  store.completeActivity(1, '1-1', '1-1-1');
  store.save();
  const reloaded = createStore(st);
  const lesson = reloaded.profile().stages['1'].lessons['1-1'];
  assert.deepStrictEqual(lesson.times, {});
});
