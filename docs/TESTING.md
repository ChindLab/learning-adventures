# Testing — the rules

**No change is done without evidence.** Not a lesson, not a game, not a translation, not a
refactor. This page defines what "tested" means for each kind of change, how to run the
tests, and how to verify the app in a real browser.

The short version:

```bash
npm test                       # 87 unit tests
# then, in a browser:
open http://localhost:8080/selftest.html
# expect: Alles gut – Gesamt: 219/219 ok
```

A pull request without both results is not reviewable.

---

## 1. The layers

| Layer | What it proves | Run with | Required for |
|---|---|---|---|
| **Unit** | pure logic: progress, storage, seed, grid interpreter, typing, arithmetic, JS parser, voice ranking, clock | `npm test` | every function with branches |
| **Content validator** | ids unique, answers valid, engines exist, speech ≤ 8 words, no placeholders, band/i18n coverage | inside `npm test` | every content change |
| **English coverage** | every stage/lesson/activity has an English entry | inside `npm test` | every content/translation change |
| **No-network** | no `fetch`, XHR, WebSocket, external URL in shipped files | inside `npm test` | every change |
| **Self-test** | every activity mounts, exposes controls, is solvable without a mouse, completes exactly once; every screen builds | `selftest.html` | every content/engine/UI change |
| **E2E smoke** | real browser: app loads, 9 islands, lesson starts, parent gate, language switch, selftest green | Playwright (CLI or MCP) | every UI change |
| **Manual** | sound, reduced motion, layout, a real child's reaction | human | before a release |

`npm test` is fast (≈1 s). The self-test is the expensive one (≈30 s) and catches exactly
the class of bug that unit tests cannot: “the button exists but nothing happens”.

---

## 2. What to test, by change type

### A new lesson / activity
- [ ] `npm test` — the content validator runs automatically.
- [ ] Add English text; `tests/content-en.test.js` fails if you forget.
- [ ] Update the count in `tests/content.test.js` if you added an activity.
- [ ] `selftest.html` must show `ok` for the new id.
- [ ] Play it once in German and once in English.

You do **not** need a new unit test for a data-only lesson: the validator plus the
self-test are its tests.

### A new game type (engine)
- [ ] `solveForTest()` exists and completes exactly once (self-test enforces).
- [ ] Pure logic (scoring, matching, movement) extracted and covered by `tests/yourEngine.test.js`.
- [ ] Click path **and** keyboard path.
- [ ] `destroy()` twice does not throw (self-test).
- [ ] Registered in `ENGINES` + both HTML files; a missing registration makes the
      self-test fail, but not `npm test` — check both.
- [ ] E2E: open the activity in a real browser once.

### A change to progress / storage / seed
- [ ] Unit tests for: default, save/load, corrupt data, **migration**, idempotent stars,
      profiles, export/import, seed first-run, “existing data wins”.
- [ ] If the schema changes: bump `version`, add `migrate()` handling, test old data.
- [ ] Manual: reload after a star, reload after renaming, backup → reset → restore.

### A translation
- [ ] Every activity/lesson entry exists (`tests/content-en.test.js`).
- [ ] Speech lines ≤ 8 words.
- [ ] Numbers/letters/words are correct for that language (Q = Queen, CAT not KATZE).
- [ ] Self-test passes in that language (it runs German **and** English).

### UI / CSS / screens
- [ ] `selftest.html` builds every screen.
- [ ] E2E smoke (below).
- [ ] Manual at 1024 × 600 and 1920 × 1080.
- [ ] Keyboard only; focus visible.
- [ ] Sound off; reduced motion.

### Audio / speech
- [ ] `tests/speech.test.js` for ranking/selection.
- [ ] Manual: sound on/off, no German voice installed, rapid clicks.
- [ ] Never make audio the only feedback.

---

## 3. Running the browser self-test

```bash
npm run serve          # http://localhost:8080
```

Open **`http://localhost:8080/selftest.html`**.

- Green: `Alles gut – Gesamt: 219/219 ok`.
- Red: a table row names the activity id, engine and reason
  (`completions=2`, `no-solver`, `no-controls`, `stars=undefined`).
- A favicon 404 in the console is harmless. Any other console error is not.

`219 = 107 German activities + 107 English activities + 5 screens.`

Why `localhost` and not `file://`: the app works from `file://`, but Playwright and most
automation block it. The self-test is the same either way.

### With Playwright MCP (agents)

If your agent has Playwright tools, this is the required flow:

1. Start the server (`npm run serve` or `python3 -m http.server 8080`).
2. `browser_navigate` → `http://localhost:8080/selftest.html`.
3. Wait until `#summary` no longer contains `Läuft …` (≈30 s).
4. `browser_evaluate`:

```js
() => ({
  summary: document.getElementById('summary').textContent,
  failures: Array.from(document.querySelectorAll('#failures li')).map(li => li.textContent)
})
```

5. Require `summary` to match `Gesamt: \d+/\d+ ok` with **passed === total**, and
   `failures` to be empty.
6. `browser_console_messages` (level `error`): only favicon 404 is acceptable.
7. Then smoke the app: `index.html` → 9 islands, open stage 1, open lesson 1-1, press
   “Los geht es!”, press “Weiter”, answer, see the celebration.
8. Switch language in the parent area and confirm the map is English.
9. Report the exact summary line and the console result in the PR.

Do not paste “tests pass” without the numbers. Do not skip step 2 because the unit tests
are green — the self-test is what proves the games still work.

### With Playwright CLI (optional)

```bash
npm i -D @playwright/test
npx playwright install chromium
npm run serve            # terminal 1
npx playwright test      # terminal 2
```

`tests/e2e/smoke.spec.js` contains the smoke checks. It is deliberately not an npm
dependency of the project; contributors who want it install it locally.

---

## 4. Local commit hook (optional)

Run the fast checks at commit time, not only after pushing:

```bash
npm run hooks          # once per clone
```

This sets `core.hooksPath` to `.githooks`; `.githooks/pre-commit` runs
`npm run check` — syntax plus 87 unit tests, about 1–2 seconds. It is deliberately **not**
the browser self-test (30 s per commit would be unbearable); CI runs that for every pushed
commit.

Skip once with `git commit --no-verify`. Disable with
`git config --unset core.hooksPath`.

---

## 5. Writing tests that stay green

- **Deterministic input only.** Use `NS.ui.setFast(true)` and `NS.ui.wait(ms)` in engines.
  No raw `setTimeout` in game code — the self-test would take real seconds and become
  flaky.
- **No network, no timers that end tasks, no random seeds without a parameter.** If
  randomness is needed, seed it (`config.seed`) and test both branches.
- **Test the contract, not the markup.** Assert completion counts, scores, state, not
  CSS classes — except where the class is the contract (e.g. `is-done`).
- **One completion per mount.** If a test needs to mount twice, call `destroy()` first.
- **Never test against a real child.** Tests use fixed data.
- **Keep expected totals in one place per fact.** Activity counts live in
  `tests/content.test.js`; selftest totals in README/AGENTS/CONTRIBUTING. Update them
  together.

---

## 6. What the tests cannot cover

Automation cannot hear, cannot judge whether a wobble feels kind, and cannot know if a
five-year-old understands “Dreh dich rechts”. Before a release, a human must:

- play one full stage with the mouse,
- play one activity with keyboard only,
- turn sound off and check the feedback,
- enable reduced motion,
- watch a real child for ten minutes and write down where she hesitates.

That last item is worth more than the rest of this page.

---

## 7. Pull request evidence

Paste into the PR description:

```
npm test:               87/87 pass
selftest.html:          Alles gut – Gesamt: 219/219 ok
console (app):          0 errors
manual:                 German + English, 1024×600, keyboard only
```

If you cannot run the browser layer, say so explicitly and ask for a maintainer to run
it. “Not run” is honest; “should work” is not evidence.

---

## 8. CI and the merge gate

Every **pushed commit on every branch** runs `.github/workflows/ci.yml` (and every pull
request runs it against the head commit):

- **unit** — `npm run check` (syntax + 87 unit tests) plus “generated seed is up to date”
- **browser** — `npx playwright test` (5 smoke checks + self-test 219/219)
- **ci-success** — a single aggregating job

Runs are grouped per commit and **not cancelled**, so pushing three commits produces three
completed runs. This costs more Actions minutes than a PR-only setup; that is the trade-off
for having a check on every commit.

A workflow **cannot** block a merge on its own. A repository admin must require
`ci-success` in branch protection; exact UI and `gh` steps are in
**[BRANCH-PROTECTION.md](BRANCH-PROTECTION.md)**.

If the browser job fails only in CI, download the `playwright-results` artifact. The most
common causes are a timing assumption (use `expect`, not `sleep`) and a missing browser
dependency (`--with-deps`).

---

## 9. Optional local Playwright
```bash
npm i -D @playwright/test
npx playwright install chromium
npx playwright test
```

`playwright.config.js` starts `python3 -m http.server 8080` automatically. Playwright is
not a project dependency; the app itself remains dependency-free.
