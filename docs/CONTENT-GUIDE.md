# Inhalte ergänzen – Anleitung

> Diese Anleitung ist auf Deutsch. Englische Gegenstücke:
> [ADD-A-GAME.md](ADD-A-GAME.md) (komplettes Beispiel) und
> [ENGINE-GUIDE.md](ENGINE-GUIDE.md) (eine neue Spielart bauen).
> Für Beiträge insgesamt siehe [CONTRIBUTING.md](../CONTRIBUTING.md).

Diese Anleitung richtet sich an Erwachsene, die neue Lektionen, Aufgaben oder ganze
Stufen hinzufügen möchten. Es sind keine Programmierkenntnisse nötig, nur Geduld beim
Kopieren und Ersetzen von Text.

Grundregel: **Inhalte sind Daten, keine Logik.** Eine Aufgabe beschreibt nur, *was*
gefragt wird. Wie das aussieht und wie es sich anfühlt, entscheidet die jeweilige
Spiel-Engine in `js/engines/`.

---

## 1. Wo liegt was

| Datei | Inhalt |
|---|---|
| `js/content/stage1.js` … `stage9.js` | Lektionen und Aufgaben einer Stufe |
| `js/content/words.js` | Wortliste mit Bild und deutschem Wort (CAT, DOG, …) |
| `js/content/bobby-lines.js` | alle Sätze von Bobby (Lob, Ermutigung, Hinweise) |
| `js/engines/*.js` | die Spielarten (z. B. „eins von mehreren anklicken") |
| `js/core/*.js` | App, Navigation, Fortschritt, Ton, Stimme |

Jede Datei meldet sich am globalen Objekt `BelaSchool` an, zum Beispiel:

```js
BelaSchool.content.stage1 = { … };
```

`index.html` lädt die Dateien in einer festen Reihenfolge. Eine neue Content-Datei muss
dort **nach** den Engines und **vor** `app.js` eingetragen werden.

---

## 2. Aufbau einer Aufgabe

```js
{
  id: '1-1-2',                 // eindeutig: stufe-lektion-laufende Nummer
  type: 'pickOne',             // Name der Engine
  title: 'Was ist ein Monitor?',
  speech: 'Zeig auf den Monitor!',   // wird gesprochen UND angezeigt
  prompt: 'Zeig auf den Monitor!',
  options: [
    { id: 'maus', art: 'mouse', label: 'Maus' },
    { id: 'monitor', art: 'monitor', label: 'Monitor' },
    { id: 'tastatur', art: 'keyboard', label: 'Tastatur' }
  ],
  answer: 'monitor',
  stars: 1
}
```

Regeln:

- `id` wird nie wiederverwendet – auch nicht nach dem Löschen einer Aufgabe.
- `answer` muss in `options` vorkommen.
- `speech` und `prompt` sind identisch, solange es keinen guten Grund gibt, sie zu
  trennen. Weniger Text ist besser: höchstens 8 Wörter.
- `art` verweist auf ein Bild aus `js/core/icons.js`. Fehlt ein Bild, zeigt die App ein
  freundliches Fragezeichen – die Aufgabe bleibt spielbar.

### Verfügbare Engines und ihre Felder

| `type` | Wofür | Wichtige Felder |
|---|---|---|
| `explain` | Erklärseite mit Bild | `art`, `points` (max. 3, je ≤ 6 Wörter) |
| `pickOne` | eins von mehreren anklicken | `options`, `answer`, `columns` |
| `matchPairs` | Memory oder Paare verbinden | `mode: 'memory'\|'columns'`, `pairs` |
| `dragDrop` | ziehen und einsortieren | `items`, `targets` (mit `accepts`), `mode` |
| `target` | Ziele anklicken | `art`, `count`, `size`, `moving` |
| `keyPress` | Taste auf der Tastatur finden | `key` oder `pool`, `layout`, `count` |
| `typeText` | Buchstaben/Wörter tippen | `text`, `mode`, `letters`, `texts` |
| `homeRow` | Tippen auf der Grundreihe mit Fingerhinweis | `sequences` |
| `rocket` | Buchstaben fallen, Taste startet eine Rakete | `pool`, `count`, `levels`, `chooseLevel` |
| `countObjects` | zählen und rechnen | `mode`, `art`, `count`, `a`, `b`, `options` |
| `pattern` | Was kommt als Nächstes? | `kind`, `sequence`, `options`, `answer` |
| `sequence` | Reihenfolge herstellen | `cards`, `solution`, `layout` |
| `gridRun` | Bobby läuft ein Programm | `grid`, `start`, `goal`, `palette`, `maxBlocks` |
| `puzzle` | Bild zusammensetzen | `cols`, `rows`, `art` |
| `jsDemo` | JavaScript-Schritt-Demo | `code`, `viz`, `lineNotes` |

Beispiele für jedes Feld stehen in `js/content/stage*.js` – am schnellsten kopiert man
eine ähnliche Aufgabe und ändert Text, Bild und Antwort.

---

## 3. Eine neue Lektion

1. In der passenden `stageN.js` die Lektion ergänzen:

```js
{
  id: '1-9',
  title: 'Der Drucker',
  goal: 'Wir schauen uns den Drucker an.',
  activities: ['1-9-1', '1-9-2']
}
```

2. Die beiden Aufgaben mit denselben IDs anlegen (`1-9-1`, `1-9-2`).
3. Prüfen: `selftest.html` im Browser öffnen. Es erscheint eine Tabelle; jede neue
   Aufgabe muss „ok" zeigen, sonst steht dort der Grund (z. B. „answer not in options").

Eine Lektion sollte 5–10 Minuten dauern, also 2–5 Aufgaben.

---

## 4. Eine neue Stufe

1. `js/content/stage9.js` anlegen, nach dem Muster von `stage8.js`.
2. In `index.html` als Skript eintragen.
3. In `js/core/navigation.js` die Insel in die Karte aufnehmen (Titel, Farbe, Symbol).
4. In `js/core/progress.js` nichts ändern – Stufen werden aus den Content-Daten gezählt.
5. Achievement in `js/content/stage9.js` definieren (`achievement: { id, title, art }`).

Die Karte wächst automatisch mit. Prüfen mit `selftest.html`.

---

## 5. Eine neue Spielart (Engine)

Nur nötig, wenn eine Aufgabe nicht in das Schema einer bestehenden Engine passt. Bitte
zuerst prüfen, ob `pickOne`, `dragDrop` oder `sequence` nicht schon ausreichen.

Eine Engine ist ein Objekt mit genau einer Methode:

```js
BelaSchool.engines.meinSpiel = {
  mount(container, config, api) {
    // DOM aufbauen, Listener registrieren
    return {
      destroy() { /* Listener, Timer, rAF entfernen */ },
      solveForTest() { /* den richtigen Zug programmatisch auslösen */ }
    };
  }
};
```

Pflichten:

1. Nichts außerhalb von `container` verändern.
2. Keinen Fortschritt selbst speichern – dafür `api.complete({ correct, attempts })`
   aufrufen, genau einmal.
3. `destroy()` muss beliebig oft aufrufbar sein.
4. Jede Drag-Aufgabe braucht zusätzlich Klicken-und-Klicken sowie Tastaturbedienung.
5. `solveForTest()` muss die Aufgabe ohne Maus lösen können, sonst schlägt
   `selftest.html` fehl.

---

## 6. Sprache und Ton

- Anrede: immer **„du"**. Kein „Sie".
- Höchstens 8 Wörter pro Satz. Keine Fremdwörter, keine Abkürzungen.
- Nie „falsch", „Fehler", „leider", „noch nicht geschafft".
- Lob wechselt: „Super!", „Genau!", „Du bist klasse!" (siehe `bobby-lines.js`).
- Keine Zeitangaben, keine Zahlen als Druckmittel („nur noch 3 Versuche" ist verboten).
- Farben tragen nie allein eine Bedeutung: immer zusätzlich Form, Symbol oder Ton.

---

## 7. Prüfen, bevor man fertig ist

```bash
npm test                  # Rechenlogik (node --test)
```

Danach `selftest.html` im Browser öffnen. Ganz oben steht entweder „Alles gut" oder eine
Liste der Fehler. Zusätzlich kurz selbst durchspielen:

- Aufgabe einmal absichtlich falsch lösen: Wackelt es freundlich, ohne Strafe?
- Aufgabe mit reiner Tastatur lösen: Tab, Enter, Pfeiltasten.
- Fenster auf 1024 × 600 verkleinern: Passt alles?
- Seite neu laden: Ist der Fortschritt noch da?

---

## 8. Englische Übersetzung

Englisch liegt nicht in `stage*.js`, sondern darüber in `js/content/en.js`:

```js
content.en = {
  lexicon: { 'Tastatur': 'Keyboard', 'Korb': 'Basket' },
  stages: { 1: { title: 'My Computer', subtitle: '…' } },
  lessons: { '1-1': { title: 'What is a computer?', goal: '…' } },
  activities: {
    '1-1-1': { title: 'A computer', speech: '…', prompt: '…', points: ['…'] }
  }
};
```

Regeln:

- Kurze Beschriftungen (Optionen, Ziele, Karten) laufen über `lexicon`; fehlt ein
  Eintrag, bleibt Deutsch stehen.
- Für jede Aktivität muss ein Eintrag existieren. Der Test
  `tests/content-en.test.js` prüft das für alle neun Stufen.
- Sprechzeilen höchstens 8 Wörter, nie negativ.
- Neue Stufe übersetzen: Stufen-, Lektions- und Aktivitäts-IDs in `en.js` ergänzen,
  dann `npm test` und `selftest.html` (erwartet 219/219).
- Die Sprache wird pro Kind im Elternbereich gesetzt (`profiles.p1.language`), nicht
  im Spiel umgeschaltet.

## 9. Was man nicht tun sollte
- Keine externen Bilder, Schriften, Skripte oder Links einbauen. Die App muss offline
  und ohne Netzwerkzugriff funktionieren.
- Keine Inhalte mit Uhrzeit, Countdown oder Wettkampf.
- Keine personenbezogenen Daten außer dem optionalen Vornamen speichern.
- Keine Aufgabe ohne `solveForTest()` – sonst ist nicht bewiesen, dass sie lösbar ist.
