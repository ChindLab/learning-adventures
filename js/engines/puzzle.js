/**
 * puzzle.js – ein Bild aus Teilen zusammensetzen.
 *
 * Das Bild kommt aus der SVG-Bibliothek und wird als Daten-URL in Kacheln
 * geschnitten. Kein externes Bild, kein Nachladen.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.puzzle = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var destroyed = false;
      var done = false;
      var cols = config.cols || 2;
      var rows = config.rows || 2;
      var total = cols * rows;
      var selected = null;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || NS.i18n.t('Setze das Bild zusammen!', 'Put the picture together!') });
      var layout = ui.el('div', { className: 'puzzle-wrap' });
      var board = ui.el('div', {
        className: 'puzzle-board',
        style: {
          gridTemplateColumns: 'repeat(' + cols + ', 1fr)',
          gridTemplateRows: 'repeat(' + rows + ', 1fr)'
        }
      });
      var tray = ui.el('div', { className: 'puzzle-tray' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      layout.appendChild(board);
      layout.appendChild(tray);
      wrap.appendChild(prompt);
      wrap.appendChild(layout);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      var svg = NS.icons.markup(config.art || 'blume')
        .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
      var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

      function backgroundFor(index) {
        var col = index % cols;
        var row = Math.floor(index / cols);
        var posX = cols > 1 ? (col * 100 / (cols - 1)) : 0;
        var posY = rows > 1 ? (row * 100 / (rows - 1)) : 0;
        return {
          backgroundImage: 'url("' + url + '")',
          backgroundSize: (cols * 100) + '% ' + (rows * 100) + '%',
          backgroundPosition: posX + '% ' + posY + '%'
        };
      }

      var placedCount = 0;

      for (var slotIndex = 0; slotIndex < total; slotIndex++) {
        (function (index) {
          var slot = ui.el('div', {
            className: 'puzzle-slot',
            data: { slot: index },
            attrs: { role: 'button', tabindex: '0', 'aria-label': NS.i18n.t('Platz ', 'Slot ') + (index + 1) }
          });
          slot.addEventListener('click', function () {
            if (done || !selected) { return; }
            tryPlace(selected, index);
          });
          slot.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); slot.click(); }
          });
          board.appendChild(slot);
        })(slotIndex);
      }

      var order = ui.shuffle(Array.from({ length: total }, function (_, i) { return i; }), config.seed || 3);
      order.forEach(function (index) {
        var tile = ui.el('button', {
          className: 'puzzle-tile',
          attrs: { type: 'button', 'aria-label': NS.i18n.t('Teil ', 'Piece ') + (index + 1) },
          data: { index: index },
          style: backgroundFor(index)
        });
        tile.addEventListener('click', function () {
          if (done) { return; }
          api.sfx('click');
          if (selected === tile) {
            tile.classList.remove('is-selected');
            selected = null;
            return;
          }
          if (selected) { selected.classList.remove('is-selected'); }
          selected = tile;
          tile.classList.add('is-selected');
        });
        tray.appendChild(tile);
      });

      api.speak(config.speech || config.prompt || NS.i18n.t('Setze das Bild zusammen.', 'Put the picture together.'));

      function tryPlace(tile, index) {
        if (done) { return; }
        var tileIndex = Number(tile.dataset.index);
        var slot = board.querySelector('[data-slot="' + index + '"]');
        if (tileIndex !== index) {
          api.sfx('bump');
          feedback.textContent = NS.i18n.t('Fast! Probier ein anderes Teil.', 'Almost! Try a different piece.');
          feedback.className = 'feedback-line is-soft';
          tile.classList.remove('is-selected');
          selected = null;
          return;
        }

        Object.keys(backgroundFor(tileIndex)).forEach(function (key) {
          slot.style[key] = backgroundFor(tileIndex)[key];
        });
        slot.classList.add('is-filled');
        slot.dataset.filled = '1';
        tile.remove();
        selected = null;
        placedCount += 1;
        api.sfx('pop');

        if (placedCount === total) {
          done = true;
          api.sfx('star');
          feedback.textContent = NS.i18n.t('Fertig! Das Bild ist komplett.', 'Done! The picture is complete.');
          feedback.className = 'feedback-line is-good';
          board.style.transform = 'scale(1.03)';
          ui.wait(400).then(function () {
            api.complete({ correct: total, attempts: 0, stars: 1 });
          });
        }
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () {
          var chain = Promise.resolve();
          for (var index = 0; index < total; index++) {
            (function (target) {
              chain = chain.then(function () {
                if (destroyed || done) { return; }
                var tile = tray.querySelector('[data-index="' + target + '"]');
                var slot = board.querySelector('[data-slot="' + target + '"]');
                if (tile) { tile.click(); }
                if (slot) { slot.click(); }
                return ui.wait(10);
              });
            })(index);
          }
          return chain;
        }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
