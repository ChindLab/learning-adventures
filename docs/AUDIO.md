# Sound and speech

Bela Learning has **no audio files**. Everything is produced locally: short synthesized
effects and the operating system's text-to-speech voice. Nothing is downloaded, streamed or
sent anywhere, and `tests/no-network.test.js` enforces that.

Two separate systems, controlled separately.

---

## 1. Effects — `js/core/audio.js`

Effects are built with the Web Audio API: an oscillator, a gain envelope, and a connection
to one master output at **0.25**. The `AudioContext` is created lazily on the first pointer
or key event, because browsers block audio before a user gesture. If the API is missing or
blocked, every call becomes a silent no-op — the app never fails because of sound.

| name | recipe | when |
|---|---|---|
| `click` | 720 Hz square, 50 ms | every button |
| `correct` | sine 523 Hz + 659 Hz | right answer |
| `wrong` | sine slide 300 → 190 Hz, 140 ms | gentle miss |
| `star` | triangle 880 / 1108 / 1318 Hz | reward |
| `milestone` | 523, 659, 784, 1047 Hz arpeggio | stage complete |
| `pop` | square slide 900 → 300 Hz, 80 ms | object placed / popped |
| `bump` | sine slide 160 → 110 Hz | wall, wrong drop |

Why synthesized rather than recorded:

- no files to ship or license,
- zero download, works offline,
- instant, no loading state,
- soft by construction (short, low gain, no harsh noise).

Engines call `api.sfx('name')`; they never touch `AudioContext` directly.

---

## 2. Speech — `js/core/speech.js`

The browser's `speechSynthesis` API reads Bobby's lines with a voice installed in the
operating system. It is text-to-speech, not a recording.

- Language follows the child: `de-DE` or `en-GB` (`speech.setLanguage`).
- Rate **0.95**, pitch **1.0** — slightly slower, no chipmunk effect.
- The previous utterance is cancelled before a new one; children tap fast.
- Voice selection ranks German/English voices by:
  exact language → Enhanced/Premium/Neural → Google → local; novelty voices
  (“Grandma”, “Rocko”, …) are excluded.
- If no matching voice exists, `say()` does nothing. Every line is also visible as text,
  so the app stays fully usable.
- The parent can pick a voice under **Einstellungen → Stimme**; the choice is stored in the
  device settings.

There is no audio queue and no background speech: one line at a time.

---

## 3. Controls

The speaker button in the header cycles three modes:

```
an  →  nur Töne  →  stumm
all →  effects   →  mute
```

- **all** — effects + speech.
- **effects** — effects only; speech disabled.
- **mute** — silence.

Parent settings additionally expose **Ton** (effects) and **Vorlesen** (speech) as
separate switches. `settings.sound`, `settings.effects`, `settings.speech` and
`settings.voiceURI` live in the versioned state object.

Visual feedback never depends on sound: correct/wrong always have a shape, colour and
motion cue as well.

---

## 4. Changing a sound

Edit the `RECIPES` object in `js/core/audio.js`:

```js
correct: function () {
  tone(523, 0, 0.11, 'sine', 0.4);
  tone(659, 0.1, 0.16, 'sine', 0.35);
}
```

Rules:

- Keep it **short** (≤ 250 ms) and quiet (peak ≤ 0.5 before the 0.25 master gain).
- No harsh buzz, no siren, no sudden loud transient.
- Never make sound the only signal that something was right or wrong.
- Do not add a new sound without a reason a child can hear in one second.

To add a name, extend `RECIPES` and use `api.sfx('mySound')` in an engine. Update this
table and the guide if it becomes part of the public API.

### Using real recordings instead

`assets/sounds/` explains how to drop in `.mp3`/`.ogg` files and replace `tone()` with an
`Audio` element. This is optional; if you do it, use only self-recorded or clearly licensed
audio, and keep the synthesized fallback for offline first runs.

---

## 5. Testing audio

Automated tests cannot hear. What they do check:

- no network access in shipped files (`tests/no-network.test.js`),
- speech voice ranking (`tests/speech.test.js`),
- the app builds and completes with speech disabled (`selftest.html`).

Manual checklist:

- Sound on: every correct/wrong/placed action is audible but not startling.
- Sound off (system muted, or app mode `stumm`): every feedback still visible.
- No German voice installed: app runs silently, no console error.
- Rapid clicking: no overlapping speech, no stuck tone.
- Tab hidden: no sound continues.

---

## 6. Why not just use audio files?

They would add licensing questions, download size, loading states and a second source of
truth for every language. Text-to-speech follows the child's language for free, and
oscillators follow the design tokens. For a platform that other parents fork and extend,
“no assets to license” is a feature.
