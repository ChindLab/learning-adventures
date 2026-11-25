# Contributing to Bela Learning

Thank you for wanting to help. This project exists so that a five-year-old can meet a
computer without ads, pressure or an account — and so that parents can add what their own
child needs.

You do not need to be a professional developer. A lesson is a JavaScript object; a game is
one file. This guide tells you exactly where things go.

---

## Ways to help

- **Add a lesson** — no programming required, just data. → [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)
- **Add a game type** — one file, one contract. → [docs/ENGINE-GUIDE.md](docs/ENGINE-GUIDE.md)
- **Translate** — English is the source; each additional language is one overlay file in `i18n/`.
- **Report a bug** — especially "my child got stuck here" reports.
- **Improve wording** — in any supported language, for children and for parents.
- **Accessibility** — keyboard use, screen readers, colour contrast, small screens.
- **Art** — the drawings are inline SVG and can always be friendlier.

---

## Setup

Nothing to install to play or to edit.

1. Open **`index.html`** in a browser. That's the app.
2. For development, a local server avoids browser caching:
   ```bash
   python3 -m http.server 8080
   ```
3. To run the tests you need **Node 18 or newer**:
   ```bash
   npm run check
   ```
4. Optional but recommended, once per clone — run the fast checks before every local
   commit:
   ```bash
   npm run hooks
   ```
   This enables `.githooks/pre-commit`, which runs the syntax check and unit tests
   (~1–2 s). It can be skipped with `git commit --no-verify`; the browser self-test only
   runs in CI.

If you are a **coding agent**, read **[AGENTS.md](AGENTS.md)** first. It has the
repository map, registration points, and the definition of done.

There is no build step, no bundler, no framework and no npm dependencies. Please keep it
that way — the app must run by double-clicking a file on a parent's laptop.

---

## Testing is mandatory

**No pull request is ready without test evidence.** Not a lesson, not a game, not a
translation, not a CSS tweak. The full policy and per-change checklist is in
**[docs/TESTING.md](docs/TESTING.md)**; this is the short form.

Every change must pass:

```bash
npm test          # 104 unit tests, Node 18+
```

and the browser self-test:

```
http://localhost:8080/selftest.html
Alles gut – Gesamt: 789/789 ok
```

`789 = 112 English activities + 6 × 112 translated activities + 5 screens.` The total grows with
every activity or screen you add; a wrong total means something is not being played.

The self-test mounts every activity, finds its controls, solves it the way a child would,
and asserts **exactly one** completion. If a game is not solvable without a mouse, it
fails — that is intentional.

### Browser verification with Playwright (MCP or CLI)

If your agent has Playwright tools, run them — unit tests alone do not prove the UI still
works:

1. `npm run serve`
2. navigate to `http://localhost:8080/selftest.html`
3. wait for `#summary`, assert `passed === total` and no `#failures li`
4. read `browser_console_messages` at error level; only a favicon 404 is acceptable
5. smoke the app: 9 islands, start lesson 1-1, answer, see the celebration, switch to
   English and back

Without MCP, install Playwright locally and run `npx playwright test`; see
`tests/e2e/smoke.spec.js`. The project itself stays dependency-free.

### Also check by hand

- 1024 × 600 and 1920 × 1080, no horizontal scrolling.
- Keyboard only: Tab, Enter, arrow keys.
- Sound off: every feedback still visible.
- Reduced motion: the game is still playable.
- Reload: progress is still there.

Paste the exact results into the pull request. “Should work” is not evidence; “not run” is
honest and means a maintainer must run it before merge.

### CI

Every **pushed commit on every branch** runs `.github/workflows/ci.yml` (pull requests
against their head commit): unit + browser + the aggregating `ci-success`. Runs are grouped
per commit and not cancelled, so each commit finishes its own run. To make the check
mandatory, a repository admin must require **`ci-success`** in branch protection — see
**[docs/BRANCH-PROTECTION.md](docs/BRANCH-PROTECTION.md)**. The workflow alone cannot block
a merge.

---

## Adding a lesson

Full walkthrough with a worked example: **[docs/ADD-A-GAME.md](docs/ADD-A-GAME.md)**.
Short version:

1. Add the activity to a `js/content/stageN.js` lesson.
2. Add its translations to `i18n/de.js`, `i18n/fr.js`, `i18n/it.js`, `i18n/zh.js`, `i18n/hi.js` and `i18n/ne.js`.
3. Register a new lesson in the stage's `lessons` array.
4. `npm test` and `selftest.html`.
5. Update the activity count in `tests/content.test.js` only if you added a whole stage.

Rules for content:

- English is the source; all six overlays (de, fr, it, zh, hi, ne) are required.
- Speech lines: **8 words maximum**, one idea per line.
- Never "falsch", "Fehler", "leider", "Game over". Mistakes get a wobble and another try.
- No time pressure, no score to lose.
- Every `answer` must exist in `options`; the validator checks this.
- Keep ids stable: `stage-lesson-activity`, e.g. `6-11-1`.

---

## Adding a game type

A game is an object with one method:

```js
BelaSchool.engines.myGame = {
  mount(container, config, api) {
    // build DOM inside `container`
    return {
      destroy() { /* remove listeners, timers, rAF */ },
      solveForTest(root) { /* solve it without a mouse */ }
    };
  }
};
```

Read the full contract and the non-negotiable rules in
**[docs/ENGINE-GUIDE.md](docs/ENGINE-GUIDE.md)**. A commented skeleton is in
**[docs/engine-template.js](docs/engine-template.js)**.

Checklist for a new engine:

- [ ] No DOM access at module top level (the file must be loadable in Node for tests).
- [ ] `destroy()` is idempotent.
- [ ] `solveForTest()` exists and finishes the activity exactly once.
- [ ] Any pure logic has a unit test (`tests/myGame.test.js`); the self-test covers the DOM path.
- [ ] Click **and** keyboard path; drag games also need click-select + click-target.
- [ ] Minimum target size 64 × 64 px.
- [ ] No timers that end the task, no lives, no failure screen.
- [ ] Registered in `js/content/index.js` (`ENGINES`), `index.html` and `selftest.html`.
- [ ] One unit test for any pure logic you add.
- [ ] Content uses the engine, in English and all six overlays.

---

## Translating

- English source: `js/content/stage*.js`.
- Overlays: `i18n/de.js`, `i18n/fr.js`, `i18n/it.js`, `i18n/zh.js`, `i18n/hi.js`, `i18n/ne.js`, keyed by
  stage / lesson / activity id.
- Short labels (options, targets, cards) go into `content.translations.<lang>.lexicon`.
- UI strings use `NS.i18n.t('English', 'Deutsch')` at the call site; for fr/it/zh/hi/ne the
  English key is looked up in `content.ui.<lang>`. Dynamic values use `{name}`
  placeholders in the third argument.
- `tests/i18n-languages.test.js` fails if an overlay misses a stage, lesson or activity.

A new language means: one overlay file, one lexicon, one UI dictionary, one
`profiles.p.language` value. The architecture has no language limit.

Speech uses the operating system voice (`en-GB`, `de-DE`, `fr-FR`, `it-IT`, `zh-CN`, `hi-IN`, `ne-NP`). If none
exists for the chosen language the app is silent but fully usable — never make audio
mandatory.

---

## Code style

- Classic scripts, IIFE, `'use strict'`, `var` and function declarations (no build step).
- One global namespace: `window.BelaSchool`.
- **Never touch `document`, `window` or `localStorage` at module top level** — only inside
  functions. This is what makes `node --test` possible.
- Use the UI helpers in `js/core/ui.js`; set text with `textContent`, not `innerHTML`
  (the only exception is the static SVG library).
- No network calls, no external fonts, images or links. `tests/no-network.test.js` scans
  every shipped file.
- No `eval` and no `new Function`.
- Comments explain *why*, in German or English — either is fine.

---

## Pull request checklist

- [ ] One topic per pull request.
- [ ] `npm test` green.
- [ ] `selftest.html` green.
- [ ] English and all six overlay texts added.
- [ ] Screenshot or short description of what a child sees.
- [ ] No personal data, no tracking, no external links.
- [ ] New ids are unique; existing ids unchanged.

Describe the learning goal in the PR: *what does a child practise here?* That sentence is
more useful than a list of files.

---

## Reviews

Maintainers review for three things, in this order:

1. **Is it kind to a five-year-old?** No pressure, no shame, no noise.
2. **Does it work without a mouse and without sound?**
3. **Is it maintainable?** Data in content, logic in an engine, tests for the logic.

Disagreement is fine; please argue about the work, not the person.

By contributing you agree that your contribution is licensed under the MIT license in
[LICENSE](LICENSE) and that you follow the [Code of Conduct](CODE_OF_CONDUCT.md).
