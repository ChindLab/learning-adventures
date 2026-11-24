/**
 * stage3.js – Tastatur-Abenteuer. 9 Aktivitäten.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
    id: 3,
    title: 'Tastatur-Abenteuer',
    subtitle: 'Finde die richtige Taste.',
    icon: 'tastatur',
    achievement: { id: 's3', title: 'Tastatur-Entdecker', art: 'pokal' },
    lessons: [
      {
        id: '3-1',
        title: 'Was ist eine Tastatur?',
        goal: 'Finde zehn Buchstaben auf der Tastatur.',
        activities: [
          {
            id: '3-1-1', type: 'keyPress', title: 'Buchstaben finden',
            speech: 'Drücke immer die markierte Taste.',
            prompt: 'Drücke die Taste, die leuchtet.',
            pool: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            layout: 'letters', count: 10,
            hint: 'Schau auf den gelben Ring!'
          }
        ]
      },
      {
        id: '3-2',
        title: 'Zahlen finden',
        goal: 'Finde zehn Zahlen auf der Tastatur.',
        activities: [
          {
            id: '3-2-1', type: 'keyPress', title: 'Zahlen finden',
            speech: 'Drücke immer die markierte Zahl.',
            prompt: 'Drücke die Zahl, die leuchtet.',
            pool: ['1', '2', '3', '4', '5'],
            layout: 'numbers', count: 10,
            hint: 'Die Zahlen sind oben.'
          }
        ]
      },
      {
        id: '3-3',
        title: 'Die Leertaste',
        goal: 'Die Leertaste macht Bobby hüpfen.',
        activities: [
          {
            id: '3-3-1', type: 'keyPress', title: 'Leertaste',
            speech: 'Drücke die Leertaste. Bobby hüpft!',
            prompt: 'Drücke die Leertaste. Bobby hüpft!',
            key: ' ', layout: 'letters', count: 10,
            hint: 'Die Leertaste ist ganz unten.'
          }
        ]
      },
      {
        id: '3-4',
        title: 'Die Enter-Taste',
        goal: 'Enter öffnet die Truhe.',
        activities: [
          {
            id: '3-4-1', type: 'keyPress', title: 'Enter',
            speech: 'Drücke Enter und öffne die Truhe.',
            prompt: 'Drücke Enter und öffne die Truhe.',
            key: 'Enter', layout: 'letters', count: 10,
            hint: 'Enter ist rechts.'
          }
        ]
      },
      {
        id: '3-5',
        title: 'Die Backspace-Taste',
        goal: 'Backspace löscht einen Buchstaben.',
        activities: [
          {
            id: '3-5-1', type: 'keyPress', title: 'Backspace',
            speech: 'Drücke Backspace und lösche den Buchstaben.',
            prompt: 'Drücke Backspace und lösche den Buchstaben.',
            key: 'Backspace', layout: 'letters', count: 10,
            hint: 'Backspace ist oben rechts.'
          }
        ]
      },
      {
        id: '3-6',
        title: 'Die Shift-Taste',
        goal: 'Shift macht große Buchstaben.',
        activities: [
          {
            id: '3-6-1', type: 'keyPress', title: 'Shift',
            speech: 'Drücke Shift für einen großen Buchstaben.',
            prompt: 'Drücke Shift für einen großen Buchstaben.',
            key: 'Shift', layout: 'letters', count: 10,
            hint: 'Shift ist ganz links.'
          }
        ]
      },
      {
        id: '3-7',
        title: 'Die Pfeiltasten',
        goal: 'Mit Pfeilen bewegt sich Bobby.',
        activities: [
          {
            id: '3-7-1', type: 'keyPress', title: 'Pfeiltasten',
            speech: 'Drücke den markierten Pfeil.',
            prompt: 'Drücke den Pfeil, der leuchtet.',
            pool: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
            layout: 'letters', count: 10,
            hint: 'Die Pfeile sind unten rechts.'
          }
        ]
      },
      {
        id: '3-8',
        title: 'Alles noch einmal',
        goal: 'Buchstaben, Zahlen und Tasten gemischt.',
        activities: [
          {
            id: '3-8-1', type: 'keyPress', title: 'Gemischte Tasten',
            speech: 'Jetzt wird es gemischt.',
            prompt: 'Jetzt gemischt: Buchstaben, Zahlen und Tasten.',
            pool: ['a', 's', 'd', '3', 'Enter', 'ArrowLeft'],
            layout: 'all', count: 10,
            hint: 'Schau auf den gelben Ring!'
          }
        ]
      },
      {
        id: '3-m',
        title: 'Stufen-Abschluss',
        goal: 'Zeig, welche Taste was macht.',
        milestone: true,
        activities: [
          {
            id: '3-m-1', type: 'pickOne', title: 'Tasten-Quiz',
            speech: 'Welche Taste passt?',
            prompt: 'Welche Taste passt?',
            deck: [
              {
                prompt: 'Womit machst du ein Leerzeichen?',
                options: [
                  { id: 'space', label: 'Leertaste' },
                  { id: 'enter', label: 'Enter' },
                  { id: 'shift', label: 'Shift' }
                ],
                answer: 'space'
              },
              {
                prompt: 'Womit öffnest du etwas?',
                options: [
                  { id: 'enter', label: 'Enter' },
                  { id: 'space', label: 'Leertaste' }
                ],
                answer: 'enter'
              },
              {
                prompt: 'Womit machst du große Buchstaben?',
                options: [
                  { id: 'shift', label: 'Shift' },
                  { id: 'space', label: 'Leertaste' }
                ],
                answer: 'shift'
              },
              {
                prompt: 'Womit löschst du einen Buchstaben?',
                options: [
                  { id: 'backspace', label: 'Backspace' },
                  { id: 'enter', label: 'Enter' }
                ],
                answer: 'backspace'
              }
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
