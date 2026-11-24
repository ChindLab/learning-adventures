/**
 * stage2.js – Maus-Abenteuer. 13 Aktivitäten.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  function opt(id, art, label) { return { id: id, art: art, label: label }; }

  var stage = {
    id: 2,
    title: 'Maus-Abenteuer',
    subtitle: 'Zeigen, klicken, ziehen, scrollen.',
    icon: 'maus',
    achievement: { id: 's2', title: 'Maus-Meister', art: 'pokal' },
    lessons: [
      {
        id: '2-1',
        title: 'Die Maus bewegen',
        goal: 'Fahre mit dem Zeiger an der Linie entlang.',
        activities: [
          {
            id: '2-1-1', type: 'target', title: 'Linie nachfahren',
            speech: 'Fahre mit der Maus an der Linie.',
            prompt: 'Fahre mit der Maus an der Linie entlang.',
            mode: 'trace'
          }
        ]
      },
      {
        id: '2-2',
        title: 'Der Zeiger',
        goal: 'Manche Dinge kann man anklicken.',
        activities: [
          {
            id: '2-2-1', type: 'pickOne', title: 'Was ist anklickbar?',
            speech: 'Was kann man anklicken?',
            prompt: 'Was kann man anklicken?',
            options: [opt('truhe', 'truhe', 'Truhe mit Knopf'), opt('blume', 'blume', 'Bild einer Blume')],
            answer: 'truhe', columns: 2
          }
        ]
      },
      {
        id: '2-3',
        title: 'Klicken',
        goal: 'Klicke die Sterne an.',
        activities: [
          {
            id: '2-3-1', type: 'target', title: 'Sterne fangen',
            speech: 'Klicke die Sterne an.',
            prompt: 'Klicke auf jeden Stern.',
            mode: 'pop', art: 'stern', size: 'xl', count: 6
          }
        ]
      },
      {
        id: '2-4',
        title: 'Doppelklick',
        goal: 'Zwei schnelle Klicks öffnen die Truhe.',
        activities: [
          {
            id: '2-4-1', type: 'target', title: 'Truhe öffnen',
            speech: 'Klicke zweimal schnell auf die Truhe.',
            prompt: 'Klicke zweimal schnell auf die Truhe.',
            mode: 'pop', art: 'truhe', size: 'l', count: 3, dbl: true
          }
        ]
      },
      {
        id: '2-5',
        title: 'Halten und ziehen',
        goal: 'Ziehe den Schmetterling zur Blume.',
        activities: [
          {
            id: '2-5-1', type: 'dragDrop', title: 'Schmetterling und Blume',
            speech: 'Ziehe den Schmetterling zur Blume.',
            prompt: 'Ziehe den Schmetterling zur Blume.',
            items: [
              { id: 'schmetterling', art: 'schmetterling', label: 'Schmetterling' }
            ],
            targets: [
              { id: 'blume', art: 'blume', label: 'Blume', accepts: ['schmetterling'] }
            ]
          }
        ]
      },
      {
        id: '2-6',
        title: 'Ziehen und ablegen',
        goal: 'Lege alle Früchte in den Korb.',
        activities: [
          {
            id: '2-6-1', type: 'dragDrop', title: 'Früchte in den Korb',
            speech: 'Lege alle Früchte in den Korb.',
            prompt: 'Lege alle Früchte in den Korb.',
            items: [
              { id: 'apfel1', art: 'apfel', label: 'Apfel' },
              { id: 'apfel2', art: 'apfel', label: 'Apfel' },
              { id: 'banane1', art: 'banane', label: 'Banane' },
              { id: 'banane2', art: 'banane', label: 'Banane' },
              { id: 'orange1', art: 'orange', label: 'Orange' },
              { id: 'orange2', art: 'orange', label: 'Orange' }
            ],
            targets: [
              { id: 'korb', art: 'korb', label: 'Korb', accepts: ['apfel1', 'apfel2', 'banane1', 'banane2', 'orange1', 'orange2'] }
            ]
          }
        ]
      },
      {
        id: '2-7',
        title: 'Scrollen',
        goal: 'Scrolle nach unten und finde Bobby.',
        activities: [
          {
            id: '2-7-1', type: 'explain', title: 'Nach unten scrollen',
            speech: 'Scrolle nach unten und finde Bobby.',
            prompt: 'Scrolle nach unten und finde Bobby.',
            art: 'blume', scroll: true,
            points: ['Drehe am Mausrad.', 'Oder ziehe den Balken.']
          }
        ]
      },
      {
        id: '2-8',
        title: 'Maus-Meister werden',
        goal: 'Vier Spiele für ruhige Hände.',
        activities: [
          {
            id: '2-8-1', type: 'target', title: 'Mittlere Sterne',
            speech: 'Klicke die Sterne an.',
            prompt: 'Klicke auf jeden Stern.',
            mode: 'pop', art: 'stern', size: 'l', count: 7
          },
          {
            id: '2-8-2', type: 'target', title: 'Kleine Sterne',
            speech: 'Jetzt werden die Sterne kleiner.',
            prompt: 'Jetzt werden die Sterne kleiner.',
            mode: 'pop', art: 'stern', size: 'm', count: 8
          },
          {
            id: '2-8-3', type: 'target', title: 'Fliegende Sterne',
            speech: 'Die Sterne fliegen. Klicke sie an.',
            prompt: 'Die Sterne fliegen. Klicke sie an.',
            mode: 'pop', art: 'stern', size: 's', count: 6, moving: true
          },
          {
            id: '2-8-4', type: 'puzzle', title: 'Bild zusammensetzen',
            speech: 'Setze das Bild zusammen.',
            prompt: 'Setze die vier Teile zusammen.',
            cols: 2, rows: 2, art: 'blume'
          },
          {
            id: '2-8-5', type: 'target', title: 'Neue Linie',
            speech: 'Fahre wieder an der Linie.',
            prompt: 'Fahre mit der Maus an der Linie entlang.',
            mode: 'trace',
            path: 'M 12 20 C 40 10, 55 45, 40 62 S 18 82, 44 88 S 78 70, 88 40'
          }
        ]
      },
      {
        id: '2-m',
        title: 'Stufen-Abschluss',
        goal: 'Ein letztes Bild für echte Maus-Meister.',
        milestone: true,
        activities: [
          {
            id: '2-m-1', type: 'puzzle', title: 'Sonnenbild',
            speech: 'Setze das Sonnenbild zusammen.',
            prompt: 'Setze das Sonnenbild zusammen.',
            cols: 3, rows: 2, art: 'sonne'
          }
        ]
      }
    ]
  };

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
