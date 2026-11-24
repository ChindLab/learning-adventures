/**
 * pattern.js – „Was kommt als Nächstes?"
 * Unterstützt Farben, Formen und Zahlen. Mehrere Runden pro Aktivität.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  var COLORS = {
    rot: '#FF8FA3', blau: '#7FB2FF', gelb: '#FFE066',
    grün: '#9ED9B0', lila: '#C9B6F2', orange: '#FFB347'
  };

  engines.pattern = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var rounds = config.rounds || [config];
      var roundIndex = 0;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || NS.i18n.t('Was kommt als Nächstes?', 'What comes next?') });
      var row = ui.el('div', { className: 'pattern-row' });
      var options = ui.el('div', { className: 'options' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      wrap.appendChild(prompt);
      wrap.appendChild(row);
      wrap.appendChild(options);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      api.speak(config.speech || config.prompt || NS.i18n.t('Was kommt als Nächstes?', 'What comes next?'));
      render();

      function tile(item) {
        if (item.color) {
          return ui.el('div', {
            className: 'pattern-tile',
            style: { background: COLORS[item.color] || item.color }
          });
        }
        if (item.art) {
          return ui.el('div', { className: 'pattern-tile' }, [ui.art(item.art, 58)]);
        }
        return ui.el('div', { className: 'pattern-tile', style: { fontSize: '34px', fontWeight: '800' } },
          [ui.el('span', { text: String(item.value) })]);
      }

      function render() {
        var round = rounds[roundIndex];
        var isGrid = round.layout === 'grid' || config.layout === 'grid';
        ui.clear(row);
        row.className = isGrid ? 'pattern-grid' : 'pattern-row';

        var slot = ui.el('div', { className: 'pattern-slot', text: '?' });

        (round.sequence || []).forEach(function (item) { row.appendChild(tile(item)); });
        row.appendChild(slot);

        ui.clear(options);
        (round.options || []).forEach(function (option) {
          var button = ui.el('button', {
            className: 'option',
            attrs: { type: 'button' },
            data: { option: option.id || option.value || option.color || option.art },
            style: { minHeight: '120px' }
          }, [tile(option)]);
          button.addEventListener('click', function () { choose(option, button, round); });
          options.appendChild(button);
        });
      }

      function keyOf(option) {
        return String(option.id !== undefined ? option.id : (option.value !== undefined ? option.value
          : (option.color || option.art)));
      }

      function choose(option, button, round) {
        if (done) { return; }
        if (keyOf(option) === String(round.answer)) {
          button.classList.add('is-correct');
          api.sfx('correct');
          feedback.textContent = bobby.correct[0];
          feedback.className = 'feedback-line is-good';
          var slot = row.querySelector('.pattern-slot');
          if (slot) {
            slot.style.background = '#F2FFF8';
            slot.textContent = '✓';
          }
          roundIndex += 1;
          if (roundIndex < rounds.length) {
            ui.wait(800).then(function () { if (!destroyed) { render(); feedback.textContent = ''; } });
          } else {
            done = true;
            ui.wait(500).then(function () {
              api.sfx('star');
              api.complete({ correct: rounds.length, attempts: wrong, stars: 1 });
            });
          }
        } else {
          wrong += 1;
          api.sfx('wrong');
          button.classList.add('is-wrong');
          root.setTimeout(function () { button.classList.remove('is-wrong'); }, 340);
          feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';
        }
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () {
          var chain = Promise.resolve();
          rounds.forEach(function (round) {
            chain = chain.then(function () {
              if (destroyed || done) { return; }
              var button = options.querySelector('[data-option="' + round.answer + '"]');
              if (button) { button.click(); }
              return ui.wait(850);
            });
          });
          return chain;
        }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
