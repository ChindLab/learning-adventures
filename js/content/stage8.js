/**
 * stage8.js – Mein erstes JavaScript. 7 Aktivitäten.
 *
 * Der Code wird nie ausgeführt, sondern von einem kleinen eigenen
 * Interpreter Schritt für Schritt gezeigt.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
    id: 8,
    title: 'Mein erstes JavaScript',
    subtitle: 'Was Code ist und was er macht.',
    icon: 'monitor',
    achievement: { id: 's8', title: 'Erste Programmiererin', art: 'pokal' },
    lessons: [
      {
        id: '8-1',
        title: 'Was ist Code?',
        goal: 'Code ist eine Anleitung für den Computer.',
        activities: [
          {
            id: '8-1-1', type: 'explain', title: 'Code ist wie ein Rezept',
            speech: 'Code ist eine Anleitung für den Computer.',
            prompt: 'Code ist eine Anleitung für den Computer.',
            art: 'computer',
            points: ['Ein Rezept sagt, was zu tun ist.', 'Code auch – nur für Computer.']
          }
        ]
      },
      {
        id: '8-2',
        title: 'Der erste Befehl',
        goal: 'alert zeigt eine Nachricht.',
        activities: [
          {
            id: '8-2-1', type: 'jsDemo', title: 'Hallo sagen',
            speech: 'Dieser Befehl zeigt eine Nachricht.',
            prompt: 'Dieser Befehl zeigt eine Nachricht.',
            code: 'alert("Hallo!");',
            viz: 'alert',
            lineNotes: ['Dieser Befehl zeigt einen Text.']
          }
        ]
      },
      {
        id: '8-3',
        title: 'Variablen',
        goal: 'Eine Variable ist eine kleine Kiste.',
        activities: [
          {
            id: '8-3-1', type: 'jsDemo', title: 'Eine Kiste für den Namen',
            speech: 'Der Computer packt den Namen in eine Kiste.',
            prompt: 'Der Computer packt den Namen in eine Kiste.',
            code: 'let myName = "Anna";\nalert(myName);',
            viz: 'box',
            lineNotes: ['Hier entsteht die Kiste myName.', 'Der Text daraus wird gezeigt.']
          }
        ]
      },
      {
        id: '8-4',
        title: 'Zahlen',
        goal: 'Drei Äpfel in einer Kiste.',
        activities: [
          {
            id: '8-4-1', type: 'jsDemo', title: 'Drei Äpfel',
            speech: 'Drei Äpfel liegen in der Kiste.',
            prompt: 'Drei Äpfel liegen in der Kiste.',
            code: 'let apples = 3;',
            viz: 'apples',
            lineNotes: ['Die Kiste apples bekommt die Zahl drei.']
          }
        ]
      },
      {
        id: '8-5',
        title: 'Rechnen',
        goal: 'Zwei und drei ergibt fünf.',
        activities: [
          {
            id: '8-5-1', type: 'jsDemo', title: 'Fünf Sterne',
            speech: 'Zwei plus drei ergibt fünf.',
            prompt: 'Zwei plus drei ergibt fünf.',
            code: 'let result = 2 + 3;',
            viz: 'stars',
            lineNotes: ['Der Computer rechnet zwei plus drei.']
          }
        ]
      },
      {
        id: '8-6',
        title: 'Funktionen',
        goal: 'Eine Anleitung zum Wiederbenutzen.',
        activities: [
          {
            id: '8-6-1', type: 'jsDemo', title: 'Hallo, Funktion!',
            speech: 'Eine Funktion kann man immer wieder rufen.',
            prompt: 'Eine Funktion kann man immer wieder rufen.',
            code: 'function sayHello() {\n  alert("Hallo!");\n}\nsayHello();',
            viz: 'function',
            lineNotes: ['Hier wird die Anleitung gebaut.', 'Der Text darin.', 'Die Anleitung ist fertig.', 'Jetzt wird sie ausgeführt.']
          }
        ]
      },
      {
        id: '8-m',
        title: 'Stufen-Abschluss',
        goal: 'Variablen und Rechnen zusammen.',
        milestone: true,
        activities: [
          {
            id: '8-m-1', type: 'jsDemo', title: 'Zwei Zahlen',
            speech: 'Zwei Zahlen werden zusammengezählt.',
            prompt: 'Zwei Zahlen werden zusammengezählt.',
            code: 'let a = 2;\nlet b = 3;\nalert(a + b);',
            viz: 'alert',
            lineNotes: ['Kiste a bekommt zwei.', 'Kiste b bekommt drei.', 'Die Summe wird gezeigt.']
          }
        ]
      }
    ]
  };

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
