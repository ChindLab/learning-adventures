/**
 * sequence.js – Anweisungen in die richtige Reihenfolge bringen.
 *
 * layout 'order': alle Karten liegen da, zwei Klicks tauschen sie.
 * layout 'slots': leere Plätze, Karte anklicken, Platz anklicken.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.sequence = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;
      var destroyed = false;
      var done = false;
      var wrong = 0;
      var cards = (config.cards || []).slice();
      var solution = config.solution || cards.map(function (card) { return card.id; });
      var layout = config.layout || 'order';

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var board = ui.el('div');
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      var check = ui.button(NS.i18n.t('Check', 'Prüfen'), { onClick: function () { checkHandler(); } });
      var checkHandler = verify;
      wrap.appendChild(prompt);
      wrap.appendChild(board);
      wrap.appendChild(feedback);
      wrap.appendChild(check);
      container.appendChild(wrap);
      api.speak(config.speech || config.prompt || 'Bringe die Bilder in die richtige Reihenfolge.');

      var order = [];
      var selectedIndex = null;
      var locked = {};

      if (layout === 'slots') { buildSlots(); } else { buildOrder(); }

      /* ---------- freie Reihenfolge ---------- */

      function buildOrder() {
        order = ui.shuffle(cards, config.seed || 5);
        renderOrder();
      }

      function renderOrder() {
        ui.clear(board);
        var row = ui.el('div', { className: 'seq-row' });
        order.forEach(function (card, index) {
          var node = ui.el('button', {
            className: 'seq-card' + (selectedIndex === index ? ' is-selected' : '') +
              (locked[index] ? ' is-locked' : ''),
            attrs: { type: 'button' },
            data: { index: index, id: card.id }
          }, [ui.art(card.icon || card.art || 'stern', 56), ui.el('span', { text: card.label || '' })]);
          node.addEventListener('click', function () {
            if (done || locked[index]) { return; }
            api.sfx('click');
            if (selectedIndex === null) { selectedIndex = index; renderOrder(); return; }
            var from = selectedIndex;
            selectedIndex = null;
            var tmp = order[from]; order[from] = order[index]; order[index] = tmp;
            renderOrder();
          });
          row.appendChild(node);
        });
        board.appendChild(row);
      }

      function verify() {
        if (done) { return; }
        var allCorrect = true;
        for (var i = 0; i < solution.length; i++) {
          if (order[i] && order[i].id === solution[i]) { locked[i] = true; }
          else { allCorrect = false; }
        }
        renderOrder();
        if (allCorrect) { finish(); }
        else {
          wrong += 1;
          api.sfx('wrong');
          feedback.textContent = NS.i18n.t('Almost! The green cards are already right.', 'Fast! Die grünen Karten stimmen schon.');
          feedback.className = 'feedback-line is-soft';
        }
      }

      /* ---------- Plätze ---------- */

      var placed = [];
      var tray = [];

      function buildSlots() {
        placed = solution.map(function () { return null; });
        tray = ui.shuffle(cards, config.seed || 9);
        renderSlots();
      }

      var activeSlot = -1;

      function renderSlots() {
        ui.clear(board);
        var slotsEl = ui.el('div', { className: 'seq-row' });
        placed.forEach(function (card, index) {
          var node = ui.el('button', {
            className: 'seq-slot' + (card ? ' is-filled' : '') + (activeSlot === index ? ' is-selected' : ''),
            attrs: { type: 'button', 'aria-label': NS.i18n.t('Slot ', 'Platz ') + (index + 1) },
            data: { slot: index }
          }, card ? [ui.art(card.icon || card.art || 'stern', 44), ui.el('span', { text: card.label || '' })] : [ui.el('span', { text: String(index + 1) })]);
          node.addEventListener('click', function () {
            if (done) { return; }
            activeSlot = index;
            renderSlots();
          });
          slotsEl.appendChild(node);
        });

        var trayEl = ui.el('div', { className: 'seq-row' });
        tray.forEach(function (card) {
          var node = ui.el('button', {
            className: 'seq-card',
            attrs: { type: 'button' },
            data: { id: card.id }
          }, [ui.art(card.icon || card.art || 'stern', 48), ui.el('span', { text: card.label || '' })]);
          node.addEventListener('click', function () {
            if (done) { return; }
            if (activeSlot < 0) {
              feedback.textContent = NS.i18n.t('Tap a slot first.', 'Tippe zuerst auf einen Platz.');
              feedback.className = 'feedback-line';
              return;
            }
            var existing = placed[activeSlot];
            placed[activeSlot] = card;
            tray = tray.filter(function (c) { return c.id !== card.id; });
            if (existing) { tray.push(existing); }
            activeSlot = -1;
            api.sfx('pop');
            renderSlots();
          });
          trayEl.appendChild(node);
        });

        board.appendChild(slotsEl);
        board.appendChild(trayEl);
      }

      function verifySlots() {
        if (done) { return; }
        for (var i = 0; i < placed.length; i++) {
          if (!placed[i] || placed[i].id !== solution[i]) {
            wrong += 1;
            api.sfx('wrong');
            feedback.textContent = NS.i18n.t('Not quite. Try again.', 'Noch nicht ganz. Probier es nochmal.');
            feedback.className = 'feedback-line is-soft';
            return;
          }
        }
        finish();
      }

      if (layout === 'slots') { checkHandler = verifySlots; }

      function finish() {
        if (done) { return; }
        done = true;
        api.sfx('star');
        feedback.textContent = bobby.correct[0];
        feedback.className = 'feedback-line is-good';
        ui.wait(400).then(function () {
          api.complete({ correct: solution.length, attempts: wrong, stars: 1 });
        });
      }

      function solveOrder() {
        for (var target = 0; target < solution.length; target++) {
          if (!order[target] || order[target].id === solution[target]) { continue; }
          var from = -1;
          for (var j = target + 1; j < order.length; j++) {
            if (order[j].id === solution[target]) { from = j; break; }
          }
          if (from === -1) { continue; }
          var nodes = board.querySelectorAll('.seq-card');
          if (nodes[target]) { nodes[target].click(); }
          if (nodes[from]) { nodes[from].click(); }
        }
        check.click();
        return ui.wait(500);
      }

      function solveSlots() {
        solution.forEach(function (id, index) {
          var slot = board.querySelector('[data-slot="' + index + '"]');
          var card = board.querySelector('[data-id="' + id + '"]');
          if (slot) { slot.click(); }
          if (card) { card.click(); }
        });
        check.click();
        return ui.wait(500);
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () { return layout === 'slots' ? solveSlots() : solveOrder(); }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
