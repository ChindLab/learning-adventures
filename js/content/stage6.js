/**
 * stage6.js – Logik-Spiele. 8 Aktivitäten.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
    id: 6,
    title: 'Logik-Spiele',
    subtitle: 'Anweisungen, Muster und clevere Wege.',
    icon: 'roboter',
    achievement: { id: 's6', title: 'Kleines Logik-Genie', art: 'pokal' },
    lessons: [
      {
        id: '6-1',
        title: 'Anweisungen',
        goal: 'Bobby folgt deinen Blöcken.',
        activities: [
          {
            id: '6-1-1', type: 'gridRun', title: 'Zwei Schritte',
            speech: 'Lege zwei Schritte und starte.',
            prompt: 'Bringe Bobby zum Stern.',
            grid: { w: 3, h: 3 },
            start: { x: 0, y: 1, dir: 'E' },
            goal: { x: 2, y: 1 },
            walls: [],
            stars: [],
            palette: ['forward'],
            maxBlocks: 3,
            selftestProgram: [{ type: 'forward' }, { type: 'forward' }]
          }
        ]
      },
      {
        id: '6-2',
        title: 'Reihenfolge',
        goal: 'Die Reihenfolge macht den Weg.',
        activities: [
          {
            id: '6-2-1', type: 'sequence', title: 'Der richtige Weg',
            speech: 'Bringe die drei Bilder in die richtige Reihenfolge.',
            prompt: 'Was kommt zuerst, was danach?',
            layout: 'order', seed: 3,
            cards: [
              { id: 'start', label: 'Start', icon: 'bobby' },
              { id: 'turn', label: 'Rechts drehen', icon: 'block-right' },
              { id: 'goal', label: 'Zum Stern', icon: 'stern' }
            ],
            solution: ['start', 'turn', 'goal']
          }
        ]
      },
      {
        id: '6-3',
        title: 'Muster',
        goal: 'Was kommt als Nächstes?',
        activities: [
          {
            id: '6-3-1', type: 'pattern', title: 'Muster erkennen',
            speech: 'Was kommt als Nächstes?',
            prompt: 'Was kommt als Nächstes?',
            rounds: [
              {
                sequence: [{ color: 'rot' }, { color: 'blau' }, { color: 'rot' }],
                options: [{ id: 'rot', color: 'rot' }, { id: 'blau', color: 'blau' }, { id: 'gelb', color: 'gelb' }],
                answer: 'rot'
              },
              {
                sequence: [{ art: 'kreis' }, { art: 'quadrat' }, { art: 'kreis' }, { art: 'quadrat' }],
                options: [{ id: 'kreis', art: 'kreis' }, { id: 'dreieck', art: 'dreieck' }, { id: 'quadrat', art: 'quadrat' }],
                answer: 'kreis'
              },
              {
                sequence: [{ value: 1 }, { value: 2 }, { value: 1 }],
                options: [{ id: '1', value: 1 }, { id: '2', value: 2 }, { id: '3', value: 3 }],
                answer: '1'
              }
            ]
          }
        ]
      },
      {
        id: '6-4',
        title: 'Logisches Denken',
        goal: 'Was passt nicht? Welcher Weg hilft?',
        activities: [
          {
            id: '6-4-1', type: 'pickOne', title: 'Was ist anders?',
            speech: 'Was passt nicht zu den anderen?',
            prompt: 'Was passt nicht zu den anderen?',
            options: [
              { id: 'katze', art: 'katze', label: 'Katze' },
              { id: 'hund', art: 'hund', label: 'Hund' },
              { id: 'laptop', art: 'laptop', label: 'Laptop' }
            ],
            answer: 'laptop'
          },
          {
            id: '6-4-2', type: 'pickOne', title: 'Welcher Weg?',
            speech: 'Der Weg ist zu. Was hilft?',
            prompt: 'Der Weg ist versperrt. Was hilft?',
            options: [
              { id: 'forward', art: 'block-forward', label: 'Geradeaus' },
              { id: 'right', art: 'block-right', label: 'Um die Ecke' }
            ],
            answer: 'right'
          }
        ]
      },
      {
        id: '6-5',
        title: 'Wenn … dann',
        goal: 'Wenn eine Wand kommt, dreh dich.',
        activities: [
          {
            id: '6-5-1', type: 'gridRun', title: 'Wenn Wand, dann rechts',
            speech: 'Wenn eine Wand kommt, dreh dich rechts.',
            prompt: 'Wenn eine Wand kommt, dreh dich rechts.',
            grid: { w: 2, h: 2 },
            start: { x: 0, y: 0, dir: 'E' },
            goal: { x: 0, y: 1 },
            walls: [[1, 0]],
            stars: [],
            palette: ['forward', 'right', 'if'],
            maxBlocks: 3,
            selftestProgram: [
              { type: 'if', condition: 'wall', body: [{ type: 'right' }] },
              { type: 'forward' }
            ]
          }
        ]
      },
      {
        id: '6-6',
        title: 'Wiederholen',
        goal: 'Dreimal dasselbe ist kürzer.',
        activities: [
          {
            id: '6-6-1', type: 'gridRun', title: 'Dreimal vor',
            speech: 'Wiederhole dreimal den Schritt.',
            prompt: 'Wiederhole den Schritt dreimal.',
            grid: { w: 4, h: 3 },
            start: { x: 0, y: 1, dir: 'E' },
            goal: { x: 3, y: 1 },
            walls: [],
            stars: [],
            palette: ['forward', 'repeat'],
            maxBlocks: 3,
            selftestProgram: [{ type: 'repeat', times: 3, body: [{ type: 'forward' }] }]
          }
        ]
      },
      {
        id: '6-7',
        title: 'Muster im Quadrat',
        goal: 'Erkenne das Muster im Quadrat.',
        activities: [
          {
            id: '6-7-1', type: 'pattern', title: 'Was fehlt im Quadrat?',
            speech: 'Welches Bild fehlt im Quadrat?',
            prompt: 'Welches Bild fehlt im Quadrat?',
            rounds: [
              {
                layout: 'grid',
                sequence: [{ color: 'rot' }, { color: 'blau' }, { color: 'blau' }],
                options: [{ id: 'rot', color: 'rot' }, { id: 'gelb', color: 'gelb' }, { id: 'gruen', color: 'grün' }],
                answer: 'rot'
              },
              {
                layout: 'grid',
                sequence: [{ art: 'kreis' }, { art: 'dreieck' }, { art: 'dreieck' }],
                options: [{ id: 'kreis', art: 'kreis' }, { id: 'quadrat', art: 'quadrat' }, { id: 'stern', art: 'stern' }],
                answer: 'kreis'
              },
              {
                layout: 'grid',
                sequence: [{ value: 1 }, { value: 2 }, { value: 2 }],
                options: [{ id: '1', value: 1 }, { id: '2', value: 2 }, { id: '3', value: 3 }],
                answer: '1'
              }
            ]
          }
        ]
      },
      {
        id: '6-8',
        title: 'Was fliegt, was schwimmt?',
        goal: 'Tiere nach ihrem Ort sortieren.',
        activities: [
          {
            id: '6-8-1', type: 'dragDrop', title: 'Fliegen oder schwimmen',
            speech: 'Was fliegt? Was schwimmt?',
            prompt: 'Lege jedes Tier an den richtigen Ort.',
            items: [
              { id: 'vogel', art: 'vogel', label: 'Vogel' },
              { id: 'schmetterling', art: 'schmetterling', label: 'Schmetterling' },
              { id: 'fisch', art: 'fisch', label: 'Fisch' },
              { id: 'qualle', art: 'qualle', label: 'Qualle' }
            ],
            targets: [
              { id: 'luft', art: 'sonne', label: 'Fliegt', accepts: ['vogel', 'schmetterling'] },
              { id: 'wasser', art: 'wasser', label: 'Schwimmt', accepts: ['fisch', 'qualle'] }
            ]
          }
        ]
      },
      {
        id: '6-9',
        title: 'Groß, mittel, klein',
        goal: 'Formen nach Größe sortieren.',
        activities: [
          {
            id: '6-9-1', type: 'dragDrop', title: 'Größen sortieren',
            speech: 'Sortiere die Formen nach Größe.',
            prompt: 'Sortiere: groß, mittel und klein.',
            items: [
              { id: 'gross-kreis', art: 'kreis', label: 'großer Kreis', size: 104 },
              { id: 'gross-quadrat', art: 'quadrat', label: 'großes Quadrat', size: 104 },
              { id: 'mittel-kreis', art: 'kreis', label: 'mittlerer Kreis', size: 82 },
              { id: 'mittel-quadrat', art: 'quadrat', label: 'mittleres Quadrat', size: 82 },
              { id: 'klein-kreis', art: 'kreis', label: 'kleiner Kreis', size: 58 },
              { id: 'klein-quadrat', art: 'quadrat', label: 'kleines Quadrat', size: 58 }
            ],
            targets: [
              { id: 'gross', label: 'Groß', accepts: ['gross-kreis', 'gross-quadrat'] },
              { id: 'mittel', label: 'Mittel', accepts: ['mittel-kreis', 'mittel-quadrat'] },
              { id: 'klein', label: 'Klein', accepts: ['klein-kreis', 'klein-quadrat'] }
            ]
          }
        ]
      },
      {
        id: '6-10',
        title: 'Was gehört zusammen?',
        goal: 'Dinge miteinander verbinden.',
        activities: [
          {
            id: '6-10-1', type: 'pickOne', title: 'Was passt?',
            speech: 'Was gehört zusammen?',
            prompt: 'Was passt zu der Frage?',
            deck: [
              {
                prompt: 'Wer schwimmt im Wasser?',
                options: [
                  { id: 'fisch', art: 'fisch', label: 'Fisch' },
                  { id: 'vogel', art: 'vogel', label: 'Vogel' },
                  { id: 'katze', art: 'katze', label: 'Katze' }
                ],
                answer: 'fisch'
              },
              {
                prompt: 'Wer fliegt am Himmel?',
                options: [
                  { id: 'vogel', art: 'vogel', label: 'Vogel' },
                  { id: 'fisch', art: 'fisch', label: 'Fisch' },
                  { id: 'hund', art: 'hund', label: 'Hund' }
                ],
                answer: 'vogel'
              },
              {
                prompt: 'Wer sagt miau?',
                options: [
                  { id: 'katze', art: 'katze', label: 'Katze' },
                  { id: 'hund', art: 'hund', label: 'Hund' },
                  { id: 'vogel', art: 'vogel', label: 'Vogel' }
                ],
                answer: 'katze'
              },
              {
                prompt: 'Was wächst auf der Wiese?',
                options: [
                  { id: 'blume', art: 'blume', label: 'Blume' },
                  { id: 'ball', art: 'ball', label: 'Ball' },
                  { id: 'apfel', art: 'apfel', label: 'Apfel' }
                ],
                answer: 'blume'
              }
            ]
          }
        ]
      },
      {
        id: '6-m',
        title: 'Stufen-Abschluss',
        goal: 'Drehen, laufen, ankommen.',
        milestone: true,
        activities: [
          {
            id: '6-m-1', type: 'gridRun', title: 'Die letzte Ecke',
            speech: 'Finde den Weg um die Ecke.',
            prompt: 'Finde den Weg um die Ecke.',
            grid: { w: 4, h: 4 },
            start: { x: 0, y: 3, dir: 'E' },
            goal: { x: 3, y: 1 },
            walls: [],
            stars: [],
            palette: ['forward', 'left', 'right', 'repeat'],
            maxBlocks: 7,
            selftestProgram: [
              { type: 'forward' }, { type: 'forward' }, { type: 'forward' },
              { type: 'left' }, { type: 'forward' }, { type: 'forward' }
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
