/**
 * i18n.js – Sprache pro Kind.
 *
 * Die Inhalte liegen auf Deutsch im Quelltext; `t(de, en)` liefert je nach
 * Profil die englische Fassung. Für Inhalte gibt es zusätzlich eine
 * Übersetzungsdatei (js/content/en.js), die beim Sprachwechsel angewendet wird.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  function lang() {
    try {
      if (NS.store && NS.store.profile) {
        return NS.store.profile().language === 'en' ? 'en' : 'de';
      }
    } catch (e) { /* egal */ }
    return 'de';
  }

  /**
   * t('Weiter', 'Next') – der deutsche Text ist die Vorgabe, der englische
   * optional. Fehlt er, bleibt Deutsch stehen (ehrlicher als ein Schlüssel).
   */
  function t(german, english) {
    return (lang() === 'en' && english) ? english : german;
  }

  function speechLang() {
    return lang() === 'en' ? 'en-GB' : 'de-DE';
  }

  var i18n = {
    lang: lang,
    t: t,
    speechLang: speechLang,

    /**
     * Wendet die Profilsprache auf Inhalte, Bobby-Sätze und die Stimme an.
     * Wird beim Start und nach jedem Sprachwechsel aufgerufen.
     */
    apply: function () {
      var selected = lang();
      if (NS.content && NS.content.applyLanguage) { NS.content.applyLanguage(selected); }
      if (NS.speech && NS.speech.setLanguage) { NS.speech.setLanguage(speechLang()); }
      if (root.document) {
        root.document.documentElement.lang = selected === 'en' ? 'en' : 'de';
        root.document.title = t('Bela – Meine erste Computer-Schule', 'Bela – My First Computer School');
        if (NS.app && NS.app.refreshIdentity) { NS.app.refreshIdentity(); }
      }
    }
  };

  NS.i18n = i18n;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
