/**
 * bobby-lines.js – English source lines. German lives in i18n/de.js.
 * Rules: ≤ 8 words, never negative, always encouraging.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

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

  content.bobbyFor = { en: content.bobbyEn };
  content.bobby = content.bobbyEn;

  content.pick = function (list, seed) {
    var index = typeof seed === 'number' ? Math.abs(seed) % list.length : Math.floor(Math.random() * list.length);
    return list[index];
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
