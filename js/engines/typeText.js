/**
 * typeText.js – Buchstaben und Wörter tippen.
 *
 * Modi:
 *   'word'     – ein Wort (config.text)
 *   'words'    – mehrere Wörter nacheinander (config.words)
 *   'alphabet' – Buchstabenkarten A–Z (config.letters)
 *   'free'     – freies Tippen (z. B. der eigene Name)
 *
 * Groß- und Kleinschreibung ist egal. Ein falscher Buchstabe schiebt die
 * Aufgabe nicht weiter; das Kind probiert einfach noch einmal.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  function createMatcher(text) {
    var expected = String(text).toUpperCase().split('');
    var typed = [];
    return {
      expected: function () { return expected; },
      index: function () { return typed.length; },
      value: function () { return typed.join(''); },
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

  engines.typeText = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var mode = config.mode || 'word';
      var errors = 0;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var stage = ui.el('div', { className: 'art-stage' });
      var boxesRow = ui.el('div', { className: 'type-row' });
      var helper = ui.el('div', { className: 'row', style: { justifyContent: 'center', marginBottom: '10px' } });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      wrap.appendChild(prompt);
      wrap.appendChild(stage);
      wrap.appendChild(boxesRow);
      wrap.appendChild(helper);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      var matcher = null;
      var words = [];
      var wordIndex = 0;
      var letters = [];
      var letterIndex = 0;
      var freeInput = null;

      if (mode === 'alphabet') {
        letters = config.letters || [];
        renderLetter();
      } else if (mode === 'free') {
        renderFree();
      } else {
        words = (mode === 'words' && config.words) ? config.words.slice() : [{ text: config.text, art: config.art, label: config.label }];
        startWord(words[0]);
      }

      root.document.addEventListener('keydown', onKeyDown);

      function onKeyDown(event) {
        if (destroyed || done || mode === 'free') { return; }
        if (event.metaKey || event.ctrlKey || event.altKey) { return; }

        if (event.key === 'Backspace') {
          event.preventDefault();
          if (matcher) { matcher.backspace(); paintBoxes(); }
          return;
        }
        if (event.key.length !== 1) { return; }
        event.preventDefault();

        if (mode === 'alphabet') { pressLetter(event.key); }
        else { pressWord(event.key); }
      }

      /* ---------- Wörter ---------- */

      function startWord(word) {
        matcher = createMatcher(word.text);
        prompt.textContent = NS.i18n.t('Type: ', 'Tippe: ') + word.text;
        ui.clear(stage);
        if (word.art) { stage.appendChild(ui.art(word.art, 180)); }
        if (word.label) { stage.appendChild(ui.el('p', { className: 'letter-word', text: word.label })); }
        paintBoxes();
        paintHelper(matcher.expected());
        api.speak(NS.i18n.t('Type {word}', 'Tippe {word}', { word: word.text }));
      }

      /**
       * Klickhilfe: dieselben Buchstaben auch als Knöpfe. Wer noch nicht
       * blind tippt, kommt so trotzdem weiter.
       */
      function paintHelper(letters) {
        ui.clear(helper);
        var unique = [];
        letters.forEach(function (letter) {
          if (unique.indexOf(letter) === -1) { unique.push(letter); }
        });
        unique.forEach(function (letter) {
          helper.appendChild(ui.el('button', {
            className: 'key',
            attrs: { type: 'button', 'aria-label': NS.i18n.t('Letter ', 'Buchstabe ') + letter },
            text: letter,
            on: { click: function () { pressWord(letter); } }
          }));
        });
      }

      function paintBoxes() {
        ui.clear(boxesRow);
        var expected = matcher.expected();
        var index = matcher.index();
        expected.forEach(function (character, position) {
          var filled = position < index;
          var active = position === index;
          var box = ui.el('div', {
            className: 'type-box' + (filled ? ' is-done' : '') + (active ? ' is-active' : '')
          }, [
            filled ? ui.el('span', { text: expected[position] })
              : ui.el('span', { className: 'ghost', text: expected[position] })
          ]);
          boxesRow.appendChild(box);
        });
      }

      function pressWord(key) {
        var state = matcher.press(key);
        if (state === 'wrong') {
          wrong += 1;
          errors += 1;
          api.sfx('wrong');
          feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';
          var active = boxesRow.querySelector('.is-active');
          if (active) {
            active.classList.add('is-shake');
            root.setTimeout(function () { active.classList.remove('is-shake'); }, 320);
          }
          return;
        }

        api.sfx('click');
        paintBoxes();
        if (state === 'done') {
          api.sfx('correct');
          feedback.textContent = bobby.correct[wordIndex % bobby.correct.length];
          feedback.className = 'feedback-line is-good';
          wordIndex += 1;
          if (wordIndex < words.length) {
            var next = words[wordIndex];
            ui.wait(800).then(function () {
              if (!destroyed) { startWord(next); }
            });
          } else {
            finish();
          }
        }
      }

      /* ---------- Buchstabenkarten ---------- */

      function renderLetter() {
        var card = letters[letterIndex];
        if (!card) { finish(); return; }
        ui.clear(stage);
        ui.clear(boxesRow);
        ui.clear(helper);
        prompt.textContent = NS.i18n.t('Press the key ', 'Drücke die Taste ') + card.key;
        var lowercase = String(card.key).toLowerCase();
        var layout = ui.el('div', { className: 'letter-card' }, [
          ui.el('div', {
            className: 'letter-glyph',
            attrs: { 'aria-label': 'Großes ' + card.key + ' und kleines ' + lowercase }
          }, [
            ui.el('span', { className: 'glyph-big', text: card.key }),
            ui.el('span', { className: 'glyph-small', text: lowercase })
          ]),
          ui.el('div', {}, [
            ui.art(card.art, 170),
            ui.el('p', { className: 'letter-word', text: card.word || '' })
          ])
        ]);
        stage.appendChild(layout);
        helper.appendChild(ui.el('button', {
          className: 'key wide',
          attrs: { type: 'button', 'aria-label': NS.i18n.t('Key ', 'Taste ') + card.key },
          text: NS.i18n.t('Key ', 'Taste ') + card.key,
          on: { click: function () { pressLetter(card.key); } }
        }));
        api.speak(card.key + NS.i18n.t(' and ', ' und ') + lowercase + NS.i18n.t(' for ', ' wie ') + (card.word || ''));
      }

      function pressLetter(key) {
        var card = letters[letterIndex];
        if (!card) { return; }
        if (String(key).toUpperCase() !== String(card.key).toUpperCase()) {
          wrong += 1;
          api.sfx('wrong');
          feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';
          return;
        }
        api.sfx('correct');
        feedback.textContent = bobby.correct[letterIndex % bobby.correct.length];
        feedback.className = 'feedback-line is-good';
        letterIndex += 1;
        if (letterIndex < letters.length) {
          ui.wait(450).then(function () { if (!destroyed) { renderLetter(); } });
        } else {
          finish();
        }
      }

      /* ---------- Freies Tippen ---------- */

      function renderFree() {
        ui.clear(stage);
        ui.clear(boxesRow);
        prompt.textContent = config.prompt || NS.i18n.t('Type your name', 'Tippe deinen Namen');
        freeInput = ui.el('input', {
          className: 'type-box',
          attrs: {
            type: 'text',
            maxlength: '12',
            'aria-label': NS.i18n.t('Your name', 'Dein Name'),
            autocomplete: 'off',
            placeholder: '…'
          },
          style: { width: '340px', fontSize: '40px', textAlign: 'center' }
        });
        var name = NS.store ? NS.store.profile().name : '';
        if (name) { freeInput.value = name; }
        var doneBtn = ui.button(NS.i18n.t('Done', 'Fertig'), {
          onClick: function () {
            if (done) { return; }
            done = true;
            api.sfx('star');
            api.complete({ correct: 1, attempts: 0, stars: 1 });
          }
        });
        stage.appendChild(freeInput);
        stage.appendChild(doneBtn);
        freeInput.focus();
        api.speak(config.speech || NS.i18n.t('Type your name', 'Tippe deinen Namen'));
      }

      function finish() {
        if (done) { return; }
        done = true;
        root.document.removeEventListener('keydown', onKeyDown);
        ui.wait(250).then(function () {
          api.sfx('star');
          api.complete({ correct: 1, attempts: errors, stars: 1 });
        });
      }

      return {
        destroy: function () {
          destroyed = true;
          root.document.removeEventListener('keydown', onKeyDown);
        },
        solveForTest: function () {
          if (mode === 'free') {
            if (freeInput && !freeInput.value) { freeInput.value = 'Test'; }
            var button = stage.querySelector('.btn');
            if (button) { button.click(); }
            return Promise.resolve();
          }
          var chain = Promise.resolve();
          if (mode === 'alphabet') {
            letters.forEach(function (card) {
              chain = chain.then(function () {
                if (destroyed || done) { return; }
                root.document.dispatchEvent(new root.KeyboardEvent('keydown', { key: card.key, bubbles: true }));
                return ui.wait(500);
              });
            });
            return chain;
          }
          words.forEach(function () {
            chain = chain.then(function () {
              if (destroyed || done) { return; }
              var text = matcher ? matcher.expected().join('') : '';
              return (function typeLetters() {
                if (!matcher || matcher.isDone()) { return ui.wait(850); }
                var next = matcher.expected()[matcher.index()];
                root.document.dispatchEvent(new root.KeyboardEvent('keydown', { key: next, bubbles: true }));
                return ui.wait(5).then(typeLetters);
              })();
            });
          });
          return chain;
        }
      };
    }
  };

  NS.typeText = { createMatcher: createMatcher };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createMatcher: createMatcher, engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
