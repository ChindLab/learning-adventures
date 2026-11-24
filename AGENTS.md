# AGENTS.md — working on Bela Learning

Instructions for coding agents (and humans who like checklists). Read this before changing
anything. It tells you what the project is, what must never break, and exactly which files
to touch for the common tasks.

---

## 1. What this is

Bela Learning is an **offline learning platform for children around 5 years old**, built
with plain HTML, CSS and JavaScript. A robot named Bobby guides the child through nine
stages: computer, mouse, keyboard, letters & typing, numbers, logic, block programming,
first JavaScript, finger training.

- 107 activities, 15 game engines, two languages (German source, English overlay).
- No framework, no build step, no dependencies, no backend, no network.
- It must run by **double-clicking `index.html`** (`file://`).
- Progress lives in `localStorage` under `belaschule.v1`.

The most important requirement is not technical:

> It must never make a five-year-old feel stupid, rushed or watched.

Any change that conflicts with that is wrong, even if tests pass.

---

## 2. Non-negotiables

1. **No network.** No `fetch`, XHR, WebSocket, external fonts/images/links.
   `tests/no-network.test.js` scans every shipped file.
2. **No build step, no dependencies.** Classic `<script defer>` files, one global
   `BelaSchool` namespace. ES modules are blocked on `file://` — do not introduce them.
3. **No punishment mechanics.** No countdown that ends a task, no lives, no score loss,
   no "Game over", no red flashing, no negative wording ("falsch", "Fehler", "leider").
4. **Every activity solvable without a mouse**, and every drag interaction also works as
   click-select + click-target and with Tab/Enter.
5. **No personal data**, no accounts, no analytics, no chat, no external links.
6. **No `eval`, no `new Function`.**
7. **No placeholders.** No "coming soon", no disabled buttons without a working path.
   The content validator rejects placeholder strings.
8. **Touch `document` / `window` / `localStorage` only inside functions.** Module top-level
   must stay side-effect free so `node --test` can require the file.

---

## 3. Map of the repository

```
index.html                  manifest: core → content → engines (script order matters)
selftest.html               development page; not linked from the child UI
css/style.css               tokens and all components
js/core/                    app shell, router, progress, audio, speech, i18n, UI helpers
js/content/                 lessons as data (German) + English overlay + Bobby's lines
js/engines/                 one file per game type, shared mount() contract
js/dev/selftest.js          auto-plays every activity in both languages
tests/                      Node test runner (no dependencies)
docs/                       contributor guides
docs/design/                historical design spec + plan — do not update for new features
bela.config.json            first-run children/defaults (editable JSON)
js/config/seed.js           generated from that JSON — do not edit by hand
tools/setup.js              interactive first-run wizard
tools/build-seed.js         validates the JSON and writes the seed
```

Important files:

- `js/core/progress.js` — state shape, migration, stars, profiles, backup.
- `js/core/i18n.js` — `lang()`, `t(de, en)`, `apply()`.
- `js/content/index.js` — registry, `ENGINES` list, validator, English localization.
- `js/core/lesson.js` — activity lifecycle, timer, celebration, **disposes the previous
  engine**. Do not remove that call; engines keep listeners.
- `js/engines/gridRun.js` — block interpreter. It **stops successfully when the goal is
  reached**; trailing blocks are ignored on purpose.
- `tests/content.test.js` — hardcoded per-stage activity counts.
- `js/dev/selftest.js` — German pass, English pass, screens.

---

## 4. Commands

```bash
npm test                 # 87 unit tests, Node 18+
npm run check            # syntax check + unit tests (what CI runs)
npm run hooks             # enable the pre-commit hook (once per clone)
npm run serve            # http://localhost:8080 (optional, for development)
./setup.sh               # first-run wizard: children → bela.config.json + seed
npm run seed             # regenerate js/config/seed.js after editing the JSON
```

Then open **`selftest.html`** in a real browser. Expected today:

```
Alles gut – Gesamt: 219/219 ok
```

`219 = 107 German activities + 107 English activities + 5 screens.`

If you cannot run a browser, you are **not done**. Use Playwright or ask the human to run
`selftest.html`; a red row names the activity id and the reason.

Playwright (optional, not a project dependency):

```bash
npm i -D @playwright/test && npx playwright install chromium
npx playwright test tests/e2e
```

Note: Playwright blocks `file://`. Serve the folder and open
`http://localhost:8080/selftest.html`. A favicon 404 in selftest is harmless; the real app
must have a clean console.

### Browser verification (mandatory, not optional)

Unit tests do not prove that a button still does something. Before you report a task as
done, drive the app in a real browser — Playwright MCP if the harness has it, otherwise
the Playwright CLI.

With MCP:

1. `npm run serve`
2. `browser_navigate` → `http://localhost:8080/selftest.html`
3. wait until `#summary` stops containing `Läuft …` (≈30 s)
4. `browser_evaluate`:
   ```js
   () => ({
     summary: document.getElementById('summary').textContent,
     failures: [...document.querySelectorAll('#failures li')].map(li => li.textContent)
   })
   ```
5. require `passed === total` and `failures` empty
6. `browser_console_messages` (level `error`): only favicon 404 is allowed
7. smoke the real app: 9 islands, open stage 1 → lesson 1-1, press “Los geht es!”,
   answer, see the celebration; switch to English and back
8. put the exact summary line and console result in your report/PR

Without MCP:

```bash
npm i -D @playwright/test && npx playwright install chromium
npm run serve            # terminal 1
npx playwright test      # terminal 2
```

“Tests pass” without the numbers is not acceptable evidence. “Not run” is acceptable only
if you say so explicitly and ask a maintainer to run it.

Full policy and per-change matrix: **[docs/TESTING.md](docs/TESTING.md)**.

---

## 5. Definition of done

A change is complete only if **all** of these are true:

- [ ] `npm test` is green.
- [ ] `selftest.html` says `Alles gut – Gesamt: n/n ok` with the correct new total.
- [ ] Browser smoke via Playwright MCP or CLI; exact summary + console result recorded.
- [ ] CI `ci-success` is green (or the PR states why it could not run).
- [ ] German **and** English text exist for every new child-facing string.
- [ ] Works with keyboard only; drag has a click fallback.
- [ ] Works with sound off and with reduced motion.
- [ ] No network, no new dependency, no build step.
- [ ] No timer/lives/score loss was introduced.
- [ ] Counts and docs that quote numbers are updated:
      `tests/content.test.js`, `README.md`, `README.de.md`, `CONTRIBUTING.md` if needed.
- [ ] If the first-run schema changed: `bela.config.json`, `tools/`, `docs/SETUP.md` and
      `tests/seed.test.js` are updated, and `npm run seed` was run.
- [ ] The app still opens by double-clicking `index.html`.

Do not update `docs/design/*` for new features; they are historical. Update
`README.md`, `CONTRIBUTING.md`, `docs/CONTENT-GUIDE.md`, `docs/ADD-A-GAME.md`,
`docs/ENGINE-GUIDE.md` instead.

---

## 6. Task: add a lesson (most common)

1. Open the stage file, e.g. `js/content/stage6.js`.
2. Add a lesson to `lessons`, or an activity to an existing lesson:

```js
{
  id: '6-11',
  title: 'Was ist schwerer?',
  goal: 'Vergleiche zwei Dinge.',
  activities: [
    {
      id: '6-11-1', type: 'pickOne', title: 'Schwer oder leicht?',
      speech: 'Was ist schwerer?', prompt: 'Was ist schwerer?',
      options: [
        { id: 'elefant', art: 'elefant', label: 'Elefant' },
        { id: 'ball', art: 'ball', label: 'Ball' }
      ],
      answer: 'elefant'
    }
  ]
}
```

3. Add English to `js/content/en.js`:

```js
lessons: { '6-11': { title: 'What is heavier?', goal: 'Compare two things.' } },
activities: { '6-11-1': { title: 'Heavy or light?', speech: 'What is heavier?', prompt: 'What is heavier?' } }
```

Option/item/target/card labels are translated by `content.en.lexicon`. If your label is
new, add it there.

4. Update the hardcoded counts in `tests/content.test.js` (per-stage array and total).
5. Update numbers in `README.md`, `README.de.md` (activity count, selftest total).
6. Run everything; the new selftest total is `219 + 2` for one German+English activity.

Content rules:

- IDs: `stage-lesson-activity`. Never reuse or renumber existing IDs.
- Speech ≤ 8 words, one idea, no negative words.
- `answer` must be inside `options`; drag targets must accept existing item ids.
- New lesson must be reachable from the stage's `lessons` array (validator checks).
- A new stage also needs an achievement, a milestone lesson, a script tag in **both**
  HTML files, an entry in `en.stages`, and the counts test.

---

## 7. Task: add a game type (engine)

1. Copy `docs/engine-template.js` to `js/engines/myGame.js`; rename the engine.
2. Implement `mount(container, config, api)` and return `{ destroy, solveForTest }`.
3. Register in **four** places:
   - `js/content/index.js` → `ENGINES` array,
   - `index.html` → `<script defer src="js/engines/myGame.js"></script>`,
   - `selftest.html` → same script tag,
   - content: an activity with `type: 'myGame'`.
4. Add the English text to `en.js`.
5. Add a unit test for any pure logic (`tests/myGame.test.js`).
6. Run tests and selftest.

Hard requirements for engines (details in `docs/ENGINE-GUIDE.md`):

- `destroy()` removes every listener, timer and `requestAnimationFrame`, and is idempotent.
- `solveForTest()` uses the real interaction path and results in **exactly one**
  `api.complete(...)`. Do not call `api.complete` directly.
- Use `NS.ui.wait(ms)` instead of `setTimeout` for delays; the self-test sets fast mode.
- Never render outside `container`.
- No DOM at module top level.
- Complete with numbers: `{ correct: 10, attempts: 2, stars: 1 }` — wrong tries are real
  data for the parent report.
- Provide an on-screen/keyboard fallback for every pointer interaction.

---

## 8. Translation rules

- German is the source. English is an overlay keyed by IDs.
- UI strings: `NS.i18n.t('Deutsch', 'English')` at the call site.
- Content: `js/content/en.js` for titles/speech/prompts/points/decks/lineNotes; `lexicon`
  for short labels.
- `tests/content-en.test.js` fails if any activity or lesson lacks an English entry.
- Never add a language toggle inside an activity. Language is per child
  (`profiles.p.language`) and applied by `NS.i18n.apply()`.
- Speech language follows `speech.setLanguage('de-DE' | 'en-GB')`.

---

## 9. Progress and data

State key: `belaschule.v1`. Shape is documented in `js/core/progress.js` and
`docs/design/spec.md` §8.

- Stars are additive and idempotent per activity id.
- Profiles are isolated; `settings` are shared; language lives per profile.
- Activity time is measured per exercise, paused when the tab is hidden.
- If you change the schema: bump `version`, add a migration in `migrate()`, add a test for
  old data, and keep `exportJSON`/`importJSON` compatible.
- Never delete a child's progress as a side effect of a code change.

---

## 10. Style

- Classic IIFE, `'use strict'`, `var`, function declarations. Match the surrounding code.
- One responsibility per file; content stays data, engines stay reusable.
- Build DOM with `js/core/ui.js` (`ui.el`, `ui.button`, `ui.card`, `ui.art`).
- Use `textContent`; `innerHTML` is only for the static SVG library.
- Keep diffs focused. Do not reformat unrelated code or rename things for taste.
- Comments explain *why*. German or English both acceptable.
- Accessibility: real `<button>` elements, ≥ 64 px targets, visible focus, `aria-live`
  for feedback, never colour-only meaning.

---

## 11. Known traps

| Trap | Correct behaviour |
|---|---|
| Adding an ES module | Won't load from `file://`. Use a classic script + IIFE. |
| Reading `document` at require time | Node tests crash. Wrap in `mount()`/functions. |
| Using raw `setTimeout` for game delays | Selftest becomes slow/flaky. Use `ui.wait`. |
| Forgetting `destroy()` | Listener/rAF leaks, mascot stays hidden, double completions. |
| Hardcoding German in an engine | English mode shows German. Use `t(de, en)`. |
| Changing an activity id | Stars and time records detach. Never do it. |
| Adding a stage file without script tags | Silently not loaded; tests may still pass. Add to both HTML files. |
| Updating counts in only one doc | README/CONTRIBUTING/tests drift. Grep for the old number. |
| Making the grid puzzle require the last block | The runner intentionally succeeds on reaching the goal. |
| Editing `js/config/seed.js` by hand | Edit `bela.config.json`, then `npm run seed`. |
| Expecting the seed to override an existing browser | It only applies on an empty `localStorage`. Reset in the parent area first. |
| Adding a timer "for challenge" | Violates the core promise. Don't. |

---

## 12. Workflow for an agent

1. Read the task and this file. If the task adds content, also read
   `docs/CONTENT-GUIDE.md` (German) or `docs/ADD-A-GAME.md` (English).
2. Inspect the related stage/engine and one neighbour as a pattern.
3. Make the smallest change that satisfies the task. Data over code.
4. Run `npm test`; fix every failure.
5. Serve locally and run `selftest.html`; fix every red row.
6. Manually play the new path in German and English (or automate with Playwright).
7. Update counts/docs.
8. Report: what changed, what a child learns, test totals, and any open question.

If a requirement is ambiguous, ask before inventing content that claims to teach
something. Do not invent experience for the child (or for the project) that does not exist.

---

## 13. Useful documents

- `README.md` — what the project is, quick start, architecture.
- `CONTRIBUTING.md` — contribution workflow and review criteria.
- `docs/CONTENT-GUIDE.md` — adding lessons (German).
- `docs/ADD-A-GAME.md` — worked example (English).
- `docs/ENGINE-GUIDE.md` — engine contract and rules.
- `docs/TESTING.md` — mandatory test policy, browser verification, PR evidence.
- `docs/BRANCH-PROTECTION.md` — how to require `ci-success` before merging.
- `docs/design/spec.md` — why the platform looks like this (historical).
- `docs/TODO-age-groups.md` — planned multi-age work; read before adding age features.
- `docs/AUDIO.md` — how effects and speech work, and how to change them.
- `docs/SETUP.md` — first-run children, `bela.config.json`, seed semantics.
