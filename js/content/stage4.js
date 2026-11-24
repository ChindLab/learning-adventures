/**
 * stage4.js – Buchstaben und Tippen. 12 Aktivitäten.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var ALPHABET = [
    { key: 'A', art: 'apfel', word: 'Apfel' },
    { key: 'B', art: 'ball', word: 'Ball' },
    { key: 'C', art: 'computer', word: 'Computer' },
    { key: 'D', art: 'dino', word: 'Dino' },
    { key: 'E', art: 'elefant', word: 'Elefant' },
    { key: 'F', art: 'fisch', word: 'Fisch' },
    { key: 'G', art: 'gitarre', word: 'Gitarre' },
    { key: 'H', art: 'hut', word: 'Hut' },
    { key: 'I', art: 'igel', word: 'Igel' },
    { key: 'J', art: 'jacke', word: 'Jacke' },
    { key: 'K', art: 'katze', word: 'Katze' },
    { key: 'L', art: 'lampe', word: 'Lampe' },
    { key: 'M', art: 'maus', word: 'Maus' },
    { key: 'N', art: 'nase', word: 'Nase' },
    { key: 'O', art: 'orange', word: 'Orange' },
    { key: 'P', art: 'pferd', word: 'Pferd' },
    { key: 'Q', art: 'qualle', word: 'Qualle' },
    { key: 'R', art: 'roboter', word: 'Roboter' },
    { key: 'S', art: 'sonne', word: 'Sonne' },
    { key: 'T', art: 'tasse', word: 'Tasse' },
    { key: 'U', art: 'uhr', word: 'Uhr' },
    { key: 'V', art: 'vogel', word: 'Vogel' },
    { key: 'W', art: 'wasser', word: 'Wasser' },
    { key: 'X', art: 'xylophon', word: 'Xylophon' },
    { key: 'Y', art: 'yoga', word: 'Yoga' },
    { key: 'Z', art: 'zebra', word: 'Zebra' }
  ];

  function letters(from, to) {
    return ALPHABET.filter(function (entry) {
      return entry.key >= from && entry.key <= to;
    });
  }

  var stage = {
    id: 4,
    title: 'Buchstaben & Tippen',
    subtitle: 'Von A bis Z und die ersten Wörter.',
    icon: 'buch',
    achievement: { id: 's4', title: 'Kleiner Tipp-Star', art: 'pokal' },
    lessons: [
      {
        id: '4-1',
        title: 'A bis H',
        goal: 'Acht Buchstaben mit Bildern.',
        activities: [
          {
            id: '4-1-1', type: 'typeText', title: 'A bis H',
            speech: 'Drücke immer den Buchstaben.',
            prompt: 'Drücke den Buchstaben, den du siehst.',
            mode: 'alphabet',
            letters: letters('A', 'H')
          }
        ]
      },
      {
        id: '4-2',
        title: 'I bis P',
        goal: 'Acht weitere Buchstaben.',
        activities: [
          {
            id: '4-2-1', type: 'typeText', title: 'I bis P',
            speech: 'Drücke immer den Buchstaben.',
            prompt: 'Drücke den Buchstaben, den du siehst.',
            mode: 'alphabet',
            letters: letters('I', 'P')
          }
        ]
      },
      {
        id: '4-3',
        title: 'Q bis Z',
        goal: 'Die letzten Buchstaben.',
        activities: [
          {
            id: '4-3-1', type: 'typeText', title: 'Q bis Z',
            speech: 'Drücke immer den Buchstaben.',
            prompt: 'Drücke den Buchstaben, den du siehst.',
            mode: 'alphabet',
            letters: letters('Q', 'Z')
          }
        ]
      },
      {
        id: '4-4',
        title: 'Groß und klein',
        goal: 'A und a gehören zusammen.',
        activities: [
          {
            id: '4-4-1', type: 'matchPairs', title: 'A bis F verbinden',
            speech: 'Verbinde jeden großen mit dem kleinen Buchstaben.',
            prompt: 'Verbinde A mit a und so weiter.',
            mode: 'columns', seed: 12,
            pairs: ['a', 'b', 'c', 'd', 'e', 'f'].map(function (letter, index) {
              var upper = letter.toUpperCase();
              return {
                a: { art: 'kreis', label: upper },
                b: { art: 'kreis', label: letter }
              };
            })
          },
          {
            id: '4-4-2', type: 'matchPairs', title: 'G bis L verbinden',
            speech: 'Verbinde jeden großen mit dem kleinen Buchstaben.',
            prompt: 'Verbinde G mit g und so weiter.',
            mode: 'columns', seed: 14,
            pairs: ['g', 'h', 'i', 'j', 'k', 'l'].map(function (letter) {
              return {
                a: { art: 'quadrat', label: letter.toUpperCase() },
                b: { art: 'quadrat', label: letter }
              };
            })
          }
        ]
      },
      {
        id: '4-5',
        title: 'Finde den Buchstaben',
        goal: 'Vier Buchstaben auf der Tastatur.',
        activities: [
          {
            id: '4-5-1', type: 'keyPress', title: 'A bis F',
            speech: 'Drücke die markierten Buchstaben.',
            prompt: 'Drücke den Buchstaben, der leuchtet.',
            pool: ['a', 'b', 'c', 'd', 'e', 'f'],
            layout: 'letters', count: 8,
            hint: 'Die Buchstaben stehen auf der Tastatur.'
          },
          {
            id: '4-5-2', type: 'keyPress', title: 'G bis L',
            speech: 'Drücke die markierten Buchstaben.',
            prompt: 'Drücke den Buchstaben, der leuchtet.',
            pool: ['g', 'h', 'i', 'j', 'k', 'l'],
            layout: 'letters', count: 8,
            hint: 'Die Buchstaben stehen auf der Tastatur.'
          },
          {
            id: '4-5-3', type: 'keyPress', title: 'M bis R',
            speech: 'Drücke die markierten Buchstaben.',
            prompt: 'Drücke den Buchstaben, der leuchtet.',
            pool: ['m', 'n', 'o', 'p', 'q', 'r'],
            layout: 'letters', count: 8,
            hint: 'Die Buchstaben stehen auf der Tastatur.'
          },
          {
            id: '4-5-4', type: 'keyPress', title: 'S bis Z',
            speech: 'Drücke die markierten Buchstaben.',
            prompt: 'Drücke den Buchstaben, der leuchtet.',
            pool: ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            layout: 'letters', count: 8,
            hint: 'Die Buchstaben stehen auf der Tastatur.'
          }
        ]
      },
      {
        id: '4-6',
        title: 'Tippe ein Wort',
        goal: 'Sieben kleine Wörter und dein Name.',
        activities: [
          {
            id: '4-6-1', type: 'typeText', title: 'Wörter tippen',
            speech: 'Tippe das Wort Buchstabe für Buchstabe.',
            prompt: 'Tippe das Wort.',
            mode: 'words',
            words: [
              { text: 'KATZE', art: 'katze', label: 'Katze' },
              { text: 'HUND', art: 'hund', label: 'Hund' },
              { text: 'SONNE', art: 'sonne', label: 'Sonne' },
              { text: 'MAMA', art: 'blume', label: 'Mama' },
              { text: 'PAPA', art: 'hut', label: 'Papa' },
              { text: 'BALL', art: 'ball', label: 'Ball' },
              { text: 'EI', art: 'ei', label: 'Ei' }
            ]
          },
          {
            id: '4-6-2', type: 'typeText', title: 'Dein Name',
            speech: 'Tippe deinen Namen.',
            prompt: 'Tippe deinen Namen in das Kästchen.',
            mode: 'free'
          }
        ]
      },
      {
        id: '4-m',
        title: 'Stufen-Abschluss',
        goal: 'Drei Wörter ohne Hilfe.',
        milestone: true,
        activities: [
          {
            id: '4-m-1', type: 'typeText', title: 'Drei Wörter',
            speech: 'Tippe die drei Wörter.',
            prompt: 'Tippe die drei Wörter.',
            mode: 'words',
            words: [
              { text: 'MAMA', art: 'blume', label: 'Mama' },
              { text: 'PAPA', art: 'hut', label: 'Papa' },
              { text: 'EI', art: 'ei', label: 'Ei' }
            ]
          }
        ]
      }
    ]
  };

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
