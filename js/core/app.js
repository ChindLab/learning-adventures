/**
 * app.js – Boot, Shell und Sicherheitsprüfungen.
 *
 * Diese Datei wird als erste geladen. Sie legt den globalen Namensraum
 * `BelaSchool` an, baut die Kopfzeile und startet den Router, sobald das
 * Dokument fertig ist.
 *
 * Wichtig: Auf Modulebene darf weder `document` noch `localStorage`
 * angefasst werden. Nur so lässt sich dieselbe Datei unter Node testen.
 */
(function (root) {
  'use strict';

  var NS = root.BelaSchool = root.BelaSchool || {};

  function memoryStorage() {
    var map = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null; },
      setItem: function (k, v) { map[k] = String(v); },
      removeItem: function (k) { delete map[k]; }
    };
  }

  function safeStorage() {
    try {
      var s = root.localStorage;
      var probe = '__bela_probe__';
      s.setItem(probe, '1');
      s.removeItem(probe);
      return s;
    } catch (e) {
      return memoryStorage();
    }
  }

  function starLabel(n) {
    return '★ ' + n;
  }

  /** 42000 → "0:42", 675000 → "11:15". Minuten und Sekunden, nie Stunden. */
  function formatClock(ms) {
    var total = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
    var minutes = Math.floor(total / 60);
    var seconds = total % 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  var app = {
    started: false,

    boot: function () {
      if (app.started) { return; }
      if (root.__BELASCHOOL_SELFTEST__) { return; }
      app.started = true;

      var ui = NS.ui;
      var progressApi = NS.progress.createStore(safeStorage(), { seed: root.BELA_SEED || null });
      NS.progressApi = progressApi;
      NS.store = progressApi;
      NS.i18n.apply();
      NS.speech.setVoice(progressApi.state().settings.voiceURI || '');
      progressApi.beginSession();

      app.buildChrome(progressApi);
      NS.router.start({
        '/': function () { return NS.navigation.menu(); },
        '/stage/:id': function (p) { return NS.navigation.stage(Number(p.id)); },
        '/lesson/:id': function (p) { return NS.lesson.run(p.id); },
        '/achievements': function () { return NS.navigation.achievements(); },
        '/parent': function () { return NS.parent.gate(); }
      });

      root.addEventListener('belaschule:progress', function () {
        app.refreshStars(progressApi);
        app.refreshIdentity(progressApi);
      });

      root.document.addEventListener('visibilitychange', function () {
        if (root.document.hidden) {
          progressApi.clock.stop();
          progressApi.save();
        } else {
          progressApi.beginSession();
          progressApi.clock.start();
        }
      });

      progressApi.clock.start();

      if (NS.parent && NS.parent.applyReducedMotion) { NS.parent.applyReducedMotion(); }

      root.addEventListener('pagehide', function () {
        progressApi.clock.stop();
        progressApi.save();
      });

      // Der erste Klick entsperrt die Audioausgabe (Autoplay-Regel).
      root.document.addEventListener('pointerdown', function once() {
        NS.audio.init();
        root.document.removeEventListener('pointerdown', once);
      });
    },

    buildChrome: function (progressApi) {
      var ui = NS.ui;
      var bar = root.document.getElementById('topbar');
      ui.clear(bar);

      var home = ui.el('button', {
        className: 'icon-btn home-btn',
        attrs: { type: 'button', 'aria-label': NS.i18n.t('Back to the map', 'Zur Karte') },
        on: { click: function () { NS.router.go('#/'); NS.audio.sfx('click'); } }
      }, [ui.el('span', { className: 'home-glyph', text: '⌂' })]);

      var title = ui.el('div', { className: 'topbar-title' }, [
        ui.el('span', { className: 'topbar-name', text: 'Bela' }),
        ui.el('span', { className: 'topbar-sub', text: NS.i18n.t('My First Computer School', 'Meine erste Computer-Schule') })
      ]);

      var stars = ui.el('div', {
        className: 'star-count',
        attrs: { 'aria-label': NS.i18n.t('Stars collected', 'Gesammelte Sterne') }
      }, [ui.el('span', { className: 'star-glyph', text: '★' }),
          ui.el('span', { className: 'star-value', text: '0' })]);

      var clock = ui.el('div', {
        className: 'clock-count',
        attrs: { 'aria-label': NS.i18n.t('Time for this activity', 'Zeit dieser Aufgabe') }
      }, [ui.el('span', { className: 'clock-glyph', text: '⏱' }),
          ui.el('span', { className: 'clock-value', text: '0:00' })]);
      clock.hidden = true;

      var sound = ui.el('button', {
        className: 'icon-btn sound-btn',
        attrs: { type: 'button', 'aria-label': NS.i18n.t('Change sound', 'Ton umschalten') },
        on: { click: function () { app.cycleSound(progressApi, sound); } }
      });

      var gear = ui.el('button', {
        className: 'icon-btn gear-btn',
        attrs: { type: 'button', 'aria-label': NS.i18n.t('For grown-ups', 'Für Erwachsene') },
        on: { click: function () { NS.router.go('#/parent'); } }
      }, [ui.el('span', { className: 'gear-glyph', text: '⚙' })]);

      [home, title, clock, stars, sound, gear].forEach(function (node) { bar.appendChild(node); });
      app.refreshSound(progressApi, sound);
      app.refreshStars(progressApi);
    },

    refreshStars: function (progressApi) {
      var el = root.document.querySelector('.star-value');
      if (el) { el.textContent = String(progressApi.profile().stars); }
    },

    /** Kopfzeile und Dokumenttitel an die Sprache anpassen. */
    refreshIdentity: function (progressApi) {
      var nameEl = root.document.querySelector('.topbar-name');
      var subEl = root.document.querySelector('.topbar-sub');
      var api = progressApi || NS.store;
      var profile = api && api.profile ? api.profile() : null;

      // Wurde die Sprache direkt am Profil geändert (z. B. setLanguage oder
      // addProfile), zieht i18n nach. i18n.apply ruft refreshIdentity erneut
      // auf; dann stimmen die Sprachen überein und es gibt keine Rekursion.
      var currentLang = root.document.documentElement.lang || 'en-GB';
      if (profile && profile.language && profile.language !== currentLang) {
        NS.i18n.apply();
        return;
      }

      if (nameEl) { nameEl.textContent = 'Bela'; }
      if (subEl) {
        subEl.textContent = NS.i18n.t('My First Computer School', 'Meine erste Computer-Schule');
      }

      var title = NS.i18n.t('Bela – My First Computer School', 'Bela – Meine erste Computer-Schule');
      if (root.document.title !== title) { root.document.title = title; }
    },

    /**
     * Zeigt die Zeit der aktuellen Aufgabe. `null` blendet die Uhr aus.
     * Nur Information – es gibt kein Zeitlimit und keine Strafe.
     */
    setClock: function (ms) {
      var box = root.document.querySelector('.clock-count');
      var value = root.document.querySelector('.clock-value');
      if (!box || !value) { return; }
      if (ms === null || ms === undefined) {
        box.hidden = true;
        return;
      }
      box.hidden = false;
      value.textContent = formatClock(ms);
    },

    refreshSound: function (progressApi, button) {
      var s = progressApi.state().settings;
      var mode = !s.sound ? 'mute' : (s.speech === false ? 'effects' : 'all');
      NS.audio.setMode(mode);
      NS.speech.setEnabled(mode === 'all');
      if (button) {
        button.textContent = mode === 'all' ? '🔊' : (mode === 'effects' ? '🔉' : '🔇');
        button.setAttribute('aria-label', NS.i18n.t(mode === 'all' ? 'Sound on' : (mode === 'effects' ? 'Effects only' : 'Sound off'), mode === 'all' ? 'Ton an' : (mode === 'effects' ? 'Nur Töne' : 'Ton aus')));
      }
    },

    cycleSound: function (progressApi, button) {
      var s = progressApi.state().settings;
      var current = !s.sound ? 'mute' : (s.speech === false ? 'effects' : 'all');
      var next = { all: 'effects', effects: 'mute', mute: 'all' }[current];
      progressApi.setSetting('sound', next !== 'mute');
      progressApi.setSetting('effects', next !== 'mute');
      progressApi.setSetting('speech', next === 'all');
      app.refreshSound(progressApi, button);
      if (next !== 'mute') { NS.audio.sfx('click'); }
    }
  };

  NS.app = app;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { app: app, formatClock: formatClock };
  }

  if (typeof root.document !== 'undefined') {
    // `defer`-Skripte laufen vor DOMContentLoaded, aber alle nacheinander.
    // Deshalb erst dort starten – sonst fehlen die späteren Module.
    if (root.document.readyState === 'complete') {
      app.boot();
    } else {
      root.document.addEventListener('DOMContentLoaded', function () { app.boot(); });
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
