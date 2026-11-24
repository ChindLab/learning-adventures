# First-run setup — children and defaults

This page explains how to configure children **before** the app is opened for the first
time, and how the JSON file, the script and the browser storage relate.

---

## The short version

```bash
./setup.sh
```

Answer the questions (number of children, names, language, unlock-all), then open
`index.html`. That is the intended path.

If you prefer editing files:

1. Edit **`bela.config.json`**.
2. Run **`npm run seed`**.
3. Open `index.html` in a browser that has **no Bela progress yet**.

---

## Files

| File | Role |
|---|---|
| `bela.config.json` | the editable source: children, languages, unlock-all, device settings |
| `tools/setup.js` | interactive wizard; writes the JSON and regenerates the seed |
| `tools/build-seed.js` | validates the JSON and generates `js/config/seed.js` |
| `js/config/seed.js` | generated, loaded by `index.html` on first run |
| `js/core/progress.js` | turns the seed into profiles when `localStorage` is empty |

### Why a generated JS file instead of reading the JSON directly?

Browsers refuse `fetch()` on `file://`. The app must work by double-clicking
`index.html`, so a JSON file cannot be read at runtime. The setup script therefore converts
the JSON into a tiny JS assignment:

```js
window.BELA_SEED = { version: 1, activeProfile: "p2", profiles: [ … ] };
```

The JSON stays the single editable source; the JS file is generated and should not be
edited by hand.

---

## `bela.config.json`

```json
{
  "version": 1,
  "activeProfile": "p2",
  "settings": {
    "sound": true,
    "speech": true,
    "effects": true,
    "reducedMotion": false
  },
  "profiles": [
    { "id": "p1", "name": "Mia", "language": "de", "unlockAll": false },
    { "id": "p2", "name": "Ben", "language": "en", "unlockAll": true }
  ]
}
```

Rules:

- `version` must be `1`.
- 1–8 profiles. More are ignored with a warning from the seed builder.
- `name` is optional, trimmed to 20 characters.
- `language` is `"de"` or `"en"`; anything else becomes `"de"`.
- `id` values are normalised to `p1`, `p2`, … in array order.
- `activeProfile` must be one of the normalised ids; otherwise the first child starts.
- `unlockAll` is per child. Use it for a child who should skip the linear progression.
- `settings` is device-wide (sound, speech, effects, reduced motion). Unknown keys are
  ignored; only booleans are applied.
- Stars, achievements, time and lessons are **never** seeded. Every child starts at zero.

---

## When the seed is used

Only when **all** of these are true:

1. the browser has no `belaschule.v1` entry for this folder/origin (an old
   `belaschule.v1` entry is migrated automatically), and
2. `js/config/seed.js` contains a valid seed, and
3. the app is opened normally (`index.html`), not the self-test.

If the browser already has progress, the seed is ignored completely. That is deliberate:
re-running setup must not overwrite a child's history.

The app does **not** re-seed after **Fortschritt zurücksetzen**; reset means a blank
profile on that device, not a factory reset from the file.

### Applying a new configuration

- **New computer/browser:** just open `index.html`; the seed applies.
- **Same browser, want the new setup:** parent area → reset progress (or clear this site's
  data), then reload. Clearing site data also deletes the old progress; take a backup first.
- **Same browser, keep progress:** do not re-seed. Add children in the parent area instead.

---

## Script options

```bash
./setup.sh            # interactive wizard
./setup.sh --reset    # one unnamed child, German, regenerate the seed
./setup.sh --help     # usage
npm run seed          # regenerate js/config/seed.js after editing the JSON
```

The wizard asks for a browser to be opened at the end; answer `n` if you want to inspect
the files first.

**Node.js 18+** is required for the setup script and the tests. Playing the app never
requires Node.

---

## Classroom / many children

- The app supports up to **8 profiles** per device, which is the practical limit for the
  parent area.
- For a classroom, use one browser profile per device rather than 25 children on one
  laptop. Each device has its own `localStorage`.
- The backup file contains **all** profiles; it can be moved between devices, but loading
  it replaces the destination's profiles.

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Seed ignored | Browser already has `belaschule.v1` (old installations using `belaschule.v1` are migrated automatically). Reset in the parent area or use a fresh browser profile. |
| `Seed error: bela.config.json is not valid JSON` | Fix the comma/quote, run `npm run seed` again. |
| `Setup failed: Interactive setup needs a terminal` | Run `./setup.sh` from a real terminal, not a pipe/CI. |
| No `index.html` opens automatically | Open it manually; the script only tries to help. |
| Children appear in the wrong language | `language` must be `"de"` or `"en"`; anything else falls back to German. |
| More than 8 children in JSON | Only the first 8 are used; split across devices. |

---

## For developers

- Seed logic lives in `normalizeSeed()` / `stateFromSeed()` in `js/core/progress.js`.
- Tests: `tests/seed.test.js` (first run, existing progress wins, invalid seeds, limits).
- If you change the seed schema, bump `version`, update `normalizeSeed`, the JSON example,
  this page and the tests. Update `AGENTS.md` too.
