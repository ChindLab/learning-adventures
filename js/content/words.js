/**
 * words.js – kurze Wörter für Lektion 6 in Stufe 4.
 * Jedes Wort hat ein Bild aus icons.js und eine deutsche Bezeichnung.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.words = [
    { id: 'katze', art: 'katze', label: 'Katze', text: 'KATZE' },
    { id: 'hund', art: 'hund', label: 'Hund', text: 'HUND' },
    { id: 'sonne', art: 'sonne', label: 'Sonne', text: 'SONNE' },
    { id: 'mama', art: 'blume', label: 'Mama', text: 'MAMA' },
    { id: 'papa', art: 'hut', label: 'Papa', text: 'PAPA' },
    { id: 'ball', art: 'ball', label: 'Ball', text: 'BALL' },
    { id: 'ei', art: 'ei', label: 'Ei', text: 'EI' }
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
