/**
 * gridRun.js – Bobby läuft ein Programm aus Blöcken.
 *
 * Der Interpreter (`runProgram`) ist reine Rechenlogik und läuft auch unter
 * Node. Die Oberfläche darunter baut nur Bretter und Blöcke.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  var DIRS = { E: [1, 0], S: [0, 1], W: [-1, 0], N: [0, -1] };
  var TURNS = ['E', 'S', 'W', 'N'];
  var MAX_STEPS = 200;

  function cellKey(x, y) { return x + ',' + y; }

  function runProgram(config, blocks) {
    var w = config.grid.w;
    var h = config.grid.h;
    var walls = {};
    var stars = {};
    (config.walls || []).forEach(function (p) { walls[cellKey(p[0], p[1])] = true; });
    (config.stars || []).forEach(function (p) { stars[cellKey(p[0], p[1])] = true; });

    var state = { x: config.start.x, y: config.start.y, dir: config.start.dir || 'E' };
    var steps = [];
    var collected = [];
    var executed = 0;
    var reason = null;

    function blocked(x, y) {
      return x < 0 || y < 0 || x >= w || y >= h || !!walls[cellKey(x, y)];
    }

    function ahead() {
      var d = DIRS[state.dir];
      return { x: state.x + d[0], y: state.y + d[1] };
    }

    function move(distance) {
      var d = DIRS[state.dir];
      var nx = state.x + d[0] * distance;
      var ny = state.y + d[1] * distance;
      if (distance === 2) {
        if (blocked(state.x + d[0], state.y + d[1])) { return false; }
      }
      if (blocked(nx, ny)) { return false; }
      state.x = nx;
      state.y = ny;
      return true;
    }

    function record(action) {
      steps.push({ action: action, x: state.x, y: state.y, dir: state.dir });
    }

    function goalReached() {
      return state.x === config.goal.x && state.y === config.goal.y &&
        collected.length >= (config.requiredStars || 0);
    }

    function runList(list) {
      for (var i = 0; i < list.length; i++) {
        var block = list[i];
        executed += 1;
        if (executed > MAX_STEPS) { reason = 'cap'; return false; }

        if (block.type === 'forward' || block.type === 'back') {
          if (!move(block.type === 'back' ? -1 : 1)) {
            reason = 'wall';
            record('bump');
            return false;
          }
          record(block.type);
        } else if (block.type === 'left' || block.type === 'right') {
          var index = TURNS.indexOf(state.dir);
          state.dir = TURNS[(index + (block.type === 'left' ? 3 : 1)) % 4];
          record(block.type);
        } else if (block.type === 'jump') {
          if (!move(2)) { reason = 'wall'; record('bump'); return false; }
          record('jump');
        } else if (block.type === 'collect') {
          var k = cellKey(state.x, state.y);
          if (stars[k] && collected.indexOf(k) === -1) { collected.push(k); }
          record('collect');
        } else if (block.type === 'repeat') {
          var times = Math.max(0, Math.min(4, Number(block.times) || 0));
          for (var r = 0; r < times; r++) {
            var repeated = runList(block.body || []);
            if (repeated !== true) { return repeated; }
          }
        } else if (block.type === 'if') {
          var condition = block.condition || 'wall';
          var isTrue = condition === 'wall'
            ? blocked(ahead().x, ahead().y)
            : !!stars[cellKey(state.x, state.y)];
          if (isTrue) {
            var inside = runList(block.body || []);
            if (inside !== true) { return inside; }
          }
        }

        // Am Ziel ist Schluss: weitere Blöcke dürfen den Erfolg nicht kaputt machen.
        if (goalReached()) { reason = 'goal'; return 'stop'; }
      }
      return true;
    }

    var finished = runList(blocks || []);
    var onGoal = goalReached();

    if (!reason) {
      reason = onGoal ? 'goal' : 'stars';
    }

    return {
      ok: finished !== false && reason === 'goal',
      reason: reason,
      states: steps.map(function (s) { return { x: s.x, y: s.y, dir: s.dir }; }),
      steps: steps,
      collected: collected,
      final: { x: state.x, y: state.y, dir: state.dir }
    };
  }

  var BLOCK_LABELS_DE = {
    forward: 'Vorwärts', back: 'Rückwärts', left: 'Links drehen',
    right: 'Rechts drehen', jump: 'Springen', repeat: 'Wiederholen',
    if: 'Wenn Wand', collect: 'Stern sammeln'
  };

  var BLOCK_LABELS_EN = {
    forward: 'Forward', back: 'Back', left: 'Turn left',
    right: 'Turn right', jump: 'Jump', repeat: 'Repeat',
    if: 'If wall', collect: 'Collect star'
  };

  function blockLabel(type) {
    return NS.i18n.t(BLOCK_LABELS_EN[type] || type, BLOCK_LABELS_DE[type] || type);
  }

  engines.gridRun = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var destroyed = false;
      var done = false;
      var program = [];
      var pending = null;
      var running = false;
      var token = 0;
      var resolveRun = null;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || NS.i18n.t('Get Bobby to the star!', 'Bringe Bobby zum Stern!') });
      var layout = ui.el('div', { className: 'grid-layout' });
      var board = ui.el('div', {
        className: 'grid-board',
        style: {
          gridTemplateColumns: 'repeat(' + config.grid.w + ', 1fr)',
          gridTemplateRows: 'repeat(' + config.grid.h + ', 1fr)'
        }
      });
      var panel = ui.el('div', { className: 'program-panel' });
      var palette = ui.el('div', { className: 'palette' });
      var programEl = ui.el('div', { className: 'program' });
      var controls = ui.el('div', { className: 'run-controls' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });

      panel.appendChild(palette);
      panel.appendChild(programEl);
      panel.appendChild(controls);
      panel.appendChild(feedback);
      layout.appendChild(board);
      layout.appendChild(panel);
      wrap.appendChild(prompt);
      wrap.appendChild(layout);
      container.appendChild(wrap);

      buildBoard();
      buildPalette();
      if (config.prefill && config.prefill.length) {
        program = JSON.parse(JSON.stringify(config.prefill));
      }
      renderProgram();
      api.speak(config.speech || config.prompt || NS.i18n.t('Get Bobby to the star.', 'Bringe Bobby zum Stern.'));

      function buildBoard() {
        for (var y = 0; y < config.grid.h; y++) {
          for (var x = 0; x < config.grid.w; x++) {
            var classes = 'tile';
            if ((config.walls || []).some(function (p) { return p[0] === x && p[1] === y; })) { classes += ' wall'; }
            if (config.goal.x === x && config.goal.y === y) { classes += ' goal'; }
            var tile = ui.el('div', { className: classes, data: { x: x, y: y } });
            if (config.goal.x === x && config.goal.y === y) {
              tile.appendChild(ui.el('span', { className: 'goal-mark', text: '★' }));
            }
            board.appendChild(tile);
          }
        }

        (config.stars || []).forEach(function (p) {
          var star = ui.el('div', {
            className: 'star-token',
            data: { star: cellKey(p[0], p[1]) },
            style: {
              left: (p[0] * 100 / config.grid.w) + '%',
              top: (p[1] * 100 / config.grid.h) + '%',
              width: (100 / config.grid.w) + '%',
              height: (100 / config.grid.h) + '%'
            }
          }, [ui.art('stern', 34)]);
          board.appendChild(star);
        });

        board.appendChild(bobbyNode());
      }

      function bobbyNode() {
        var node = ui.el('div', {
          className: 'bobby-token',
          style: {
            left: (config.start.x * 100 / config.grid.w) + '%',
            top: (config.start.y * 100 / config.grid.h) + '%',
            width: (100 / config.grid.w) + '%',
            height: (100 / config.grid.h) + '%'
          }
        }, [ui.art('bobby', 56)]);
        return node;
      }

      function buildPalette() {
        (config.palette || ['forward', 'left', 'right', 'repeat']).forEach(function (type) {
          var button = ui.el('button', {
            className: 'block-btn',
            attrs: { type: 'button' },
            data: { block: type }
          }, [ui.art('block-' + type, 26), ui.el('span', { text: blockLabel(type) })]);
          button.addEventListener('click', function () { addBlock(type); });
          palette.appendChild(button);
        });
      }

      function addBlock(type) {
        if (done) { return; }
        api.sfx('click');
        if ((program.length >= (config.maxBlocks || 8)) && !pending) {
          feedback.textContent = NS.i18n.t('We do not need more blocks.', 'Mehr Blöcke brauchen wir nicht.');
          feedback.className = 'feedback-line is-soft';
          return;
        }
        var block;
        if (type === 'repeat') {
          block = { type: 'repeat', times: 3, body: [] };
        } else if (type === 'if') {
          block = { type: 'if', condition: 'wall', body: [] };
        } else {
          block = { type: type };
        }

        if (pending && pending.body && pending.body.length === 0) {
          pending.body.push(block);
          if (type !== 'repeat' && type !== 'if') { pending = null; }
          else { pending = block; }
        } else {
          program.push(block);
          pending = (type === 'repeat' || type === 'if') ? block : null;
        }
        renderProgram();
      }

      function removeBlock(block) {
        var index = program.indexOf(block);
        if (index !== -1) { program.splice(index, 1); renderProgram(); return; }
        program.forEach(function (item) {
          if (item.body) { removeFrom(item.body, block); }
        });
        renderProgram();
      }

      function removeFrom(list, block) {
        var index = list.indexOf(block);
        if (index !== -1) { list.splice(index, 1); return true; }
        for (var i = 0; i < list.length; i++) {
          if (list[i].body && removeFrom(list[i].body, block)) { return true; }
        }
        return false;
      }

      function renderProgram() {
        ui.clear(programEl);
        if (!program.length) {
          programEl.appendChild(ui.el('div', { className: 'program-empty', text: NS.i18n.t('No blocks yet. Tap a block below.', 'Noch keine Blöcke. Tippe unten auf einen Block.') }));
        } else {
          program.forEach(function (block) { programEl.appendChild(renderBlock(block)); });
        }
        ui.clear(controls);
        controls.appendChild(ui.button(NS.i18n.t('▶ Go', '▶ Los'), { className: 'lemon', onClick: play }));
        controls.appendChild(ui.button(NS.i18n.t('↺ Clear', '↺ Neu'), { variant: 'ghost', onClick: function () {
          program = []; pending = null; renderProgram(); resetBobby(); feedback.textContent = '';
        } }));
      }

      function renderBlock(block) {
        var label = blockLabel(block.type);
        if (block.type === 'repeat') { label = NS.i18n.t('Repeat ×', 'Wiederholen ×') + block.times; }
        if (block.type === 'if') { label = NS.i18n.t('If wall', 'Wenn Wand'); }

        var row = ui.el('div', { className: 'block-row' }, [
          ui.el('span', { className: 'block ' + block.type }, [
            ui.art('block-' + block.type, 24),
            ui.el('span', { text: label })
          ])
        ]);
        var remove = ui.el('button', {
          className: 'block-remove',
          attrs: { type: 'button', 'aria-label': NS.i18n.t('Remove block', 'Block entfernen') },
          text: '✕'
        });
        remove.addEventListener('click', function () { removeBlock(block); });
        row.appendChild(remove);

        if (block.body) {
          var nested = ui.el('div', { className: 'block-nested' });
          if (!block.body.length) {
            nested.appendChild(ui.el('div', { className: 'program-empty', text: NS.i18n.t('The next block goes here.', 'Nächster Block kommt hierhin.') }));
          } else {
            block.body.forEach(function (child) { nested.appendChild(renderBlock(child)); });
          }
          return ui.el('div', {}, [row, nested]);
        }
        return row;
      }

      function resetBobby() {
        var node = board.querySelector('.bobby-token');
        if (!node) { return; }
        node.style.left = (config.start.x * 100 / config.grid.w) + '%';
        node.style.top = (config.start.y * 100 / config.grid.h) + '%';
        node.style.transform = 'rotate(' + rotation(config.start.dir || 'E') + 'deg)';
        (config.stars || []).forEach(function (p) {
          var star = board.querySelector('[data-star="' + cellKey(p[0], p[1]) + '"]');
          if (star) { star.style.display = ''; }
        });
      }

      function rotation(dir) {
        return { E: 0, S: 90, W: 180, N: -90 }[dir] || 0;
      }

      function applyStep(step) {
        var node = board.querySelector('.bobby-token');
        if (!node) { return; }
        node.style.left = (step.x * 100 / config.grid.w) + '%';
        node.style.top = (step.y * 100 / config.grid.h) + '%';
        node.style.transform = 'rotate(' + rotation(step.dir) + 'deg)';
        if (step.action === 'bump') {
          node.classList.add('is-bump');
          root.setTimeout(function () { node.classList.remove('is-bump'); }, 320);
        }
        if (step.action === 'collect') {
          var star = board.querySelector('[data-star="' + cellKey(step.x, step.y) + '"]');
          if (star) { star.style.display = 'none'; }
        }
      }

      function play() {
        if (running || done) { return; }
        if (!program.length) {
          feedback.textContent = 'Lege zuerst einen Block hin.';
          feedback.className = 'feedback-line is-soft';
          return;
        }
        running = true;
        var myToken = ++token;
        resetBobby();
        var result = runProgram(config, program);
        var index = 0;
        feedback.textContent = '';
        feedback.className = 'feedback-line';

        function next() {
          if (destroyed || myToken !== token) { return; }
          if (index >= result.steps.length) { conclude(result); return; }
          applyStep(result.steps[index]);
          index += 1;
          ui.wait(340).then(next);
        }
        next();
      }

      function conclude(result) {
        running = false;
        if (resolveRun) { var resolve = resolveRun; resolveRun = null; resolve(result); }
        if (result.ok) {
          done = true;
          api.sfx('star');
          feedback.textContent = NS.i18n.t('Bobby reached the star!', 'Bobby ist am Ziel!');
          feedback.className = 'feedback-line is-good';
          ui.confetti();
          api.complete({ correct: 1, attempts: 0, stars: 1 });
        } else {
          api.sfx('bump');
          feedback.textContent = result.reason === 'cap'
            ? NS.i18n.t('That is quite a long journey!', 'Das ist eine ganz schöne lange Reise!')
            : (result.reason === 'wall'
              ? NS.i18n.t('There is a wall. Change the path!', 'Da ist eine Wand. Ändere den Weg!')
              : NS.i18n.t('Not at the star yet. Try again!', 'Noch nicht am Ziel. Gleich nochmal!'));
          feedback.className = 'feedback-line is-soft';
        }
      }

      return {
        destroy: function () {
          destroyed = true;
          token += 1;
          running = false;
          if (resolveRun) { resolveRun(null); resolveRun = null; }
        },
        solveForTest: function () {
          program = JSON.parse(JSON.stringify(config.selftestProgram || []));
          pending = null;
          renderProgram();
          return new Promise(function (resolve) {
            resolveRun = resolve;
            play();
          });
        }
      };
    }
  };

  NS.grid = { runProgram: runProgram, MAX_STEPS: MAX_STEPS, DIRS: DIRS };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runProgram: runProgram, MAX_STEPS: MAX_STEPS, engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
