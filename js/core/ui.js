/**
 * ui.js – kleine DOM-Bausteine. Absichtlich ohne Framework.
 *
 * Sicherheitsregel: Inhalte werden immer über `textContent` gesetzt, nie
 * über `innerHTML`. `innerHTML` gibt es nur in icons.js für fest eingebaute,
 * vertrauenswürdige SVG-Zeichnungen.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  function el(tag, props, children) {
    props = props || {};
    var node = root.document.createElement(tag);

    if (props.className) { node.className = props.className; }
    if (props.text !== undefined) { node.textContent = String(props.text); }
    if (props.id) { node.id = props.id; }

    if (props.attrs) {
      Object.keys(props.attrs).forEach(function (key) {
        node.setAttribute(key, String(props.attrs[key]));
      });
    }
    if (props.data) {
      Object.keys(props.data).forEach(function (key) { node.dataset[key] = String(props.data[key]); });
    }
    if (props.style) {
      Object.keys(props.style).forEach(function (key) { node.style[key] = props.style[key]; });
    }
    if (props.on) {
      Object.keys(props.on).forEach(function (event) { node.addEventListener(event, props.on[event]); });
    }

    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (child) {
        if (child === null || child === undefined || child === false) { return; }
        node.appendChild(typeof child === 'string' ? root.document.createTextNode(child) : child);
      });
    }
    return node;
  }

  function clear(node) {
    if (!node) { return; }
    while (node.firstChild) { node.removeChild(node.firstChild); }
  }

  function button(label, props) {
    props = props || {};
    var node = el('button', {
      className: 'btn ' + (props.variant || 'primary') + (props.className ? ' ' + props.className : ''),
      attrs: Object.assign({ type: 'button' }, props.attrs || {}),
      on: Object.assign({ click: function (event) {
        NS.audio.sfx('click');
        if (props.onClick) { props.onClick(event); }
      } }, props.on || {}),
      data: props.data
    }, [typeof label === 'string' ? root.document.createTextNode(label) : label]);
    if (props.disabled) { node.disabled = true; }
    return node;
  }

  function card(children, className) {
    return el('div', { className: 'card ' + (className || '') }, children);
  }

  function art(name, size) {
    return NS.icons.get(name, size);
  }

  function announce(text) {
    var live = root.document.getElementById('live');
    if (!live) { return; }
    live.textContent = '';
    // Ein kurzer Tick, damit derselbe Satz erneut vorgelesen wird.
    root.setTimeout(function () { live.textContent = String(text); }, 20);
  }

  /** Bobby spricht: Sprechblase + Sprachausgabe + Screenreader. */
  function say(text) {
    var layer = root.document.getElementById('bobby-layer');
    if (layer) {
      if (!layer.dataset.ready) {
        layer.appendChild(NS.icons.get('bobby', 150));
        layer.appendChild(el('div', { className: 'bubble', attrs: { 'aria-hidden': 'true' } }));
        layer.dataset.ready = '1';
      }
      var bubble = layer.querySelector('.bubble');
      if (bubble) {
        bubble.textContent = String(text);
        bubble.classList.remove('is-pop');
        // Reflow erzwingen, damit die Animation neu startet.
        void bubble.offsetWidth;
        bubble.classList.add('is-pop');
      }
    }
    NS.speech.say(text);
    announce(text);
  }

  function stars(n) {
    return el('span', { className: 'stars-inline', attrs: { 'aria-label': NS.i18n.t('{n} stars', '{n} Sterne', { n: n }) }, text: '★'.repeat(Math.max(0, n)) });
  }

  function confetti() {
    var layer = root.document.getElementById('confetti');
    if (!layer) { return; }
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { return; }
    var colors = ['#FFC9D8', '#CDE7FF', '#C8F0DA', '#FFF2B2', '#E3D8FF', '#FFD9C0'];
    for (var i = 0; i < 24; i++) {
      var piece = el('span', { className: 'confetti-piece' });
      piece.style.left = (5 + Math.random() * 90) + '%';
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = (Math.random() * 0.35) + 's';
      piece.style.transform = 'rotate(' + Math.random() * 180 + 'deg)';
      layer.appendChild(piece);
    }
    root.setTimeout(function () { clear(layer); }, 2200);
  }

  function shuffle(list, seed) {
    var copy = list.slice();
    var random = seeded(seed);
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  function seeded(seed) {
    var s = Number(seed) || 1;
    return function () {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }

  function screen(className) {
    return el('div', { className: 'screen ' + (className || '') });
  }

  var fastMode = false;

  function setFast(value) { fastMode = !!value; }

  /** Wartezeit, die im Selbsttest auf 0 gesetzt wird. */
  function wait(ms) {
    return new Promise(function (resolve) { root.setTimeout(resolve, fastMode ? 0 : ms); });
  }

  function heading(text, level) {
    return el('h' + (level || 2), { className: 'screen-title', text: text });
  }

  NS.ui = {
    el: el,
    clear: clear,
    button: button,
    card: card,
    art: art,
    announce: announce,
    say: say,
    stars: stars,
    confetti: confetti,
    shuffle: shuffle,
    seeded: seeded,
    screen: screen,
    heading: heading,
    setFast: setFast,
    isFast: function () { return fastMode; },
    wait: wait
  };

  if (typeof module !== 'undefined' && module.exports) { module.exports = NS.ui; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
