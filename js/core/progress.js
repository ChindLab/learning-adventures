/**
 * progress.js – der gesamte Lernfortschritt, versioniert und testbar.
 *
 * Aufbau (Details in docs/design/spec.md, Abschnitt 8):
 *   { version, activeProfile, settings, profiles: { p1: { … } } }
 *
 * Einstellungen (Ton, Sprache) gelten für das Gerät. Alles andere gehört
 * zu genau einem Kinderprofil. Dadurch kann später ein zweites Kind
 * hinzukommen, ohne dass gespeicherte Daten umgebaut werden müssen.
 */
(function (root) {
  'use strict';

  var LANGUAGES = ['en', 'de', 'fr', 'it', 'zh', 'hi', 'ne'];
  var KEY = 'belaschule.v1';
  var LEGACY = 'bobbyschule.v1';
  var BROKEN = 'belaschule.broken';

  function nowMs() { return Date.now(); }

  function defaultProfile(id, stamp) {
    return {
      id: id,
      name: '',
      language: 'en',
      createdAt: stamp,
      stages: {},
      stars: 0,
      achievements: [],
      lastLesson: null,
      unlocked: [1, 2],
      unlockAll: false,
      stats: { playMs: 0, sessions: 0, correct: 0, attempts: 0 }
    };
  }

  function defaultState(stamp) {
    return {
      version: 1,
      createdAt: stamp,
      updatedAt: stamp,
      activeProfile: 'p1',
      settings: { sound: true, speech: true, effects: true, reducedMotion: false },
      profiles: { p1: defaultProfile('p1', stamp) }
    };
  }

  /**
   * Erste Einrichtung aus `bela.config.json` (erzeugt von setup.sh).
   * Das Seed wird nur beim allerersten Start benutzt – vorhandener
   * Fortschritt im Browser hat immer Vorrang.
   */
  function normalizeSeed(seed) {
    if (!seed || seed.version !== 1 || !Array.isArray(seed.profiles)) { return null; }
    var profiles = seed.profiles.slice(0, 8).map(function (entry, index) {
      entry = entry || {};
      return {
        id: 'p' + (index + 1),
        name: typeof entry.name === 'string' ? entry.name.trim().slice(0, 20) : '',
        language: LANGUAGES.indexOf(entry.language) !== -1 ? entry.language : 'en',
        unlockAll: !!entry.unlockAll
      };
    });
    if (!profiles.length) { return null; }

    var active = seed.activeProfile;
    var known = profiles.some(function (profile) { return profile.id === active; });
    if (!known) { active = profiles[0].id; }

    var settings = {};
    if (seed.settings && typeof seed.settings === 'object') {
      ['sound', 'speech', 'effects', 'reducedMotion'].forEach(function (key) {
        if (typeof seed.settings[key] === 'boolean') { settings[key] = seed.settings[key]; }
      });
    }

    return { version: 1, activeProfile: active, profiles: profiles, settings: settings };
  }

  function stateFromSeed(seed, stamp) {
    var normalized = normalizeSeed(seed);
    if (!normalized) { return defaultState(stamp); }
    var state = defaultState(stamp);
    var profiles = {};
    normalized.profiles.forEach(function (entry) {
      var profile = defaultProfile(entry.id, stamp);
      profile.name = entry.name;
      profile.language = entry.language;
      profile.unlockAll = entry.unlockAll;
      profiles[entry.id] = profile;
    });
    state.profiles = profiles;
    state.activeProfile = normalized.activeProfile;
    state.settings = Object.assign({}, state.settings, normalized.settings);
    return state;
  }

  /**
   * Nimmt alte oder fremde Daten entgegen und gibt entweder einen gültigen
   * Zustand zurück oder `null`, wenn nichts zu retten ist.
   */
  function migrate(raw, stamp) {
    if (!raw || typeof raw !== 'object') { return null; }

    // Ganz alte Form: Fortschritt lag direkt oben (ohne profiles).
    if (!raw.profiles && (raw.stars !== undefined || raw.stages !== undefined)) {
      var legacy = defaultProfile('p1', raw.createdAt || stamp);
      legacy.stages = raw.stages || {};
      legacy.stars = raw.stars || 0;
      legacy.achievements = raw.achievements || [];
      legacy.lastLesson = raw.lastLesson || null;
      legacy.unlocked = raw.unlocked || [1, 2];
      legacy.unlockAll = !!raw.unlockAll;
      if (raw.child && raw.child.name) { legacy.name = raw.child.name; }
      if (raw.stats) {
        legacy.stats = {
          playMs: raw.stats.playMs || raw.timeSpent || 0,
          sessions: raw.stats.sessions || 0,
          correct: raw.stats.correct || 0,
          attempts: raw.stats.attempts || 0
        };
      }
      var wrapped = defaultState(stamp);
      wrapped.profiles = { p1: legacy };
      wrapped.settings = Object.assign({}, wrapped.settings, raw.settings || {});
      return wrapped;
    }

    if (raw.version !== 1 || !raw.profiles || typeof raw.profiles !== 'object') { return null; }
    var ids = Object.keys(raw.profiles);
    if (!ids.length) { return null; }
    if (!raw.profiles[raw.activeProfile]) { raw.activeProfile = ids[0]; }

    // Fehlende Felder eines Profils ergänzen, ohne Daten zu verlieren.
    ids.forEach(function (id) {
      var p = raw.profiles[id] || {};
      var base = defaultProfile(id, p.createdAt || stamp);
      p.id = id;
      p.stages = p.stages || base.stages;
      p.stars = typeof p.stars === 'number' ? p.stars : 0;
      p.achievements = Array.isArray(p.achievements) ? p.achievements : [];
      p.unlocked = Array.isArray(p.unlocked) && p.unlocked.length ? p.unlocked : [1, 2];
      p.unlockAll = !!p.unlockAll;
      p.stats = Object.assign({}, base.stats, p.stats || {});
      p.name = typeof p.name === 'string' ? p.name : '';
      p.language = LANGUAGES.indexOf(p.language) !== -1 ? p.language : 'en';
      raw.profiles[id] = p;
    });

    raw.settings = Object.assign({}, defaultState(stamp).settings, raw.settings || {});
    raw.version = 1;
    return raw;
  }

  function createStore(storage, opts) {
    opts = opts || {};
    var now = opts.now || nowMs;
    var stamp = now();
    var seed = normalizeSeed(opts.seed);
    var state = null;
    var persistFailed = false;
    var sessionCounted = false;
    var clockStartedAt = null;

    function read() {
      var text = null;
      var legacy = false;
      try { text = storage.getItem(KEY); } catch (e) { text = null; }
      if (!text) {
        try { text = storage.getItem(LEGACY); } catch (e) { text = null; }
        legacy = !!text;
      }
      if (!text) { return seed ? stateFromSeed(seed, stamp) : defaultState(stamp); }
      var parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        try { storage.setItem(BROKEN, text); } catch (ignore) { /* egal */ }
        return defaultState(stamp);
      }
      var migrated = migrate(parsed, stamp);
      if (!migrated) {
        try { storage.setItem(BROKEN, text); } catch (ignore) { /* egal */ }
        return defaultState(stamp);
      }
      if (legacy) {
        try {
          storage.setItem(KEY, JSON.stringify(migrated));
          storage.removeItem(LEGACY);
        } catch (ignore) { /* egal */ }
      }
      return migrated;
    }

    state = read();

    function touch() { state.updatedAt = now(); }

    function persist() {
      try {
        storage.setItem(KEY, JSON.stringify(state));
        persistFailed = false;
      } catch (e) {
        persistFailed = true;
      }
    }

    function emit() {
      if (root && typeof root.dispatchEvent === 'function' && typeof root.CustomEvent === 'function') {
        try { root.dispatchEvent(new root.CustomEvent('belaschule:progress')); } catch (e) { /* egal */ }
      }
    }

    function commit() { touch(); persist(); emit(); }

    function active() { return state.profiles[state.activeProfile]; }

    function stageRecord(profile, stageId) {
      var key = String(stageId);
      if (!profile.stages[key]) { profile.stages[key] = { lessons: {}, milestone: { done: false } }; }
      if (!profile.stages[key].lessons) { profile.stages[key].lessons = {}; }
      if (!profile.stages[key].milestone) { profile.stages[key].milestone = { done: false }; }
      return profile.stages[key];
    }

    function lessonRecord(profile, stageId, lessonId) {
      var stage = stageRecord(profile, stageId);
      if (!stage.lessons[lessonId]) {
        stage.lessons[lessonId] = {
          done: false, attempts: 0, correct: 0, ms: 0, lastAt: 0, completed: [], times: {}
        };
      }
      if (!Array.isArray(stage.lessons[lessonId].completed)) {
        stage.lessons[lessonId].completed = [];
      }
      if (!stage.lessons[lessonId].times || typeof stage.lessons[lessonId].times !== 'object') {
        stage.lessons[lessonId].times = {};
      }
      return stage.lessons[lessonId];
    }

    var store = {
      KEY: KEY,

      state: function () { return state; },
      profile: function () { return active(); },

      save: function () { persist(); return state; },

      beginSession: function () {
        if (sessionCounted) { return; }
        sessionCounted = true;
        active().stats.sessions += 1;
        commit();
      },

      listProfiles: function () {
        return Object.keys(state.profiles).map(function (id) {
          var p = state.profiles[id];
          return { id: id, name: p.name, stars: p.stars };
        });
      },

      addProfile: function (name) {
        var n = 1;
        while (state.profiles['p' + n]) { n += 1; }
        var id = 'p' + n;
        var profile = defaultProfile(id, now());
        profile.name = String(name || '').slice(0, 20);
        state.profiles[id] = profile;
        state.activeProfile = id;
        commit();
        return id;
      },

      setActiveProfile: function (id) {
        if (!state.profiles[id]) { return false; }
        state.activeProfile = id;
        commit();
        return true;
      },

      renameProfile: function (id, name) {
        if (!state.profiles[id]) { return false; }
        state.profiles[id].name = String(name || '').trim().slice(0, 20);
        commit();
        return true;
      },

      removeProfile: function (id) {
        if (!state.profiles[id]) { return { ok: false, error: 'unknown' }; }
        if (Object.keys(state.profiles).length <= 1) { return { ok: false, error: 'last' }; }
        delete state.profiles[id];
        if (state.activeProfile === id) { state.activeProfile = Object.keys(state.profiles)[0]; }
        commit();
        return { ok: true };
      },

      isUnlocked: function (stageId) {
        var p = active();
        return p.unlockAll || p.unlocked.indexOf(Number(stageId)) !== -1;
      },

      setUnlockAll: function (value) {
        active().unlockAll = !!value;
        commit();
      },

      setSetting: function (key, value) {
        state.settings[key] = value;
        commit();
      },

      setLanguage: function (lang) {
        active().language = LANGUAGES.indexOf(lang) !== -1 ? lang : 'en';
        commit();
      },

      recordAttempt: function (stageId, lessonId, correct) {
        var record = lessonRecord(active(), stageId, lessonId);
        record.attempts += 1;
        if (correct) { record.correct += 1; }
        active().stats.attempts += 1;
        if (correct) { active().stats.correct += 1; }
        commit();
      },

      /**
       * Ein Spiel kann mehrere richtige und falsche Versuche melden.
       * Beispiel: zehn Tastendrücke, davon drei daneben.
       */
      recordOutcome: function (stageId, lessonId, corrects, wrongs) {
        var good = Math.max(0, Math.floor(Number(corrects) || 0));
        var bad = Math.max(0, Math.floor(Number(wrongs) || 0));
        if (good === 0 && bad === 0) { return; }
        var record = lessonRecord(active(), stageId, lessonId);
        record.correct += good;
        record.attempts += good + bad;
        active().stats.correct += good;
        active().stats.attempts += good + bad;
        commit();
      },

      /**
       * Spielzeit einer einzelnen Aufgabe. Nur zur Information für Eltern;
       * das Kind sieht keine Uhr und keinen Zeitdruck.
       */
      recordActivityTime: function (stageId, lessonId, activityId, ms) {
        var value = Number(ms);
        if (!isFinite(value) || value <= 0) { return; }
        var record = lessonRecord(active(), stageId, lessonId);
        record.ms += value;
        record.times[activityId] = (record.times[activityId] || 0) + value;
        commit();
      },

      completeActivity: function (stageId, lessonId, activityId) {        var record = lessonRecord(active(), stageId, lessonId);
        if (record.completed.indexOf(activityId) !== -1) { return { awarded: false, stars: 0 }; }
        record.completed.push(activityId);
        record.lastAt = now();
        active().stars += 1;
        commit();
        return { awarded: true, stars: 1 };
      },

      completeLesson: function (stageId, lessonId) {
        var record = lessonRecord(active(), stageId, lessonId);
        record.done = true;
        record.lastAt = now();
        active().lastLesson = lessonId;
        commit();
        return record;
      },

      setLastLesson: function (lessonId) {
        active().lastLesson = lessonId;
        commit();
      },

      completeMilestone: function (stageId, achievementId) {
        var stage = stageRecord(active(), String(stageId));
        if (stage.milestone.done) { return { awarded: false }; }
        stage.milestone.done = true;
        stage.milestone.lastAt = now();
        var p = active();
        p.stars += 2;
        if (achievementId && p.achievements.indexOf(achievementId) === -1) {
          p.achievements.push(achievementId);
        }
        var next = Number(stageId) + 1;
        if (p.unlocked.indexOf(next) === -1 && next <= 8) { p.unlocked.push(next); }
        commit();
        return { awarded: true };
      },

      awardAchievement: function (id) {
        var p = active();
        if (p.achievements.indexOf(id) !== -1) { return false; }
        p.achievements.push(id);
        commit();
        return true;
      },

      awardStars: function (n) {
        active().stars += Number(n) || 0;
        commit();
      },

      addPlayMs: function (ms) {
        active().stats.playMs += Math.max(0, Number(ms) || 0);
        commit();
      },

      weakAreas: function (limit) {
        limit = limit || 3;
        var out = [];
        var p = active();
        Object.keys(p.stages).forEach(function (stageId) {
          var lessons = p.stages[stageId].lessons || {};
          Object.keys(lessons).forEach(function (lessonId) {
            var l = lessons[lessonId];
            if (l.attempts >= 4 && l.correct / l.attempts < 0.7) {
              out.push({ stage: Number(stageId), lesson: lessonId, attempts: l.attempts,
                         accuracy: l.correct / l.attempts });
            }
          });
        });
        out.sort(function (a, b) { return a.accuracy - b.accuracy; });
        return out.slice(0, limit);
      },

      resetActiveProfile: function () {
        var p = active();
        var name = p.name;
        var fresh = defaultProfile(p.id, now());
        fresh.name = name;
        state.profiles[p.id] = fresh;
        commit();
      },

      resetAll: function () {
        state = defaultState(now());
        commit();
      },

      exportJSON: function () { return JSON.stringify(state, null, 2); },

      importJSON: function (text) {
        var parsed;
        try { parsed = JSON.parse(text); } catch (e) { return { ok: false, error: 'json' }; }
        if (!parsed || parsed.version !== 1 || !parsed.profiles || typeof parsed.profiles !== 'object') {
          return { ok: false, error: 'shape' };
        }
        var ids = Object.keys(parsed.profiles);
        if (!ids.length || !parsed.profiles[parsed.activeProfile]) { return { ok: false, error: 'shape' }; }
        var migrated = migrate(parsed, now());
        if (!migrated) { return { ok: false, error: 'shape' }; }
        state = migrated;
        commit();
        return { ok: true };
      },

      get persistFailed() { return persistFailed; },

      clock: {
        start: function () {
          if (clockStartedAt !== null) { return; }
          clockStartedAt = now();
        },
        stop: function () {
          if (clockStartedAt === null) { return; }
          var delta = Math.max(0, now() - clockStartedAt);
          clockStartedAt = null;
          if (delta > 0) { store.addPlayMs(delta); }
        },
        running: function () { return clockStartedAt !== null; }
      }
    };

    return store;
  }

  var api = {
    createStore: createStore,
    defaultState: defaultState,
    migrate: migrate,
    normalizeSeed: normalizeSeed,
    stateFromSeed: stateFromSeed
  };
  if (root && root.BelaSchool) { root.BelaSchool.progress = api; }
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
