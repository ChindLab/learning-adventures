# Bela – Implementation Plan

**Goal:** Build the complete offline learning adventure described in the spec: 9 stages, 107 playable activities in English, German, French, Italian, Simplified Chinese, Hindi and Nepali, progress storage, parent dashboard, and a real block-programming editor.

**Architecture:** Static single-page app, no build step. Classic `<script defer>` files on one global `BelaSchool` namespace so `index.html` works by double-click. Content is declarative data; 15 reusable engines render it. Node.js is used only as the test runner (`node --test`), never as a generator.

**Tech Stack:** HTML5, CSS3, ES2019 vanilla JS, LocalStorage, Web Audio API, SpeechSynthesis, Node ≥ 18 for tests only.

**Spec:** `docs/design/spec.md`

## Global Constraints

- Child-facing copy is **German**, informal **du**, ≤ 8 words per line; never "falsch", "Fehler", "leider", "Game over".
- No timers, countdowns, score loss, leaderboards, or failure screens anywhere.
- Minimum interactive target 64×64 px; body text 22 px.
- No network access of any kind: no `fetch`, XHR, WebSocket, `import()`, external URL, font, image or link.
- No `eval`, no `new Function`, no `innerHTML` with interpolated content data (use `textContent` / DOM builders).
- **Module top level must not touch `document`, `window`, or `localStorage`.** DOM and storage access happens only inside functions. This is what makes `require()` work in Node.
- Every file uses this preamble, so it works in browser *and* under `node --test`:

```js
(function (root) {
  'use strict';
  /* … implementation … */
  var api = { /* … */ };
  if (root && root.BelaSchool) { root.BelaSchool.progress = api; }
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
```

- Script order in `index.html`: core → content → engines → app. Content is pure data and may not import engines.
- Every engine returns `{ destroy(), solveForTest(root) }`; `destroy()` is idempotent.
- Every engine supports pointer, click-fallback and keyboard input.
- `prefers-reduced-motion` disables idle animation, confetti and step animation.
- Git: one commit per task, message prefix `feat:` / `test:` / `docs:` / `fix:`.

## Review Focus

1. **Storage missing or corrupt** — the app must still open and play, with no console error. (Task 2)
2. **Drag without dragging** (trackpad/touch/keyboard only) — every drag activity must be solvable by click-select + click-target and by Tab/Enter. (Tasks 12, 21, 22–25 selftest)
3. **No speech synthesis / no German voice** — silent but fully usable. (Task 3)
4. **Double completion** — fast double-click must award exactly one star. (Tasks 2, 8)
5. **Navigation during animation** — leaving mid-animation must not leave timers/rAF running or throw. (Tasks 5, 8, 20)

---

## Phase 1 — Foundation

### Task 1: Skeleton, design tokens, and the no-network scanner

**Files:**
- Create: `index.html`, `css/style.css`, `js/core/app.js`, `tests/scanner.js`, `tests/no-network.test.js`, `.gitignore`

**Interfaces:**
- Produces: `app.js` exposes `BelaSchool.app.boot()`; `tests/scanner.js` exposes `scanSource(text) → string[]`.

- [ ] **Step 1: Write the failing test**

```js
// tests/no-network.test.js
const test = require('node:test');
const assert = require('node:assert');
const { scanSource } = require('../js/core/app.js');

test('flags fetch and absolute URLs', () => {
  assert.deepStrictEqual(scanSource('fetch("/x")'), ['fetch']);
  assert.deepStrictEqual(scanSource('const u = "https://evil.example/a.js"'), ['external-url']);
});

test('accepts the comment-only mention in docs style', () => {
  assert.deepStrictEqual(scanSource('bobby sagt: Hallo!'), []);
});

test('no shipped file reaches the network', () => {
  for (const file of walk('js').concat(['index.html', 'selftest.html'])) {
    assert.deepStrictEqual(scanSource(fs.readFileSync(file, 'utf8')), [], file);
  }
});
```

- [ ] **Step 2: Run it — expect failure**

Run: `node --test tests/no-network.test.js`
Expected: FAIL, `scanSource is not a function`.

- [ ] **Step 3: Create `index.html`, `css/style.css`, `js/core/app.js`**

`index.html`: `<!doctype html>`, `<html lang="de">`, CSP-free, `<meta name="viewport">`, `<title>Bela Learning</title>`, `<link rel="stylesheet" href="css/style.css">`, `<div id="app"></div>`, `<div id="bobby-layer"></div>`, `<div id="live" aria-live="polite" class="sr-only"></div>`, `<div id="confetti"></div>`, and the full script list in dependency order (use the final list from the spec tree; missing files at this point are created in later tasks, so include only `core/app.js` now and extend the list per task).

`css/style.css` defines the token block verbatim from spec §11, a CSS reset, `body { background: var(--cream); color: var(--ink); font: 22px/1.45 var(--font); }`, `.sr-only`, `:focus-visible { outline: 4px solid var(--primary); outline-offset: 2px; }`, `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; } }`, and `.screen { max-width: 1200px; margin: 0 auto; padding: 24px; }`.

`app.js` exports `scanSource` (regexes: `/\bfetch\s*\(/`→`fetch`, `/XMLHttpRequest/`→`xhr`, `/WebSocket/`→`websocket`, `/\bimport\s*\(/`→`dynamic-import`, `/https?:\/\//`→`external-url`) and a stub `boot()` that does nothing yet.

- [ ] **Step 4: Run test and open page**

Run: `node --test tests/no-network.test.js` → PASS.
Open `index.html` → blank cream page, console clean.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/core/app.js tests/no-network.test.js .gitignore
git commit -m "feat: project skeleton, design tokens, network scanner"
```

---

### Task 2: Progress store (pure logic, fully tested)

**Files:**
- Create: `js/core/progress.js`, `tests/progress.test.js`
- Modify: `index.html` (script tag before app.js)

**Interfaces:**
- Produces:
```js
createStore(storage, opts) → store
// storage: { getItem(k), setItem(k,v), removeItem(k) }
// store: state(), profile(), listProfiles(), addProfile(name), setActiveProfile(id),
//        renameProfile(id, name), removeProfile(id) → {ok, error?},
//        save(), resetActiveProfile(), resetAll(),
//        isUnlocked(stageId), setUnlockAll(bool), setSetting(key, value),
//        recordAttempt(stage, lesson, correct),
//        completeActivity(stage, lesson, activityId) → {awarded:boolean},
//        completeLesson(stage, lesson), completeMilestone(stage, achievementId),
//        weakAreas(limit), addPlayMs(ms), awardAchievement(id),
//        exportJSON(), importJSON(text) → {ok, error?}
```
- `opts = { now?: () => number }`.
- State shape exactly as spec §8: global `settings`, per-profile progress in `profiles`.

- [ ] **Step 1: Write the failing tests**

```js
// tests/progress.test.js
const test = require('node:test');
const assert = require('node:assert');
const { createStore } = require('../js/core/progress.js');

function mem() {
  const m = new Map();
  return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)),
           removeItem: k => m.delete(k), _dump: () => Object.fromEntries(m) };
}

test('defaults: one profile, zero stars, stages 1-2 unlocked', () => {
  const s = createStore(mem()).state();
  assert.strictEqual(s.version, 1);
  assert.strictEqual(s.activeProfile, 'p1');
  assert.deepStrictEqual(Object.keys(s.profiles), ['p1']);
  assert.strictEqual(s.profiles.p1.stars, 0);
  assert.deepStrictEqual(s.profiles.p1.unlocked, [1, 2]);
});

test('save and load round-trip', () => {
  const back = mem();
  const a = createStore(back);
  a.awardStars(4);
  a.renameProfile('p1', 'Mia');
  a.save();
  const b = createStore(back);
  assert.strictEqual(b.profile().stars, 4);
  assert.strictEqual(b.profile().name, 'Mia');
});

test('corrupt JSON recovers to defaults and keeps a broken copy', () => {
  const st = mem();
  st.setItem('belaschule.v1', '{nope');
  const store = createStore(st);
  assert.strictEqual(store.profile().stars, 0);
  assert.ok(st.getItem('belaschule.broken'));
});

test('completing the same activity twice awards one star', () => {
  const store = createStore(mem());
  assert.strictEqual(store.completeActivity(1, '1-1', '1-1-1').awarded, true);
  assert.strictEqual(store.completeActivity(1, '1-1', '1-1-1').awarded, false);
  assert.strictEqual(store.profile().stars, 1);
});

test('milestone unlocks the next stage and awards the achievement', () => {
  const store = createStore(mem());
  store.completeMilestone(2, 's2');
  assert.ok(store.isUnlocked(3));
  assert.deepStrictEqual(store.profile().achievements, ['s2']);
  assert.strictEqual(store.profile().stars, 3); // 1 activity star + 2 bonus
});

test('profiles are isolated; settings are shared', () => {
  const store = createStore(mem());
  store.awardStars(5);
  store.completeMilestone(1, 's1');
  store.setSetting('sound', false);
  store.addProfile('Ben');
  assert.strictEqual(store.profile().stars, 0);
  assert.deepStrictEqual(store.profile().unlocked, [1, 2]);
  assert.strictEqual(store.state().settings.sound, false);
  store.setActiveProfile('p1');
  assert.strictEqual(store.profile().stars, 8);
  assert.ok(store.isUnlocked(2));
});

test('the last profile cannot be removed', () => {
  const store = createStore(mem());
  assert.strictEqual(store.removeProfile('p1').ok, false);
  assert.strictEqual(store.listProfiles().length, 1);
});

test('export/import round-trip and rejection of garbage', () => {
  const store = createStore(mem());
  store.awardStars(7);
  const backup = store.exportJSON();
  const other = createStore(mem());
  assert.deepStrictEqual(other.importJSON('{kaputt'), { ok: false, error: 'json' });
  assert.deepStrictEqual(other.importJSON('{"version":1,"profiles":{}}'), { ok: false, error: 'shape' });
  assert.strictEqual(other.profile().stars, 0);
  assert.deepStrictEqual(other.importJSON(backup), { ok: true });
  assert.strictEqual(other.profile().stars, 7);
});

test('resetActiveProfile keeps the other child, resetAll clears everyone', () => {
  const store = createStore(mem());
  store.awardStars(3);
  store.addProfile('Ben');
  store.awardStars(2);
  store.resetActiveProfile();
  assert.strictEqual(store.profile().stars, 0);
  assert.strictEqual(store.state().profiles.p1.stars, 3);
  store.resetAll();
  assert.strictEqual(store.profile().stars, 0);
  assert.strictEqual(store.listProfiles().length, 1);
});

test('quota errors never throw', () => {
  const st = mem();
  st.setItem = () => { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; };
  const store = createStore(st);
  assert.doesNotThrow(() => store.save());
  assert.strictEqual(store.profile().stars, 0);
});
```

- [ ] **Step 2: Run — expect failure** (`createStore is not a function`)

- [ ] **Step 3: Implement `js/core/progress.js`**

Rules: `KEY='belaschule.v1'`, `BROKEN='belaschule.broken'`. `defaultState(now)` creates
`activeProfile:'p1'` with one profile `{id, name:'', createdAt, stages:{}, stars:0,
achievements:[], lastLesson:null, unlocked:[1,2], unlockAll:false, stats:{}}` and global
`settings`. Load validates `version===1`, that `profiles` is a non-empty object and that
`activeProfile` exists; otherwise treat as corrupt (copy to `BROKEN`, then defaults).
`migrate(v0)` renames `timeSpent`→`stats.playMs` and wraps a legacy top-level profile into
`profiles.p1`. `completeActivity` appends `activityId` to
`lessons[lessonId].completed` and awards only when newly appended. `completeMilestone`
sets `milestone.done`, awards +2 via the ledger guard key `"milestone"`, pushes the
achievement once, adds `stage+1` to `unlocked`. `save()` catches everything and sets
`persistFailed`. `exportJSON()` returns `JSON.stringify(state, null, 2)`; `importJSON`
parses + validates + replaces in memory, returning `{ok:false, error:'json'|'shape'}` and
leaving state untouched on failure. `addProfile` uses the lowest free `p<n>`.
`removeProfile` refuses when it is the last one and re-points `activeProfile` if needed.
`weakAreas` sorts lessons with `attempts ≥ 4 && correct/attempts < 0.7`, ascending
accuracy, `limit` default 3, returning `[{stage, lesson, accuracy, attempts}]`.

- [ ] **Step 4: Run — all pass.** Then add the script tag and commit.

- [ ] **Step 5: Commit**

```bash
git add js/core/progress.js tests/progress.test.js index.html
git commit -m "feat: versioned progress store with tests"
```

---

### Task 3: Audio, speech, and the shared UI kit

**Files:**
- Create: `js/core/audio.js`, `js/core/speech.js`, `js/core/ui.js`
- Modify: `index.html`

**Interfaces:**
- `BelaSchool.audio = { init(), sfx(name), setMode('all'|'effects'|'mute'), mode() }`, names `click|correct|wrong|star|milestone|pop|bump`.
- `BelaSchool.speech = { say(text), cancel(), setEnabled(bool), enabled(), isSupported() }`.
- `BelaSchool.ui = { el(tag, props, children), button(label, opts), card(opts), confetti(opts), clear(node), announce(text), stars(n) }`.

- [ ] **Step 1:** Implement `audio.js` with a lazily created `AudioContext` (created on first `sfx`), one master `GainNode` at 0.25, oscillator/noise recipes from spec §10, and silent no-op when `AudioContext` is unavailable. Wrap every call in try/catch.
- [ ] **Step 2:** Implement `speech.js`: `cancel()` before each `say`, `utterance.lang='de-DE'`, rate 0.9, pitch 1.05, voice chosen once from `getVoices()` by `lang.startsWith('de')`, `voiceschanged` listener refresh; no-op without API; `cancel()` on `pagehide`.
- [ ] **Step 3:** Implement `ui.js`: `el()` uses `textContent` only, never `innerHTML` for data; `button()` returns a real `<button>` with `data-sfx="click"`; `confetti()` appends ≤ 24 spans for ≤ 2 s and is a no-op under reduced motion; `announce()` writes into `#live`.
- [ ] **Step 4:** Verify by opening `index.html` with a temporary inline `console.log` check in the console (skeleton only; UI is wired in Task 5). No automated test; these are thin, guarded wrappers.
- [ ] **Step 5: Commit** `feat: audio, speech and DOM helpers`.

---

### Task 4: Inline SVG art library (Bobby + objects)

**Files:**
- Create: `js/core/icons.js`
- Modify: `index.html`

**Interfaces:**
- `BelaSchool.icons.get(name, sizePx?) → SVGSVGElement`; `BelaSchool.icons.has(name)`.
- Required names (all content tasks depend on them):
  `bobby, bobby-happy, bobby-sad-soft`, `computer, monitor, keyboard, mouse, laptop, speaker, camera, printer, desk`,
  `apple, ball, cat, dog, elephant, fish, guitar, hat, ice-cream, jam, kite, lion, moon, nose, orange, pencil, queen, rabbit, sun, tree, umbrella, violin, water, xylophone, yo-yo, zebra`,
  `star, trophy, lock, chest, banana, basket, flower, butterfly, robot-arm, puzzle-tile`,
  `shape-circle, shape-square, shape-triangle, shape-star`, `arrow-up/down/left/right`,
  `block-forward, block-back, block-left, block-right, block-jump, block-repeat, block-if, block-collect`.

- [ ] **Step 1:** Build the registry with small, hand-written SVGs (flat pastel, 2–3 paths each, `viewBox="0 0 100 100"`). Bobby is the only animated one: `<g class="bobby-eyes">` with a CSS blink keyframe defined in `style.css`; antenna `<g class="bobby-antenna">` bobs with CSS.
- [ ] **Step 2:** `get()` clones via `node.cloneNode(true)`, sets `width`/`height` from the size argument (default 100 %), adds `role="img"` and `aria-label` from a `LABELS` map (German: `Tastatur`, `Maus`, …). Unknown name returns a friendly `?` in a circle so a typo never breaks a lesson.
- [ ] **Step 3:** Verify in console: `BelaSchool.icons.get('bobby', 180)` renders. Commit `feat: inline SVG art library`.

---

### Task 5: Router, app shell, and child-mode chrome

**Files:**
- Create: `js/core/router.js`, `tests/smoke.test.js` (content-free smoke helpers only)
- Modify: `js/core/app.js`, `index.html`, `css/style.css`

**Interfaces:**
- `BelaSchool.router = { start(routes), go(hash), current(), destroyCurrent() }`.
- Route table: `{ '/': mountMenu, '/stage/:id': …, '/lesson/:id': …, '/activity/:id': …, '/achievements': …, '/parent': … }`.
- `app.js` `boot()`: load progress, build chrome (`<header class="topbar">` with home, `.star-count`, sound cycle, gear), start router, `visibilitychange` → `progress.clock` start/stop, `app.destroyAll()` on unload.

- [ ] **Step 1:** Implement `router.js` with hash parsing, `:param` support, 404 → `#/`, calling `destroy()` of the previous screen before mounting the next, `progress.clock` continues across routes, and cancel speech on navigation.
- [ ] **Step 2:** Build chrome in `app.js`; star counter subscribes to `belaschule:progress` custom event dispatched by the store wrapper. Sound button cycles and persists via `setSetting('sound', ...)`. Gear navigates to `#/parent`.
- [ ] **Step 3:** Add `tests/smoke.test.js` asserting `README`/`CONTENT-GUIDE` exist and contain no `TODO` markers, and that `index.html` references every file in `js/` (filesystem scan). This catches "forgot the script tag".

```js
test('every js file is referenced by index.html', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  for (const f of walk('js')) {
    assert.ok(html.includes(f.replace(/\\/g, '/')), `missing script tag: ${f}`);
  }
});
```

- [ ] **Step 4:** Open the app → header visible, `#/` shows a placeholder screen; click gear → `#/parent`; Back works. Run `node --test tests/` → pass.
- [ ] **Step 5: Commit** `feat: hash router and application shell`.

---

### Task 6: Content manifest and validator

**Files:**
- Create: `js/content/index.js`, `tests/content.test.js`
- Modify: `index.html`

**Interfaces:**
- `BelaSchool.content = { stages: [stage…], words, bobby }`; `validateContent(stages) → {ok, errors: string[]}`.
- Validation rules from spec §5, plus: every activity `speech` ≤ 8 words, no `falsch|Fehler|leider|coming soon|TODO`, every `dragDrop.target.accepts` id exists in `items`.

- [ ] **Step 1: Write the failing validator test** with inline fixture stages: one valid stage passes; duplicate id fails (`duplicate-id:1-1-1`); answer not in options fails; unknown engine fails; forbidden word fails.
- [ ] **Step 2: Run** → fail.
- [ ] **Step 3: Implement** `js/content/index.js` with an initially empty `stages: []` plus `register(stage)`; stage files push themselves. `index.js` holds `validateContent` (pure, Node-exported).
- [ ] **Step 4: Run** → pass. Later tasks fill `stages`.
- [ ] **Step 5: Commit** `feat: content manifest and validator`.

---

## Phase 1b — Navigation

### Task 7: Stage map, stage overview, achievements

**Files:**
- Create: `js/core/navigation.js`
- Modify: `js/core/router.js`, `css/style.css`, `index.html`

**Interfaces:**
- `navigation.menu()` → screen; `navigation.stage(id)`; `navigation.achievements()`.
- Each screen returns `{ destroy() }` and appends `.screen` to `#app`.

- [ ] **Step 1:** Stage map: 8 island buttons in a zigzag CSS grid, each showing number, title, star count `★ n`, state (`done` = trophy ring, `open` = coloured, `locked` = desaturated + padlock + `aria-disabled="true"`). Locked click → Bobby line "Frag Mama oder Papa, dann geht es weiter!" + soft `bump`.
- [ ] **Step 2:** Stage overview: lesson list with `done` checkmarks, current lesson highlighted from `lastLesson`, big **Weiter** button that opens the next incomplete lesson, and a back button. A round arrow (44 px, `aria-label="Lektion überspringen"`) goes to the next activity.
- [ ] **Step 3:** Achievements: 8 slots, earned coloured with trophy and date, unearned grey with "Bald!".
- [ ] **Step 4:** Verify: map renders 8 stages from content; clicking stage 1 opens overview; locked stage shows padlock. Manual.
- [ ] **Step 5: Commit** `feat: stage map, stage overview, achievements screen`.

---

### Task 8: Lesson runner and celebration

**Files:**
- Create: `js/core/lesson.js`
- Modify: `js/core/router.js`, `index.html`, `css/style.css`

**Interfaces:**
- `lesson.run(lessonId)` → screen.
- Internal `api` passed to engines: `{ speak, sfx, complete, progress, hint, art }` exactly as spec §4.3.
- `complete(result)` is idempotent via a `completed` boolean captured per activity mount.

- [ ] **Step 1:** Welcome card (Bobby + goal, tap anywhere), then activities in order; after each completion show a 1.2 s inline "Gut gemacht!" bar (no modal), advance.
- [ ] **Step 2:** On completion: `progress.recordAttempt`, `completeActivity` (stars), `completeLesson` on last activity. Celebration screen: trophy, confetti (skipped under reduced motion), Bobby line, **Weiter** / **Zur Karte**. If lesson is the stage milestone → milestone celebration, `completeMilestone`.
- [ ] **Step 3:** Persist `lastLesson` before mounting. Reload mid-lesson returns to the map (spec §14).
- [ ] **Step 4:** Verify with two temporary activities (removed in Task 10). Commit `feat: lesson runner with celebration`.

---

### Task 9: Self-test harness

**Files:**
- Create: `selftest.html`, `js/dev/selftest.js`
- Modify: `index.html` (only if needed for shared content; selftest has its own script list)

**Interfaces:**
- `selftest.runAll() → Promise<{total, passed, failures:[{id, reason}]}>`.
- Renders a table `id | engine | ergebnis | grund`, plus `Gesamt: n/n ok` in `#summary`.
- Also runs `validateContent` and prints its errors first.

- [ ] **Step 1:** For each stage → lesson → activity: create a detached `div` in a real document, build a fake `api` recording `complete` calls, `mount(container, config, api)`, assert at least one `button` exists, call `solveForTest(container)`, await a microtask + 50 ms, assert exactly one `complete` with `stars === 1`, call `destroy()` twice, assert no throw.
- [ ] **Step 2:** Then mount each screen and assert `#app` has children and no error was thrown (wrap in try/catch).
- [ ] **Step 3:** Register the harness on `window.selftest` and auto-run on load.
- [ ] **Step 4:** Verify with zero content → `Gesamt: 0/0 ok`. Commit `feat: in-browser self-test harness`.

---

## Phase 2 — Basic skills

### Task 10: Engines `explain` and `pickOne`

**Files:** Create `js/engines/explain.js`, `js/engines/pickOne.js`; modify `index.html`, `css/style.css`

**Interfaces:** `mount(container, config, api)`. `explain` config `{art, speech, points[]}`; `pickOne` config `{prompt, options[], answer, columns?, deck?}`.

- [ ] **Step 1:** `explain`: art + ≤3 point rows + **Weiter** → `api.complete({correct:1, attempts:0, stars:1})`. `solveForTest` clicks Weiter.
- [ ] **Step 2:** `pickOne`: big option cards; correct → sparkle + `complete`; wrong → `attempts++`, wobble class, line "Fast! Probier es nochmal."; after 3 attempts pulse correct card and speak its label. **No card is removed.** `deck` mode loops items in one activity and completes after the last. `solveForTest` clicks `[data-option="<answer>"]` for each deck item.
- [ ] **Step 3:** Add a temporary 2-activity stage 1 to `selftest.html` → `2/2 ok`.
- [ ] **Step 4: Commit** `feat: explain and pickOne engines`.

---

### Task 11: Engine `matchPairs`

**Files:** Create `js/engines/matchPairs.js`; modify `index.html`, `css/style.css`

**Interfaces:** config `{mode:'memory'|'columns', pairs:[{a:{art,label}, b:{art,label}}]}`.

- [ ] **Step 1:** Memory: shuffle deterministically with `config.seed ?? 1`, 2×n cards, flip animation, match → locked with chime, mismatch → flip back after 900 ms, clicks ignored while two cards are open.
- [ ] **Step 2:** Columns: left/right, click one each side, correct pair fades to ✓.
- [ ] **Step 3:** `solveForTest` iterates pair ids and clicks both halves. Add to selftest (2 activities) → pass.
- [ ] **Step 4: Commit** `feat: matchPairs engine`.

---

### Task 12: Engine `dragDrop` (pointer + click + keyboard)

**Files:** Create `js/engines/dragDrop.js`; modify `index.html`, `css/style.css`

**Interfaces:** config `{items[], targets[{id, accepts[], art, label}], mode:'bins'|'slots'}`.

- [ ] **Step 1:** Pointer drag with `pointerdown/move/up` on `document`, ghosts via `transform: translate`, `setPointerCapture` not required; drop hit-test uses `document.elementFromPoint` + `closest('[data-target]')`.
- [ ] **Step 2:** Click fallback: click item selects (`aria-pressed=true`), click target drops. Keyboard: items and targets are buttons in DOM order; Enter/Space toggles selection and drops.
- [ ] **Step 3:** Wrong target → item animates home, `api.sfx('bump')`, attempts++, no removal. Correct → item disables into target, target glows; complete when all items placed in matching targets.
- [ ] **Step 4:** `solveForTest` uses the click path, never pointer events — this proves the fallback works.
- [ ] **Step 5: Commit** `feat: dragDrop engine with click and keyboard fallback`.

---

### Task 13: Engine `target` (+ trace-path mode)

**Files:** Create `js/engines/target.js`; modify `index.html`, `css/style.css`

**Interfaces:** config `{mode:'pop'|'trace', art, count, size, moving, path?}`; sizes `xl|l|m|s` = 160/120/95/70 px.

- [ ] **Step 1:** `pop`: spawn one target at a random free spot inside the board (grid-jittered, no overlap), click/double-click pops with particles, next spawns; `count` completions → complete.
- [ ] **Step 2:** `trace`: a dashed SVG path; pointer must stay within 28 px of the path; progress 0–100 %; leaving the path does not reset progress — it just stops advancing (no punishment).
- [ ] **Step 3:** `moving` drift via one `requestAnimationFrame` loop, cancelled in `destroy()`; skip movement under reduced motion.
- [ ] **Step 4:** `solveForTest` clicks the target `count` times (or programmatically advances trace to 100 %).
- [ ] **Step 5: Commit** `feat: target and trace engines`.

---

### Task 14: Engine `keyPress`

**Files:** Create `js/engines/keyPress.js`; modify `index.html`, `css/style.css`

**Interfaces:** config `{key, layout:'letters'|'numbers'|'all'}`; accepted keys: a–z, 0–9, `' '`(Leertaste), `Enter`, `Backspace`, `Shift`, `ArrowUp/Down/Left/Right`.

- [ ] **Step 1:** Render the simplified keyboard (3 letter rows + number row + space/Enter/Backspace/Shift/arrows). Target key gets `.is-target` pulse. Keys are `<button>` too, so a child can also click them (clicking counts, but Bobby says "Drück die Taste!").
- [ ] **Step 2:** Global `keydown` listener: `e.preventDefault()` for Space/Enter/arrows; match `e.key.toLowerCase()` or `e.code`; correct → glow + complete; wrong → keyboard shake, pressed key flashes, attempts++.
- [ ] **Step 3:** 3 attempts → highlight the row and say a hint ("In der Mitte links!").
- [ ] **Step 4:** `solveForTest` dispatches a real `KeyboardEvent` with the right `key`.
- [ ] **Step 5: Commit** `feat: keyPress engine with visual keyboard`.

---

## Phase 3 — Literacy and maths

### Task 15: Engine `typeText` + matcher tests

**Files:** Create `js/engines/typeText.js`, `tests/typing.test.js`; modify `index.html`

**Interfaces:**
```js
createMatcher(text) → { expected(), value(), index(), press(ch) → 'correct'|'wrong'|'done', backspace(), isDone() }
```
Config `{mode:'letters'|'word'|'free'|'alphabet'|'words', text?, letters?, texts?, showKeyboard?}`.

- [ ] **Step 1: Write the failing matcher tests**

```js
const { createMatcher } = require('../js/engines/typeText.js');
test('case folding and no advance on wrong key', () => {
  const m = createMatcher('CAT');
  assert.strictEqual(m.press('x'), 'wrong');
  assert.strictEqual(m.index(), 0);
  assert.strictEqual(m.press('c'), 'correct');
  assert.strictEqual(m.index(), 1);
  m.press('a'); assert.strictEqual(m.press('t'), 'done');
  assert.ok(m.isDone());
});
test('backspace steps back', () => {
  const m = createMatcher('SUN');
  m.press('s'); m.backspace();
  assert.strictEqual(m.index(), 0);
});
```

- [ ] **Step 2: Run** → fail.
- [ ] **Step 3: Implement** matcher (pure, no DOM at top level) + UI: big letter boxes, active pulse, green fill on correct, ghost letter + shake on wrong, DOM `keydown` listener, optional visual keyboard reuse (duplicate a minimal renderer; do not import `keyPress`).
- [ ] **Step 4:** `alphabet` mode shows one card per letter (glyph, art, German word) and requires the key; `words` mode loops `texts`; `free` mode accepts anything and completes after ≥ 1 char, offering `state.child.name`.
- [ ] **Step 5:** `solveForTest` presses the expected characters in order. **Commit** `feat: typeText engine and matcher`.

---

### Task 16: Engine `countObjects` + arithmetic tests

**Files:** Create `js/engines/countObjects.js`, `tests/counting.test.js`; modify `index.html`

**Interfaces:** `arithmetic({mode, a, b}) → {expression:'2 + 1', result:3, options:[…]}` for `add`/`sub`; config `{mode:'count'|'feed'|'match'|'add'|'sub', art, count?, a?, b?, options?}`.

- [ ] **Step 1: Write failing tests**: `add(2,1).result===3`; `sub(5,2).result===3`; `options` contains the result and has no duplicates; `sub(1,4)` never returns a negative (clamps to 0 and the caller must not use such a config — validator rejects `b > a`).
- [ ] **Step 2: Run** → fail.
- [ ] **Step 3:** Implement arithmetic (pure) + UI: staggered object appearance, click-to-merge groups, number buttons 0–20, feedback per spec.
- [ ] **Step 4:** `solveForTest` clicks the option `data-value="<result>"`.
- [ ] **Step 5: Commit** `feat: counting and arithmetic engine`.

---

## Phase 4 — Logic

### Task 17: Engine `pattern`

**Files:** Create `js/engines/pattern.js`; modify `index.html`

**Interfaces:** config `{kind:'shape'|'color'|'number', rounds:[{sequence[], answer, options[]}], roundCount?}`.

- [ ] **Step 1:** Render tiles + dashed `?` slot; options below; correct → slot fills, next round; 3 rounds or all → complete.
- [ ] **Step 2:** `solveForTest` clicks the correct option per round. **Commit** `feat: pattern engine`.

---

### Task 18: Engine `sequence`

**Files:** Create `js/engines/sequence.js`; modify `index.html`

**Interfaces:** config `{cards:[{id,label,icon}], solution:[id…], layout:'order'|'slots'}`.

- [ ] **Step 1:** `order`: shuffled row, click two to swap, **Prüfen**. `slots`: numbered empty slots; tap slot, tap card.
- [ ] **Step 2:** Wrong → correctly placed cards get a green check and lock, the rest wobble; attempts++. Right → complete.
- [ ] **Step 3:** `solveForTest` swaps cards into `solution` order and clicks Prüfen. **Commit** `feat: sequence engine`.

---

### Task 19: `gridRun` interpreter (pure, tested)

**Files:** Create `js/engines/gridRun.js` (logic part), `tests/grid.test.js`

**Interfaces:**
```js
runProgram(config, blocks) → { ok, reason:'goal'|'wall'|'cap'|'stars', states:[{x,y,dir}], collected:[key], steps:[{action, x, y, dir}] }
```
Block shapes: `{type:'forward'|'back'|'left'|'right'|'jump'|'collect'}`, `{type:'repeat', times, body:[]}`, `{type:'if', condition:'wall'|'star', body:[]}`. `config` as spec §6.11.

- [ ] **Step 1: Write the failing tests** (at least): forward moves one tile; turn changes dir but not position; wall bump returns `reason:'wall'`; jump crosses a one-tile gap; collect adds a star; `repeat 3` executes body 3×; `if wall` runs body only when the tile ahead is a wall; `requiredStars` unmet → `ok:false, reason:'stars'`; 4-level nested repeat > 200 steps → `reason:'cap'`.
- [ ] **Step 2: Run** → fail.
- [ ] **Step 3: Implement** direction math, bounds via `grid.w/h`, walls as `"x,y"` set, expansion with depth guard, cap 200.
- [ ] **Step 4: Run** → pass. **Commit** `test: gridRun interpreter` + `feat:` in one commit.

---

### Task 20: `gridRun` UI and the block editor

**Files:** Modify `js/engines/gridRun.js`, `css/style.css`, `index.html`

- [ ] **Step 1:** Board renders tiles, walls, stars, Bobby rotated by `dir`. Palette filtered by `config.palette`. Program strip appends on click; ✕ removes; `repeat`/`if` open a small chooser and nest the **next** block; drag reorder optional (click-to-move is the required path).
- [ ] **Step 2:** **▶ Los** builds blocks from the strip, calls `runProgram`, animates `steps` at 320 ms (instant under reduced motion), 🛑 cancels via a token, ↺ clears. On `ok` → `complete`. On failure → Bobby line only, program stays editable.
- [ ] **Step 3:** `destroy()` cancels rAF and clears the run token (Review Focus 5).
- [ ] **Step 4:** `solveForTest` reads `config.selftestProgram` (a block list added to each puzzle) and clicks ▶. Add 3 temporary puzzles → selftest `3/3 ok`.
- [ ] **Step 5: Commit** `feat: block programming editor and grid runner`.

---

### Task 21: Engine `puzzle`

**Files:** Create `js/engines/puzzle.js`; modify `index.html`

**Interfaces:** config `{cols:2|3, rows:2, art}`.

- [ ] **Step 1:** Board of empty slots + shuffled tray; drag tile to slot with 60 px snap; click-swap fallback; keyboard path (select tile, select slot).
- [ ] **Step 2:** Complete when all slots hold the correct tile; "ta-da" scale-in.
- [ ] **Step 3:** `solveForTest` places tiles via the click path. **Commit** `feat: picture puzzle engine`.

---

## Phase 4b — Content

Content tasks use the same pattern: write the data, run `node --test tests/content.test.js`, open `selftest.html`, then commit. Every activity gets `id`, `type`, `title`, `speech`, `prompt`, engine fields, `stars: 1`, and for `gridRun` a `selftestProgram`.

### Task 22: Stage 1 + Stage 2 content

**Files:** Create `js/content/stage1.js`, `js/content/stage2.js`; modify `js/content/index.js`, `index.html`

- [ ] **Step 1:** Stage 1 as spec §7 (17 activities): 7 explain pages (`computer, monitor, keyboard, mouse, laptop, speaker+camera`, "Was können Computer?"), 7 `pickOne`, 1 `dragDrop` (parts→desk slots), `matchPairs columns` (4 pairs) + `matchPairs memory` (4 pairs), one milestone `pickOne` with a 5-item `deck`.
- [ ] **Step 2:** Stage 2 (13): `target` xl/l/m/s, `target` double-click chest (mode `pop`, `count:1`, `dbl:true`), two `dragDrop`, `trace` path, scroll activity (custom `explain` variant `scroll:true` — implement inline in `explain.js` in this task), `puzzle` 2×2, `pickOne` pointer-type, milestone.
- [ ] **Step 3:** Run `node --test tests/content.test.js` and `selftest.html`; expect all Stage 1–2 activities ok.
- [ ] **Step 4: Commit** `feat: stages 1-2 content`.

### Task 23: Stage 3 + Stage 4 content

**Files:** Create `js/content/stage3.js`, `js/content/stage4.js`, `js/content/words.js`

- [ ] **Step 1:** Stage 3 (9): 8 `keyPress` (letters, numbers, Space, Enter, Backspace, Shift, arrows) preceded by a one-line explain inside each activity's prompt; milestone mixes 4 keys.
- [ ] **Step 2:** Stage 4 (12): 3 alphabet decks (A–H, I–P, Q–Z with German words from spec examples), 2 `matchPairs columns` A↔a, 4 `keyPress`, 1 `words` deck (CAT, DOG, SUN, MOM, DAD, BALL, BOOK), 1 free-name activity, milestone.
- [ ] **Step 3:** Verify + commit `feat: stages 3-4 content`.

### Task 24: Stage 5 + Stage 6 content

**Files:** Create `js/content/stage5.js`, `js/content/stage6.js`

- [ ] **Step 1:** Stage 5 (9): 0–5, 6–10, 11–20 recognition, `count`, `match`, compare (pickOne bigger/smaller), two `add`, one `sub`, milestone.
- [ ] **Step 2:** Stage 6 (8): `gridRun` straight path, `sequence` 3 cards, `pattern` ×3 rounds, odd-one-out `pickOne`, path-choice `pickOne`, `gridRun` with `if wall`, `gridRun` with `repeat 3`, milestone.
- [ ] **Step 3:** Verify + commit `feat: stages 5-6 content`.

### Task 25: Stage 7 — twelve programming puzzles

**Files:** Create `js/content/stage7.js`

- [ ] **Step 1:** Three tutorial lessons: blocks/order, turning, debugging (prefilled wrong program). Then puzzles 1–12 exactly as spec §7 table, each with `grid`, `start`, `goal`, `walls`, `stars`, `palette`, `maxBlocks`, and `selftestProgram` equal to the known solution. Puzzle 12 uses 5 stars and `maxBlocks: 9`.
- [ ] **Step 2:** Every puzzle appears in a lesson (3 per lesson), milestone at the end.
- [ ] **Step 3:** `selftest.html` must show 12/12 ok for Stage 7. Also manually play puzzle 11 (repair) to confirm a wrong program is editable.
- [ ] **Step 4: Commit** `feat: twelve block programming puzzles`.

---

## Phase 5 — First JavaScript

### Task 26: `jsDemo` interpreter, tests, and Stage 8 content

**Files:** Create `js/engines/jsDemo.js`, `tests/jsdemo.test.js`, `js/content/stage8.js`; modify `index.html`, `css/style.css`

**Interfaces:**
```js
parse(code) → {ok:true, program} | {ok:false, error:'…'}
execute(program) → {events:[{type:'line'|'alert'|'var'|'numbers'|'stars'|'call', line, name?, value?, count?}]}
```
Supported grammar exactly as spec §6.13.

- [ ] **Step 1: Write failing tests** for the six demo programs (`alert("Hallo!")`, `let myName = "Anna"; alert(myName);`, `let apples = 3;` → `numbers` event count 3, `let result = 2 + 3;` → 5, function def + call → one `alert`, line highlighting sequence); and `parse('console.log(1)')` → `{ok:false}`.
- [ ] **Step 2: Run** → fail.
- [ ] **Step 3:** Implement tokeniser/parser/walker — **no `eval`, no `Function`**. UI: read-only code panel with line numbers, current-line highlight, variable "boxes", apple/star visualisations, alert bubble, **▶ Schritt** / **▶▶ Alles**, "Detektiv" toggle showing `lineNotes`.
- [ ] **Step 4:** Stage 8: 6 lessons + milestone, parent note once ("Diese Stufe ist zum gemeinsamen Anschauen gedacht.").
- [ ] **Step 5:** `solveForTest` runs all steps. Verify 7/7 in selftest. Commit `feat: simulated JavaScript demos and stage 8`.

---

## Phase 6 — Finalisation

### Task 27: Parent gate and dashboard

**Files:** Create `js/core/parent.js`; modify `js/core/router.js`, `css/style.css`, `index.html`

- [ ] **Step 1:** Gate: "Für Erwachsene", arithmetic from a fixed pool, number pad, unlimited retries, no hint on wrong, session-scoped unlock (`sessionStorage` or module flag).
- [ ] **Step 2:** **Wer spielt?** profile chips from `listProfiles()` with stars; add / rename / remove (remove disabled for the last), switching re-renders the dashboard and the map.
- [ ] **Step 3:** Dashboard: overview, per-stage bars + expandable lessons (`attempts/correct`), `weakAreas()` list phrased neutrally, settings (name, sound, speech, reduced motion, unlock-all, reset active profile vs. all with second confirmation screen), about section.
- [ ] **Step 4:** **Sicherung:** export creates a Blob from `exportJSON()` and downloads `bobby-fortschritt-YYYY-MM-DD.json`; import reads a `File` via `FileReader`/`file.text()`, previews "Sicherung von <Datum>, <n> Kinder", asks once, then replaces and reloads the map. On `{ok:false}` show "Das ist keine Bela-Sicherung." and leave everything untouched.
- [ ] **Step 5:** Verify: 5 + 7 gate, wrong answer shows nothing, add profile gives a clean star count, switch returns stars, reset-active keeps the other child, export → reset → import restores, garbage file changes nothing.
- [ ] **Step 6: Commit** `feat: parent gate, profiles, dashboard and local backup`.

---

### Task 28: Full verification, counts test, docs

**Files:** Modify `tests/content.test.js`, `README.md`, `docs/CONTENT-GUIDE.md`, `docs/design/spec.md` (status line only)

- [ ] **Step 1:** Add the spec §7 count assertions to `content.test.js`: 91 activities total; per-stage counts `17, 13, 9, 12, 9, 8, 16, 7`; every stage has exactly one milestone.
- [ ] **Step 2:** Run `node --test tests/` → all green. Fix anything found.
- [ ] **Step 3:** Open `selftest.html` → `Gesamt: 91/91 ok`. Fix any failing activity (this is the gate that "every game works").
- [ ] **Step 4:** Walk the manual checklist (spec §15.3) in Chrome and Safari. Note any deviation in the README.
- [ ] **Step 5:** Update README with the final file list, the measured startup (no build), and the exact test commands. Update CONTENT-GUIDE with one complete worked example of adding an activity.
- [ ] **Step 6:** Performance pass: no `requestAnimationFrame` running on idle screens (verify via `destroy()` audit), storage < 100 KB after a full run.
- [ ] **Step 7: Commit** `docs: final verification and parent documentation`.

---

## Self-review notes

- **Spec coverage:** every spec section maps to a task — §4.1 (T1), §4.2 (T1–T6), §4.3 (T8, T10–21), §5 (T6), §6.1–6.13 (T10–21, T26), §7 (T22–26, verified T28), §8 (T2, T8), §9 (T27), §10 (T3), §11 (T1, T4, T7), §12 (T1, T12, T15, T26, T28), §13 (T4, T6 validator), §14 (T2, T8, T20), §15 (T1, T2, T9, T15, T16, T19, T26, T28), §16 phases (task groups), §17 (T28).
- **Review Focus** items each have an owner task, listed above.
- **Known sequencing constraint:** content tasks (22–26) require their engines; run them in order. Tasks 10–21 each add their own selftest fixture and remove it when real content arrives.
