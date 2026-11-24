/**
 * pickOne.js – „Klicke das Richtige an".
 *
 * Unterstützt `deck`: mehrere Fragen in einer Aktivität (für Meilensteine).
 * Eine falsche Antwort entfernt nie eine Möglichkeit und kostet nichts.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.pickOne = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;

      var destroyed = false;
      var done = false;
      var itemIndex = 0;
      var totalWrong = 0;
      var itemWrong = 0;

      var list = (config.deck && config.deck.length) ? config.deck : [config];

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt' });
      var options = ui.el('div', { className: 'options' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      wrap.appendChild(prompt);
      wrap.appendChild(options);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      function current() { return list[itemIndex]; }

      function render() {
        var item = current();
        prompt.textContent = item.prompt || config.prompt || '';
        options.className = 'options' + (item.columns ? ' cols-' + item.columns
          : (config.columns ? ' cols-' + config.columns
            : (item.options.length === 2 ? ' cols-2' : '')));
        ui.clear(options);

        item.options.forEach(function (option) {
          var contentNodes = [];
          if (option.art) { contentNodes.push(ui.art(option.art, 110)); }
          contentNodes.push(ui.el('span', {
            text: option.label || '',
            style: option.art ? null : { fontSize: '58px', fontWeight: '800' }
          }));
          var card = ui.el('button', {
            className: 'option',
            attrs: { type: 'button' },
            data: { option: option.id }
          }, contentNodes);
          card.addEventListener('click', function () { choose(option, card, item); });
          options.appendChild(card);
        });

        api.speak(item.speech || config.speech || item.prompt || config.prompt || '');
        itemWrong = 0;
      }

      function answerOf(item) {
        return item.answer !== undefined ? item.answer : config.answer;
      }

      function choose(option, card, item) {
        if (done || destroyed) { return; }
        if (String(option.id) === String(answerOf(item))) {
          card.classList.add('is-correct');
          api.sfx('correct');
          feedback.textContent = bobby.correct[(totalWrong + itemIndex) % bobby.correct.length];
          feedback.className = 'feedback-line is-good';

          if (itemIndex < list.length - 1) {
            api.sfx('star');
            var next = itemIndex + 1;
            ui.wait(700).then(function () {
              if (destroyed) { return; }
              itemIndex = next;
              feedback.textContent = '';
              feedback.className = 'feedback-line';
              render();
            });
          } else {
            finish();
          }
        } else {
          totalWrong += 1;
          itemWrong += 1;
          api.sfx('wrong');
          card.classList.add('is-wrong');
          root.setTimeout(function () { card.classList.remove('is-wrong'); }, 360);
          feedback.textContent = bobby.wrong[totalWrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';

          if (itemWrong >= 3) {
            var right = options.querySelector('[data-option="' + answerOf(item) + '"]');
            if (right) { right.classList.add('is-hint'); }
            api.speak(bobby.hint);
          }
        }
      }

      function finish() {
        if (done) { return; }
        done = true;
        api.sfx('star');
        api.complete({ correct: list.length, attempts: totalWrong, stars: 1 });
      }

      render();

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () {
          var chain = Promise.resolve();
          list.forEach(function (item, index) {
            chain = chain.then(function () {
              if (destroyed) { return; }
              var answer = item.answer !== undefined ? item.answer : config.answer;
              var button = options.querySelector('[data-option="' + answer + '"]');
              if (button) { button.click(); } else if (index === 0) {
                // Deck-Ansicht: das falsche Element ist gerendert.
                var any = options.querySelector('.option');
                if (any) { any.click(); }
              }
              return ui.wait(750);
            });
          });
          return chain;
        }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
