# Engine guide — adding a game type

An **engine** renders one kind of play. The same engine is reused across stages by giving
it different data. There are 15 today (pick-one, drag & drop, block runner, …); a new one
is a single file in `js/engines/`.

Read this before writing one. The rules exist because the app must work for a child who
cannot read well, has no mouse, or has sound turned off.

---

## The contract

```js
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var engines = NS.engines = NS.engines || {};

  engines.myGame = {
    mount: function (container, config, api) {
      // 1. build DOM inside `container` only
      // 2. call api.complete(...) once, when solved

      return {
        destroy: function () { /* remove listeners, timers, rAF */ },
        solveForTest: function (rootElement) { /* solve without a mouse */ }
      };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
```

`mount` is called with:

| argument | meaning |
|---|---|
| `container` | an empty `<div>` in the activity area. Render here; nowhere else. |
| `config` | the activity object from the content file (your fields included). |
| `api` | the shared feedback/progress interface (below). |

It must return `{ destroy, solveForTest }`. Both are used by the self-test and by the
lesson runner when the child moves on.

---

## `api`

| method | what it does |
|---|---|
| `api.speak(text)` | Bobby's speech bubble + speech synthesis |
| `api.sfx(name)` | `click · correct · wrong · star · milestone · pop · bump` (see [AUDIO.md](AUDIO.md)) |
| `api.complete({ correct, attempts, stars })` | called **once**; guarded by the runner |
| `api.progress()` | what has been achieved so far in this activity |
| `api.hint(text)` | gentle extra hint, never a penalty |
| `api.art(name, size)` | inline SVG from `js/core/icons.js` |

`correct` and `attempts` are numbers, not booleans: a ten-key drill reports `correct: 10`
and `attempts: 3` (three wrong keys), which feeds the parent report.

---

## Non-negotiable rules

1. **No DOM access at module top level.** The file must load under Node so the content and
   logic tests can run. Put everything inside `mount()` or pure functions.
2. **`destroy()` is idempotent.** Remove *every* listener, interval, timeout and
   `requestAnimationFrame`. The runner calls it when the child navigates away.
3. **`solveForTest()` must finish the activity once**, using the same path a child would
   (click the real buttons, dispatch real keys). Do not call `api.complete` directly.
4. **Never punish.** No lives, no countdown, no "game over", no score reduction, no
   red flashing. Wrong input: a wobble, a friendly line, try again.
5. **Every activity is solvable without a mouse.** Drag games need click-select +
   click-target *and* Tab/Enter. Keyboard games need visible on-screen keys as fallback.
6. **Targets ≥ 64 × 64 px.** Text ≥ 20 px. Never rely on colour alone.
7. **Respect reduced motion.** If the game depends on movement, provide a static variant
   (see `js/engines/rocket.js`).
8. **No network, no external assets, no `eval`.** Use inline SVG and Web Audio.
9. **Content is data.** No translated strings that belong to a lesson inside the
   engine. UI strings use `NS.i18n.t('English', 'Deutsch')` plus the overlay dictionaries.
10. **Clean up after yourself.** Anything you add to `document` outside `container`
    (for example a drag ghost) must be removed in `destroy()`.

---

## Rendering and accessibility

Use the helpers instead of raw DOM where possible:

```js
var ui = NS.ui;
var card = ui.el('button', {
  className: 'option',
  attrs: { type: 'button', 'aria-label': 'Buchstabe A' },
  data: { option: 'a' }
}, [ui.art('apfel', 110), ui.el('span', { text: 'Apfel' })]);
```

- Every interactive element is a real `<button>` (or has `role="button"` + key handling).
- Feedback uses `aria-live="polite"`; correct/wrong must also be visible and audible.
- Do not put important information only in an `aria-label`; show it.
- For a falling/moving target, keep the speed forgiving (Stage 2 uses ~13 s top-to-bottom).

---

## Registering a new engine

Four places, in this order:

1. **`js/engines/myGame.js`** — the file.
2. **`js/content/index.js`** — add `'myGame'` to the `ENGINES` array (the validator uses it).
3. **`index.html`** — add `<script defer src="js/engines/myGame.js"></script>` after the
   other engines.
4. **`selftest.html`** — the same script tag, so the self-test can play it.

Then add an activity in `js/content/stageN.js` with `type: 'myGame'` and the fields your
engine expects, plus the translations in `i18n/de.js`, `i18n/fr.js`, `i18n/it.js`, `i18n/zh.js`, `i18n/hi.js` and `i18n/ne.js`.

Finally, add a unit test for any pure logic (`tests/myGame.test.js`). If the engine is
entirely DOM animation with no pure logic, the self-test covers it — but it must then
solve reliably in fast mode (see below).

---

## Fast mode (self-test)

`NS.ui.setFast(true)` is set by `selftest.html`. Use `NS.ui.wait(ms)` instead of
`setTimeout` for animations, so the test does not spend real seconds:

```js
api.sfx('pop');
ui.wait(300).then(function () { finish(); });
```

`NS.ui.isFast()` is available if you need a different spawn interval.

---

## A complete minimal engine

See **[engine-template.js](engine-template.js)** — a working "press the big button"
engine with comments. Copy it, rename it, replace the body. It deliberately includes
`solveForTest`, `destroy`, keyboard handling and a single completion.

---

## Testing your engine

```bash
npm test
```

Then open `selftest.html`. Your activity appears as a row:

```
6-11-1   myGame   ok
```

Failures print a reason such as `completions=2`, `no-solver`, `no-controls` or
`stars=undefined`. Fix those before opening a pull request.

Manual checks that the self-test cannot do:

- Play it once with a mouse and once with Tab/Enter only.
- Turn sound off; is the feedback still clear?
- Enable reduced motion; is it still playable?
- 1024 × 600: does anything overflow?
- Reload mid-activity: does the app recover?

---

## Design questions worth asking

- What exactly does the child practise — recognition, coordination, sequencing?
- What is the smallest number of decisions per screen? (One is usually right.)
- What happens after a wrong answer? (The answer is: another try, kindly.)
- Can a child who cannot read solve it from the picture and Bobby's voice?
- Does it teach something, or only entertain? Both is fine; only the second is not.
