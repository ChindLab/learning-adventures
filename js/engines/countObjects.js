/**
 * countObjects.js – zählen, Mengen zuordnen, plus und minus.
 *
 * Alles wird mit Bildern gezeigt. Zahlen sind die Antwort, nicht die Frage.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  function arithmetic(config) {
    var a = Number(config.a) || 0;
    var b = Number(config.b) || 0;
    if (config.mode === 'sub') {
      return { expression: a + ' − ' + b, result: Math.max(0, a - b), a: a, b: b };
    }
    return { expression: a + ' + ' + b, result: a + b, a: a, b: b };
  }

  engines.countObjects = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var mode = config.mode || 'count';

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var board = ui.el('div', { className: 'count-board' });
      var expression = ui.el('div', { className: 'count-expression' });
      var optionsRow = ui.el('div', { className: 'options cols-3' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      wrap.appendChild(prompt);
      wrap.appendChild(expression);
      wrap.appendChild(board);
      wrap.appendChild(optionsRow);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      var artName = config.art || 'apfel';
      var answer = 0;

      api.speak(config.speech || config.prompt || '');

      if (mode === 'add' || mode === 'sub') { renderArithmetic(); }
      else if (mode === 'feed') { renderFeed(); }
      else { renderCount(); }

      function addObject(containerEl) {
        var node = ui.el('span', { className: 'count-object' }, [ui.art(artName, 56)]);
        containerEl.appendChild(node);
        return node;
      }

      function renderCount() {
        var count = Number(config.count) || 3;
        answer = count;
        for (var i = 0; i < count; i++) { addObject(board); }
        renderNumberOptions(1, Math.max(10, count + 2));
      }

      function renderArithmetic() {
        var result = arithmetic(config);
        answer = result.result;
        expression.textContent = result.expression + ' = ?';
        if (mode === 'add') {
          var left = ui.el('div', { className: 'row' });
          var plus = ui.el('span', { text: '+' });
          var right = ui.el('div', { className: 'row' });
          for (var i = 0; i < result.a; i++) { addObject(left); }
          for (var j = 0; j < result.b; j++) { addObject(right); }
          board.appendChild(left);
          board.appendChild(plus);
          board.appendChild(right);
        } else {
          for (var k = 0; k < result.a; k++) {
            var obj = addObject(board);
            (function (node, index) {
              node.style.opacity = index < result.b ? '0.25' : '1';
            })(obj, k);
          }
          prompt.textContent = config.prompt || (result.b + ' verschwinden');
        }
        renderNumberOptions(0, Math.max(10, result.a + 1));
      }

      function renderFeed() {
        var wanted = Number(config.count) || 3;
        answer = wanted;
        expression.textContent = NS.i18n.t('Lege ' + wanted + ' auf den Teller', 'Put ' + wanted + ' on the plate');
        var plate = ui.el('div', { className: 'count-board', style: { minHeight: '160px', minWidth: '240px', border: '4px dashed #9A8FB0' } });
        var tray = ui.el('div', { className: 'row' });
        var placed = 0;
        board.style.flexDirection = 'column';

        for (var i = 0; i < wanted + 3; i++) {
          var banana = ui.el('button', {
            className: 'drag-item',
            attrs: { type: 'button', 'aria-label': 'Banane' },
            style: { width: '80px', minHeight: '80px' }
          }, [ui.art('banane', 52)]);
          banana.addEventListener('click', function () {
            if (done) { return; }
            placed += 1;
            api.sfx('pop');
            var copy = ui.el('span', {}, [ui.art('banane', 46)]);
            plate.appendChild(copy);
            banana.disabled = true;
            banana.style.opacity = '0.35';
          });
          tray.appendChild(banana);
        }

        var check = ui.button(NS.i18n.t('Fertig', 'Done'), {
          onClick: function () {
            if (done) { return; }
            if (placed === wanted) {
              api.sfx('star');
              done = true;
              api.complete({ correct: 1, attempts: wrong, stars: 1 });
            } else {
              wrong += 1;
              api.sfx('wrong');
              feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
              feedback.className = 'feedback-line is-soft';
            }
          }
        });

        board.appendChild(plate);
        board.appendChild(tray);
        board.appendChild(check);
      }

      function renderNumberOptions(from, to) {
        ui.clear(optionsRow);
        for (var n = from; n <= to; n++) {
          (function (value) {
            var button = ui.el('button', {
              className: 'option',
              attrs: { type: 'button' },
              data: { value: value },
              style: { minHeight: '110px' }
            }, [ui.el('span', { text: String(value), style: { fontSize: '40px' } })]);
            button.addEventListener('click', function () { choose(value, button); });
            optionsRow.appendChild(button);
          })(n);
        }
      }

      function choose(value, button) {
        if (done) { return; }
        if (value === answer) {
          button.classList.add('is-correct');
          api.sfx('correct');
          feedback.textContent = bobby.correct[0];
          feedback.className = 'feedback-line is-good';
          done = true;
          ui.wait(500).then(function () {
            api.sfx('star');
            api.complete({ correct: 1, attempts: wrong, stars: 1 });
          });
        } else {
          wrong += 1;
          api.sfx('wrong');
          button.classList.add('is-wrong');
          root.setTimeout(function () { button.classList.remove('is-wrong'); }, 340);
          feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';
          if (wrong === 3) {
            var hint = optionsRow.querySelector('[data-value="' + answer + '"]');
            if (hint) { hint.classList.add('is-hint'); }
          }
        }
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () {
          if (mode === 'feed') {
            var bananas = board.querySelectorAll('.drag-item');
            for (var i = 0; i < Math.min(answer, bananas.length); i++) { bananas[i].click(); }
            var checkBtn = board.querySelector('.btn');
            if (checkBtn) { checkBtn.click(); }
            return Promise.resolve();
          }
          var target = optionsRow.querySelector('[data-value="' + answer + '"]');
          if (target) { target.click(); }
          return ui.wait(600);
        }
      };
    }
  };

  NS.counting = { arithmetic: arithmetic };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { arithmetic: arithmetic, engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
