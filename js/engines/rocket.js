/**
 * rocket.js – zwei Typing-Spiele mit derselben Mechanik.
 *
 * 1. Sternen-Rakete: einzelne Buchstaben fallen, eine Taste pro Buchstabe.
 * 2. Wörter-Rakete: Buchstaben-Gruppen (2–3 Zeichen) fallen. Man tippt sie
 *    nacheinander; erst wenn die Gruppe komplett ist, startet die Rakete.
 *    Vorher wählt man Level (Leicht/Mittel/Schwer) und Tempo.
 *
 * Kein Verlieren: Verpasste Gruppen verschwinden, es gibt keine Leben und
 * keinen Countdown. Bei reduzierter Bewegung stehen die Gruppen still.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  var DEFAULT_LANES = 5;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  engines.rocket = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var bobby = NS.content.bobby;

      var levels = (config.levels && config.levels.length) ? config.levels : null;
      var chooseLevel = !!config.chooseLevel && !!levels;
      var settings = NS.store ? NS.store.state().settings : {};

      var destroyed = false;
      var done = false;
      var started = !chooseLevel;
      var hits = 0;
      var wrong = 0;
      var count = clamp(Number(config.count) || 12, 1, 30);
      var levelIndex = chooseLevel ? clamp((Number(settings.typingLevel) || 1) - 1, 0, levels.length - 1) : 0;
      var speedFactor = 1;
      if (chooseLevel) {
        var storedFactor = Number(settings.typingSpeed);
        speedFactor = (storedFactor === 0.75 || storedFactor === 1.35) ? storedFactor : 1;
      }

      var speed = Number(config.speed) || 6.5;
      var laneCount = Number(config.lanes) || DEFAULT_LANES;
      var pool = (config.pool && config.pool.length ? config.pool : ['a', 's', 'd', 'f', 'j', 'k', 'l'])
        .map(function (entry) { return String(entry).toLowerCase(); });

      var reduce = !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
      if (reduce) { speed = 0; }

      var letters = [];
      var raf = null;
      var lastTime = 0;
      var spawnTimer = null;

      var bobbyLayer = root.document.getElementById('bobby-layer');
      if (bobbyLayer) { bobbyLayer.classList.add('is-hidden'); }

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || NS.i18n.t('Hit the letters with the rocket.', 'Triff die Buchstaben mit der Rakete.') });
      var progress = ui.el('div', { className: 'key-progress', attrs: { 'aria-live': 'polite' } });
      var progressText = ui.el('span', { className: 'key-progress-text', text: '0 / ' + count });
      var dotsRow = ui.el('div', { className: 'key-progress-dots' });
      for (var dot = 0; dot < count; dot++) {
        dotsRow.appendChild(ui.el('span', { className: 'key-progress-dot' }));
      }
      progress.appendChild(progressText);
      progress.appendChild(dotsRow);

      var board = ui.el('div', { className: 'rocket-board' });
      for (var starIndex = 0; starIndex < 18; starIndex++) {
        board.appendChild(ui.el('span', {
          className: 'rocket-star',
          attrs: { 'aria-hidden': 'true' },
          style: { left: (Math.random() * 96) + '%', top: (Math.random() * 88) + '%' }
        }));
      }

      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });
      wrap.appendChild(prompt);
      wrap.appendChild(progress);
      wrap.appendChild(board);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      api.speak(config.speech || config.prompt || NS.i18n.t('Hit the letters with the rocket.', 'Triff die Buchstaben mit der Rakete.'));
      root.document.addEventListener('keydown', onKeyDown);

      if (chooseLevel) {
        showSetup();
      } else {
        begin();
      }

      function showSetup() {
        var overlay = ui.el('div', { className: 'game-setup' });
        overlay.appendChild(ui.el('h3', { text: NS.i18n.t('Level and tempo', 'Level und Tempo') }));

        var levelRow = ui.el('div', { className: 'setup-row' });
        levels.forEach(function (level, index) {
          var display = NS.i18n.t({ Leicht: 'Easy', Mittel: 'Medium', Schwer: 'Hard' }[level.label] || level.label, level.label);
          var button = ui.el('button', {
            className: 'setup-btn' + (index === levelIndex ? ' is-selected' : ''),
            attrs: { type: 'button' },
            text: String(index + 1) + ' · ' + display
          });
          button.addEventListener('click', function () {
            levelIndex = index;
            Array.from(levelRow.children).forEach(function (child) { child.classList.remove('is-selected'); });
            button.classList.add('is-selected');
            api.sfx('click');
          });
          levelRow.appendChild(button);
        });
        overlay.appendChild(levelRow);

        var speeds = [
          { label: 'Langsam', display: NS.i18n.t('Slow', 'Langsam'), factor: 0.75 },
          { label: 'Normal', display: NS.i18n.t('Normal', 'Normal'), factor: 1 },
          { label: 'Schnell', display: NS.i18n.t('Fast', 'Schnell'), factor: 1.35 }
        ];
        var speedRow = ui.el('div', { className: 'setup-row' });
        speeds.forEach(function (entry) {
          var button = ui.el('button', {
            className: 'setup-btn' + (entry.factor === speedFactor ? ' is-selected' : ''),
            attrs: { type: 'button' },
            text: entry.display
          });
          button.addEventListener('click', function () {
            speedFactor = entry.factor;
            Array.from(speedRow.children).forEach(function (child) { child.classList.remove('is-selected'); });
            button.classList.add('is-selected');
            api.sfx('click');
          });
          speedRow.appendChild(button);
        });
        overlay.appendChild(speedRow);

        overlay.appendChild(ui.button(NS.i18n.t('Go', 'Los'), { className: 'lemon', onClick: function () {
          if (started) { return; }
          if (NS.store) {
            NS.store.setSetting('typingLevel', levelIndex + 1);
            NS.store.setSetting('typingSpeed', speedFactor);
          }
          overlay.remove();
          begin();
        } }));

        board.appendChild(overlay);
      }

      function begin() {
        started = true;
        if (levels) {
          var level = levels[levelIndex];
          speed = (Number(level.speed) || 5) * speedFactor;
          laneCount = Number(level.lanes) || DEFAULT_LANES;
          pool = (level.pool || pool).map(function (entry) { return String(entry).toLowerCase(); });
          if (reduce) { speed = 0; }
        }
        spawn();
        spawn();
        spawnTimer = root.setInterval(spawn, 1300);
        raf = root.requestAnimationFrame(frame);
      }

      function spawn() {
        if (destroyed || done || !started) { return null; }
        var active = letters.filter(function (letter) { return !letter.shot; });
        if (active.length >= 3) { return null; }

        var used = active.map(function (letter) { return letter.lane; });
        var free = [];
        for (var lane = 0; lane < laneCount; lane++) {
          if (used.indexOf(lane) === -1) { free.push(lane); }
        }
        if (!free.length) { return null; }

        var chosenLane = free[Math.floor(Math.random() * free.length)];
        var usedGroups = active.map(function (letter) { return letter.group; });
        var choices = pool.filter(function (group) { return usedGroups.indexOf(group) === -1; });
        if (!choices.length) { choices = pool; }
        var group = choices[Math.floor(Math.random() * choices.length)];

        var spanNodes = [];
        String(group).toUpperCase().split('').forEach(function (character) {
          spanNodes.push(ui.el('span', { className: 'pod-letter', text: character }));
        });

        var element = ui.el('button', {
          className: 'falling-letter len-' + Math.min(3, String(group).length),
          attrs: { type: 'button', 'aria-label': NS.i18n.t('Letters ', 'Buchstaben ') + String(group).toUpperCase() },
          data: { group: group },
          style: { left: ((chosenLane * 100 / laneCount) + (100 / laneCount / 2)) + '%', top: '0%' }
        }, spanNodes);

        var letter = { group: String(group), index: 0, lane: chosenLane, y: 0, el: element, shot: false };
        element.addEventListener('click', function () {
          if (destroyed || done) { return; }
          if (letter.shot) { return; }
          // Klickhilfe: die ganze Gruppe auf einmal.
          while (letter.index < letter.group.length) {
            letter.index += 1;
            markTyped(letter);
          }
          fire(letter);
        });
        board.appendChild(element);
        letters.push(letter);
        return letter;
      }

      function markTyped(letter) {
        var spans = letter.el.querySelectorAll('.pod-letter');
        if (spans[letter.index - 1]) { spans[letter.index - 1].classList.add('is-typed'); }
      }

      function frame(timestamp) {
        if (destroyed || done) { return; }
        if (!lastTime) { lastTime = timestamp; }
        var delta = Math.min(0.08, (timestamp - lastTime) / 1000);
        lastTime = timestamp;

        if (!root.document.hidden && speed > 0) {
          letters.slice().forEach(function (letter) {
            if (letter.shot) { return; }
            letter.y += speed * delta;
            if (letter.y >= 86) { miss(letter); }
            else { letter.el.style.top = letter.y + '%'; }
          });
        }
        raf = root.requestAnimationFrame(frame);
      }

      function miss(letter) {
        if (letter.shot) { return; }
        letter.shot = true;
        letter.el.classList.add('is-miss');
        root.setTimeout(function () { letter.el.remove(); }, 400);
        letters = letters.filter(function (item) { return item !== letter; });
      }

      function burst(letter) {
        var effect = ui.el('div', {
          className: 'burst',
          attrs: { 'aria-hidden': 'true' },
          style: { left: ((letter.lane * 100 / laneCount) + (100 / laneCount / 2)) + '%', top: letter.y + '%' }
        });
        board.appendChild(effect);
        root.setTimeout(function () { effect.remove(); }, 700);
      }

      function fire(letter) {
        if (!letter || letter.shot || done || destroyed) { return; }
        letter.shot = true;
        api.sfx('click');

        var rocket = ui.el('div', {
          className: 'rocket-fly',
          attrs: { 'aria-hidden': 'true' },
          style: { left: ((letter.lane * 100 / laneCount) + (100 / laneCount / 2)) + '%' }
        }, [NS.icons.get('rakete', 44)]);
        board.appendChild(rocket);

        var height = board.clientHeight || 440;
        var distance = Math.max(20, height - letter.el.offsetTop - 40);
        void rocket.offsetWidth;
        rocket.style.transform = 'translate(-50%, -' + distance + 'px)';

        ui.wait(300).then(function () {
          if (destroyed) { return; }
          burst(letter);
          rocket.remove();
          if (letter.el.parentNode) { letter.el.remove(); }
          letters = letters.filter(function (item) { return item !== letter; });

          hits += 1;
          updateProgress();
          api.sfx('pop');

          if (hits >= count) { finish(); }
        });
      }

      function updateProgress() {
        progressText.textContent = hits + ' / ' + count;
        var dots = dotsRow.querySelectorAll('.key-progress-dot');
        if (dots[hits - 1]) { dots[hits - 1].classList.add('is-done'); }
      }

      function shoot(character) {
        if (destroyed || done || !started) { return; }
        var candidates = letters.filter(function (letter) {
          return !letter.shot && letter.group.charAt(letter.index) === character;
        });
        if (!candidates.length) {
          wrong += 1;
          api.sfx('bump');
          if (wrong % 3 === 0) { api.speak(bobby.wrong[0]); }
          return;
        }
        candidates.sort(function (a, b) { return b.y - a.y; });
        var letter = candidates[0];
        letter.index += 1;
        markTyped(letter);
        api.sfx('click');

        if (letter.index >= letter.group.length) { fire(letter); }
      }

      function onKeyDown(event) {
        if (destroyed || done || !started) { return; }
        if (event.metaKey || event.ctrlKey || event.altKey) { return; }
        if (event.key.length !== 1) { return; }
        event.preventDefault();
        shoot(event.key.toLowerCase());
      }

      function finish() {
        if (done) { return; }
        done = true;
        if (spawnTimer) { root.clearInterval(spawnTimer); spawnTimer = null; }
        if (raf) { root.cancelAnimationFrame(raf); raf = null; }
        api.sfx('star');
        feedback.textContent = NS.i18n.t('All letters hit!', 'Alle Buchstaben getroffen!');
        feedback.className = 'feedback-line is-good';
        ui.confetti();
        ui.wait(400).then(function () {
          api.complete({ correct: count, attempts: wrong, stars: 1 });
        });
      }

      return {
        destroy: function () {
          destroyed = true;
          if (raf) { root.cancelAnimationFrame(raf); raf = null; }
          if (spawnTimer) { root.clearInterval(spawnTimer); spawnTimer = null; }
          root.document.removeEventListener('keydown', onKeyDown);
          if (bobbyLayer) { bobbyLayer.classList.remove('is-hidden'); }
        },
        solveForTest: function () {
          if (!started) {
            var startButton = board.querySelector('.game-setup .btn');
            if (startButton) { startButton.click(); }
          }
          var steps = 0;
          function step() {
            if (destroyed || done || hits >= count || steps > 400) { return Promise.resolve(); }
            steps += 1;
            var letter = letters.filter(function (item) { return !item.shot; })[0];
            if (!letter) { letter = spawn(); }
            if (letter && !letter.shot) {
              shoot(letter.group.charAt(letter.index));
            }
            return ui.wait(60).then(step);
          }
          return step();
        }
      };
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
