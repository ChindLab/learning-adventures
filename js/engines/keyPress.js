/**
 * keyPress.js – die richtige Taste auf einer sichtbaren Tastatur finden.
 *
 * Die Tastatur ist vereinfacht (QWERTZ) und zeigt die gesuchte Taste mit
 * einem pulsierenden Ring. Leertaste, Enter, Backspace, Shift und Pfeile
 * sind eigene Tasten. Klicken gilt auch, ist aber nicht der eigentliche Sinn.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  var ROWS_LETTERS = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  var ROWS_LETTERS_EN = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  var ROW_NUMBERS = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']];

  var LABELS = {
    ' ': 'Leertaste', 'Enter': 'Enter', 'Backspace': 'Backspace',
    'Shift': 'Shift', 'ArrowUp': '↑', 'ArrowDown': '↓',
    'ArrowLeft': '←', 'ArrowRight': '→'
  };

  var LABELS_EN = {
    ' ': 'Space', 'Enter': 'Enter', 'Backspace': 'Backspace',
    'Shift': 'Shift', 'ArrowUp': '↑', 'ArrowDown': '↓',
    'ArrowLeft': '←', 'ArrowRight': '→'
  };

  function keyLabel(symbol) {
    return NS.i18n.t(LABELS[symbol] || symbol, LABELS_EN[symbol] || symbol);
  }

  function normalize(key) {
    if (key === undefined || key === null) { return ''; }
    if (key === ' ') { return ' '; }
    if (key.length === 1) { return key.toLowerCase(); }
    return key;
  }

  /**
   * Wählt die nächste Taste aus dem Vorrat und vermeidet dieselbe Taste
   * zweimal hintereinander, solange es Alternativen gibt.
   */
  function pickFrom(pool, previous) {
    if (!pool || !pool.length) { return null; }
    var options = pool.map(normalize).filter(function (key) {
      return key !== previous;
    });
    if (!options.length) { options = pool.map(normalize); }
    return options[Math.floor(Math.random() * options.length)];
  }

  engines.keyPress = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var hits = 0;
      var count = Math.max(1, Math.min(20, Number(config.count) || 1));
      var pool = (config.pool && config.pool.length) ? config.pool.slice() : [config.key];
      var targetKey = normalize(pickFrom(pool, null));
      var layout = config.layout || 'letters';

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var targetLine = ui.el('p', { className: 'key-target-line', attrs: { 'aria-live': 'polite' } });
      var progress = ui.el('div', { className: 'key-progress', attrs: { 'aria-live': 'polite' } });
      var progressText = ui.el('span', { className: 'key-progress-text', text: '0' + NS.i18n.t(' von ', ' of ') + count });
      var dotsRow = ui.el('div', { className: 'key-progress-dots' });
      for (var dotIndex = 0; dotIndex < count; dotIndex++) {
        dotsRow.appendChild(ui.el('span', { className: 'key-progress-dot' }));
      }
      progress.appendChild(progressText);
      progress.appendChild(dotsRow);
      if (count > 1) { progress.hidden = false; } else { progress.hidden = true; }
      var keyboard = ui.el('div', { className: 'keyboard' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      wrap.appendChild(prompt);
      wrap.appendChild(targetLine);
      wrap.appendChild(progress);
      wrap.appendChild(keyboard);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      var rows = [];
      var letterRows = NS.i18n.lang() === 'en' ? ROWS_LETTERS_EN : ROWS_LETTERS;
      if (layout === 'numbers') { rows = ROW_NUMBERS.slice(); }
      else if (layout === 'all') { rows = ROW_NUMBERS.concat(letterRows); }
      else { rows = letterRows.slice(); }

      var keyNodes = {};

      function makeKey(symbol, options) {
        options = options || {};
        var node = ui.el('button', {
          className: 'key' + (options.wide ? ' wide' : '') + (options.wideXl ? ' wide-xl' : ''),
          attrs: { type: 'button', 'aria-label': keyLabel(symbol) },
          data: { key: symbol }
        }, [ui.el('span', { text: keyLabel(symbol) })]);
        node.addEventListener('click', function () { attempt(normalize(symbol), node); });
        keyNodes[normalize(symbol)] = node;
        return node;
      }

      rows.forEach(function (row) {
        var rowEl = ui.el('div', { className: 'kb-row' });
        row.forEach(function (symbol) { rowEl.appendChild(makeKey(symbol)); });
        keyboard.appendChild(rowEl);
      });

      var special = ui.el('div', { className: 'kb-row' });
      special.appendChild(makeKey('Shift', { wide: true }));
      special.appendChild(makeKey('Backspace', { wide: true }));
      special.appendChild(makeKey('Enter', { wide: true }));
      keyboard.appendChild(special);

      var spaceRow = ui.el('div', { className: 'kb-row' });
      spaceRow.appendChild(makeKey(' ', { wideXl: true }));
      keyboard.appendChild(spaceRow);

      var arrows = ui.el('div', { className: 'kb-row' });
      ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].forEach(function (symbol) {
        arrows.appendChild(makeKey(symbol));
      });
      keyboard.appendChild(arrows);

      api.speak(config.speech || config.prompt || '');
      highlightTarget();

      function highlightTarget() {
        Object.keys(keyNodes).forEach(function (key) {
          keyNodes[key].classList.remove('is-target');
        });
        var node = keyNodes[targetKey];
        if (node) { node.classList.add('is-target'); }
        targetLine.textContent = NS.i18n.t('Jetzt: ', 'Now: ') + (LABELS[targetKey] ? keyLabel(targetKey) : String(targetKey).toUpperCase());
      }

      function onKeyDown(event) {
        if (done || destroyed) { return; }
        var key = normalize(event.key);
        if (key === ' ' || key === 'Enter' || key === 'Backspace' || key.indexOf('Arrow') === 0) {
          event.preventDefault();
        }
        attempt(key, keyNodes[key]);
      }
      root.document.addEventListener('keydown', onKeyDown);

      function markHit() {
        var dots = dotsRow.querySelectorAll('.key-progress-dot');
        if (dots[hits - 1]) { dots[hits - 1].classList.add('is-done'); }
        progressText.textContent = hits + NS.i18n.t(' von ', ' of ') + count;
      }

      function attempt(key, node) {
        if (done || destroyed) { return; }
        if (key === targetKey) {
          hits += 1;
          markHit();
          if (node) { node.classList.add('is-pressed'); }
          api.sfx(hits >= count ? 'correct' : 'click');

          if (hits >= count) {
            done = true;
            feedback.textContent = bobby.correct[0];
            feedback.className = 'feedback-line is-good';
            root.document.removeEventListener('keydown', onKeyDown);
            ui.wait(260).then(function () {
              api.sfx('star');
              api.complete({ correct: count, attempts: wrong, stars: 1 });
            });
          } else {
            targetKey = normalize(pickFrom(pool, targetKey));
            highlightTarget();
            feedback.textContent = hits + NS.i18n.t(' von ', ' of ') + count;
            feedback.className = 'feedback-line is-good';
          }
          return;
        }

        wrong += 1;
        api.sfx('wrong');
        feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
        feedback.className = 'feedback-line is-soft';
        keyboard.classList.add('is-shake');
        if (node) { node.classList.add('is-pressed'); }
        root.setTimeout(function () {
          keyboard.classList.remove('is-shake');
          if (node) { node.classList.remove('is-pressed'); }
        }, 340);

        if (wrong === 3) {
          var hintText = config.hint || NS.i18n.t('Schau auf den gelben Ring!', 'Look at the yellow ring!');
          feedback.textContent = hintText;
          api.speak(hintText);
        }
      }

      function solve() {
        for (var press = 0; press < count; press++) {
          var node = keyboard.querySelector('.key.is-target');
          if (!node) { break; }
          root.document.dispatchEvent(new root.KeyboardEvent('keydown', {
            key: node.dataset.key,
            bubbles: true
          }));
        }
        return ui.wait(320);
      }

      return {
        destroy: function () {
          destroyed = true;
          root.document.removeEventListener('keydown', onKeyDown);
        },
        solveForTest: solve
      };
    }
  };
  NS.keyboardDrill = { pickFrom: pickFrom, normalize: normalize };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pickFrom: pickFrom, normalize: normalize };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
