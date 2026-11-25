# Bela Learning

**A first computer school for children — built by parents, open for parents.**

Bela Learning is a small, offline learning platform for children around 5 years old.
It teaches the computer, mouse, keyboard, letters, numbers and logic, and ends with
visual block programming and a gentle first look at JavaScript. A friendly robot,
Bobby, guides the child through nine stages.

Everything runs in the browser from a folder. No account, no server, no ads, no tracking.

The app is called **Bela**. The child's name is used in greetings and in the parent area,
not as the product name.

> **German: [README.de.md](README.de.md)** · The app itself is fully available in
> **English, German, French, Italian, Simplified Chinese, Hindi and Nepali**, per child.

---

## Why this exists

Most "learn to code" apps for five-year-olds are either videos with a quiz or a
subscription product that collects data. This one is:

- **offline** — no network requests at all, enforced by a test,
- **non-punishing** — no countdowns, no lives, no "game over", no score to lose,
- **local** — progress stays in the browser, no personal data leaves the device,
- **hackable** — lessons are plain data, games are small modules, no framework, no build.

It is also a **platform**: the nine stages are content, not code. Parents and teachers
can add a lesson in a text file, or a whole new game in one JavaScript file.

---

## Try it

1. Download or clone this folder.
2. Double-click **`index.html`**.

That's it. No install, no build, no terminal. Works in current Chrome, Safari, Edge
and Firefox on macOS, Windows and Linux.

For development, a local server is convenient (but never required):

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

---

## Set up your children (first run)

Profiles can be created in the app (**gear → Who is playing? → Add child**), but you can
also prepare them before the first launch:

```bash
./setup.sh
```

The wizard writes **`bela.config.json`** and regenerates **`js/config/seed.js`**.

```json
{
  "version": 1,
  "activeProfile": "p1",
  "profiles": [
    { "id": "p1", "name": "Mia", "language": "en", "unlockAll": false },
    { "id": "p2", "name": "Ben", "language": "de", "unlockAll": true }
  ]
}
```

The seed is applied **only when the browser has no saved progress yet**. Existing data
always wins, and no stars or lessons are seeded — every child starts at zero.

Why a generated JS file? Browsers cannot read a local JSON file from `file://`; the script
turns the JSON into a tiny `window.BELA_SEED` assignment so the app still works by
double-click. The JSON remains the editable source:

```bash
# after editing bela.config.json
npm run seed
```

→ Details, classroom notes and troubleshooting: **[docs/SETUP.md](docs/SETUP.md)**

---

## Live site

**https://chindlab.github.io/learning-adventures/**

The `deploy` job publishes only `index.html`, `css/`, `js/` and `assets/`, and only after
CI (`ci-success`) has passed on `main`. One-time setup and troubleshooting:
**[docs/DEPLOY.md](docs/DEPLOY.md)**.

---

## What is inside

| | |
|---|---|
| **9 stages** | computer, mouse, keyboard, letters & typing, numbers, logic, block programming, first JavaScript, finger training |
| **112 activities** | every one playable, no placeholders |
| **15 game engines** | explain, pick-one, memory, drag & drop, target, key press, typing, home row, rocket typing, counting, patterns, sequences, block runner, puzzle, JS demo |
| **7 languages** | English source + German, French, Italian, Chinese (zh-CN), Hindi, Nepali, chosen per child |
| **Parent area** | progress, weak spots, time per activity, profiles, backup file, reset |
| **Zero dependencies** | no npm install needed to play or to run the tests |

Stage 9 (finger training) is deliberately always open — typing practice shouldn't wait
until the end.

---

## Add your own game

Two levels of contribution:

### 1. Add a lesson (no JavaScript)

Lessons are data in `js/content/stageN.js`:

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

Add the six translations in `i18n/de.js`, `fr.js`, `it.js`, `zh.js`, `hi.js` and `ne.js`, run `npm test`,
done.

→ Full walkthrough: **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)** (German)
and **[docs/ADD-A-GAME.md](docs/ADD-A-GAME.md)** (English).

### 2. Add a new game type (one JavaScript file)

A game is an object with `mount(container, config, api)` that returns
`{ destroy, solveForTest }`. Copy **[docs/engine-template.js](docs/engine-template.js)**,
implement it, register it, and the self-test will play it automatically.

→ Contract and rules: **[docs/ENGINE-GUIDE.md](docs/ENGINE-GUIDE.md)**

Every game must be solvable without a mouse, keyboard-accessible, and must not punish
mistakes. Those are not suggestions — the self-test checks the first one.

---

## Architecture in one minute

```
index.html            manifest: loads core, content, engines (classic scripts, no build)
bela.config.json      first-run children and defaults (editable)
js/config/seed.js     generated from that JSON (file:// cannot fetch JSON)
tools/                setup wizard + seed builder
css/style.css         design tokens + all components
js/core/              app shell, router, progress, audio, speech, i18n, UI helpers
js/content/           lessons as data (English source) + Bobby's lines
i18n/                 translation overlays: de, fr, it, zh, hi, ne (English is the source)
js/engines/           one file per game type; all speak the same mount() contract
js/dev/selftest.js    plays every activity in every language, automatically
tests/                Node's built-in test runner, no dependencies
docs/                 contributor guides and the original design spec
```

Why classic scripts instead of ES modules? Because `file://` blocks module loading.
The app must work by double-clicking a file on a parent's laptop.

Progress lives in `localStorage` under `belaschule.v1`, with per-child profiles and a
JSON backup/restore in the parent area.

---

## Testing

**Tests are mandatory for every change**, including lessons and translations. The full
policy is in **[docs/TESTING.md](docs/TESTING.md)**.

```bash
npm run check     # syntax check + 104 unit tests, Node 18+
```

Then open **`selftest.html`** in a browser (or via Playwright MCP; see the testing guide).
It mounts and auto-solves every activity in all seven languages, then builds every screen:

```
Alles gut – Gesamt: 789/789 ok
```

A contribution is not ready until both are green, and the exact results are pasted into
the pull request. Browser automation is not optional for UI changes: unit tests cannot
tell whether a button still does anything.

Optional: run `npm run hooks` once per clone to execute the syntax check and unit tests
before every local commit (≈1–2 s). The browser layer stays in CI.

### CI and the merge gate

Every **pushed commit on every branch** runs `.github/workflows/ci.yml` (pull requests run
it against their head commit):

- **unit** — syntax check, unit tests, and “generated seed is up to date”
- **browser** — Playwright smoke tests and the full self-test (789/789)
- **ci-success** — the only check branch protection needs

To actually block merges, require **`ci-success`** in the repository settings:
**[docs/BRANCH-PROTECTION.md](docs/BRANCH-PROTECTION.md)** (UI and `gh` commands). A
workflow alone cannot stop a merge.

---

## Sound and speech

No audio files exist. Two local sources:

- **Effects** are synthesized live with the Web Audio API (short oscillator blips for
  click, correct, wrong, star, milestone, pop, bump), through one master gain at 0.25.
  The audio context is unlocked on the first tap.
- **Bobby's voice** uses the browser's `speechSynthesis` with an operating-system voice,
  `en-GB`, `de-DE`, `fr-FR`, `it-IT`, `zh-CN`, `hi-IN` or `ne-NP` depending on the child,
  rate 0.95,
  pitch 1.0. If no voice is
  installed, the app is silent but fully usable — every line is also on screen.

The speaker button cycles **an → nur Töne → stumm**; the parent area can switch effects
and speech separately and pick a voice. Visual feedback never depends on sound.

→ Details for contributors: **[docs/AUDIO.md](docs/AUDIO.md)**

---

## Languages

- English is the source language in `content/stage*.js`.
- Translations live in `i18n/de.js`, `i18n/fr.js`, `i18n/it.js`, `i18n/zh.js`, `i18n/hi.js` and
  `i18n/ne.js`, keyed by
  stage/lesson/activity ID, plus a lexicon for labels and a UI dictionary.
- New profiles default to **English**; the language is a **per-child** setting
  (`profiles.p1.language`), not a runtime toggle.
- Speech uses the operating system voice (`en-GB`, `de-DE`, `fr-FR`, `it-IT`, `zh-CN`, `hi-IN`,
  `ne-NP`); if
  none exists the app is silent but fully usable.

Adding a third language is a matter of one more overlay file and one dictionary — the
architecture does not care how many languages exist.

---

## Privacy and child safety

- No `fetch`, no XHR, no WebSocket, no external links, no fonts or images from the internet.
  `tests/no-network.test.js` scans every shipped file.
- No accounts, no analytics, no chat, no social features.
- The only stored personal data is an optional first name, on this device.
- Mistakes are never punished. There is no timer that ends anything.

---

## Roadmap

- **[Age groups](docs/TODO-age-groups.md)** — a proposal for serving siblings and older
  children from one installation: age bands, difficulty, content packs. Nothing implemented
  yet; the file contains the decisions, the phased plan and the open questions.

Have a look if you want to work on something bigger than a lesson.

---

## Contributing

Read **[CONTRIBUTING.md](CONTRIBUTING.md)**. In short:

1. Fork, create a branch.
2. Add content or a game, with English source and German translation.
3. `npm test` and `selftest.html` must be green.
4. Open a pull request describing what a child learns.

**Using a coding agent?** Point it at **[AGENTS.md](AGENTS.md)** — it contains the
repository map, the non-negotiable rules, the exact registration points for a new game,
and the definition of done.

Ideas that are always welcome: new game types, translations, accessibility fixes,
better German/English wording, and reports from actual five-year-olds.

---

## License

MIT — see **[LICENSE](LICENSE)**. Use it, change it, print it, give it to a school.
Attribution is nice, not required.

Bobby, the stages and the original lessons were built for one child and then opened up.
If you add something, please keep it kind: this is software for someone who is still
learning to read.
