/**
 * explain.js – eine Erklärseite: Bild, bis zu drei kurze Sätze, ein Knopf.
 * Option `scroll` macht daraus die „scrollen lernen"-Aufgabe aus Stufe 2.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.explain = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var destroyed = false;
      var done = false;

      var wrap = ui.el('div', { className: 'activity' });
      var layout = ui.el('div', { className: 'explain' });
      var artBox = ui.el('div', { className: 'art-stage' });
      var side = ui.el('div');
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || config.title || '' });
      var points = ui.el('div', { className: 'points' });
      var nextBtn = ui.button(NS.i18n.t('Next', 'Weiter'), { onClick: finish });

      side.appendChild(prompt);

      if (config.scroll) {
        var scrollBox = ui.el('div', { className: 'scroll-box', attrs: { tabindex: '0', 'aria-label': NS.i18n.t('Scrollable area', 'Zum Scrollen') } });
        var tall = ui.el('div', { className: 'scroll-target' });
        tall.appendChild(ui.art(config.art, 180));
        tall.appendChild(ui.el('p', { className: 'muted center', text: NS.i18n.t('Scroll down …', 'Scrolle nach unten …') }));
        tall.appendChild(ui.art('bobby', 120));
        scrollBox.appendChild(tall);
        artBox.appendChild(scrollBox);
        nextBtn.disabled = true;
        scrollBox.addEventListener('scroll', function () {
          if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 30) {
            nextBtn.disabled = false;
          }
        });
      } else {
        artBox.appendChild(ui.art(config.art, 240));
      }

      (config.points || []).forEach(function (text) {
        points.appendChild(ui.el('div', { className: 'point' }, [
          ui.el('span', { className: 'dot-mark' }),
          ui.el('span', { text: text })
        ]));
      });

      side.appendChild(points);
      side.appendChild(nextBtn);
      layout.appendChild(artBox);
      layout.appendChild(side);
      wrap.appendChild(layout);
      container.appendChild(wrap);

      api.speak(config.speech || config.prompt || config.title || '');

      function finish() {
        if (done || destroyed) { return; }
        done = true;
        api.sfx('star');
        api.complete({ correct: 1, attempts: 0, stars: 1 });
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () {
          if (config.scroll) {
            var box = wrap.querySelector('.scroll-box');
            if (box) { box.scrollTop = box.scrollHeight; }
            nextBtn.disabled = false;
          }
          nextBtn.click();
          return Promise.resolve();
        }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
