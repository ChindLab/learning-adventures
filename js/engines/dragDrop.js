/**
 * dragDrop.js – ziehen und ablegen.
 *
 * Drei gleichwertige Wege, damit kein Kind hängen bleibt:
 *   1. mit der Maus ziehen,
 *   2. antippen, dann Ziel antippen,
 *   3. Tab + Enter (alle Elemente sind echte Knöpfe).
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.dragDrop = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var placed = {};
      var selected = null;
      var drag = null;
      var ghost = null;
      var suppressClick = false;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var board = ui.el('div', { className: 'drag-board' });
      var tray = ui.el('div', { className: 'drag-tray' });
      var targetsRow = ui.el('div', { className: 'drop-row' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      board.appendChild(tray);
      board.appendChild(targetsRow);
      wrap.appendChild(prompt);
      wrap.appendChild(board);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      var itemMap = {};
      (config.items || []).forEach(function (item) {
        var node = ui.el('button', {
          className: 'drag-item',
          attrs: { type: 'button', 'aria-pressed': 'false' },
          data: { item: item.id }
        }, [ui.art(item.art, item.size || 76), ui.el('span', { text: item.label || '' })]);
        itemMap[item.id] = { config: item, node: node };
        node.addEventListener('pointerdown', function (event) { startDrag(event, item.id, node); });
        node.addEventListener('click', function () {
          if (suppressClick) { suppressClick = false; return; }
          if (placed[item.id] || drag) { return; }
          select(item.id, node);
        });
        tray.appendChild(node);
      });

      var targetNodes = {};
      (config.targets || []).forEach(function (target) {
        var node = ui.el('button', {
          className: 'drop-zone',
          attrs: { type: 'button' },
          data: { target: target.id }
        }, [target.art ? ui.art(target.art, 64) : null,
            ui.el('span', { text: target.label || '' })]);
        targetNodes[target.id] = node;
        node.addEventListener('click', function () {
          if (selected) { tryPlace(selected, target.id); }
        });
        targetsRow.appendChild(node);
      });

      api.speak(config.speech || config.prompt || '');

      function select(itemId, node) {
        if (selected === itemId) {
          selected = null;
          node.classList.remove('is-selected');
          node.setAttribute('aria-pressed', 'false');
          return;
        }
        if (selected) {
          var previous = itemMap[selected] && itemMap[selected].node;
          if (previous) { previous.classList.remove('is-selected'); previous.setAttribute('aria-pressed', 'false'); }
        }
        selected = itemId;
        node.classList.add('is-selected');
        node.setAttribute('aria-pressed', 'true');
        api.sfx('click');
        feedback.textContent = NS.i18n.t('Tippe jetzt auf das passende Ziel.', 'Now tap the matching target.');
        feedback.className = 'feedback-line';
      }

      function startDrag(event, itemId, node) {
        if (placed[itemId] || done) { return; }
        drag = { itemId: itemId, node: node, x: event.clientX, y: event.clientY, moved: false };
        root.document.addEventListener('pointermove', onMove);
        root.document.addEventListener('pointerup', onUp);
      }

      function onMove(event) {
        if (!drag) { return; }
        if (!drag.moved && Math.abs(event.clientX - drag.x) + Math.abs(event.clientY - drag.y) > 8) {
          drag.moved = true;
          drag.node.classList.add('is-dragging');
          ghost = ui.el('div', { className: 'drag-ghost' });
          var art = drag.node.querySelector('svg');
          if (art) { ghost.appendChild(art.cloneNode(true)); }
          root.document.body.appendChild(ghost);
        }
        if (ghost) {
          ghost.style.left = event.clientX + 'px';
          ghost.style.top = event.clientY + 'px';
        }
      }

      function onUp(event) {
        root.document.removeEventListener('pointermove', onMove);
        root.document.removeEventListener('pointerup', onUp);
        if (!drag) { return; }
        var wasDrag = drag.moved;
        var itemId = drag.itemId;
        drag.node.classList.remove('is-dragging');
        if (ghost) { ghost.remove(); ghost = null; }
        drag = null;

        if (wasDrag) {
          suppressClick = true;
          root.setTimeout(function () { suppressClick = false; }, 400);
          var under = root.document.elementFromPoint(event.clientX, event.clientY);
          var zone = under && under.closest ? under.closest('[data-target]') : null;
          if (zone) { tryPlace(itemId, zone.dataset.target); }
        }
      }

      function tryPlace(itemId, targetId) {
        if (placed[itemId] || done) { return; }
        var target = (config.targets || []).filter(function (t) { return String(t.id) === String(targetId); })[0];
        if (!target) { return; }

        if ((target.accepts || []).indexOf(itemId) === -1) {
          wrong += 1;
          api.sfx('bump');
          feedback.textContent = bobby.wrong[wrong % bobby.wrong.length];
          feedback.className = 'feedback-line is-soft';
          var zone = targetNodes[targetId];
          if (zone) {
            zone.classList.add('is-wrong');
            root.setTimeout(function () { zone.classList.remove('is-wrong'); }, 360);
          }
          clearSelection();
          return;
        }

        var item = itemMap[itemId];
        placed[itemId] = true;
        item.node.classList.remove('is-selected');
        item.node.classList.add('is-placed');
        item.node.setAttribute('aria-pressed', 'false');
        item.node.disabled = true;
        targetNodes[targetId].appendChild(item.node);
        targetNodes[targetId].classList.add('is-filled');
        api.sfx('pop');
        clearSelection();

        if (Object.keys(placed).length === (config.items || []).length) {
          done = true;
          api.sfx('star');
          api.complete({ correct: config.items.length, attempts: wrong, stars: 1 });
        }
      }

      function clearSelection() {
        if (selected && itemMap[selected]) {
          itemMap[selected].node.classList.remove('is-selected');
          itemMap[selected].node.setAttribute('aria-pressed', 'false');
        }
        selected = null;
      }

      return {
        destroy: function () {
          destroyed = true;
          root.document.removeEventListener('pointermove', onMove);
          root.document.removeEventListener('pointerup', onUp);
          if (ghost) { ghost.remove(); ghost = null; }
        },
        solveForTest: function () {
          var chain = Promise.resolve();
          (config.items || []).forEach(function (item) {
            chain = chain.then(function () {
              if (destroyed) { return; }
              var target = (config.targets || []).filter(function (t) {
                return (t.accepts || []).indexOf(item.id) !== -1;
              })[0];
              if (!target) { return; }
              var node = tray.querySelector('[data-item="' + item.id + '"]');
              var zone = targetsRow.querySelector('[data-target="' + target.id + '"]');
              if (node) { node.click(); }
              if (zone) { zone.click(); }
              return ui.wait(20);
            });
          });
          return chain;
        }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
