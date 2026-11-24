/**
 * stage7.js – Programmieren mit Blöcken. 16 Aktivitäten, davon 12 Rätsel.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  function forward() { return { type: 'forward' }; }
  function left() { return { type: 'left' }; }
  function right() { return { type: 'right' }; }
  function collect() { return { type: 'collect' }; }
  function repeat(times, body) { return { type: 'repeat', times: times, body: body }; }
  function ifWall(body) { return { type: 'if', condition: 'wall', body: body }; }
  function ifStar(body) { return { type: 'if', condition: 'star', body: body }; }

  function puzzle(id, title, config) {
    var activity = {
      id: '7-' + id, type: 'gridRun', title: title,
      speech: config.speech || 'Finde den Weg zum Stern.',
      prompt: config.prompt || 'Bringe Bobby zum Stern.',
      grid: config.grid,
      start: config.start,
      goal: config.goal,
      walls: config.walls || [],
      stars: config.stars || [],
      requiredStars: config.requiredStars || 0,
      palette: config.palette,
      maxBlocks: config.maxBlocks,
      selftestProgram: config.selftestProgram
    };
    if (config.prefill) { activity.prefill = config.prefill; }
    return activity;
  }

  var stage = {
    id: 7,
    title: 'Programmier-Spiele',
    subtitle: 'Bobby läuft, was du ihm sagst.',
    icon: 'roboter',
    achievement: { id: 's7', title: 'Junior-Programmierer', art: 'pokal' },
    lessons: [
      {
        id: '7-1',
        title: 'Blöcke und Reihenfolge',
        goal: 'Ein Block, ein Schritt.',
        activities: [
          {
            id: '7-0-1', type: 'explain', title: 'So geht es',
            speech: 'Lege Blöcke unten hin. Dann starte.',
            prompt: 'Lege Blöcke hin und drücke ▶ Los.',
            art: 'roboter',
            points: ['Jeder Block ist ein Schritt.', 'Von oben nach unten.', 'Mit ▶ läuft Bobby los.']
          },
          puzzle('1-1', 'Geradeaus', {
            grid: { w: 3, h: 3 }, start: { x: 0, y: 1, dir: 'E' }, goal: { x: 2, y: 1 },
            palette: ['forward'], maxBlocks: 3,
            selftestProgram: [forward(), forward()]
          }),
          puzzle('1-2', 'Drei Schritte', {
            grid: { w: 4, h: 3 }, start: { x: 0, y: 1, dir: 'E' }, goal: { x: 3, y: 1 },
            palette: ['forward'], maxBlocks: 4,
            selftestProgram: [forward(), forward(), forward()]
          }),
          puzzle('1-3', 'Sammle den Stern', {
            grid: { w: 4, h: 3 }, start: { x: 0, y: 1, dir: 'E' }, goal: { x: 3, y: 1 },
            stars: [[2, 1]], requiredStars: 1,
            palette: ['forward', 'collect'], maxBlocks: 5,
            selftestProgram: [forward(), forward(), collect(), forward()]
          })
        ]
      },
      {
        id: '7-2',
        title: 'Drehen',
        goal: 'Links und rechts drehen.',
        activities: [
          {
            id: '7-0-2', type: 'explain', title: 'Drehen',
            speech: 'Drehen kostet keinen Schritt.',
            prompt: 'Drehen ist kein Schritt.',
            art: 'block-right',
            points: ['Rechts dreht im Kreis.', 'Danach läuft Bobby weiter.']
          },
          puzzle('2-1', 'Einmal rechts', {
            grid: { w: 3, h: 3 }, start: { x: 0, y: 0, dir: 'E' }, goal: { x: 0, y: 2 },
            palette: ['forward', 'right'], maxBlocks: 4,
            selftestProgram: [right(), forward(), forward()]
          }),
          puzzle('2-2', 'Um die Ecke', {
            grid: { w: 4, h: 4 }, start: { x: 0, y: 3, dir: 'E' }, goal: { x: 3, y: 1 },
            palette: ['forward', 'left'], maxBlocks: 7,
            selftestProgram: [forward(), forward(), forward(), left(), forward(), forward()]
          }),
          puzzle('2-3', 'Zickzack', {
            grid: { w: 5, h: 5 }, start: { x: 0, y: 4, dir: 'E' }, goal: { x: 2, y: 2 },
            palette: ['forward', 'left'], maxBlocks: 5,
            selftestProgram: [forward(), forward(), left(), forward(), forward()]
          })
        ]
      },
      {
        id: '7-3',
        title: 'Etwas stimmt nicht',
        goal: 'Prüfen, ändern, noch einmal.',
        activities: [
          {
            id: '7-0-3', type: 'explain', title: 'Prüfen und ändern',
            speech: 'Wenn es nicht klappt, ändere einen Block.',
            prompt: 'Wenn es nicht klappt, ändere einen Block.',
            art: 'bobby',
            points: ['Anschauen, was passiert.', 'Einen Block ändern.', 'Noch einmal starten.']
          },
          puzzle('3-1', 'Dreimal vor', {
            grid: { w: 5, h: 3 }, start: { x: 0, y: 1, dir: 'E' }, goal: { x: 3, y: 1 },
            palette: ['forward', 'repeat'], maxBlocks: 3,
            selftestProgram: [repeat(3, [forward()])]
          }),
          puzzle('3-2', 'Treppe', {
            grid: { w: 3, h: 5 }, start: { x: 0, y: 4, dir: 'E' }, goal: { x: 0, y: 0 },
            palette: ['forward', 'left', 'repeat'], maxBlocks: 4,
            selftestProgram: [left(), repeat(4, [forward()])]
          }),
          puzzle('3-3', 'Wenn Wand, dann rechts', {
            grid: { w: 2, h: 2 }, start: { x: 0, y: 0, dir: 'E' }, goal: { x: 0, y: 1 },
            walls: [[1, 0]],
            palette: ['forward', 'right', 'if'], maxBlocks: 3,
            selftestProgram: [ifWall([right()]), forward()]
          }),
          puzzle('3-4', 'Stern oder Wand', {
            grid: { w: 3, h: 2 }, start: { x: 0, y: 0, dir: 'E' }, goal: { x: 2, y: 0 },
            stars: [[0, 0]], requiredStars: 1,
            palette: ['forward', 'collect', 'if'], maxBlocks: 4,
            selftestProgram: [ifStar([collect()]), forward(), forward()]
          }),
          puzzle('3-5', 'Der Umweg', {
            grid: { w: 3, h: 3 }, start: { x: 0, y: 1, dir: 'E' }, goal: { x: 2, y: 1 },
            walls: [[1, 1]],
            palette: ['forward', 'left', 'right'], maxBlocks: 7,
            prefill: [forward(), forward()],
            selftestProgram: [right(), forward(), left(), forward(), forward(), left(), forward()]
          }),
          puzzle('3-6', 'Die große Reise', {
            grid: { w: 5, h: 5 }, start: { x: 0, y: 4, dir: 'E' }, goal: { x: 4, y: 0 },
            walls: [[0, 0], [1, 0], [2, 0]],
            stars: [[4, 4], [4, 2]], requiredStars: 2,
            palette: ['forward', 'left', 'collect', 'repeat'], maxBlocks: 9,
            selftestProgram: [
              repeat(4, [forward()]), collect(), left(),
              forward(), forward(), collect(), forward(), forward()
            ]
          })
        ]
      },
      {
        id: '7-m',
        title: 'Stufen-Abschluss',
        goal: 'Die letzte große Reise.',
        milestone: true,
        activities: [
          puzzle('m-1', 'Alles zusammen', {
            grid: { w: 5, h: 5 }, start: { x: 0, y: 0, dir: 'E' }, goal: { x: 4, y: 4 },
            palette: ['forward', 'right', 'repeat'], maxBlocks: 10,
            selftestProgram: [repeat(4, [forward()]), right(), repeat(4, [forward()])]
          })
        ]
      }
    ]
  };

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
