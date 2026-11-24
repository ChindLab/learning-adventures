/**
 * matchPairs.js – Memory und „verbinde die Paare".
 *
 * `mode: 'memory'`  – Karten liegen verdeckt, zwei werden aufgedeckt.
 * `mode: 'columns'` – linke und rechte Spalte, je ein Klick pro Seite.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.matchPairs = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var mode = config.mode || 'memory';
      var pairs = config.pairs || [];
      var matched = 0;
      var wrong = 0;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var board = ui.el('div');
      wrap.appendChild(prompt);
      wrap.appendChild(board);
      container.appendChild(wrap);

      if (mode === 'memory') { buildMemory(); } else { buildColumns(); }
      api.speak(config.speech || config.prompt || '');

      function completeIfReady() {
        if (matched === pairs.length && !done) {
          done = true;
          api.sfx('star');
          api.complete({ correct: pairs.length, attempts: wrong, stars: 1 });
        }
      }

      function buildMemory() {
        var cards = [];
        pairs.forEach(function (pair, index) {
          cards.push({ pair: index, side: 'a', art: pair.a.art, label: pair.a.label });
          cards.push({ pair: index, side: 'b', art: pair.b.art, label: pair.b.label });
        });
        cards = ui.shuffle(cards, config.seed || 7);

        var grid = ui.el('div', { className: 'memory-grid' });
        var open = [];
        var busy = false;

        cards.forEach(function (card) {
          var node = ui.el('button', {
            className: 'memory-card',
            attrs: { type: 'button', 'aria-label': NS.i18n.t('Verdeckte Karte', 'Face-down card') },
            data: { pair: card.pair }
          }, [
            ui.el('span', { className: 'card-back', text: '★' }),
            ui.el('span', { className: 'card-face' }, [
              ui.art(card.art, 62),
              ui.el('span', { text: card.label || '' })
            ])
          ]);

          node.addEventListener('click', function () {
            if (busy || done || node.classList.contains('is-open')) { return; }
            node.classList.add('is-open');
            api.sfx('click');
            open.push({ node: node, card: card });
            if (open.length === 2) {
              var a = open[0];
              var b = open[1];
              open = [];
              if (a.card.pair === b.card.pair) {
                a.node.classList.add('is-matched');
                b.node.classList.add('is-matched');
                api.sfx('correct');
                matched += 1;
                completeIfReady();
              } else {
                wrong += 1;
                api.sfx('wrong');
                busy = true;
                ui.wait(900).then(function () {
                  if (destroyed) { return; }
                  a.node.classList.remove('is-open');
                  b.node.classList.remove('is-open');
                  busy = false;
                });
              }
            }
          });
          grid.appendChild(node);
        });
        board.appendChild(grid);
      }

      function buildColumns() {
        var left = ui.shuffle(pairs.map(function (pair, index) {
          return { index: index, art: pair.a.art, label: pair.a.label };
        }), config.seed || 11);
        var right = ui.shuffle(pairs.map(function (pair, index) {
          return { index: index, art: pair.b.art, label: pair.b.label };
        }), (config.seed || 11) + 3);

        var columns = ui.el('div', { className: 'pairs-columns' });
        var leftCol = ui.el('div', { className: 'pair-col' });
        var rightCol = ui.el('div', { className: 'pair-col' });
        var selected = null;

        function makeItem(entry, side) {
          var node = ui.el('button', {
            className: 'pair-item',
            attrs: { type: 'button' },
            data: { pair: entry.index, side: side }
          }, [ui.art(entry.art, 52), ui.el('span', { text: entry.label || '' })]);

          node.addEventListener('click', function () {
            if (done || node.classList.contains('is-matched')) { return; }
            api.sfx('click');
            if (!selected) {
              selected = { node: node, entry: entry, side: side };
              node.classList.add('is-selected');
              return;
            }
            if (selected.side === side) {
              selected.node.classList.remove('is-selected');
              selected = { node: node, entry: entry, side: side };
              node.classList.add('is-selected');
              return;
            }
            var first = selected;
            selected = null;
            first.node.classList.remove('is-selected');
            if (first.entry.index === entry.index) {
              first.node.classList.add('is-matched');
              node.classList.add('is-matched');
              api.sfx('correct');
              matched += 1;
              completeIfReady();
            } else {
              wrong += 1;
              api.sfx('wrong');
              first.node.classList.add('is-wrong');
              node.classList.add('is-wrong');
              root.setTimeout(function () {
                first.node.classList.remove('is-wrong');
                node.classList.remove('is-wrong');
              }, 360);
            }
          });
          return node;
        }

        left.forEach(function (entry) { leftCol.appendChild(makeItem(entry, 'left')); });
        right.forEach(function (entry) { rightCol.appendChild(makeItem(entry, 'right')); });
        columns.appendChild(leftCol);
        columns.appendChild(rightCol);
        board.appendChild(columns);
      }

      function solve() {
        var chain = Promise.resolve();
        pairs.forEach(function (pair, index) {
          chain = chain.then(function () {
            if (destroyed) { return; }
            if (mode === 'memory') {
              var cards = board.querySelectorAll('[data-pair="' + index + '"]');
              if (cards[0]) { cards[0].click(); }
              if (cards[1]) { cards[1].click(); }
            } else {
              var leftCard = board.querySelector('[data-pair="' + index + '"][data-side="left"]');
              var rightCard = board.querySelector('[data-pair="' + index + '"][data-side="right"]');
              if (leftCard) { leftCard.click(); }
              if (rightCard) { rightCard.click(); }
            }
            return ui.wait(mode === 'memory' ? 40 : 30);
          });
        });
        return chain;
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: solve
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
