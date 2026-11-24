/**
 * router.js – Hash-Router mit aufräumbaren Bildschirmen.
 *
 * Jeder Bildschirm darf ein Objekt mit `destroy()` zurückgeben. Der Router
 * ruft es auf, bevor der nächste Bildschirm erscheint. Dadurch bleiben keine
 * Timer oder Animationen zurück.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  var routes = {};
  var current = null;
  var currentHash = '';

  function split(hash) {
    return hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  }

  function match(hash) {
    var parts = split(hash);
    var keys = Object.keys(routes);
    for (var i = 0; i < keys.length; i++) {
      var pattern = split('#' + keys[i]);
      if (pattern.length !== parts.length) { continue; }
      var params = {};
      var ok = true;
      for (var j = 0; j < pattern.length; j++) {
        if (pattern[j].charAt(0) === ':') { params[pattern[j].slice(1)] = decodeURIComponent(parts[j]); }
        else if (pattern[j] !== parts[j]) { ok = false; break; }
      }
      if (ok) { return { factory: routes[keys[i]], params: params }; }
    }
    return null;
  }

  function errorScreen(message) {
    var ui = NS.ui;
    var box = ui.screen('error-screen');
    box.appendChild(ui.el('h1', { className: 'screen-title', text: 'Ups, hier ist nichts.' }));
    box.appendChild(ui.el('p', { text: message || 'Wir gehen zurück zur Karte.' }));
    box.appendChild(ui.button('Zur Karte', { onClick: function () { router.go('#/'); } }));
    return box;
  }

  function render() {
    var app = root.document.getElementById('app');
    if (!app) { return; }

    if (current && typeof current.destroy === 'function') {
      try { current.destroy(); } catch (e) { /* ein Bildschirm darf nie alles blockieren */ }
    }
    current = null;
    NS.speech.cancel();
    NS.ui.clear(app);
    if (NS.app && NS.app.setClock) { NS.app.setClock(null); }

    var hash = root.location.hash || '#/';
    currentHash = hash;
    var found = match(hash);

    if (!found) {
      if (hash !== '#/') { root.location.hash = '#/'; return; }
      app.appendChild(errorScreen('Diese Seite gibt es nicht.'));
      return;
    }

    try {
      var screen = found.factory(found.params);
      if (screen && screen.nodeType) { app.appendChild(screen); }
      else if (screen && screen.node) { app.appendChild(screen.node); current = screen; }
      else { current = screen || null; }
      root.scrollTo(0, 0);

      var bobbyLayer = root.document.getElementById('bobby-layer');
      if (bobbyLayer) {
        bobbyLayer.classList.toggle('is-hidden', hash === '#/');
      }

      // Fokus auf die Überschrift: Screenreader und Tastatur landen am Anfang.
      var heading = app.querySelector('h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        try { heading.focus({ preventScroll: true }); } catch (e) { heading.focus(); }
      }
    } catch (e) {
      if (root.console) { root.console.error(e); }
      app.appendChild(errorScreen('Bobby hat sich vertippt.'));
    }
  }

  var router = {
    start: function (table) {
      routes = table || {};
      if (!root.location.hash) { root.location.hash = '#/'; }
      root.addEventListener('hashchange', render);
      render();
    },
    go: function (hash) {
      var target = hash.charAt(0) === '#' ? hash : '#' + hash;
      if (root.location.hash === target) { render(); }
      else { root.location.hash = target; }
    },
    render: render,
    current: function () { return currentHash; }
  };

  NS.router = router;
  if (typeof module !== 'undefined' && module.exports) { module.exports = router; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
