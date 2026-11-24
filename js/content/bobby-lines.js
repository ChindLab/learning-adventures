/**
 * bobby-lines.js – alle Sätze von Bobby, auf Deutsch und Englisch.
 * Regeln: höchstens 8 Wörter, nie negativ, immer ermutigend.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.bobbyDe = {
    welcome: 'Hallo, kleine Entdeckerin! Ich bin Bobby.',
    welcomeNamed: function (name) { return 'Hallo, ' + name + '! Ich bin Bobby.'; },
    lessonStart: 'Komm, wir schauen uns das an!',
    correct: [
      'Super gemacht!',
      'Genau!',
      'Du bist klasse!',
      'Wow, das sitzt!',
      'Das hast du toll gemacht!',
      'Ja! Genau so!'
    ],
    wrong: [
      'Fast! Probier es nochmal.',
      'Kein Problem, noch einmal!',
      'Schau nochmal genau hin.',
      'Das war knapp. Weiter geht es!'
    ],
    hint: 'Schau mal hier …',
    star: 'Ein Stern für dich!',
    stageDone: function (title) { return 'Du hast „' + title + '" geschafft!'; },
    locked: 'Frag Mama oder Papa, dann geht es weiter!',
    bye: 'Bis bald, kleiner Entdecker!',
    next: 'Weiter geht es!',
    allDone: 'Du bist eine echte Computer-Entdeckerin!'
  };

  content.bobbyEn = {
    welcome: 'Hello, little explorer! I am Bobby.',
    welcomeNamed: function (name) { return 'Hello, ' + name + '! I am Bobby.'; },
    lessonStart: 'Come on, let us take a look!',
    correct: [
      'Well done!',
      'Exactly!',
      'You are great!',
      'Wow, you got it!',
      'That was lovely!',
      'Yes! Just like that!'
    ],
    wrong: [
      'Almost! Try again.',
      'No problem, one more time!',
      'Take another close look.',
      'So close. Let us keep going!'
    ],
    hint: 'Look right here …',
    star: 'A star for you!',
    stageDone: function (title) { return 'You finished "' + title + '"!'; },
    locked: 'Ask mum or dad, then we can continue!',
    bye: 'See you soon, little explorer!',
    next: 'Let us keep going!',
    allDone: 'You are a real computer explorer!'
  };

  // Bis der Sprachwechsel läuft, ist Deutsch die Vorgabe.
  content.bobby = content.bobbyDe;

  content.pick = function (list, seed) {
    var index = typeof seed === 'number' ? Math.abs(seed) % list.length : Math.floor(Math.random() * list.length);
    return list[index];
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
