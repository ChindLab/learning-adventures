/**
 * homeRow.js – Tippen lernen auf der Grundreihe (ASDF · JKL).
 *
 * Das Spiel zeigt zu jedem Buchstaben die passende Hand und den passenden
 * Finger. Es erzwingt aber nichts: Wer mit einem anderen Finger tippt, kommt
 * trotzdem weiter. In diesem Alter geht es um Vertrautheit, nicht um Tempo.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  var FINGERS = {
    q: { hand: 'left', finger: 'pinky' },
    w: { hand: 'left', finger: 'ring' },
    e: { hand: 'left', finger: 'middle' },
    r: { hand: 'left', finger: 'index' },
    t: { hand: 'left', finger: 'index' },
    z: { hand: 'right', finger: 'index' },
    u: { hand: 'right', finger: 'index' },
    i: { hand: 'right', finger: 'middle' },
    o: { hand: 'right', finger: 'ring' },
    p: { hand: 'right', finger: 'pinky' },
    a: { hand: 'left', finger: 'pinky' },
    s: { hand: 'left', finger: 'ring' },
    d: { hand: 'left', finger: 'middle' },
    f: { hand: 'left', finger: 'index' },
    g: { hand: 'left', finger: 'index' },
    h: { hand: 'right', finger: 'index' },
    j: { hand: 'right', finger: 'index' },
    k: { hand: 'right', finger: 'middle' },
    l: { hand: 'right', finger: 'ring' },
    'ö': { hand: 'right', finger: 'pinky' },
    y: { hand: 'left', finger: 'pinky' },
    x: { hand: 'left', finger: 'ring' },
    c: { hand: 'left', finger: 'middle' },
    v: { hand: 'left', finger: 'index' },
    b: { hand: 'left', finger: 'index' },
    n: { hand: 'right', finger: 'index' },
    m: { hand: 'right', finger: 'index' }
  };

  var KEY_ROWS_DE = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  var KEY_ROWS_EN = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  var HOME_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  var FINGER_NAMES_DE = { pinky: 'kleinen Finger', ring: 'Ringfinger', middle: 'Mittelfinger', index: 'Zeigefinger' };
  var FINGER_NAMES_EN = { pinky: 'little finger', ring: 'ring finger', middle: 'middle finger', index: 'index finger' };
  var SIDE_NAMES_DE = { left: 'linken', right: 'rechten' };
  var SIDE_NAMES_EN = { left: 'left', right: 'right' };

  function createMatcher(text) {
    var expected = String(text).toUpperCase().split('');
    var typed = [];
    return {
      expected: function () { return expected; },
      index: function () { return typed.length; },
      isDone: function () { return typed.length >= expected.length; },
      press: function (character) {
        var ch = String(character).toUpperCase();
        if (typed.length >= expected.length) { return 'done'; }
        if (ch === expected[typed.length]) {
          typed.push(ch);
          return typed.length >= expected.length ? 'done' : 'correct';
        }
        return 'wrong';
      },
      backspace: function () { return typed.pop(); }
    };
  }

  engines.homeRow = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var sequences = (config.sequences && config.sequences.length) ? config.sequences : ['asdf', 'jkl'];
      var sequenceIndex = 0;
      var matcher = createMatcher(sequences[0]);

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || NS.i18n.t('Lege die Finger auf die Grundreihe.', 'Rest your fingers on the home row.') });
      var hint = ui.el('p', { className: 'finger-hint', attrs: { 'aria-live': 'polite' } });
      var boxes = ui.el('div', { className: 'type-row' });
      var hands = ui.el('div', { className: 'hands-row' });
      var keys = ui.el('div', { className: 'home-keys' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });

      var leftHand = handBox('hand-left', NS.i18n.t('Linke Hand', 'Left hand'));
      var rightHand = handBox('hand-right', NS.i18n.t('Rechte Hand', 'Right hand'));
      hands.appendChild(leftHand);
      hands.appendChild(rightHand);

      var activeKeys = {};
      HOME_KEYS.forEach(function (key) { activeKeys[key] = true; });
      sequences.forEach(function (sequence) {
        String(sequence).toLowerCase().split('').forEach(function (character) {
          if (FINGERS[character]) { activeKeys[character] = true; }
        });
      });

      var keyboardRows = NS.i18n.lang() === 'en' ? KEY_ROWS_EN : KEY_ROWS_DE;
      keyboardRows.forEach(function (row) {
        var rowEl = ui.el('div', { className: 'kb-row' });
        row.forEach(function (key) {
          var info = FINGERS[key];
          var isActive = !!activeKeys[key] && !!info;
          var button = ui.el('button', {
            className: 'home-key finger-' + (info ? info.finger : 'index') + (isActive ? '' : ' is-off'),
            attrs: { type: 'button', 'aria-label': 'Taste ' + key.toUpperCase() },
            data: { key: key }
          }, [
            ui.el('span', { className: 'home-key-letter', text: key.toUpperCase() }),
            ui.el('span', { className: 'key-dot' })
          ]);
          if (!isActive) { button.disabled = true; }
          button.addEventListener('click', function () { attempt(key); });
          rowEl.appendChild(button);
        });
        keys.appendChild(rowEl);
      });

      wrap.appendChild(prompt);
      wrap.appendChild(hint);
      wrap.appendChild(boxes);
      wrap.appendChild(hands);
      wrap.appendChild(keys);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      root.document.addEventListener('keydown', onKeyDown);
      api.speak(config.speech || config.prompt || NS.i18n.t('Lege die Finger auf die Grundreihe.', 'Rest your fingers on the home row.'));
      paint();

      function handBox(art, label) {
        return ui.el('div', { className: 'hand-box' }, [
          NS.icons.get(art, 118),
          ui.el('span', { className: 'hand-label', text: label })
        ]);
      }

      function paint() {
        ui.clear(boxes);
        matcher.expected().forEach(function (character, position) {
          var filled = position < matcher.index();
          var active = position === matcher.index();
          boxes.appendChild(ui.el('div', {
            className: 'type-box' + (filled ? ' is-done' : '') + (active ? ' is-active' : '')
          }, [
            ui.el('span', { className: filled ? '' : 'ghost', text: character })
          ]));
        });

        leftHand.querySelectorAll('[data-finger]').forEach(function (node) { node.classList.remove('is-active'); });
        rightHand.querySelectorAll('[data-finger]').forEach(function (node) { node.classList.remove('is-active'); });
        keys.querySelectorAll('.home-key').forEach(function (node) { node.classList.remove('is-target'); });

        var next = matcher.expected()[matcher.index()];
        var info = next ? FINGERS[next.toLowerCase()] : null;
        if (!info) {
          hint.textContent = '';
          return;
        }

        var hand = info.hand === 'left' ? leftHand : rightHand;
        var finger = hand.querySelector('[data-finger="' + info.finger + '"]');
        if (finger) { finger.classList.add('is-active'); }

        var keyButton = keys.querySelector('[data-key="' + next.toLowerCase() + '"]');
        if (keyButton) { keyButton.classList.add('is-target'); }

        if (NS.i18n.lang() === 'en') {
          hint.textContent = 'With your ' + SIDE_NAMES_EN[info.hand] + ' ' +
            FINGER_NAMES_EN[info.finger] + ': ' + next.toUpperCase();
        } else {
          hint.textContent = 'Mit dem ' + SIDE_NAMES_DE[info.hand] + ' ' +
            FINGER_NAMES_DE[info.finger] + ': ' + next.toUpperCase();
        }
      }

      function onKeyDown(event) {
        if (destroyed || done) { return; }
        if (event.metaKey || event.ctrlKey || event.altKey) { return; }
        if (event.key === 'Backspace') {
          event.preventDefault();
          matcher.backspace();
          paint();
          return;
        }
        if (event.key.length !== 1) { return; }
        event.preventDefault();
        attempt(event.key);
      }

      function attempt(key) {
        if (destroyed || done) { return; }
        var state = matcher.press(key);

        if (state === 'wrong') {
          wrong += 1;
          api.sfx('wrong');
          feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';
          var active = boxes.querySelector('.is-active');
          if (active) {
            active.classList.add('is-shake');
            root.setTimeout(function () { active.classList.remove('is-shake'); }, 320);
          }
          return;
        }

        api.sfx('click');
        if (state === 'correct') { paint(); return; }

        // Sequenz geschafft.
        api.sfx('correct');
        feedback.textContent = bobby.correct[sequenceIndex % bobby.correct.length];
        feedback.className = 'feedback-line is-good';
        sequenceIndex += 1;

        if (sequenceIndex < sequences.length) {
          matcher = createMatcher(sequences[sequenceIndex]);
          paint();
          ui.wait(750).then(function () {
            if (!destroyed) { feedback.textContent = ''; paint(); }
          });
        } else {
          finish();
        }
      }

      function finish() {
        if (done) { return; }
        done = true;
        root.document.removeEventListener('keydown', onKeyDown);
        ui.wait(400).then(function () {
          api.sfx('star');
          api.complete({ correct: sequences.length, attempts: wrong, stars: 1 });
        });
      }

      return {
        destroy: function () {
          destroyed = true;
          root.document.removeEventListener('keydown', onKeyDown);
        },
        solveForTest: function () {
          var chain = Promise.resolve();
          sequences.forEach(function (sequence) {
            chain = chain.then(function () {
              return (function typeNext() {
                if (destroyed || done) { return Promise.resolve(); }
                if (matcher.isDone()) { return ui.wait(800); }
                var next = matcher.expected()[matcher.index()];
                root.document.dispatchEvent(new root.KeyboardEvent('keydown', { key: next, bubbles: true }));
                return ui.wait(5).then(typeNext);
              })();
            });
          });
          return chain;
        }
      };
    }
  };

  NS.fingers = { map: FINGERS, homeKeys: HOME_KEYS };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FINGERS: FINGERS, HOME_KEYS: HOME_KEYS, createMatcher: createMatcher, engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
