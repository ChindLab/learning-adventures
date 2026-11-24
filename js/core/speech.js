/**
 * speech.js – Sprachausgabe über die Browser-Stimme.
 *
 * Wenn das Gerät keine deutsche Stimme hat, bleibt alles still; die Sätze
 * stehen ohnehin als Text da. Es wird nie ein Fehler angezeigt.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  var enabled = true;
  var voice = null;
  var voicesLoaded = false;
  var preferredURI = '';
  var language = 'de-DE';

  // Spaß-Stimmen ("Grandma", "Rocko", …) klingen für ein Lernspiel unpassend.
  var NOVELTY = /eddy|flo|grandma|grandpa|rocko|sandy|shelley|reed|bells|boing|bubbles|jester|organ|superstar|trinoids|whisper|zarvox|albert|bad news|bahh|cellos|good news|wobble|jingle|kathy|ralph|fred|junior|princess|deranged|hysterical|pipe organ/i;

  function isGerman(candidate) {
    return /^de/i.test((candidate && candidate.lang) || '');
  }

  function isEnglish(candidate) {
    return /^en/i.test((candidate && candidate.lang) || '');
  }

  function matchesLanguage(candidate) {
    var base = language.slice(0, 2).toLowerCase();
    return ((candidate && candidate.lang) || '').toLowerCase().indexOf(base) === 0;
  }

  function isNovelty(candidate) {
    return NOVELTY.test((candidate && candidate.name) || '');
  }

  /**
   * Höher ist besser. Erkennt Premium-/Neural-Stimmen, bevorzugt de-DE und
   * sortiert Spaß-Stimmen nach unten.
   */
  function rankVoice(candidate) {
    if (!isGerman(candidate) && !isEnglish(candidate)) { return -100; }
    var score = 0;
    var tag = (candidate.lang || '').toLowerCase();
    var base = language.slice(0, 2).toLowerCase();
    if (tag === language.toLowerCase()) { score += 6; }
    else if (tag.indexOf(base) === 0) { score += 3; }
    if (/enhanced|premium|neural|natural|siri/i.test(candidate.name || '')) { score += 8; }
    if (/google/i.test(candidate.name || '')) { score += 5; }
    if (candidate.localService) { score += 1; }
    if (isNovelty(candidate)) { score -= 20; }
    return score;
  }

  function allVoices() {
    if (!supported()) { return []; }
    try { return root.speechSynthesis.getVoices() || []; } catch (e) { return []; }
  }

  function listVoices() {
    var base = language.slice(0, 2).toLowerCase();
    return allVoices()
      .filter(function (candidate) {
        return (candidate.lang || '').toLowerCase().indexOf(base) === 0 && !isNovelty(candidate);
      })
      .sort(function (a, b) { return rankVoice(b) - rankVoice(a); });
  }

  function supported() {
    return !!(root.speechSynthesis && root.SpeechSynthesisUtterance);
  }

  function pickVoice() {
    if (!supported()) { return; }
    var voices = allVoices();
    if (!voices.length) { return; }
    voicesLoaded = true;

    if (preferredURI) {
      var chosen = voices.filter(function (candidate) { return candidate.voiceURI === preferredURI; })[0];
      if (chosen) { voice = chosen; return; }
    }

    var best = listVoices()[0];
    if (!best) {
      var matching = voices.filter(matchesLanguage);
      best = matching[0] || voices[0];
    }
    voice = best || null;
  }

  var speech = {
    isSupported: supported,
    enabled: function () { return enabled; },
    setEnabled: function (value) { enabled = !!value; if (!enabled) { speech.cancel(); } },

    listVoices: listVoices,
    isGerman: isGerman,
    isNovelty: isNovelty,
    rankVoice: rankVoice,

    setLanguage: function (tag) {
      language = /^en/i.test(tag || '') ? 'en-GB' : 'de-DE';
      voice = null;
      preferredURI = '';
      voicesLoaded = false;
      pickVoice();
    },

    language: function () { return language; },

    setVoice: function (uri) {
      preferredURI = uri || '';
      voice = null;
      voicesLoaded = false;
      pickVoice();
    },

    currentVoice: function () { return voice; },

    say: function (text) {
      if (!enabled || !supported() || !text) { return; }
      try {
        pickVoice();
        root.speechSynthesis.cancel();
        var utterance = new root.SpeechSynthesisUtterance(String(text));
        utterance.lang = language;
        utterance.rate = 0.95;
        utterance.pitch = 1;
        if (voice) { utterance.voice = voice; }
        root.speechSynthesis.speak(utterance);
      } catch (e) { /* Sprachausgabe ist nie kritisch */ }
    },

    cancel: function () {
      if (!supported()) { return; }
      try { root.speechSynthesis.cancel(); } catch (e) { /* egal */ }
    }
  };

  if (supported()) {
    try { root.speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) { /* egal */ }
    pickVoice();
    root.addEventListener('pagehide', function () { speech.cancel(); });
  }

  NS.speech = speech;
  if (typeof module !== 'undefined' && module.exports) { module.exports = speech; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
