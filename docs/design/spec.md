# Bela – Meine erste Computer-Schule

**Design specification · 2026-11-21 · Status: implemented (v1.0)**

A offline learning adventure for one 5-year-old, in German, built with HTML5, CSS3 and
vanilla JavaScript. This document is the source of truth for the implementation plan.
It replaces the requirement list in the original briefing where the two disagree; every
deviation is called out in §18.

---

## 1. Purpose

Bela Learning is a first contact with a computer. It is not a
programming course. Over eight stages a child learns to move a mouse, press the right
keys, recognise letters and numbers, follow and order instructions, spot patterns, and
finally place colourful blocks that make a robot walk — followed by a first, carefully
simulated taste of JavaScript.

The only success criterion that matters: the child wants to come back tomorrow, and does
not feel stupid when something goes wrong.

### 1.1 Non-goals

- No accounts, no cloud, no sync, no multi-user profiles.
- No competitive leaderboards, no countdowns, no time limits, no streaks that can break.
  An informational stopwatch shows how long the current exercise is taking; nothing in the
  app depends on it, and no score is time-based.
- No real code execution: Stage 8 runs a **simulated** interpreter, never `eval`.
- No external resources of any kind — no fonts, CDNs, images, analytics or links.
- No touch-first design; mouse and keyboard are the point of the product. Touch drag
  still works because pointer events are used, but it is not optimised for.

---

## 2. Users and context

| | Child | Parent |
|---|---|---|
| Age / skill | 5, cannot read fluently | basic computer skills |
| Reads | almost nothing; every instruction is spoken **and** shown | reads German |
| Session | 5–10 min, interrupts mid-activity | sets up once, checks in weekly |
| Needs | big targets, one decision per screen, instant praise | honest progress, reset, unlock control |

Consequences that shape the whole design:

1. **Nothing is required to be read.** Every activity is solvable from Bobby's spoken
   line plus a picture. Text is a support, never the carrier of the task.
2. **No dead ends.** Every screen has a visible way back; no activity can trap the child.
3. **No failure state.** A wrong answer produces a wobble, a friendly sentence and
   another try. There is no "You lost", no score to lose, no time limit.
4. **Reversible.** Reloading at any point returns to the stage map with progress intact.

---

## 3. Product shape

Single-page app, one `index.html`, hash-based routing, screens rendered into `#app`.

```
#/                     stage map (home)
#/stage/3              stage overview: lesson list + progress
#/lesson/3-2           lesson runner (a sequence of activities)
#/activity/3-2-4       single activity, deep-linkable
#/achievements         trophy room
#/parent               math gate, then dashboard
#/parent/dashboard     (internal step after gate)
```

The browser Back button therefore behaves, and a reload resumes where the child was.

### 3.1 Screen chrome (present on every child screen)

- **Bobby** bottom-left: inline SVG robot, idles with blink + antenna bob; speech bubble
  above him shows the current line. Tapping Bobby repeats the line.
- **Star counter** top-right: `★ 7`. Purely additive, never decreases.
- **Exercise clock** directly left of the stars: `⏱ 1:07`, minutes and seconds of the
  current activity only. It resets when the next activity starts, freezes on completion,
  hides outside lessons, and pauses while the tab is hidden. No limit, no colour change,
  no warning at any value.
- **Home button** top-left: returns to `#/` (asks nothing, loses nothing).
- **Sound toggle** top-right next to stars: cycles *an / nur Töne / stumm*.
- **Parent gear** far top-right: small, low-contrast, 44 px — findable by an adult,
  not attractive to a child.

---

## 4. Technical architecture

### 4.1 No build step, no server

The app must run when a parent double-clicks `index.html`. That rules out ES modules,
which browsers refuse to load over `file://`. Therefore:

- every JS file is a classic script included with `<script defer src="…">` in dependency
  order from `index.html`;
- each file wraps itself in an IIFE and registers exactly one entry on the global
  namespace `window.BelaSchool`;
- pure-logic files end with a Node export shim so `node --test` can require them:

```js
if (typeof module !== 'undefined' && module.exports) module.exports = api;
```

LocalStorage on `file://` is shared between all local pages in some browsers, so the
storage key is namespaced exactly `belaschule.v1` and never enumerated.

### 4.2 File structure

```
bobby-school/
├── index.html
├── selftest.html                 dev-only: mounts and auto-solves every activity
├── README.md                     German, for the parent
├── css/
│   └── style.css                 tokens, layout, components, motion, print-free
├── js/
│   ├── core/
│   │   ├── app.js                boot, shell, child-safety guards
│   │   ├── router.js             hash router, screen lifecycle
│   │   ├── navigation.js         stage map + stage overview screens
│   │   ├── progress.js           LocalStorage model, stars, unlocks, clock
│   │   ├── audio.js              Web Audio SFX synthesis
│   │   ├── speech.js             speechSynthesis wrapper (de-DE)
│   │   ├── ui.js                 DOM helpers, button/card builders, confetti
│   │   └── icons.js              inline SVG art library (Bobby, animals, objects)
│   ├── content/
│   │   ├── index.js              ordered manifest + validateContent()
│   │   ├── stage1.js … stage8.js German lesson + activity data (pure objects)
│   │   ├── words.js              CAT/DOG/… word list with art + German names
│   │   └── bobby-lines.js        encouragement pool, no logic
│   ├── engines/
│   │   ├── explain.js  pickOne.js  matchPairs.js  dragDrop.js  target.js
│   │   ├── keyPress.js typeText.js homeRow.js rocket.js countObjects.js pattern.js
│   │   ├── sequence.js gridRun.js puzzle.js jsDemo.js
│   └── dev/
│       └── selftest.js
├── assets/
│   ├── images/                   logo.svg, favicon.svg (art is otherwise inline)
│   └── sounds/                   README.md: how to replace synthesized SFX
├── docs/
│   ├── CONTENT-GUIDE.md          German: add a lesson / a puzzle / a stage
│   └── design/{spec,plan}.md
└── tests/                        node --test
```

Why the deviation from the briefing's nine-file tree: your §11 requires separating
educational content from application logic. Nine files would have forced ~70 activities
into eight files, each ~1500 lines. The split above makes every content file declarative
data and every engine reusable across stages.

### 4.3 Engine contract

An engine is a renderer for one *kind* of play. All engines share one signature:

```js
BelaSchool.engines.pickOne.mount(container, config, api) → { destroy(): void }
```

`api` is provided by the lesson runner and is identical for every engine:

| method | meaning |
|---|---|
| `api.speak(text)` | show in Bobby's bubble and speak it (if enabled) |
| `api.sfx(name)` | `click · correct · wrong · star · milestone · pop` |
| `api.complete(result)` | `{ correct, attempts, stars }` — called **once**; guarded |
| `api.progress()` | `{ correct, attempts, stars }` so far in this activity |
| `api.hint(text)` | gentle extra hint, costs nothing |
| `api.art(name, size)` | returns an inline SVG element from `icons.js` |

Engine rules (enforced in review):

1. Never writes to LocalStorage.
2. Never renders outside its own `container`.
3. Never removes the only way forward.
4. Handles `destroy()` idempotently (cancels rAF/timeouts/listeners).
5. Always provides an alternative to dragging: click item → click target, and keyboard
   (Tab to item, Enter picks up, Tab to target, Enter drops).
6. Exposes `solveForTest(root)` for `selftest.html`.

### 4.4 Routing and lifecycle

`router.js` maps a hash to a screen factory. On navigation it calls the previous
screen's `destroy()`, clears `#app`, mounts the new screen, updates `document.title`,
and cancels speech. Unknown hashes redirect to `#/` without an error screen.

### 4.5 Lesson runner

A lesson is an ordered list of activity ids. The runner:

1. shows a welcome card with Bobby and the lesson goal (5 s, tap anywhere to continue);
2. mounts each activity, awards its stars on first completion;
3. between activities shows a one-line "Gut gemacht!" transition (not a modal);
4. on the last activity shows the celebration screen (confetti, star rain, Bobby line)
   with **Weiter** (next lesson) and **Zur Karte**;
5. records `lastLesson` so the stage map can offer "Weiter geht's".

Nothing is locked inside a lesson: the child may skip with the arrow in the corner,
which is small and unlabelled but always present (parents will find it; children rarely
need it).

---

## 5. Content model

Content files contain only data. One activity:

```js
{
  id: '1-1-2',            // stage-lesson-index, globally unique
  type: 'pickOne',        // engine name
  title: 'Was ist ein Monitor?',
  speech: 'Zeig auf den Monitor!',   // spoken + shown
  prompt: 'Zeig auf den Monitor!',
  options: [ … ],         // engine-specific
  answer: 'monitor',
  stars: 1
}
```

A lesson:

```js
{ id: '1-1', title: 'Was ist ein Computer?', goal: '…', activities: ['1-1-1', …] }
```

A stage:

```js
{ id: 1, title: 'Mein Computer', subtitle: '…', color: 'sky',
  achievement: { id: 's1', title: 'Computer-Entdecker', art: 'trophy-blue' },
  lessons: [ … ], milestone: '1-m' }
```

`validateContent()` runs in `selftest.html` and in `tests/content.test.js` and rejects:
duplicate ids, unknown engine, missing `answer` where the engine needs one, an `answer`
not present in `options`, a lesson referencing a missing activity, a stage with zero
lessons, drag targets that accept an id no item provides.

---

## 6. Engines in detail

### 6.1 `explain` — a lesson page

Config: `{ art, speech, points: [string] }` (max 3 short points, ≤ 6 words each).
Renders illustration left/top, points as icon+text rows, one primary button **Weiter**.
Used for every "What is a …" page. The illustration is an animated inline SVG scene.

### 6.2 `pickOne` — click the right thing

Config: `{ prompt, options: [{ id, art, label? }], answer, columns?, deck? }`.
A `deck` is an array of single-item configs (`{prompt, options, answer}`); the engine runs
them in order inside one activity and completes when every item is answered. Milestones
use a deck so they remain one activity for star accounting.

Options render as big cards (min 180×180, 2–3 columns). Click → correct: sparkle, star,
`api.complete`; wrong: card wobbles (300 ms), gentle "Fast! Probier es nochmal.",
attempts + 1, **no** card removal. After 3 attempts the correct card gets a pulsing
ring and Bobby says the answer's name.

### 6.3 `matchPairs` — memory and matching

Config: `{ mode: 'memory' | 'columns', pairs: [{ a: {art,label}, b: {art,label} }] }`.
Memory: 6–8 cards face down, flip two, matched pairs stay open with a soft chime;
unmatched flip back after 900 ms. Columns: left column, right column, click one on each
side; correct pairs fade to a checkmark. Completion when all pairs matched.

### 6.4 `dragDrop` — put it in the right place

Config: `{ items: [{id, art, label, size?}], targets: [{id, art, label, accepts: [itemId]}],
mode: 'bins' | 'slots' }`. `size` is the rendered SVG size in pixels (default 76), used by
the size-sorting activity.
Pointer-based drag with a lifted-card transform (HTML5 DnD is unreliable on trackpads).
Drop on the correct target → item snaps in, `pop` SFX, target glows. Wrong target →
item returns home with a small hop, no penalty.
Fallbacks: click→click, and full keyboard. Multi-item targets (`accepts` with several
ids) are supported for "drag all fruits into the basket".

### 6.5 `target` — mouse aim and reaction

Config: `{ art, count, size: 'xl'|'l'|'m'|'s', moving?: boolean, speed?: number }`.
Spawns `count` targets one at a time at random non-overlapping positions; clicking pops
it (particle burst) and spawns the next. Sizes: xl 160 px → s 70 px. `moving` drifts on
a slow sine path (≤ 140 px/s) and is used only in Stage 2 level 4. Misses (clicks on the
background) do nothing visible — no penalty, no counter.

### 6.6 `keyPress` — find the key

Config: `{ key, pool, layout, count }`. `key` is a single key, `pool` is a list the
drill draws from; every correct press picks a new target (never the same one twice in a
row while alternatives exist). `count` (default 1, max 20) is how many correct presses
finish the drill; Stage 3 uses 10, Stage 4 uses 8. A row of dots and "3 von 10" shows
progress, and a large "Jetzt: K" names the current target so a changing key never
surprises the child. Wrong keys are counted separately (`attempts`) and reach the parent
report, but the child only sees a gentle "noch einmal" — the counter never looks like a
penalty.
Renders a simplified three-row QWERTY keyboard (letters, number row, space, Enter,
Backspace, Shift, arrows) with the target key marked by a pulsing ring. Accepts
`event.key` case-insensitively and `event.code`; prevents Space from scrolling.
Wrong key: keyboard shakes slightly, key that was pressed briefly highlights so the
child sees what happened. 3 attempts → Bobby names the row ("In der Mitte links!").

### 6.7 `typeText` — type letters and words

Config: `{ text: 'CAT', mode: 'letters'|'word'|'free'|'alphabet'|'words', showKeyboard?: boolean }`.
`alphabet` takes `letters: [{ key:'A', art:'apple', word:'Apfel' }]` and presents them as
one activity: one big card per letter showing the capital **and** the lowercase side by
side (Q q), then the child presses that key before the next card appears. The press is
case-insensitive, so both forms count. `words` takes `texts: ['CAT','DOG']` and
runs the word flow several times inside one activity. Everything else renders one big
box per character; the active box pulses. Matching key fills it green with a
`pop`; a non-matching key shows a ghost of that letter and shakes the box — the position
does not advance, so there is no punishment, just a retry. Backspace removes. Correct
case is *not* required (`c` fills `C`). `free` mode accepts anything, offers the stored
name as a suggestion, and saves the last typed name locally if the parent set none.

### 6.8 `countObjects` — numbers and arithmetic

Config: `{ mode: 'count'|'feed'|'match'|'add'|'sub', art, count?, a?, b?, options? }`.

- `count`: objects appear one by one (180 ms stagger), then number buttons 1–10.
- `feed`: Bobby asks for N; child drags exactly N bananas onto his plate.
- `match`: click the numeral matching a shown quantity.
- `add`: two groups with a `+` between, result chosen from buttons; the child can merge
  the groups by clicking them first (visual aid, not required).
- `sub`: a group, N objects fly away on click, result chosen.

### 6.9 `pattern` — what comes next

Config: `{ kind: 'shape'|'color'|'number', sequence: [...], options, answer, layout? }`.
Sequence renders as a row of tiles ending in a dashed `?` slot. With `layout: 'grid'` the
same data renders as a 2×2 square (three tiles plus one `?`), for matrix patterns such as
X O / O X. Options below. Correct → the slot fills and a new sequence may follow (3 rounds
per activity).

### 6.10 `sequence` — put instructions in order

Config: `{ cards: [{id,label,icon}], solution: [id…], layout: 'order'|'slots' }`.
`order`: a shuffled row of cards, child clicks two to swap, then **Prüfen**.
`slots`: numbered empty slots, child taps a slot then a card. Wrong order → cards that
are in the right place get a green check and stay; the rest wobble. No penalty.

### 6.11 `gridRun` — Bobby follows a program

Config:

```js
{ grid: {w,h}, start: {x,y,dir:'E'}, goal: {x,y},
  walls: [[x,y]…], stars: [[x,y]…], requiredStars: 0,
  palette: ['forward','back','left','right','jump','repeat','if','collect'],
  maxBlocks: 6, prefill?: [block…], showRun?: true }
```

Rendering: CSS-grid tile board with Bobby as an inline SVG rotated by `dir`. Program
strip below: blocks as chunky buttons, drag or click to append; each block can be removed
by clicking its ✕. `repeat` opens a small number chooser (2–4) and wraps the next block.
`if` takes a condition card (wall / star) — for the child it reads "Wenn Wand → rechts".
Buttons: **▶ Los**, **⏹ Stop**, **↺ Neu**.

Interpreter: deterministic, synchronous over a step list generated from the program,
then animated at 320 ms per step (instant with reduced motion). Turning does not consume
a move. Rules: walking into a wall stops the run with a soft *bump* and Bobby blinking;
`jump` moves two tiles over a single gap; `collect` picks up a star on the current tile.
Hard cap: 200 executed steps; on overflow the run stops and Bobby says "Das ist eine
ganz schöne lange Reise!" — never a crash.
Success = goal reached and `requiredStars` collected. The run **stops successfully at that
moment**; any blocks after it are ignored, so a child who adds one block too many still
wins. Failure = any end state where the child can edit blocks and press ▶ again; the
wrong program stays on screen, editable. That *is* the debugging lesson.

### 6.12 `puzzle` — slide a picture together

Config: `{ cols: 2|3, rows: 2, art }`. Tiles are shuffled outside the board; drag or
click-swap into place. Snapping is generous (nearest slot within 60 px). Completion when
every tile is in the right slot; the finished picture gets a short "ta-da" scale-in.

### 6.13 `jsDemo` — Stage 8 sandbox

Config: `{ code, viz: 'alert'|'box'|'apples'|'stars'|'function', lineNotes: [string] }`.

A **simulated** interpreter for a deliberately tiny grammar:

```
program   := statement+
statement := 'let' IDENT '=' expr ';'
           | 'alert' '(' (STRING | IDENT) ')' ';'
           | 'function' IDENT '(' ')' '{' statement* '}' IDENT '()' ';'
           | IDENT '()' ';'
expr      := NUMBER | STRING | IDENT | expr ('+'|'-') expr
```

The code is tokenised and walked — **no `eval`, no `Function`**. Execution produces a
list of visual events (`line 1 highlighted`, `variable box "apples" shows 3`, `3 apple
icons appear`, `alert bubble "Hallo!"`). Buttons: **▶ Schritt**, **▶▶ Alles**. A
"Detektiv" toggle explains each line in one German sentence ("Hier packt der Computer
die Zahl 3 in eine Kiste namens apples."). Free typing of code is not offered at this
age; the editor is read-only with a highlighted current line.

### 6.14 `rocket` — falling letters, one rocket

Config: `{ pool: ['a','s','d'], count: 12, speed?: 6.5 }`.

Letters drift down five lanes at ~6.5 % of the board per second — a comfortable
13 seconds from top to bottom. Pressing a matching key launches a rocket from the bottom
of that lane; after ~300 ms the letter bursts into light and counts as a hit. Clicking a
falling letter works too. Reaching `count` hits finishes the activity.

Deliberately missing the arcade conventions: **no lives, no timer, no game over**. A
letter that reaches the bottom fades out and is replaced; nothing is deducted. A key with
no matching letter on screen is counted as a wrong attempt for the parent report and gets
a soft bump, nothing else. Under `prefers-reduced-motion` the letters stand still, so the
game becomes a plain find-and-press drill. Duplicate letters on screen are avoided while
the pool allows it, so two identical targets don't compete.

With `chooseLevel: true` and `levels`, the same engine becomes **Wörter-Rakete**: a setup
overlay offers three levels (single letters → 2-letter chunks → 3-letter words) and three
tempos (Langsam 0.75×, Normal 1×, Schnell 1.35×). The choice is stored in settings, so the
next visit starts where the child left off. Groups are typed character by character; each
correct letter turns green in the pod, and only the last one launches the rocket. Level
speed and lane count come from the level definition, multiplied by the tempo.

---

## 7. Curriculum

Counts below are commitments. `M` = milestone activity (mixed review, 4–6 items from
the stage, no new concepts).

### Stage 1 — Mein Computer (8 lessons, 17 activities incl. M)

| # | Lesson | Activities |
|---|---|---|
| 1 | Was ist ein Computer? | explain scene (desk with computer) + pickOne "Wo ist der Computer?" |
| 2 | Der Monitor | explain + pickOne |
| 3 | Die Tastatur | explain + pickOne |
| 4 | Die Maus | explain + pickOne |
| 5 | Der Laptop | explain + pickOne (laptop vs. desktop) |
| 6 | Lautsprecher & Kamera | explain + pickOne |
| 7 | Was können Computer? | explain (malen, Musik, Fotos, rechnen) + dragDrop parts→desk slots |
| 8 | Wiederholen | matchPairs columns (4 pairs) + memory (4 pairs) |
| M | Stufen-Abschluss | milestone: 5 mixed items |

Achievement: **Computer-Entdecker**.

### Stage 2 — Maus-Abenteuer (7 lessons, 13 activities incl. M)

1. Die Maus bewegen (pointer trail, no clicking) · 2. Der Zeiger (arrow vs. hand:
click the thing that is clickable) · 3. Klicken (`target` xl, 6 stars) ·
4. Doppelklick (double-click a chest to open it) · 5. Halten & Ziehen (`dragDrop`
butterfly→flower, 2 bins) · 6. Ziehen & Ablegen (`dragDrop` fruits→basket, 6 items) ·
7. Scrollen (scroll a tall picture to find Bobby) ·
then levels: `target` l, `target` m, `target` s (moving), `puzzle` 2×2, `tracePath`
(follow a curved path with the pointer, leaving a paint trail) · M.

Achievement: **Maus-Meister**.

### Stage 3 — Tastatur-Abenteuer (8 lessons, 9 activities incl. M)

Was ist eine Tastatur? · Buchstaben finden · Zahlen finden · Leertaste (press to make
Bobby jump) · Enter (open a treasure chest) · Backspace (erase a scribble letter by
letter) · Shift (make a big letter) · Pfeiltasten (steer Bobby through a corridor) ·
M.

Achievement: **Tastatur-Entdecker**.

### Stage 4 — Buchstaben & Tippen (6 lessons, 12 activities incl. M)

| # | Lesson | Content |
|---|---|---|
| 1 | A bis H | `typeText` alphabet deck: 8 letter cards (Apfel, Ball, …) |
| 2 | I bis P | alphabet deck: 8 cards |
| 3 | Q bis Z | alphabet deck: 10 cards |
| 4 | Groß und klein | 2 × `matchPairs` columns, A↔a … |
| 5 | Finde den Buchstaben | 4 × `keyPress` |
| 6 | Tippe ein Wort | `typeText` words deck (CAT, DOG, SUN, MOM, DAD, BALL, BOOK) + free "Dein Name" |
| M | Wiederholen | 6 mixed items |

Achievement: **Kleiner Tipp-Star**.

### Stage 5 — Zahlen (8 lessons, 9 activities incl. M)

0–5 · 6–10 · 11–20 (recognition + order) · Zählen (countObjects) · Menge ↔ Zahl
(match) · Größer & kleiner · Plus (2+1, 3+2, 2+2 with pictures) · Minus (5−2, 4−1) · M.

Achievement: **Zahlen-Entdecker**.

### Stage 6 — Logik-Spiele (11 lessons, 12 activities incl. M)

1. Anweisungen (`gridRun`, 3 blocks, one straight path) ·
2. Reihenfolge (`sequence`, 3 cards) ·
3. Muster (`pattern` colour, shape, number) ·
4. Was ist anders? (`pickOne`, odd-one-out) + Welcher Weg führt ans Ziel? ·
5. Wenn … dann (`gridRun` with a wall requiring `if wall → right`) ·
6. Wiederholen (`gridRun` with `repeat 3`) ·
7. Muster im Quadrat (`pattern` 2×2 grid: X O / O X) ·
8. Was fliegt, was schwimmt? (`dragDrop` into two categories) ·
9. Groß, mittel, klein (`dragDrop`, items rendered at three sizes) ·
10. Was gehört zusammen? (`pickOne` deck, 4 associations) · M.

Achievement: **Kleines Logik-Genie**.

### Stage 7 — Programmier-Spiele (3 lessons, 16 activities incl. 12 puzzles and M)

Tutorial: 1. Blöcke & Reihenfolge · 2. Drehen · 3. Fehler finden (a prefilled wrong
program is shown; the child fixes it).

| # | Name | Teaches | Blocks |
|---|---|---|---|
| 1 | Geradeaus | sequence | 2 |
| 2 | Zwei Schritte | sequence | 3 |
| 3 | Sammle den Stern | collect | 4 |
| 4 | Einmal rechts | turning | 4 |
| 5 | Um die Ecke | turning | 5 |
| 6 | Zickzack | turning | 6 |
| 7 | Dreimal vor | repeat (3) | 3 |
| 8 | Treppe | repeat (4) + turn | 5 |
| 9 | Wenn Wand, dann rechts | if | 4 |
| 10 | Stern oder Wand | if + collect | 5 |
| 11 | Der Umweg (Reparatur) | debugging, prefilled wrong | 6 |
| 12 | Die große Reise | everything, 5 stars | 9 |

Achievement: **Junior-Programmierer**.

### Stage 8 — Mein erstes JavaScript (6 lessons, 7 activities incl. M)

1. Was ist Code? (explain + analogy: a recipe) ·
2. `alert("Hallo!")` ·
3. Variablen (`let myName = "Anna"` → name appears in a box) ·
4. Zahlen (`let apples = 3` → three apples) ·
5. Rechnen (`let result = 2 + 3` → five stars) ·
6. Funktionen (`function sayHello(){ alert("Hallo!") } sayHello()`) · M.

Each demo is read-only, stepped, and parent-supported; a note is shown to the parent
once: "Diese Stufe ist zum gemeinsamen Anschauen gedacht."

Achievement: **Erste Programmiererin**.

### Stage 9 — Finger-Training (11 lessons + milestone, 12 activities)

Always open, independent of the journey. Typing practice is something you do when you
want to, not after eight stages. It teaches the German keyboard by rows: home row
**ASDF · JKL**, top row **QW … OP**, and the bottom-row reach **M N**, then mixes them
into short words.

| # | Lesson | Content |
|---|---|---|
| 1 | So liegen die Finger | posture + home row (explain) |
| 2 | Linke Hand | `asdf`, `fdsa`, `as`, `df` |
| 3 | Rechte Hand | `jkl`, `lkj`, `jk`, `kl` |
| 4 | Beide Hände | `fj`, `dk`, `sl`, `aj` |
| 5 | Kleine Wörter | `als`, `das`, `lass`, `fall` |
| 6 | Oben links: Q W | `qw`, `wq`, `qwqw`, `qwas` |
| 7 | Oben rechts: O P | `op`, `po`, `opop`, `opkl` |
| 8 | Unten: M N | `mn`, `nm`, `mnmn`, `mama`, `mann` |
| 9 | Gemischt | `qwas`, `opmn`, `hand`, `mond`, `plan` |
| 10 | Sternen-Rakete | falling letters `a s d f j k l`, 12 hits |
| 11 | Wörter-Rakete | Level + Tempo, groups `as` / `das`, 8 hits |
| M | Finger-Prüfung | `qwas`, `opmn`, `mond`, `plan`, `hand` |

Every screen shows both hands with the responsible finger glowing, plus a three-row
QWERTZ keyboard where the keys already learned are coloured by finger and the rest are
greyed out. **The finger is a hint, never a check** — the game cannot know which finger
was used, and at five it should not care. Only keys that appear in the lesson are
clickable, so the on-screen fallback cannot accidentally jump ahead. `Ö` and the rest of
the keyboard are visible but not required, so a non-German layout still finishes.

Achievement: **Tipp-Profi**.

---

## 8. Progress model

Storage key `belaschule.v1`, single JSON object with a **profiles map from day one**. Only
one profile exists unless a parent adds another; the map shape is what avoids a migration
later.

```js
{
  version: 1,
  createdAt: 1732200000000,
  updatedAt: 1732200000000,
  activeProfile: "p1",
  settings: { sound: true, speech: true, effects: true, reducedMotion: false },
  profiles: {
    "p1": {
      id: "p1",
      name: "",                      // optional first name, set by parent
      language: "de",                // 'de' | 'en' – per child
      createdAt: 1732200000000,
      stages: {
        "1": {
          lessons: {
            "1-1": { done: true, attempts: 3, correct: 5, ms: 240000,
                     lastAt: 1732…, completed: ["1-1-1", "1-1-2"],
                     times: { "1-1-1": 95000, "1-1-2": 145000 } }
          },
          milestone: { done: false }
        }
      },
      stars: 12,
      achievements: ["s1"],
      lastLesson: "1-3",
      unlocked: [1, 2],
      unlockAll: false,
      stats: { playMs: 7320000, sessions: 9, correct: 143, attempts: 168 }
    }
  }
}
```

`settings` is deliberately global: one speaker, one mute button, one child at the
keyboard. Everything else is per profile, so two children never share stars or unlocks.

### 8.1 API (`core/progress.js`)

| function | behaviour |
|---|---|
| `load()` | read + validate + migrate; on any error → fresh state, keep a copy under `belaschule.broken` |
| `save()` | write; catch `QuotaExceededError` and continue in memory, no dialog |
| `state()` | frozen snapshot for reading (whole object) |
| `profile()` | frozen snapshot of the active profile |
| `listProfiles()` | `[{id, name, stars}]` in creation order |
| `addProfile(name)` | creates `p<N>` with a fresh profile, makes it active |
| `setActiveProfile(id)` | switches; unknown id is a no-op |
| `renameProfile(id, name)` | trims to 20 characters |
| `setLanguage(lang)` | `'de' | 'en'` on the active profile; other values fall back to `de` |
| `removeProfile(id)` | refuses to remove the last profile |
| `recordAttempt(...)` | increments counters on the active profile |
| `recordOutcome(stage, lesson, corrects, wrongs)` | adds several right and wrong tries at once; used by drills (10 presses, 2 misses) so the parent report shows real accuracy |
| `recordActivityTime(stage, lesson, activityId, ms)` | adds measured play time to `lesson.ms` and `lesson.times[activityId]`; ignores invalid values; informational only |
| `completeActivity(...)` | awards stars **once** per activity id (ledger of completed ids inside the lesson record) |
| `completeLesson(...)` | sets `done`, updates `lastLesson`, checks milestone/achievement |
| `awardStars(n)` | adds, never subtracts |
| `isUnlocked(stageId)` | `unlockAll || unlocked.includes(stageId)` |
| `setUnlockAll(bool)` | parent switch |
| `weakAreas()` | lessons with `correct/attempts < 0.7` and `attempts ≥ 4` |
| `clock.start()/stop()` | active-time accumulation, paused on `visibilitychange` |
| `resetActiveProfile()` | fresh state for the active profile only |
| `resetAll()` | fresh state for the whole app (both confirmed by the caller) |
| `exportJSON()` | pretty-printed string of the whole state, for a `.json` download |
| `importJSON(text)` | validates version + shape; replaces state; returns `{ok, error?}` — never throws |

Import rules: must be valid JSON, `version === 1`, contain at least one profile, and
`activeProfile` must exist in `profiles`; otherwise nothing is changed and the parent sees
"Das ist keine Bela-Sicherung." A successful import replaces everything and the caller
reloads the map.

Stars: 1 per activity on first completion, +2 for the stage milestone, so a fully finished
stage shows `activities + 2` stars. There is no partial credit, no star loss, and replay
never changes the total.

Unlocking: stage 1 and 2 are open from the start (so the child is never blocked on day
one); stage N (≥3) unlocks when the previous stage's milestone is done. `unlockAll`
opens everything. Locked tiles are desaturated with a padlock; tapping them shows Bobby
saying "Frag Mama oder Papa, dann geht es weiter!" — no red, no buzz.

### 8.2 Achievement + milestone flow

Milestone completion → full-screen celebration: confetti (≤ 2 s, skippable), trophy
scale-in, Bobby line, stage-specific praise, **Weiter** and **Zur Karte**. Trophy is
stored and appears in `#/achievements` as a gallery of 8 slots (earned ones coloured,
unearned ones as soft grey silhouettes with "Bald!").

---

## 9. Parent mode

Gear → gate screen: large "Für Erwachsene" heading, one arithmetic question from a pool
(`7 + 5`, `9 − 4`, `6 + 8`…), number pad, no timer, unlimited retries. Wrong answers do
not reveal anything. Passing shows the dashboard; it stays unlocked for the session only.

Dashboard sections:

1. **Wer spielt?** — profile chips (`Mia ★ 41`, `Ben ★ 12`). One profile is created on
   first run and shown without a name as "Kind 1". Buttons: **Kind hinzufügen**,
   **umbenennen**, **entfernen** (disabled for the last profile). Switching changes whose
   stars the map shows; no data is merged.
2. **Überblick** — stars, lessons done / total, active learning time, sessions of the
   active profile.
3. **Stufen** — one row per stage: progress bar, "fertig / angefangen / noch nicht",
   milestone state, and an expandable lesson list with attempts vs. correct plus the
   measured play time of every single activity (collapsed by default).
4. **Übungsbedarf** — top 3 lessons with low accuracy or long time, phrased neutrally.
5. **Einstellungen** — name of the active child, **language per child (Deutsch / English)**,
   **voice picker with "Anhören"**, sound/speech
   toggles, reduced motion, **Alle Stufen freischalten**, **Fortschritt zurücksetzen**
   (two-step confirm; the second screen spells out whether it clears the active child or
   everyone).
6. **Sicherung** — **Fortschritt sichern** downloads `bobby-fortschritt-YYYY-MM-DD.json`
   via a Blob + `<a download>`; **Sicherung laden** opens a file picker, shows
   "Sicherung von <Datum>, <n> Kinder" and only replaces data after a confirmation.
   Import errors never destroy existing progress.
7. **Über diese App** — offline, no data leaves the device unless you download a backup
   yourself, no links.

Nothing on the dashboard is a link to the internet. The only outbound action is a
user-initiated local file download.

---

## 10. Audio and speech

- **Effects** (`audio.js`): Web Audio API, master gain 0.25, `AudioContext` created on
  the first pointer/key event (autoplay policy). Six synthesized sounds: click (short
  square blip), correct (two-note major third), wrong (soft low sine, 120 ms — never
  harsh), star (bell arpeggio), milestone (four-note fanfare), pop (noise burst).
- **Speech** (`speech.js`): `speechSynthesis`, language follows the child (`de-DE` or
  `en-GB`), rate 0.95, pitch 1.0.
  The voice is ranked automatically: German before anything else, `Enhanced`/`Premium`/
  `Neural` and Google voices above compact ones, novelty voices (Grandma, Rocko, …)
  excluded. The parent can override the choice in settings; the URI persists. Each
  `say()` cancels the previous utterance (children tap fast). If no voice or no API:
  everything still works, text is already on screen, one console warning, no user-visible
  error.
- **Toggle** cycles `an → nur Töne → stumm`; state persists. Visual feedback always
  accompanies sound (a child in a silent room must still know it was right).

---

## 11. Visual design

Pastel, chunky, calm. Tokens in `css/style.css`:

```css
--ink: #3B3355;        /* all body text — contrast 12:1 on cream */
--cream: #FFF8F0;  --sky: #CDE7FF;  --mint: #C8F0DA;
--peach: #FFD9C0;  --lavender: #E3D8FF;  --lemon: #FFF2B2;  --rose: #FFC9D8;
--primary: #5B7CFA; --primary-ink: #fff;      /* only on big action buttons */
--ok: #2FA36B;     --soft-shadow: 0 6px 0 rgba(59,51,85,.14);
--radius: 26px;    --target: 64px;
```

- Type: system rounded stack (`ui-rounded, "SF Pro Rounded", "Nunito", system-ui`),
  body 22 px, headings 34–44 px, buttons 24 px. No external font.
- Buttons: pill, 3 px ink border, drop shadow above; press state moves down 3 px.
- Cards: white, radius 26, 3 px pastel border, no big shadows.
- Bobby: 180 px inline SVG, navy body, mint antenna, rotating eye highlights, blink every
  4–7 s (randomised), wave on welcome. `prefers-reduced-motion` disables idle animation.
- Stage map: winding path of 8 illustrated islands on a pastel sky, zigzag on wide
  screens, single column under 900 px. Island = SVG badge + label + star count + state.
- Motion budget: transforms/opacity only, 180–320 ms, `ease-out`. No flashing, no
  parallax, nothing faster than 3 Hz. Honor `prefers-reduced-motion` globally.
- Layout: max-width 1200 px, 24 px gutters, target 1024×600 first, then up. No hover-only
  affordances.

---

## 12. Accessibility and child safety

- Every interactive element is a `<button>` (or has `role=button` + key handlers), min
  64×64, focus ring 4 px `--primary` with 2 px offset, focus never trapped.
- Drag activities have click and keyboard equivalents (§6.4).
- Feedback regions use `aria-live="polite"`; correct/wrong is conveyed by shape + motion +
  sound, never by colour alone.
- Space/Enter default actions are prevented where they would scroll or submit.
- No `fetch`, `XMLHttpRequest`, `WebSocket`, `import()`, or absolute `http(s)` URLs in
  shipped JS — enforced by `tests/no-network.test.js`.
- No text input that accepts personal data except the optional first name in parent
  settings; it is stored locally and never displayed publicly.
- No time pressure anywhere: no countdowns, no "you were too slow", no time-based score.
  The exercise clock is a plain stopwatch; it never turns red and never ends a task.

---

## 13. Feedback language (German, fixed)

| Moment | Line |
|---|---|
| Welcome | „Hallo, kleine Entdeckerin! Ich bin Bobby. Heute lernen wir etwas Tolles!" |
| Correct | „Super gemacht!" / „Genau!" / „Du bist klasse!" (rotating pool) |
| Wrong | „Fast! Probier es nochmal." / „Kein Problem, noch einmal!" |
| Hint | „Schau mal hier …" |
| Star | „Ein Stern für dich!" |
| Stage done | „Du hast ‚<Stufe>' geschafft! Ich bin so stolz auf dich!" |
| Locked | „Frag Mama oder Papa, dann geht es weiter!" |
| Exit | „Bis bald, kleiner Entdecker!" |

Rules: max 8 words per line, never "falsch", "Fehler", "leider", never a sad face.
No emoji used as the only carrier of meaning.

---

## 14. Error handling and edge cases

| Case | Behaviour |
|---|---|
| LocalStorage unavailable / disabled | app runs in memory, dashboard shows a quiet note "Fortschritt wird nicht gespeichert." |
| Corrupt JSON | fresh state, broken copy kept, no dialog |
| Unknown route / missing activity | redirect home |
| `speechSynthesis` missing | silent, no error UI |
| No German voice | falls back to any voice; if none, silent |
| Double completion (fast double click) | `complete` is idempotent per activity id |
| Space pressed in a key game | `preventDefault`, never scrolls |
| Runaway program | 200-step cap, friendly message, program editable |
| Window resized mid-activity | CSS-only layout, engines re-measure on resize |
| Reload mid-lesson | returns to stage map, completed activities kept |
| Reduced motion | no idle bobbing, no confetti, instant block execution |
| Many sessions | storage stays < 100 KB (fixed-size records) |
| Import of a broken backup | nothing changes, one clear German message |
| Second child on the same device | parent adds a profile; stars and unlocks are separate; settings stay shared |
| Tab hidden or minimised mid-activity | per-activity timing pauses, so the parent report reflects actual play |
| Activity closed without finishing | elapsed time is still recorded once, no completion, no star |

---

## 15. Verification

Three layers. Layer 1 and 2 run with zero dependencies; layer 3 is the manual gate.

### 15.1 Layer 1 — Node unit tests (pure logic, no DOM)

`node --test tests/` (Node ≥ 18, no npm install). Every file under test exposes a Node
export shim, so the same code the browser runs is the code under test.

| Test file | Covers |
|---|---|
| `tests/progress.test.js` | default state with one profile, save/load round-trip, corrupt JSON recovery, unknown version migration, idempotent star awards, unlock rules (progressive + `unlockAll`), milestone/achievement transition, `resetActiveProfile` vs `resetAll`, clock pause on hidden, quota failure does not throw, **profile isolation** (stars and unlocks never leak), add/switch/rename/remove profile (last one protected), **export→import round-trip**, import of garbage / wrong version / unknown active profile returns `{ok:false}` and changes nothing, **per-activity time accumulation and isolation**, invalid durations ignored, **multi-attempt outcome (10 right + 4 wrong) accuracy** |
| `tests/content.test.js` | loads all 9 stage files; every activity id unique; every `type` is a registered engine; `answer` present and inside `options`; every lesson id resolves; every activity belongs to exactly one lesson; no string matches `/coming soon|platzhalter|TODO/i`; total activity count matches the spec table; every stage has an achievement and a milestone |
| `tests/content-en.test.js` | English overlay: every stage/lesson/activity resolves in English, lexicon translates option/item/target labels, English alphabet (Q = Queen) and words (CAT), Bobby has English lines, switching back restores German |
| `tests/grid.test.js` | `gridRun` interpreter: forward/back/turn, wall bump, jump over gap, collect, `repeat n` expansion, `if wall` condition, 200-step cap returns `{ok:false, reason:'cap'}`, `requiredStars` |
| `tests/typing.test.js` | `typeText` matcher: case folding, wrong key does not advance, backspace, alphabet deck sequencing, word deck completion counting |
| `tests/jsdemo.test.js` | simulated JS: parses the six demo programs, produces the expected visual event sequence, rejects `alert(1); alert(2);` unknown constructs, **never** calls `eval`/`Function` (also asserted by source scan) |
| `tests/speech.test.js` | voice ranking: Enhanced beats compact, de-DE beats de-AT, novelty voices are excluded, English voices rejected |
| `tests/counting.test.js` | `countObjects` arithmetic: `add`, `sub`, answer option generation, never negative results |
| `tests/no-network.test.js` | scans every shipped `.js`/`.html` for `fetch(`, `XMLHttpRequest`, `WebSocket`, `import(`, `<script src="http`, `<link href="http`, and bare `https?://` URLs (whitelisted: comments in LICENSE/README) |

### 15.2 Layer 2 — In-browser self-test (all 103 activities)

`selftest.html` loads the real app, then for **every activity in every stage**:

1. mounts it in a real container,
2. asserts the expected interactive elements exist (buttons with accessible names),
3. calls the engine's `solveForTest(root)` — deliberately wrong once where cheap, to
   assert no completion fires on a wrong answer, then correctly,
4. asserts `api.complete` fired exactly once with `stars === 1`,
5. destroys the engine and asserts no timers/listeners remain (double `destroy()`).

Then it mounts every screen (`#/`, each stage, `#/achievements`, `#/parent`) and asserts
no uncaught error. Output is a table **Gesamt: 219/219 ok** (107 German + 107 English
activities plus 5 screens); any failure prints the
activity id and the reason. It is not linked from the child UI.

Contract additions in §4.3 that this depends on: every engine must implement
`solveForTest(root)` and every content entry must be reachable from a lesson.

### 15.3 Layer 3 — Manual acceptance (README checklist)

- First run from `file://` in Chrome and Safari, console clean.
- Full mouse-only pass through Stages 1–2; full keyboard-only pass through Stage 3.
- Sound off: every feedback still visible.
- Reload mid-lesson: progress kept, returns to map.
- 1024×600 and 1920×1080 layouts.
- Parent gate: wrong answer reveals nothing; reset works; unlock-all works.
- Stage 7 puzzle 12 solvable; Stage 8 all six demos step correctly.

### 15.4 Optional contributor tooling

`tests/e2e/smoke.spec.js` (Playwright) is included for CI-minded contributors and
documented in `README.md` under "Für Entwickler": `npm i -D @playwright/test && npx
playwright test`. It drives `selftest.html` and the parent gate in a real browser.
It is **not** required to run or modify the app.

---

## 16. Build phases

| Phase | Deliverable | Done when |
|---|---|---|
| 1 Foundation | shell, tokens, router, Bobby, map, progress, parent gate | map renders 8 stages, progress survives reload |
| 2 Basic skills | Stages 1–3 + `explain`, `pickOne`, `matchPairs`, `dragDrop`, `target`, `keyPress` | 3 stages playable end-to-end |
| 3 Literacy & maths | Stages 4–5 + `typeText`, `countObjects` | letter cards, word typing, counting work |
| 4 Logic | Stage 6 + `pattern`, `sequence`, `gridRun` | 12 logic activities playable |
| 5 Programming | Stage 7 editor + 12 puzzles, Stage 8 `jsDemo` | puzzle 12 solvable, all demos step |
| 6 Finalisation | achievements, dashboard polish, selftest, docs | all tests + manual checklist green |

Each phase ends with a playable app; no phase leaves a half-wired button.

---

## 17. Acceptance criteria (project level)

- Double-click `index.html` (Chrome/Safari/Firefox) → app opens with no console errors.
- All 9 stages contain the activities listed in §7, all reachable, all completable.
- Stage 9 is reachable on a fresh install without unlocking anything.
- Every "Weiter" goes somewhere; every Back/Home returns without losing progress.
- Progress, settings, stars and achievements survive reload and are reset only on request.
- Parent gate cannot be passed by a 5-year-old by accident (arithmetic + small target).
- A second profile starts at zero and does not change the first child's stars, unlocks or
  achievements; export → reset → import restores the exact state.
- No network request, no external link, no external asset.
- All tests green; `selftest.html` shows 100 %.
- README lets a non-technical parent start, reset and add nothing by accident.

---

## 18. Deviations from the original briefing

1. **File tree** extended (§4.2) to keep content and logic separate, per briefing §11.
2. **Stage 8** uses a simulator instead of real `eval` — a 5-year-old cannot debug real
   code, and executing arbitrary JS in a child's browser is unsafe.
3. **Stages unlock progressively** (1–2 open from day one) with a parent "unlock all"
   switch, rather than the briefing's implicit "nothing locked": the briefing asks for
   visible locked states *and* no rigid schedule; this satisfies both.
4. **Sounds are synthesized**, not shipped as files: no licensing, no download size,
   instant. `assets/sounds/README.md` explains how to drop in real samples.
5. **`assets/images/` holds only logo and favicon**; all illustration is inline SVG so it
   can animate and recolour without extra requests.
6. **`tracePath`** is mentioned in Stage 2 but implemented inside `target.js` as a pointer
   trail mode rather than a 14th engine.
7. **Node.js is a test runner only.** Tests live in `tests/` and run with `node --test`
   (zero dependencies). The app itself is not generated and not bundled: the shipped
   HTML/CSS/JS is final and runs by double-click. A build step would add a way for the
   project to break between "works here" and "opens for the child".
8. **A ninth stage, always open.** Finger training lives outside the eight-stage journey
   because typing practice should be available on day one, not after Stage 8. It teaches
   the home row with an advisory finger hint — never a finger check, which a browser
   cannot perform and a five-year-old should not be graded on.
9. **Two languages, per child.** German remains the source in `content/stage*.js`; English
   is an overlay in `content/en.js` keyed by stage/lesson/activity id plus a small label
   lexicon, applied at boot and on every language switch. `profiles.p.language` stores the
   choice. **All nine stages are translated**, including English alphabet words (Q = Queen),
   typing words (CAT, DOG) and a QWERTY keyboard in Stage 9. There is no in-activity
   language toggle — a child should not switch languages mid-exercise.

---

## 19. Open items for review

- German informal address: the app says „du" throughout (decided) — confirm.
- The child is addressed as „kleine Entdeckerin" until a parent enters a name. If the
  child's grammatical gender should differ, say so and the copy changes in one place
  (`bobby-lines.js`).
