/**
 * audio.js – alle Geräusche werden im Browser erzeugt (Web Audio API).
 * Es gibt keine Sounddateien: nichts nachzuladen, keine Lizenzfragen.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  var ctx = null;
  var master = null;
  var mode = 'all';

  function ensure() {
    if (ctx) { return ctx; }
    try {
      var AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) { return null; }
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.25;
      master.connect(ctx.destination);
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }

  function tone(freq, start, dur, type, peak) {
    var c = ensure();
    if (!c) { return; }
    try {
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, c.currentTime + start);
      gain.gain.setValueAtTime(0.0001, c.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(peak || 0.5, c.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(master);
      osc.start(c.currentTime + start);
      osc.stop(c.currentTime + start + dur + 0.02);
    } catch (e) { /* Ton ist nie kritisch */ }
  }

  function slide(from, to, dur, type, peak) {
    var c = ensure();
    if (!c) { return; }
    try {
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(from, c.currentTime);
      osc.frequency.exponentialRampToValueAtTime(to, c.currentTime + dur);
      gain.gain.setValueAtTime(peak || 0.4, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      osc.stop(c.currentTime + dur + 0.02);
    } catch (e) { /* egal */ }
  }

  var RECIPES = {
    click: function () { tone(720, 0, 0.05, 'square', 0.18); },
    correct: function () { tone(523, 0, 0.11, 'sine', 0.4); tone(659, 0.1, 0.16, 'sine', 0.35); },
    wrong: function () { slide(300, 190, 0.14, 'sine', 0.22); },
    star: function () { tone(880, 0, 0.1, 'triangle', 0.3); tone(1108, 0.08, 0.1, 'triangle', 0.28); tone(1318, 0.16, 0.18, 'triangle', 0.26); },
    milestone: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.13, 0.22, 'triangle', 0.3); }); },
    pop: function () { slide(900, 300, 0.08, 'square', 0.18); },
    bump: function () { slide(160, 110, 0.14, 'sine', 0.26); }
  };

  var audio = {
    init: function () { ensure(); },
    mode: function () { return mode; },
    setMode: function (next) { mode = next === 'effects' || next === 'mute' ? next : 'all'; },
    sfx: function (name) {
      if (mode === 'mute') { return; }
      var fn = RECIPES[name];
      if (fn) { try { fn(); } catch (e) { /* egal */ } }
    },
    stop: function () { /* kurze Töne, nichts zu stoppen */ }
  };

  NS.audio = audio;
  if (typeof module !== 'undefined' && module.exports) { module.exports = audio; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
