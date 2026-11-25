/**
 * target.js – Ziele anklicken (Maus üben) und einer Linie folgen.
 *
 * `mode: 'pop'`   – Sterne/Tiere erscheinen, ein Klick lässt sie platzen.
 * `mode: 'trace'` – mit dem Zeiger an einer Linie entlangfahren.
 *
 * Größen: xl 160, l 120, m 95, s 70 Pixel. Kein Zeitdruck, keine Strafe.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  var SIZES = { xl: 160, l: 120, m: 95, s: 70 };

  engines.target = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var destroyed = false;
      var done = false;
      var hits = 0;
      var raf = null;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || '' });
      var board = ui.el('div', { className: 'target-board' });
      var progress = ui.el('div', { className: 'trace-progress' });
      wrap.appendChild(prompt);
      wrap.appendChild(board);
      wrap.appendChild(progress);
      container.appendChild(wrap);
      api.speak(config.speech || config.prompt || '');

      if (config.mode === 'trace') { setupTrace(); } else { setupPop(); }

      function finish() {
        if (done) { return; }
        done = true;
        cancel();
        api.sfx('star');
        api.complete({ correct: hits, attempts: 0, stars: 1 });
      }

      function cancel() {
        if (raf) { root.cancelAnimationFrame(raf); raf = null; }
      }

      function setupPop() {
        var count = config.count || 6;
        var size = SIZES[config.size || 'xl'];
        var artName = config.art || 'stern';
        var current = null;
        var phase = Math.random() * Math.PI * 2;
        var origin = { x: 30, y: 30 };

        function spawn() {
          if (destroyed || done) { return; }
          if (current) { current.remove(); }
          var dot = ui.el('button', {
            className: 'target-dot',
            attrs: {
              type: 'button',
              'aria-label': NS.i18n.t('Tap the target', 'Ziel antippen')
            },
            style: {
              width: size + 'px',
              height: size + 'px',
              left: origin.x + '%',
              top: origin.y + '%'
            }
          }, [ui.art(artName, Math.round(size * 0.86))]);

          var handler = function () {
            if (done) { return; }
            hits += 1;
            api.sfx('pop');
            dot.remove();
            current = null;
            if (hits >= count) { finish(); } else { place(); spawn(); }
          };

          if (config.dbl) {
            dot.addEventListener('dblclick', handler);
            dot.addEventListener('click', function () { api.sfx('click'); });
          } else {
            dot.addEventListener('click', handler);
          }

          board.appendChild(dot);
          current = dot;

          if (config.moving) { startDrift(dot, origin, phase); }
        }

        function place() {
          origin = {
            x: 4 + Math.random() * 62,
            y: 4 + Math.random() * 58
          };
          phase = Math.random() * Math.PI * 2;
        }

        function startDrift(dot, base, startPhase) {
          var t = startPhase;
          function tick() {
            if (destroyed || done || !dot.isConnected) { return; }
            t += 0.02;
            dot.style.left = (base.x + Math.sin(t) * 14) + '%';
            dot.style.top = (base.y + Math.cos(t * 0.8) * 10) + '%';
            raf = root.requestAnimationFrame(tick);
          }
          tick();
        }

        place();
        spawn();

        return {
          solve: function () {
            var chain = Promise.resolve();
            for (var i = 0; i < count; i++) {
              chain = chain.then(function () {
                if (done || destroyed) { return; }
                var dot = board.querySelector('.target-dot');
                if (dot) {
                  if (config.dbl) {
                    dot.dispatchEvent(new root.MouseEvent('dblclick', { bubbles: true }));
                  } else {
                    dot.click();
                  }
                }
                return ui.wait(30);
              });
            }
            return chain;
          }
        };
      }

      function setupTrace() {
        var ns = 'http://www.w3.org/2000/svg';
        var svg = root.document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('class', 'trace-svg');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');
        var pathData = config.path || 'M 10 80 C 20 20, 45 90, 60 45 S 82 30, 90 18';
        var line = root.document.createElementNS(ns, 'path');
        line.setAttribute('d', pathData);
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', '#8FB6D9');
        line.setAttribute('stroke-width', '8');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('stroke-dasharray', '3 7');
        svg.appendChild(line);

        var marker = root.document.createElementNS(ns, 'circle');
        marker.setAttribute('r', '4');
        marker.setAttribute('fill', '#5B7CFA');
        marker.setAttribute('cx', '10');
        marker.setAttribute('cy', '80');
        svg.appendChild(marker);

        board.appendChild(svg);
        board.setAttribute('tabindex', '0');
        board.setAttribute('role', 'application');
        board.setAttribute('aria-label', NS.i18n.t('Follow the line with the arrow keys', 'Linie mit den Pfeiltasten nachfahren'));
        var bobbyDot = ui.el('div', { className: 'target-dot', style: { left: '4%', top: '70%', width: '70px', height: '70px' } }, [ui.art('bobby', 64)]);
        board.appendChild(bobbyDot);

        var total = 0;
        var best = 0;
        var samples = [];
        try {
          total = line.getTotalLength();
          for (var i = 0; i <= 80; i++) {
            samples.push(line.getPointAtLength((total * i) / 80));
          }
        } catch (e) {
          total = 0;
        }

        function toLocal(event) {
          var rect = board.getBoundingClientRect();
          return {
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100
          };
        }

        function move(event) {
          if (done || destroyed || !samples.length) { return; }
          var point = toLocal(event);
          var nearest = 0;
          var bestDistance = Infinity;
          samples.forEach(function (sample, index) {
            var dx = sample.x - point.x;
            var dy = sample.y - point.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bestDistance) { bestDistance = distance; nearest = index / 80; }
          });
          if (bestDistance < 7 && nearest > best) { best = nearest; }
          progress.textContent = Math.round(best * 100) + ' %';
          marker.setAttribute('cx', samples[Math.round(best * 80)].x);
          marker.setAttribute('cy', samples[Math.round(best * 80)].y);
          bobbyDot.style.left = (point.x - 6) + '%';
          bobbyDot.style.top = (point.y - 6) + '%';
          if (best >= 0.98) { finish(); }
        }

        board.addEventListener('pointermove', move);
        if (root.PointerEvent) { board.addEventListener('pointerdown', move); }

        board.addEventListener('keydown', function (event) {
          if (done || destroyed || !samples.length) { return; }
          if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') { return; }
          event.preventDefault();
          best = Math.max(0, Math.min(1, best + (event.key === 'ArrowRight' ? 0.05 : -0.05)));
          progress.textContent = Math.round(best * 100) + ' %';
          marker.setAttribute('cx', samples[Math.round(best * 80)].x);
          marker.setAttribute('cy', samples[Math.round(best * 80)].y);
          if (best >= 0.98) { finish(); }
        });
      }

      // Die beiden Lösungsfunktionen werden hier gebunden, damit `mount`
      // unabhängig von der Variante einen einheitlichen Vertrag hat.
      function popSolve() {
        var chain = Promise.resolve();
        var count = config.count || 6;
        for (var i = 0; i < count; i++) {
          chain = chain.then(function () {
            if (done || destroyed) { return; }
            var dot = board.querySelector('.target-dot');
            if (dot) {
              if (config.dbl) {
                dot.dispatchEvent(new root.MouseEvent('dblclick', { bubbles: true }));
              } else {
                dot.click();
              }
            }
            return ui.wait(20);
          });
        }
        return chain;
      }

      function traceSolve() {
        for (var i = 0; i < 21; i++) {
          board.dispatchEvent(new root.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        }
        return Promise.resolve();
      }

      return {
        destroy: function () { destroyed = true; cancel(); },
        solveForTest: function () {
          return config.mode === 'trace' ? traceSolve() : popSolve();
        }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
