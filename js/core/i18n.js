/**
 * i18n.js – language per child.
 *
 * English is the source. German, French, Italian and Chinese come from the
 * overlays in i18n/*.js. `t(english, german)` returns English by default.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  var LANGUAGES = ['en', 'de', 'fr', 'it', 'zh', 'hi', 'ne'];
  var SPEECH = { en: 'en-GB', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', zh: 'zh-CN', hi: 'hi-IN', ne: 'ne-NP' };

  function lang() {
    try {
      if (NS.store && NS.store.profile) {
        var value = NS.store.profile().language;
        return LANGUAGES.indexOf(value) !== -1 ? value : 'en';
      }
    } catch (e) { /* egal */ }
    return 'en';
  }

  /**
   * t('Next', 'Weiter', {n: 2}) – English is the source; German is optional.
   * For fr/it/zh the English string is the lookup key in content.ui.<lang>.
   * If a translation is missing, English remains (better than a key).
   */
  function t(english, german, params) {
    var selected = lang();
    var text;
    if (selected === 'en') {
      text = english;
    } else if (selected === 'de') {
      text = german || english;
    } else {
      var dictionary = NS.content && NS.content.ui && NS.content.ui[selected];
      text = (dictionary && dictionary[english]) || english;
    }
    if (params) {
      text = text.replace(/\{(\w+)\}/g, function (match, key) {
        return Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match;
      });
    }
    return text;
  }

  function speechLang() {
    return SPEECH[lang()] || 'en-GB';
  }

  var i18n = {
    lang: lang,
    t: t,
    speechLang: speechLang,

    /**
     * Applies the profile language to content, Bobby's lines and the voice.
     * Called at boot and after every language switch.
     */
    apply: function () {
      var selected = lang();
      if (NS.content && NS.content.applyLanguage) { NS.content.applyLanguage(selected); }
      if (NS.speech && NS.speech.setLanguage) { NS.speech.setLanguage(speechLang()); }
      if (root.document) {
        root.document.documentElement.lang = selected === 'zh' ? 'zh-CN' : selected;
        root.document.title = t('Bela – My First Computer School', 'Bela – Meine erste Computer-Schule');
        if (NS.app && NS.app.refreshIdentity) { NS.app.refreshIdentity(); }
      }
    }
  };

  NS.i18n = i18n;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
