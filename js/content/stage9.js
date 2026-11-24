/**
 * stage9.js – Finger-Training. 11 Aktivitäten.
 *
 * Diese Stufe ist absichtlich immer offen: Tippen übt man, wann man will,
 * nicht erst nach acht anderen Stufen. Sie zeigt die Grundreihe ASDF · JKL,
 * die obere Reihe QW … OP und die unteren Tasten M N – welcher Finger wohin
 * gehört. Nichts davon wird erzwungen. Die Sternen-Rakete am Ende übt die
 * Grundreihe spielerisch, ohne Verlieren und ohne Zeitdruck.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
    id: 9,
    title: 'Finger-Training',
    subtitle: 'Tippen mit allen Fingern, ganz ohne Eile.',
    icon: 'hand-left',
    alwaysOpen: true,
    achievement: { id: 's9', title: 'Tipp-Profi', art: 'pokal' },
    lessons: [
      {
        id: '9-1',
        title: 'So liegen die Finger',
        goal: 'Die Grundreihe kennenlernen.',
        activities: [
          {
            id: '9-1-1', type: 'explain', title: 'Die Grundreihe',
            speech: 'So liegen die Finger auf der Tastatur.',
            prompt: 'So liegen die Finger auf der Tastatur.',
            art: 'hand-left',
            points: ['Finger auf ASDF legen.', 'Finger auf JKL legen.', 'Rücken gerade, Füße still.']
          }
        ]
      },
      {
        id: '9-2',
        title: 'Linke Hand: A S D F',
        goal: 'Vier Tasten für die linke Hand.',
        activities: [
          {
            id: '9-2-1', type: 'homeRow', title: 'Linke Hand',
            speech: 'Linke Hand: A S D F.',
            prompt: 'Tippe mit der linken Hand.',
            sequences: ['asdf', 'fdsa', 'as', 'df']
          }
        ]
      },
      {
        id: '9-3',
        title: 'Rechte Hand: J K L',
        goal: 'Drei Tasten für die rechte Hand.',
        activities: [
          {
            id: '9-3-1', type: 'homeRow', title: 'Rechte Hand',
            speech: 'Rechte Hand: J K L.',
            prompt: 'Tippe mit der rechten Hand.',
            sequences: ['jkl', 'lkj', 'jk', 'kl']
          }
        ]
      },
      {
        id: '9-4',
        title: 'Beide Hände',
        goal: 'Abwechselnd links und rechts.',
        activities: [
          {
            id: '9-4-1', type: 'homeRow', title: 'Zusammen',
            speech: 'Jetzt beide Hände zusammen.',
            prompt: 'Tippe abwechselnd links und rechts.',
            sequences: ['fj', 'dk', 'sl', 'aj']
          }
        ]
      },
      {
        id: '9-5',
        title: 'Kleine Wörter',
        goal: 'Wörter nur mit der Grundreihe.',
        activities: [
          {
            id: '9-5-1', type: 'homeRow', title: 'Wörter mit ASDF JKL',
            speech: 'Tippe kleine Wörter mit den Fingern.',
            prompt: 'Diese Wörter brauchen nur die Grundreihe.',
            sequences: ['als', 'das', 'lass', 'fall']
          }
        ]
      },
      {
        id: '9-6',
        title: 'Oben links: Q W',
        goal: 'Die obere Reihe mit der linken Hand.',
        activities: [
          {
            id: '9-6-1', type: 'homeRow', title: 'Q und W',
            speech: 'Oben links: Q und W.',
            prompt: 'Q und W gehören zur linken Hand.',
            sequences: ['qw', 'wq', 'qwqw', 'qwas']
          }
        ]
      },
      {
        id: '9-7',
        title: 'Oben rechts: O P',
        goal: 'Die obere Reihe mit der rechten Hand.',
        activities: [
          {
            id: '9-7-1', type: 'homeRow', title: 'O und P',
            speech: 'Oben rechts: O und P.',
            prompt: 'O und P gehören zur rechten Hand.',
            sequences: ['op', 'po', 'opop', 'opkl']
          }
        ]
      },
      {
        id: '9-8',
        title: 'Unten: M N',
        goal: 'Mit dem Zeigefinger nach unten greifen.',
        activities: [
          {
            id: '9-8-1', type: 'homeRow', title: 'M und N',
            speech: 'Unten rechts: M und N.',
            prompt: 'M und N liegen unter dem Zeigefinger.',
            sequences: ['mn', 'nm', 'mnmn', 'mama', 'mann']
          }
        ]
      },
      {
        id: '9-9',
        title: 'Gemischt und komplex',
        goal: 'Längere Wege über die Tastatur.',
        activities: [
          {
            id: '9-9-1', type: 'homeRow', title: 'Alles gemischt',
            speech: 'Jetzt wird es gemischt.',
            prompt: 'Buchstaben und Wörter quer über die Tastatur.',
            sequences: ['qwas', 'opmn', 'hand', 'mond', 'plan']
          }
        ]
      },
      {
        id: '9-10',
        title: 'Sternen-Rakete',
        goal: 'Tippe den Buchstaben, die Rakete fliegt.',
        activities: [
          {
            id: '9-10-1', type: 'rocket', title: 'Buchstaben abschießen',
            speech: 'Triff die Buchstaben mit der Rakete.',
            prompt: 'Drücke den Buchstaben. Die Rakete fliegt los!',
            pool: ['a', 's', 'd', 'f', 'j', 'k', 'l'],
            count: 12
          }
        ]
      },
      {
        id: '9-11',
        title: 'Wörter-Rakete',
        goal: 'Level und Tempo wählen, dann tippen.',
        activities: [
          {
            id: '9-11-1', type: 'rocket', title: 'Wörter-Rakete',
            speech: 'Wähle Level und Tempo.',
            prompt: 'Tippe die Buchstaben. Dann startet die Rakete.',
            chooseLevel: true,
            count: 8,
            levels: [
              { label: 'Leicht', speed: 4.5, lanes: 3, pool: ['a', 's', 'd', 'f', 'j', 'k', 'l'] },
              { label: 'Mittel', speed: 5.5, lanes: 4, pool: ['as', 'df', 'jk', 'kl', 'sd', 'fj', 'lk'] },
              { label: 'Schwer', speed: 6.5, lanes: 4, pool: ['das', 'und', 'mal', 'als', 'kam', 'lag'] }
            ]
          }
        ]
      },
      {
        id: '9-m',
        title: 'Stufen-Abschluss',
        goal: 'Zeig, was deine Finger können.',
        milestone: true,
        activities: [
          {
            id: '9-m-1', type: 'homeRow', title: 'Finger-Prüfung',
            speech: 'Zeig, was deine Finger können.',
            prompt: 'Alles zusammen: Buchstaben und Wörter.',
            sequences: ['qwas', 'opmn', 'mond', 'plan', 'hand']
          }
        ]
      }
    ]
  };

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
