# Add a game — a worked example

Two routes. Most contributions are **route A** (new content, no code). A new game type is
**route B**.

The example is deliberately small: a lesson about heavy and light things. It fits Stage 6
after "Was gehört zusammen?".

---

## Route A — a new lesson with an existing engine

### 1. Add the activity

Open `js/content/stage6.js`. Inside the `lessons` array, after the `6-10` lesson:

```js
{
  id: '6-11',
  title: 'What is heavier?',
  goal: 'Compare two things.',
  activities: [
    {
      id: '6-11-1', type: 'pickOne', title: 'Heavy or light?',
      speech: 'What is heavier?', prompt: 'What is heavier?',
      options: [
        { id: 'elefant', art: 'elefant', label: 'Elephant' },
        { id: 'ball', art: 'ball', label: 'Ball' }
      ],
      answer: 'elefant'
    }
  ]
}
```

Rules the validator enforces:

- `id` is unique and follows `stage-lesson-activity`.
- `answer` exists in `options`.
- `speech` has at most 8 words.
- `type` is one of the registered engines.

### 2. Add translations

Open `i18n/de.js` and add, under `lessons` (repeat for `fr.js`, `it.js`, `zh.js`, `hi.js`, `ne.js`):

```js
'6-11': { title: 'Was ist schwerer?', goal: 'Vergleiche zwei Dinge.' },
```

and under `activities`:

```js
'6-11-1': {
  title: 'Schwer oder leicht?',
  speech: 'Was ist schwerer?',
  prompt: 'Was ist schwerer?'
}
```

Option labels go through the lexicon: `Elephant` and `Ball` are already there. If yours
are not, add them under `lexicon`:

```js
'Elephant': 'Elefant',
```

Then add the same activity in `i18n/fr.js`, `i18n/it.js`, `i18n/zh.js`, `i18n/hi.js` and `i18n/ne.js`.
`tests/i18n-languages.test.js` fails if any overlay misses a stage, lesson or activity.

### 3. Run it

```bash
npm test
```

Open `selftest.html`; the new activity appears and must solve. Play it once yourself —
English and at least two other languages.

### 4. If you added a whole stage

Only then you need:

- `js/content/stage10.js` (copy `stage9.js` as a template),
- a `<script defer>` line in `index.html` **and** `selftest.html`,
- an entry in `tests/content.test.js` (activity counts),
- an achievement and a milestone lesson,
- stage/achievement translations in all six `i18n/*.js` overlays.

---

## Route B — a new game type

### 1. Copy the template

```bash
cp docs/engine-template.js js/engines/myGame.js
```

Rename `engines.exampleButton` to `engines.myGame`. Replace the body of `mount` with your
game. Keep `destroy()` and `solveForTest()`.

### 2. Register it in four places

**`js/content/index.js`**

```js
var ENGINES = ['explain', 'pickOne', …, 'myGame', 'jsDemo'];
```

**`index.html`** and **`selftest.html`**, next to the other engines:

```html
<script defer src="js/engines/myGame.js"></script>
```

### 3. Define the data

```js
{
  id: '6-12-1', type: 'myGame', title: 'Mein Spiel',
  speech: 'Schau genau hin.', prompt: 'Schau genau hin.',
  items: [/* whatever your engine needs */]
}
```

The config is passed to `mount` unchanged. Validate it in `js/content/index.js` if there
is something that must never be missing.

### 4. Add the self-test solver

```js
solveForTest: function (rootElement) {
  var target = rootElement.querySelector('[data-correct="true"]');
  if (target) { target.click(); }
  return NS.ui.wait(50);
}
```

Use the real click/key path. Do not call `api.complete` directly: the harness counts how
many times the engine completes and expects exactly **one**.

### 5. Add a unit test for the logic

Split pure logic out of the DOM:

```js
// inside myGame.js, exported for Node
function scoreOf(answers) { /* … */ }
module.exports = { scoreOf: scoreOf };
```

```js
// tests/myGame.test.js
const test = require('node:test');
const assert = require('node:assert');
const { scoreOf } = require('../js/engines/myGame.js');

test('counts a pair correctly', () => {
  assert.strictEqual(scoreOf(['a', 'a']), 1);
});
```

### 6. Add translations

Add the activity's texts to every `i18n/*.js` overlay. Engine UI strings use:

```js
NS.i18n.t('English', 'Deutsch')
```

### 7. Check the rules

- Click path **and** keyboard path.
- Drag? Also click-select + click-target.
- `destroy()` twice without throwing.
- No timer that ends the task.
- Runs with reduced motion and sound off.
- Works at 1024 × 600.

### 8. Run everything

```bash
npm test
```

Open `selftest.html`. Expected format:

```
6-12-1   myGame   ok
```

Then run the browser smoke tests (Playwright MCP or `npx playwright test`) and play the
activity in English and at least two other languages. The full policy is in [TESTING.md](TESTING.md).

---

## What makes a good game for a five-year-old

- **One decision per screen.** Two or three big targets, not nine.
- **Visible success.** The child should see what she achieved, not only hear it.
- **No dead ends.** If she taps the wrong thing, the game waits.
- **Short sessions.** 5–10 minutes; the activity should be finishable in one sitting.
- **Reuse.** If two activities differ only in words, use one engine and two data objects.
- **Teach one thing.** Recognition, coordination, sequencing — pick one.

If you are unsure, open an issue with a sketch. A rough drawing and one sentence about
what the child learns is enough to start.
