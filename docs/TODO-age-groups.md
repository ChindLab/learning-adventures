# TODO — Age groups (multi-age platform)

**Status:** proposal, nothing implemented yet.
**Goal:** let one installation serve children of different ages — siblings now, a public
platform later — without forking the app or lying to either age group.
**Owner:** whoever picks it up. This file is the plan; update the checkboxes.

---

## What "multi-age" means here

Three levels, deliberately separated:

1. **Band filtering** — a 4-year-old is not shown "Mein erstes JavaScript".
2. **Difficulty** — the same game is calmer for 4 and tighter for 8.
3. **Content packs** — 3–4 and 9–11 eventually need different *mechanics*, not just tags.

Phase 1 alone does **not** make the app suitable for a 3-year-old. It only stops showing
the wrong stages. Say that out loud in the release notes.

### Non-goals

- No birthdates. A band is enough and is less personal data.
- No accounts, no cloud profiles, no classroom sync.
- No age gate that locks a curious child out of harder content permanently.
- No separate app per age.

---

## Decisions to make before coding

- [ ] **Bands:** propose `preschool` (3–4), `early` (5–6), `middle` (7–8),
      `older` (9–11). Confirm or change.
- [ ] **Default vs hard filter:** propose *default*, with a parent switch
      **„Alle Stufen zeigen" / "Show all stages"**. Filters the map, not the URL.
- [ ] **Existing content:** keep the current nine stages as the `early` curriculum and
      tag them for adjacent bands; do not rewrite them.
- [ ] **Direct URL** to an out-of-band activity: allow it (curiosity) but label the stage
      as "für ältere Kinder" / "for older children" in the parent area. Do not 404.
- [ ] **Reading override:** reading ability matters more than age. The parent can always
      switch band; no test, no lock.

---

## Phase 1 — Bands on the existing content (~1–2 days)

### Data

- [ ] `js/core/progress.js`
  - add `ageBand: 'early'` to `defaultProfile`
  - normalize in `migrate()` (`preschool|early|middle|older`, else `early`)
  - `setAgeBand(band)` + test (profile isolation, invalid value)
  - keep `language` untouched
- [ ] `js/content/stage*.js`
  - add `bands: [...]` to every stage
  - proposed first pass:
    - 1, 2, 3: `['preschool', 'early']`
    - 4, 5: `['early']`
    - 6, 7: `['early', 'middle']`
    - 8: `['middle']`
    - 9: `['preschool', 'early', 'middle']`
  - optional `bands` on a lesson/activity for exceptions
- [ ] `js/content/index.js`
  - validator: every stage has a non-empty `bands` array with known values
  - helper `content.forBand(band)` returning filtered stages
  - add tests for both

### UI

- [ ] `js/core/parent.js`
  - selector **„Alter des Kindes" / "Child's age"**:
    `3–4 · 5–6 · 7–8 · 9–11`
  - note: „Die Stufen sind eine Empfehlung, keine Sperre." /
    "Stages are a recommendation, not a lock."
  - switch **„Alle Stufen zeigen" / "Show all stages"** (reuse `unlockAll` or new flag)
- [ ] `js/core/navigation.js`
  - map shows stages for `profile.ageBand` (or all if override)
  - display numbering 1..n, stage IDs unchanged
  - achievements gallery filtered
  - stage overview uses the same filter
- [ ] `js/core/lesson.js`
  - pass `ageBand` to engines: `api.ageBand()`
  - do **not** block direct links; show a small parent-facing hint on the stage card

### Unlock

- [ ] Band-aware rule: the **first two visible** stages are open; a milestone unlocks the
      next **visible** stage.
- [ ] Keep existing `unlocked` data; do not migrate it away.
- [ ] Tests:
  - switching band does not change stars/time/achievements
  - first two visible stages open in every band
  - milestone unlocks the next visible stage, not simply `id + 1`
  - parent "all stages" still works

### Tests and docs

- [ ] `tests/progress.test.js`: default band, set, invalid, migration
- [ ] `tests/content.test.js`: every stage has valid bands
- [ ] new `tests/age.test.js` if filtering/unlock gets pure helpers
- [ ] `selftest.html`: build the map for each band (4 extra screen checks)
- [ ] README, README.de, CONTRIBUTING, AGENTS.md, CONTENT-GUIDE: how to tag a stage
- [ ] design/spec §8: `ageBand` in the state shape (only if it ships)

### Acceptance criteria

- A new profile starts at 5–6 and sees the same app as today.
- A 3–4 profile sees only stages 1, 2, 3, 9; a 7–8 profile sees 1–3, 6–9.
- Switching band never deletes progress.
- `npm test` green, `selftest.html` green with the new total.
- No content text changed except stage metadata.

---

## Phase 2 — Difficulty inside activities (~2–3 days)

Use only where it improves the experience; do not silently scale everything.

- [ ] Decide the mechanism: `config.difficulty[band]` in content **or** engine defaults
      scaled by `api.ageBand()`. Proposed: explicit config wins, engine fallback second.
- [ ] Audit and tune:
  - `target.js` — target size `xl/l/m/s`, moving or not
  - `rocket.js` — base speed, lanes, group length
  - `memory`/`matchPairs` — number of pairs
  - `pattern` — number of rounds, grid vs row
  - `sequence` — 3 vs 5 cards
  - `typeText` — word length, alphabet card count
  - `gridRun` — `maxBlocks`, palette size
- [ ] Never introduce a countdown or a life system, even for the oldest band.
- [ ] Add a test that every activity resolves to a valid difficulty for its band.
- [ ] Parent dashboard: no numbers shown to the child; keep the same report.

---

## Phase 3 — Content packs (weeks)

Each pack is content + achievements + milestone, using the existing engines.
No engine fork unless a mechanic genuinely does not exist.

### Preschool pack (3–4)

- [ ] 4 short stages, 24–32 activities, 2–4 minutes each
- [ ] mechanics: tap cause/effect, colours, shapes, sounds, counting 1–3, drag one item
- [ ] no letters, no reading required, no right/wrong framing
- [ ] larger targets (≥ 80 px), fewer items per screen (2–3)
- [ ] review with at least two children of that age

### Middle pack (7–8)

- [ ] typing words and short sentences
- [ ] maths beyond 20, comparing, patterns
- [ ] block programming with debugging and `repeat`/`if`
- [ ] first JavaScript with visible output, variables, functions
- [ ] optional: a "project" activity that builds something across sessions (not required)

### Older pack (9–11)

- [ ] real code editing with a safe sandbox (no `eval` in the child page)
- [ ] projects: draw, quiz, small game, save to a file
- [ ] debugging tasks with intentional bugs
- [ ] needs a new engine + a serious security review

### For every pack

- [ ] English source and de-DE/fr-FR/it-IT/zh-CN/hi-IN/ne-NP/de-CH translations
- [ ] achievement gallery and milestone
- [ ] activity counts in tests/docs
- [ ] selftest plays every activity in every language
- [ ] parent guidance page ("what is this pack, what does it teach?")

---

## Cross-cutting checklist

- [ ] `ageBand` is local-only; document it in the privacy section.
- [ ] Backup/restore includes the band (it is part of the profile).
- [ ] Existing profiles migrate to `early` without user action.
- [ ] Speech defaults: preschool on, older optional (parent setting already exists).
- [ ] Reduced motion and sound-off still work in every band.
- [ ] Keyboard-only works in every band.
- [ ] No placeholder stages or "coming soon" tiles.

---

## Risks

| Risk | Mitigation |
|---|---|
| Age ≠ skill; a reading 4-year-old is bored by preschool | parent override, "show all", no hard lock |
| Tagging looks like age-appropriateness but isn't | Phase 2/3 are explicit; release note says so |
| Unlock logic breaks with filtered maps | band-aware "next visible stage" + tests |
| Achievements gallery shows empty slots | filter by band |
| Counts in docs/tests drift | update `content.test.js`, README, AGENTS, CONTRIBUTING |
| Content volume is underestimated | ship one small pack per outer band before writing 40 activities |

---

## Suggested first pull request

Keep it narrow and reviewable:

1. `ageBand` in progress + migration + parent selector.
2. `bands` on the nine stages (tags only).
3. Filtered map, overview, achievements.
4. Band-aware unlock.
5. Tests + docs.

No new content, no difficulty changes, no engine changes. If that PR feels good to use
with two children, Phase 2 is worth starting.
