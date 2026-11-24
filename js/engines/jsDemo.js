/**
 * jsDemo.js – Stage 8: JavaScript anschauen, nicht ausführen.
 *
 * Es gibt einen winzigen eigenen Interpreter für genau die Befehle, die im
 * Unterricht vorkommen. `eval` und `Function` werden nie benutzt.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  /* ---------- Tokenizer ---------- */

  function tokenize(code) {
    var tokens = [];
    var i = 0;
    var line = 1;
    while (i < code.length) {
      var ch = code.charAt(i);
      if (ch === '\n') { line += 1; i += 1; continue; }
      if (/\s/.test(ch)) { i += 1; continue; }

      if (ch === '"' || ch === "'") {
        var quote = ch;
        i += 1;
        var text = '';
        while (i < code.length && code.charAt(i) !== quote) {
          if (code.charAt(i) === '\\') { i += 1; }
          text += code.charAt(i);
          i += 1;
        }
        i += 1;
        tokens.push({ type: 'string', value: text, line: line });
        continue;
      }

      if (/[0-9]/.test(ch)) {
        var digits = '';
        while (i < code.length && /[0-9]/.test(code.charAt(i))) { digits += code.charAt(i); i += 1; }
        tokens.push({ type: 'number', value: Number(digits), line: line });
        continue;
      }

      if (/[A-Za-z_$]/.test(ch)) {
        var name = '';
        while (i < code.length && /[A-Za-z0-9_$]/.test(code.charAt(i))) { name += code.charAt(i); i += 1; }
        tokens.push({ type: 'ident', value: name, line: line });
        continue;
      }

      if ('(){};=+-'.indexOf(ch) !== -1) {
        tokens.push({ type: 'punct', value: ch, line: line });
        i += 1;
        continue;
      }

      throw new Error('unknown-character:' + ch);
    }
    return tokens;
  }

  /* ---------- Parser ---------- */

  function parse(code) {
    var tokens;
    try { tokens = tokenize(code); } catch (e) { return { ok: false, error: e.message }; }

    var p = 0;

    function peek() { return tokens[p]; }
    function next() { var t = tokens[p]; p += 1; return t; }
    function expect(value) {
      var t = peek();
      if (!t || t.value !== value) { throw new Error('expected:' + value); }
      return next();
    }
    function isIdent(value) {
      var t = peek();
      return t && t.type === 'ident' && t.value === value;
    }
    function isPunct(value) {
      var t = peek();
      return t && t.type === 'punct' && t.value === value;
    }

    function expression() {
      var left = term();
      while (isPunct('+') || isPunct('-')) {
        var operator = next().value;
        left = { type: 'binary', op: operator, left: left, right: term() };
      }
      return left;
    }

    function term() {
      var t = peek();
      if (!t) { throw new Error('unexpected-end'); }
      if (t.type === 'number') { next(); return { type: 'number', value: t.value }; }
      if (t.type === 'string') { next(); return { type: 'string', value: t.value }; }
      if (t.type === 'ident') { next(); return { type: 'ident', name: t.value }; }
      if (isPunct('(')) { next(); var inner = expression(); expect(')'); return inner; }
      throw new Error('unexpected-token:' + t.value);
    }

    function statement() {
      var t = peek();
      if (!t) { throw new Error('unexpected-end'); }

      if (isIdent('let')) {
        next();
        var name = next();
        if (!name || name.type !== 'ident') { throw new Error('expected-name'); }
        expect('=');
        var value = expression();
        expect(';');
        return { type: 'let', name: name.value, expr: value, line: t.line };
      }

      if (isIdent('alert')) {
        next();
        expect('(');
        var argument = expression();
        expect(')');
        expect(';');
        return { type: 'alert', arg: argument, line: t.line };
      }

      if (isIdent('function')) {
        next();
        var fnName = next();
        if (!fnName || fnName.type !== 'ident') { throw new Error('expected-function-name'); }
        expect('('); expect(')'); expect('{');
        var body = [];
        while (peek() && !isPunct('}')) { body.push(statement()); }
        expect('}');
        return { type: 'function', name: fnName.value, body: body, line: t.line };
      }

      if (t.type === 'ident') {
        next();
        expect('('); expect(')'); expect(';');
        return { type: 'call', name: t.value, line: t.line };
      }

      throw new Error('unknown-statement');
    }

    try {
      var program = [];
      while (p < tokens.length) { program.push(statement()); }
      return { ok: true, program: program };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  /* ---------- Ausführen ---------- */

  function execute(program, viz) {
    var vars = {};
    var funcs = {};
    var events = [];

    function evalExpr(node) {
      if (node.type === 'number') { return node.value; }
      if (node.type === 'string') { return node.value; }
      if (node.type === 'ident') {
        return Object.prototype.hasOwnProperty.call(vars, node.name) ? vars[node.name] : node.name;
      }
      if (node.type === 'binary') {
        var a = evalExpr(node.left);
        var b = evalExpr(node.right);
        return node.op === '+' ? Number(a) + Number(b) : Number(a) - Number(b);
      }
      return '';
    }

    function run(list) {
      list.forEach(function (node) {
        if (node.type === 'let') {
          var value = evalExpr(node.expr);
          vars[node.name] = value;
          events.push({ type: 'var', name: node.name, value: value, line: node.line });
          if (typeof value === 'number') {
            events.push({ type: 'numbers', count: value, visual: viz || 'stars', line: node.line });
          }
        } else if (node.type === 'alert') {
          events.push({ type: 'alert', value: String(evalExpr(node.arg)), line: node.line });
        } else if (node.type === 'function') {
          funcs[node.name] = node;
          events.push({ type: 'define', name: node.name, line: node.line });
        } else if (node.type === 'call') {
          events.push({ type: 'call', name: node.name, line: node.line });
          if (funcs[node.name]) { run(funcs[node.name].body); }
        }
      });
    }

    run(program);
    return { ok: true, events: events };
  }

  /* ---------- Oberfläche ---------- */

  engines.jsDemo = {
    mount: function (container, config, api) {
      var ui = NS.ui;
      var destroyed = false;
      var done = false;
      var parsed = parse(config.code || '');
      var events = parsed.ok ? execute(parsed.program, config.viz).events : [];
      var cursor = 0;

      var wrap = ui.el('div', { className: 'activity' });
      var prompt = ui.el('h2', { className: 'prompt', text: config.prompt || 'Schau, was der Computer macht.' });
      var layout = ui.el('div', { className: 'js-layout' });
      var codePanel = ui.el('div', { className: 'code-panel', attrs: { 'aria-label': 'Code' } });
      var right = ui.el('div');
      var viz = ui.el('div', { className: 'viz' });
      var detective = ui.el('p', { className: 'detective' });
      var controls = ui.el('div', { className: 'row' });
      var feedback = ui.el('p', { className: 'feedback-line', attrs: { 'aria-live': 'polite' } });

      var lines = (config.code || '').split('\n');
      var lineNodes = [];
      lines.forEach(function (text) {
        var line = ui.el('div', { className: 'code-line', text: text || ' ' });
        codePanel.appendChild(line);
        lineNodes.push(line);
      });

      right.appendChild(viz);
      right.appendChild(detective);
      layout.appendChild(codePanel);
      layout.appendChild(right);
      wrap.appendChild(prompt);
      wrap.appendChild(layout);
      wrap.appendChild(controls);
      wrap.appendChild(feedback);
      container.appendChild(wrap);

      controls.appendChild(ui.button(NS.i18n.t('▶ Schritt', '▶ Step'), { onClick: step }));
      controls.appendChild(ui.button(NS.i18n.t('▶▶ Alles', '▶▶ All'), { variant: 'lemon', onClick: playAll }));

      if (!parsed.ok) {
        viz.appendChild(ui.el('p', { text: NS.i18n.t('Diesen Code versteht Bobby nicht.', 'Bobby does not understand this code.') }));
        controls.hidden = true;
      }

      api.speak(config.speech || config.prompt || 'Schau, was der Computer macht.');
      renderViz();

      function highlight(lineNumber) {
        lineNodes.forEach(function (node, index) {
          node.classList.toggle('is-active', index + 1 === lineNumber);
        });
      }

      function applyEvent(event) {
        highlight(event.line);
        if (event.type === 'var') {
          viz.appendChild(ui.el('div', { className: 'var-box' }, [
            ui.el('small', { text: event.name }),
            ui.el('span', { text: String(event.value) })
          ]));
        } else if (event.type === 'numbers') {
          var row = ui.el('div', { className: 'row' });
          var artName = event.visual === 'apples' ? 'apfel' : 'stern';
          for (var i = 0; i < event.count && i < 12; i++) { row.appendChild(ui.art(artName, 42)); }
          viz.appendChild(row);
        } else if (event.type === 'alert') {
          viz.appendChild(ui.el('div', { className: 'alert-bubble', text: event.value }));
        } else if (event.type === 'define') {
          viz.appendChild(ui.el('p', { className: 'muted', text: NS.i18n.t('Neue Anleitung: ', 'New instruction: ') + event.name }));
        } else if (event.type === 'call') {
          viz.appendChild(ui.el('p', { className: 'muted', text: NS.i18n.t('Führe aus: ', 'Run: ') + event.name + '()' }));
        }

        var noteIndex = config.lineNotes ? Math.min(event.line - 1, config.lineNotes.length - 1) : -1;
        detective.textContent = noteIndex >= 0 ? config.lineNotes[noteIndex] : '';
      }

      function renderViz() {
        ui.clear(viz);
        viz.appendChild(ui.el('p', { className: 'muted', text: NS.i18n.t('Drücke ▶ und schau zu.', 'Press ▶ and watch.') }));
        highlight(0);
      }

      function step() {
        if (destroyed || done) { return; }
        if (cursor >= events.length) { finish(); return; }
        applyEvent(events[cursor]);
        cursor += 1;
        api.sfx('click');
        if (cursor >= events.length) { finish(); }
      }

      function playAll() {
        if (destroyed || done) { return; }
        ui.clear(viz);
        highlight(0);
        while (cursor < events.length) {
          applyEvent(events[cursor]);
          cursor += 1;
        }
        finish();
      }

      function finish() {
        if (done) { return; }
        done = true;
        api.sfx('star');
        feedback.textContent = NS.i18n.t('Das war JavaScript!', 'That was JavaScript!');
        feedback.className = 'feedback-line is-good';
        ui.wait(400).then(function () {
          api.complete({ correct: 1, attempts: 0, stars: 1 });
        });
      }

      return {
        destroy: function () { destroyed = true; },
        solveForTest: function () {
          playAll();
          return ui.wait(500);
        }
      };
    }
  };

  NS.jsdemo = { parse: parse, execute: execute, tokenize: tokenize };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { parse: parse, execute: execute, tokenize: tokenize, engines: NS.engines };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
