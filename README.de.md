# Bela Learning

**Eine erste Computer-Schule für Kinder — von Eltern gebaut, für Eltern offen.**

Bela Learning ist eine kleine Offline-Lernplattform für Kinder ab etwa 5 Jahren:
Computer, Maus, Tastatur, Buchstaben, Zahlen, Logik, Programmieren mit Blöcken und ein
vorsichtiger erster Blick auf JavaScript. Bobby, der Roboter, begleitet durch neun Stufen.

Alles läuft im Browser aus einem Ordner. Kein Konto, kein Server, keine Werbung,
kein Tracking.

Die App heißt **Bela**. Der Name des Kindes wird in Begrüßungen und im Elternbereich
verwendet, nicht als Produktname.

> **English: [README.md](README.md)** · Die App ist vollständig **deutsch und englisch**,
> die Sprache wird pro Kind gewählt.

---

## Warum es das gibt

Die meisten Lern-Apps für Fünfjährige sind entweder Videos mit Quiz oder Abos, die Daten
sammeln. Diese hier ist:

- **offline** — keine Netzwerkanfragen, per Test abgesichert,
- **ohne Strafe** — keine Countdowns, keine Leben, kein „Game over“, kein Punkteverlust,
- **lokal** — Fortschritt bleibt im Browser, keine personenbezogenen Daten verlassen das Gerät,
- **erweiterbar** — Lektionen sind Daten, Spiele kleine Module, kein Framework, kein Build.

Sie ist außerdem eine **Plattform**: Die neun Stufen sind Inhalt, kein Code. Eltern und
Lehrkräfte können eine Lektion in einer Textdatei ergänzen oder ein ganzes Spiel in einer
JavaScript-Datei hinzufügen.

---

## Ausprobieren

1. Ordner herunterladen.
2. Doppelklick auf **`index.html`**.

Fertig. Keine Installation, kein Build, kein Terminal. Läuft in aktuellem Chrome, Safari,
Edge und Firefox auf macOS, Windows und Linux.

Für die Entwicklung ist ein lokaler Server bequem (aber nie nötig):

```bash
python3 -m http.server 8080
# http://localhost:8080 öffnen
```

---

## Kinder einrichten (erster Start)

Profile lassen sich in der App anlegen (**Zahnrad → Wer spielt? → Kind hinzufügen**), aber
auch vor dem allerersten Start:

```bash
./setup.sh
```

Der Assistent schreibt **`bela.config.json`** und erzeugt **`js/config/seed.js`** neu.

```json
{
  "version": 1,
  "activeProfile": "p2",
  "profiles": [
    { "id": "p1", "name": "Mia", "language": "de", "unlockAll": false },
    { "id": "p2", "name": "Ben", "language": "en", "unlockAll": true }
  ]
}
```

Das Seed gilt **nur, wenn der Browser noch keinen Fortschritt gespeichert hat**. Vorhandene
Daten haben immer Vorrang; Sterne und Lektionen werden nie vorbelegt — jedes Kind startet
bei null.

Warum eine erzeugte JS-Datei? Browser dürfen auf `file://` keine lokale JSON-Datei lesen.
Das Skript macht daraus ein kleines `window.BELA_SEED`, damit die App weiter per Doppelklick
läuft. Die JSON-Datei bleibt die bearbeitbare Quelle:

```bash
# nach dem Bearbeiten von bela.config.json
npm run seed
```

→ Details, Klassenzimmer-Hinweise und Fehlersuche: **[docs/SETUP.md](docs/SETUP.md)**

---

## Was drin ist

| | |
|---|---|
| **9 Stufen** | Computer, Maus, Tastatur, Buchstaben & Tippen, Zahlen, Logik, Blockprogrammierung, erstes JavaScript, Finger-Training |
| **107 Aktivitäten** | jede spielbar, keine Platzhalter |
| **15 Spielarten** | Erklären, Auswahl, Memory, Ziehen, Ziel, Taste, Tippen, Grundreihe, Rakete, Zählen, Muster, Reihenfolge, Blockläufer, Puzzle, JS-Demo |
| **2 Sprachen** | Deutsch und Englisch, pro Kind |
| **Elternbereich** | Fortschritt, Übungsbedarf, Zeit pro Aufgabe, Profile, Sicherung, Zurücksetzen |
| **Keine Abhängigkeiten** | kein npm install zum Spielen oder Testen |

Stufe 9 (Finger-Training) ist absichtlich immer offen — Tippen übt man, wann man will.

---

## Eigenes Spiel hinzufügen

### 1. Lektion ergänzen (ohne JavaScript)

Lektionen sind Daten in `js/content/stageN.js`. Englische Fassung in
`js/content/en.js` ergänzen, `npm test`, fertig.

→ **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)**

### 2. Neue Spielart (eine JavaScript-Datei)

Ein Spiel ist ein Objekt mit `mount(container, config, api)`, das
`{ destroy, solveForTest }` zurückgibt. Vorlage: **[docs/engine-template.js](docs/engine-template.js)**.

→ Vertrag: **[docs/ENGINE-GUIDE.md](docs/ENGINE-GUIDE.md)** (englisch)

Jedes Spiel muss ohne Maus lösbar, per Tastatur bedienbar sein und Fehler nicht bestrafen.
Das ist keine Empfehlung: Der Selbsttest prüft es.

---

## Aufbau in einer Minute

```
index.html            Manifest: lädt Core, Inhalte, Engines (klassische Skripte, kein Build)
bela.config.json      Kinder und Vorgaben für den ersten Start (bearbeitbar)
js/config/seed.js     daraus erzeugt (file:// kann kein JSON laden)
tools/                Setup-Assistent + Seed-Builder
css/style.css         Design-Tokens + alle Komponenten
js/core/              App, Router, Fortschritt, Ton, Sprache, i18n, UI-Helfer
js/content/           Lektionen als Daten (deutsch) + englische Schicht + Bobby-Sätze
js/engines/           eine Datei pro Spielart, gleicher mount()-Vertrag
js/dev/selftest.js    spielt jede Aufgabe in beiden Sprachen automatisch
tests/                Node-Testrunner, keine Abhängigkeiten
docs/                 Leitfäden und die ursprüngliche Design-Spezifikation
```

Warum klassische Skripte statt ES-Module? Weil `file://` Module blockiert. Die App muss
per Doppelklick auf dem Laptop eines Elternteils starten.

Der Fortschritt liegt in `localStorage` unter `belaschule.v1`, mit Profilen pro Kind und
JSON-Sicherung im Elternbereich.

---

## Tests

**Tests sind Pflicht für jede Änderung**, auch für Lektionen und Übersetzungen. Die
vollständige Richtlinie steht in **[docs/TESTING.md](docs/TESTING.md)**.

```bash
npm test          # 87 Unit-Tests, Node 18+
```

Danach **`selftest.html`** im Browser öffnen (oder über Playwright MCP, siehe Anleitung).
Es spielt jede Aufgabe in beiden Sprachen automatisch durch und baut jeden Bildschirm:

```
Alles gut – Gesamt: 219/219 ok
```

Ein Beitrag ist erst fertig, wenn beides grün ist und die exakten Ergebnisse im Pull
Request stehen. Für UI-Änderungen ist Browser-Automatisierung nicht optional: Unit-Tests
erkennen nicht, ob ein Knopf noch etwas tut.

Optional: `npm run hooks` einmal pro Klon ausführen, dann laufen Syntaxprüfung und
Unit-Tests vor jedem lokalen Commit (ca. 1–2 s). Die Browser-Ebene bleibt in der CI.

### CI und Merge-Sperre

Jeder **gepushte Commit auf jedem Branch** durchläuft `.github/workflows/ci.yml` (Pull
Requests zusätzlich gegen den Head-Commit): Syntax + Unit-Tests, Playwright und den
Selbsttest, zusammengefasst im Check **`ci-success`**. Damit ein Merge wirklich blockiert
wird, muss ein Admin diesen Check in den Branch-Regeln verlangen –
**[docs/BRANCH-PROTECTION.md](docs/BRANCH-PROTECTION.md)**. Ein Workflow allein kann keinen
Merge verhindern.

---

## Ton und Stimme

Es gibt keine Audiodateien. Zwei lokale Quellen:

- **Geräusche** werden live mit der Web Audio API erzeugt (kurze Oszillator-Töne für
  Klick, richtig, falsch, Stern, Meilenstein, Pop, Bump), über einen Master-Gain von 0,25.
  Der Audio-Kontext wird beim ersten Tippen entsperrt.
- **Bobbys Stimme** kommt aus der `speechSynthesis` des Browsers mit einer Stimme des
  Betriebssystems, `de-DE` oder `en-GB` je nach Kind, Rate 0,95, Pitch 1,0. Fehlt eine
  Stimme, ist die App stumm, aber vollständig nutzbar – jeder Satz steht auch auf dem
  Bildschirm.

Der Lautsprecher-Knopf schaltet **an → nur Töne → stumm**; im Elternbereich lassen sich
Geräusche und Vorlesen getrennt schalten und eine Stimme wählen. Die visuelle Rückmeldung
hängt nie vom Ton ab.

→ Details für Mitwirkende: **[docs/AUDIO.md](docs/AUDIO.md)**

---

## Sprachen

- Deutsch ist die Quellsprache in `content/stage*.js`.
- Englisch liegt als Schicht in `content/en.js`, nach Stufen-/Lektions-/Aktivitäts-ID,
  plus ein kleines Wörterbuch für Beschriftungen.
- Die Sprache ist eine **Einstellung pro Kind** (`profiles.p1.language`), kein Umschalter
  mitten im Spiel.
- Die Stimme kommt vom Betriebssystem (`de-DE` / `en-GB`); fehlt sie, ist die App stumm,
  aber vollständig nutzbar.

Eine dritte Sprache braucht nur eine weitere Übersetzungsdatei und ein Wörterbuch.

---

## Datenschutz und Kindersicherheit

- Kein `fetch`, kein XHR, kein WebSocket, keine externen Links, keine Schriften oder Bilder
  aus dem Netz. `tests/no-network.test.js` prüft jede ausgelieferte Datei.
- Keine Konten, keine Analyse, kein Chat, keine sozialen Funktionen.
- Einzige gespeicherte persönliche Angabe: ein optionaler Vorname, auf diesem Gerät.
- Fehler werden nie bestraft. Keine Uhr beendet eine Aufgabe.

---

## Fahrplan

- **[Altersgruppen](docs/TODO-age-groups.md)** — Vorschlag, wie eine Installation
  Geschwister und ältere Kinder bedienen kann: Altersbänder, Schwierigkeit, Inhalts-Pakete.
  Noch nichts umgesetzt; die Datei enthält Entscheidungen, Phasen und offene Fragen.

---

## Mitmachen

Lies **[CONTRIBUTING.md](CONTRIBUTING.md)** (englisch). Kurz:

1. Forken, Branch anlegen.
2. Inhalt oder Spiel ergänzen, mit englischem Text.
3. `npm test` und `selftest.html` müssen grün sein.
4. Pull Request mit der Beschreibung, was ein Kind dabei lernt.

Immer willkommen: neue Spielarten, Übersetzungen, Barrierefreiheit, bessere Formulierungen
und Rückmeldungen von echten Fünfjährigen.

---

## Lizenz

MIT — siehe **[LICENSE](LICENSE)**. Benutzen, verändern, ausdrucken, an eine Schule geben.
Namensnennung ist nett, nicht Pflicht.

Bobby, die Stufen und die ersten Lektionen entstanden für ein Kind und wurden dann
geöffnet. Wer etwas ergänzt, bleibt bitte freundlich: Das ist Software für jemanden,
der gerade erst lesen lernt.
