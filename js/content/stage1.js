/**
 * stage1.js – Mein Computer. 17 Aktivitäten.
 * Reine Daten: keine Logik, keine DOM-Zugriffe.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  function opt(id, art, label) { return { id: id, art: art, label: label }; }

  var stage = {
    id: 1,
    title: 'Mein Computer',
    subtitle: 'Was ist ein Computer und was gehört dazu?',
    icon: 'computer',
    achievement: { id: 's1', title: 'Computer-Entdecker', art: 'pokal' },
    lessons: [
      {
        id: '1-1',
        title: 'Was ist ein Computer?',
        goal: 'Wir schauen uns einen Computer an.',
        activities: [
          {
            id: '1-1-1', type: 'explain', title: 'Ein Computer',
            speech: 'Das ist ein Computer.', prompt: 'Das ist ein Computer.',
            art: 'computer',
            points: ['Er rechnet sehr schnell.', 'Er zeigt Bilder auf dem Monitor.', 'Er braucht Strom.']
          },
          {
            id: '1-1-2', type: 'pickOne', title: 'Wo ist der Computer?',
            speech: 'Zeig auf den Computer.',
            prompt: 'Wo ist der Computer?',
            options: [opt('maus', 'maus', 'Maus'), opt('computer', 'computer', 'Computer'), opt('laptop', 'laptop', 'Laptop')],
            answer: 'computer'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Der Monitor',
        goal: 'Der Monitor zeigt uns Bilder.',
        activities: [
          {
            id: '1-2-1', type: 'explain', title: 'Der Monitor',
            speech: 'Der Monitor zeigt Bilder.', prompt: 'Der Monitor zeigt Bilder.',
            art: 'monitor',
            points: ['Er sieht aus wie ein Fernseher.', 'Er zeigt, was der Computer macht.']
          },
          {
            id: '1-2-2', type: 'pickOne', title: 'Wo ist der Monitor?',
            speech: 'Zeig auf den Monitor.',
            prompt: 'Wo ist der Monitor?',
            options: [opt('monitor', 'monitor', 'Monitor'), opt('lautsprecher', 'lautsprecher', 'Lautsprecher'), opt('tastatur', 'tastatur', 'Tastatur')],
            answer: 'monitor'
          }
        ]
      },
      {
        id: '1-3',
        title: 'Die Tastatur',
        goal: 'Mit der Tastatur schreiben wir.',
        activities: [
          {
            id: '1-3-1', type: 'explain', title: 'Die Tastatur',
            speech: 'Die Tastatur hat viele Tasten.', prompt: 'Die Tastatur hat viele Tasten.',
            art: 'tastatur',
            points: ['Jede Taste hat ein Zeichen.', 'Damit schreibst du Buchstaben.']
          },
          {
            id: '1-3-2', type: 'pickOne', title: 'Wo ist die Tastatur?',
            speech: 'Zeig auf die Tastatur.',
            prompt: 'Wo ist die Tastatur?',
            options: [opt('maus', 'maus', 'Maus'), opt('tastatur', 'tastatur', 'Tastatur'), opt('monitor', 'monitor', 'Monitor')],
            answer: 'tastatur'
          }
        ]
      },
      {
        id: '1-4',
        title: 'Die Maus',
        goal: 'Mit der Maus zeigst du auf Dinge.',
        activities: [
          {
            id: '1-4-1', type: 'explain', title: 'Die Maus',
            speech: 'Die Maus zeigt auf dem Bildschirm.', prompt: 'Die Maus zeigt auf dem Bildschirm.',
            art: 'maus',
            points: ['Sie hat einen kleinen Pfeil.', 'Damit klickst du auf Dinge.']
          },
          {
            id: '1-4-2', type: 'pickOne', title: 'Wo ist die Maus?',
            speech: 'Zeig auf die Maus.',
            prompt: 'Wo ist die Maus?',
            options: [opt('tastatur', 'tastatur', 'Tastatur'), opt('maus', 'maus', 'Maus'), opt('kamera', 'kamera', 'Kamera')],
            answer: 'maus'
          }
        ]
      },
      {
        id: '1-5',
        title: 'Der Laptop',
        goal: 'Ein Laptop ist ein Computer zum Mitnehmen.',
        activities: [
          {
            id: '1-5-1', type: 'explain', title: 'Der Laptop',
            speech: 'Ein Laptop ist ein Computer zum Mitnehmen.', prompt: 'Ein Laptop ist ein Computer zum Mitnehmen.',
            art: 'laptop',
            points: ['Monitor und Tastatur sind zusammen.', 'Er hat einen Akku.']
          },
          {
            id: '1-5-2', type: 'pickOne', title: 'Laptop oder großer Computer?',
            speech: 'Was kann man mitnehmen?',
            prompt: 'Was kann man mitnehmen?',
            options: [opt('computer', 'computer', 'Computer'), opt('laptop', 'laptop', 'Laptop')],
            answer: 'laptop', columns: 2
          }
        ]
      },
      {
        id: '1-6',
        title: 'Lautsprecher und Kamera',
        goal: 'Computer können hören und sprechen.',
        activities: [
          {
            id: '1-6-1', type: 'explain', title: 'Lautsprecher und Kamera',
            speech: 'Der Lautsprecher macht Musik.', prompt: 'Der Lautsprecher macht Musik.',
            art: 'lautsprecher',
            points: ['Die Kamera macht Fotos.', 'Der Lautsprecher macht Töne.']
          },
          {
            id: '1-6-2', type: 'pickOne', title: 'Wer macht Fotos?',
            speech: 'Wer macht Fotos?',
            prompt: 'Wer macht Fotos?',
            options: [opt('kamera', 'kamera', 'Kamera'), opt('lautsprecher', 'lautsprecher', 'Lautsprecher'), opt('tastatur', 'tastatur', 'Tastatur')],
            answer: 'kamera'
          }
        ]
      },
      {
        id: '1-7',
        title: 'Was können Computer?',
        goal: 'Computer können malen, rechnen und Musik machen.',
        activities: [
          {
            id: '1-7-1', type: 'explain', title: 'Vieles möglich',
            speech: 'Computer können ganz viel.', prompt: 'Computer können ganz viel.',
            art: 'computer',
            points: ['Sie malen Bilder.', 'Sie spielen Musik.', 'Sie rechnen mit Zahlen.']
          },
          {
            id: '1-7-2', type: 'dragDrop', title: 'Was gehört zum Computer?',
            speech: 'Ziehe alles zum Computer.',
            prompt: 'Lege alles an seinen Platz.',
            items: [
              { id: 'monitor', art: 'monitor', label: 'Monitor' },
              { id: 'tastatur', art: 'tastatur', label: 'Tastatur' },
              { id: 'maus', art: 'maus', label: 'Maus' },
              { id: 'lautsprecher', art: 'lautsprecher', label: 'Lautsprecher' }
            ],
            targets: [
              { id: 'platz-monitor', label: 'Bildschirm', accepts: ['monitor'] },
              { id: 'platz-tastatur', label: 'Schreiben', accepts: ['tastatur'] },
              { id: 'platz-maus', label: 'Zeigen', accepts: ['maus'] },
              { id: 'platz-ton', label: 'Hören', accepts: ['lautsprecher'] }
            ],
            mode: 'bins'
          }
        ]
      },
      {
        id: '1-8',
        title: 'Alles wiederholen',
        goal: 'Wir erinnern uns an alle Teile.',
        activities: [
          {
            id: '1-8-1', type: 'matchPairs', title: 'Teile verbinden',
            speech: 'Verbinde die Teile mit dem Namen.',
            prompt: 'Verbinde jedes Teil mit seinem Namen.',
            mode: 'columns', seed: 4,
            pairs: [
              { a: { art: 'monitor', label: 'Monitor' }, b: { art: 'monitor', label: 'Bildschirm' } },
              { a: { art: 'tastatur', label: 'Tastatur' }, b: { art: 'tastatur', label: 'Tasten' } },
              { a: { art: 'maus', label: 'Maus' }, b: { art: 'maus', label: 'Pfeil' } },
              { a: { art: 'laptop', label: 'Laptop' }, b: { art: 'laptop', label: 'Unterwegs' } }
            ]
          },
          {
            id: '1-8-2', type: 'matchPairs', title: 'Memory',
            speech: 'Finde die gleichen Bilder.',
            prompt: 'Finde die gleichen Bilder.',
            mode: 'memory', seed: 6,
            pairs: [
              { a: { art: 'monitor', label: 'Monitor' }, b: { art: 'monitor', label: 'Monitor' } },
              { a: { art: 'tastatur', label: 'Tastatur' }, b: { art: 'tastatur', label: 'Tastatur' } },
              { a: { art: 'maus', label: 'Maus' }, b: { art: 'maus', label: 'Maus' } },
              { a: { art: 'laptop', label: 'Laptop' }, b: { art: 'laptop', label: 'Laptop' } }
            ]
          }
        ]
      },
      {
        id: '1-m',
        title: 'Stufen-Abschluss',
        goal: 'Zeig, was du schon weißt.',
        milestone: true,
        activities: [
          {
            id: '1-m-1', type: 'pickOne', title: 'Alles gemischt',
            speech: 'Zeig, was du weißt.', prompt: 'Was gehört wozu?',
            deck: [
              {
                prompt: 'Wo ist die Tastatur?',
                options: [opt('maus', 'maus', 'Maus'), opt('tastatur', 'tastatur', 'Tastatur'), opt('monitor', 'monitor', 'Monitor')],
                answer: 'tastatur'
              },
              {
                prompt: 'Womit klickst du?',
                options: [opt('maus', 'maus', 'Maus'), opt('laptop', 'laptop', 'Laptop'), opt('kamera', 'kamera', 'Kamera')],
                answer: 'maus'
              },
              {
                prompt: 'Wo siehst du Bilder?',
                options: [opt('monitor', 'monitor', 'Monitor'), opt('tastatur', 'tastatur', 'Tastatur'), opt('maus', 'maus', 'Maus')],
                answer: 'monitor'
              },
              {
                prompt: 'Was macht Musik?',
                options: [opt('lautsprecher', 'lautsprecher', 'Lautsprecher'), opt('maus', 'maus', 'Maus'), opt('drucker', 'drucker', 'Drucker')],
                answer: 'lautsprecher'
              },
              {
                prompt: 'Was macht Fotos?',
                options: [opt('kamera', 'kamera', 'Kamera'), opt('laptop', 'laptop', 'Laptop'), opt('tastatur', 'tastatur', 'Tastatur')],
                answer: 'kamera'
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
