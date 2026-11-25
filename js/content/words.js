/**
 * words.js – short English words for Stage 4, lesson 6.
 * Each word has an icon and a display label. German equivalents live in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.words = [
    { id: 'cat', art: 'katze', label: 'Cat', text: 'CAT' },
    { id: 'dog', art: 'hund', label: 'Dog', text: 'DOG' },
    { id: 'sun', art: 'sonne', label: 'Sun', text: 'SUN' },
    { id: 'mom', art: 'blume', label: 'Mom', text: 'MOM' },
    { id: 'dad', art: 'hut', label: 'Dad', text: 'DAD' },
    { id: 'ball', art: 'ball', label: 'Ball', text: 'BALL' },
    { id: 'egg', art: 'ei', label: 'Egg', text: 'EGG' }
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
