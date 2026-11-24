/**
 * stage5.js – Zahlen und erstes Rechnen. 9 Aktivitäten.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  function numberOption(value) {
    return { id: String(value), label: String(value) };
  }

  var stage = {
    id: 5,
    title: 'Zahlen',
    subtitle: 'Zählen, vergleichen, plus und minus.',
    icon: 'uhr',
    achievement: { id: 's5', title: 'Zahlen-Entdecker', art: 'pokal' },
    lessons: [
      {
        id: '5-1',
        title: 'Zahlen von 0 bis 5',
        goal: 'Zähle die Äpfel.',
        activities: [
          {
            id: '5-1-1', type: 'countObjects', title: 'Äpfel zählen',
            speech: 'Wie viele Äpfel sind es?',
            prompt: 'Wie viele Äpfel sind es?',
            mode: 'count', art: 'apfel', count: 4
          }
        ]
      },
      {
        id: '5-2',
        title: 'Zahlen von 6 bis 10',
        goal: 'Jetzt werden es mehr.',
        activities: [
          {
            id: '5-2-1', type: 'countObjects', title: 'Sterne zählen',
            speech: 'Wie viele Sterne sind es?',
            prompt: 'Wie viele Sterne sind es?',
            mode: 'count', art: 'stern', count: 7
          }
        ]
      },
      {
        id: '5-3',
        title: 'Zahlen von 11 bis 20',
        goal: 'Auch große Mengen kann man zählen.',
        activities: [
          {
            id: '5-3-1', type: 'countObjects', title: 'Viele Äpfel',
            speech: 'Wie viele Äpfel sind es?',
            prompt: 'Wie viele Äpfel sind es?',
            mode: 'count', art: 'apfel', count: 12
          }
        ]
      },
      {
        id: '5-4',
        title: 'Zählen üben',
        goal: 'Blumen zählen.',
        activities: [
          {
            id: '5-4-1', type: 'countObjects', title: 'Blumen zählen',
            speech: 'Wie viele Blumen sind es?',
            prompt: 'Wie viele Blumen sind es?',
            mode: 'count', art: 'blume', count: 9
          }
        ]
      },
      {
        id: '5-5',
        title: 'Menge und Zahl',
        goal: 'Welche Zahl passt zur Menge?',
        activities: [
          {
            id: '5-5-1', type: 'countObjects', title: 'Welche Zahl?',
            speech: 'Welche Zahl passt zu den Bildern?',
            prompt: 'Welche Zahl passt zu den Bildern?',
            mode: 'match', art: 'ball', count: 6
          }
        ]
      },
      {
        id: '5-6',
        title: 'Größer und kleiner',
        goal: 'Welche Zahl ist größer?',
        activities: [
          {
            id: '5-6-1', type: 'pickOne', title: 'Größer oder kleiner',
            speech: 'Welche Zahl ist größer?',
            prompt: 'Welche Zahl ist größer?',
            deck: [
              { prompt: 'Welche Zahl ist größer?', options: [numberOption(5), numberOption(8), numberOption(3)], answer: '8' },
              { prompt: 'Welche Zahl ist kleiner?', options: [numberOption(7), numberOption(2), numberOption(9)], answer: '2' },
              { prompt: 'Welche Zahl ist größer?', options: [numberOption(10), numberOption(6)], answer: '10' }
            ]
          }
        ]
      },
      {
        id: '5-7',
        title: 'Plus',
        goal: 'Zwei und eins ergibt drei.',
        activities: [
          {
            id: '5-7-1', type: 'countObjects', title: 'Zwei plus eins',
            speech: 'Zwei Äpfel und ein Apfel. Wie viele?',
            prompt: 'Zwei Äpfel und ein Apfel. Wie viele sind es?',
            mode: 'add', art: 'apfel', a: 2, b: 1
          }
        ]
      },
      {
        id: '5-8',
        title: 'Minus',
        goal: 'Fünf minus zwei ergibt drei.',
        activities: [
          {
            id: '5-8-1', type: 'countObjects', title: 'Fünf minus zwei',
            speech: 'Fünf Sterne. Zwei verschwinden.',
            prompt: 'Fünf Sterne. Zwei verschwinden. Wie viele bleiben?',
            mode: 'sub', art: 'stern', a: 5, b: 2
          }
        ]
      },
      {
        id: '5-m',
        title: 'Stufen-Abschluss',
        goal: 'Drei kleine Rechnungen.',
        milestone: true,
        activities: [
          {
            id: '5-m-1', type: 'pickOne', title: 'Rechnen',
            speech: 'Löse die drei Aufgaben.',
            prompt: 'Wie viel ist das?',
            deck: [
              { prompt: '2 + 1 = ?', options: [numberOption(2), numberOption(3), numberOption(4)], answer: '3' },
              { prompt: '4 − 2 = ?', options: [numberOption(1), numberOption(2), numberOption(3)], answer: '2' },
              { prompt: '3 + 3 = ?', options: [numberOption(5), numberOption(6), numberOption(7)], answer: '6' }
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
