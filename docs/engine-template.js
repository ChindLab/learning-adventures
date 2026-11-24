/**
 * engine-template.js – copy this file to js/engines/ and rename it.
 *
 * It is a complete, working engine: one big button, one completion.
 * Replace the body with your game, keep the contract.
 *
 * NOT loaded by the app. It lives in docs/ on purpose.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.exampleButton = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var destroyed = false;
      var done = false;

      // Everything the child sees lives inside `container`.
      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', {
        className: 'prompt',
        text: config.prompt || NS.i18n.t('Drücke den Knopf.', 'Press the button.')
      });
      var feedback = ui.el('p', {
        className: 'feedback-line',
        attrs: { 'aria-live': 'polite' }
      });
      var button = ui.button(NS.i18n.t('Los', 'Go'), { onClick: finish });

      wrap.appendChild(prompt);
      wrap.appendChild(button);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      api.speak(config.speech || config.prompt || '');

      function finish() {
        if (done || destroyed) { return; }
        done = true;
        api.sfx('star');
        feedback.textContent = NS.i18n.t('Super!', 'Great!');
        feedback.className = 'feedback-line is-good';
        // Exactly once. `correct` counts successes, `attempts` counts mistakes.
        api.complete({ correct: 1, attempts: 0, stars: 1 });
      }

      return {
        // Called when the child leaves, and twice by the self-test.
        destroy: function () {
          destroyed = true;
        },
        // The self-test uses this. It must use the real interaction path.
        solveForTest: function () {
          button.click();
          return Promise.resolve();
        }
      };
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
