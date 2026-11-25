/**
 * i18n/de.js – German translation (English is the source in js/content/stage*.js).
 *
 * Loaded after the stages and before app.js. Switch a profile to "de" and the
 * localizer applies this overlay; "en" uses the source as-is.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.translations = content.translations || {};
  content.translations.de = {
  "lexicon": {
    "Mouse": "Maus",
    "Speaker": "Lautsprecher",
    "Keyboard": "Tastatur",
    "Camera": "Kamera",
    "Screen": "Bildschirm",
    "Writing": "Schreiben",
    "Pointing": "Zeigen",
    "Listening": "Hören",
    "Keys": "Tasten",
    "Pointer": "Pfeil",
    "On the go": "Unterwegs",
    "Printer": "Drucker",
    "Chest with a button": "Truhe mit Knopf",
    "Picture of a flower": "Bild einer Blume",
    "Butterfly": "Schmetterling",
    "Flower": "Blume",
    "Apple": "Apfel",
    "Banana": "Banane",
    "Basket": "Korb",
    "Space bar": "Leertaste",
    "Turn right": "Rechts drehen",
    "To the star": "Zum Stern",
    "Cat": "Katze",
    "Dog": "Hund",
    "Straight on": "Geradeaus",
    "Around the corner": "Um die Ecke",
    "Bird": "Vogel",
    "Fish": "Fisch",
    "Jellyfish": "Qualle",
    "Flies": "Fliegt",
    "Swims": "Schwimmt",
    "big circle": "großer Kreis",
    "big square": "großes Quadrat",
    "medium circle": "mittlerer Kreis",
    "medium square": "mittleres Quadrat",
    "small circle": "kleiner Kreis",
    "small square": "kleines Quadrat",
    "Big": "Groß",
    "Medium": "Mittel",
    "Easy": "Leicht",
    "Hard": "Schwer",
    "Small": "Klein"
  },
  "achievements": {
    "s1": "Computer-Entdecker",
    "s2": "Maus-Meister",
    "s3": "Tastatur-Entdecker",
    "s4": "Kleiner Tipp-Star",
    "s5": "Zahlen-Entdecker",
    "s6": "Kleines Logik-Genie",
    "s7": "Junior-Programmierer",
    "s8": "Erste Programmiererin",
    "s9": "Tipp-Profi"
  },
  "stages": {
    "1": {
      "title": "Mein Computer",
      "subtitle": "Was ist ein Computer und was gehört dazu?"
    },
    "2": {
      "title": "Maus-Abenteuer",
      "subtitle": "Zeigen, klicken, ziehen, scrollen."
    },
    "3": {
      "title": "Tastatur-Abenteuer",
      "subtitle": "Finde die richtige Taste."
    },
    "4": {
      "title": "Buchstaben & Tippen",
      "subtitle": "Von A bis Z und die ersten Wörter."
    },
    "5": {
      "title": "Zahlen",
      "subtitle": "Zählen, vergleichen, plus und minus."
    },
    "6": {
      "title": "Logik-Spiele",
      "subtitle": "Anweisungen, Muster und clevere Wege."
    },
    "7": {
      "title": "Programmier-Spiele",
      "subtitle": "Bobby läuft, was du ihm sagst."
    },
    "8": {
      "title": "Mein erstes JavaScript",
      "subtitle": "Was Code ist und was er macht."
    },
    "9": {
      "title": "Finger-Training",
      "subtitle": "Tippen mit allen Fingern, ganz ohne Eile."
    }
  },
  "lessons": {
    "1-1": {
      "title": "Was ist ein Computer?",
      "goal": "Wir schauen uns einen Computer an."
    },
    "1-2": {
      "title": "Der Monitor",
      "goal": "Der Monitor zeigt uns Bilder."
    },
    "1-3": {
      "title": "Die Tastatur",
      "goal": "Mit der Tastatur schreiben wir."
    },
    "1-4": {
      "title": "Die Maus",
      "goal": "Mit der Maus zeigst du auf Dinge."
    },
    "1-5": {
      "title": "Der Laptop",
      "goal": "Ein Laptop ist ein Computer zum Mitnehmen."
    },
    "1-6": {
      "title": "Lautsprecher und Kamera",
      "goal": "Computer können hören und sprechen."
    },
    "1-7": {
      "title": "Was können Computer?",
      "goal": "Computer können malen, rechnen und Musik machen."
    },
    "1-8": {
      "title": "Alles wiederholen",
      "goal": "Wir erinnern uns an alle Teile."
    },
    "1-m": {
      "title": "Stufen-Abschluss",
      "goal": "Zeig, was du schon weißt."
    },
    "2-1": {
      "title": "Die Maus bewegen",
      "goal": "Fahre mit dem Zeiger an der Linie entlang."
    },
    "2-2": {
      "title": "Der Zeiger",
      "goal": "Manche Dinge kann man anklicken."
    },
    "2-3": {
      "title": "Klicken",
      "goal": "Klicke die Sterne an."
    },
    "2-4": {
      "title": "Doppelklick",
      "goal": "Zwei schnelle Klicks öffnen die Truhe."
    },
    "2-5": {
      "title": "Halten und ziehen",
      "goal": "Ziehe den Schmetterling zur Blume."
    },
    "2-6": {
      "title": "Ziehen und ablegen",
      "goal": "Lege alle Früchte in den Korb."
    },
    "2-7": {
      "title": "Scrollen",
      "goal": "Scrolle nach unten und finde Bobby."
    },
    "2-8": {
      "title": "Maus-Meister werden",
      "goal": "Vier Spiele für ruhige Hände."
    },
    "2-m": {
      "title": "Stufen-Abschluss",
      "goal": "Ein letztes Bild für echte Maus-Meister."
    },
    "3-1": {
      "title": "Was ist eine Tastatur?",
      "goal": "Finde zehn Buchstaben auf der Tastatur."
    },
    "3-2": {
      "title": "Zahlen finden",
      "goal": "Finde zehn Zahlen auf der Tastatur."
    },
    "3-3": {
      "title": "Die Leertaste",
      "goal": "Die Leertaste macht Bobby hüpfen."
    },
    "3-4": {
      "title": "Die Enter-Taste",
      "goal": "Enter öffnet die Truhe."
    },
    "3-5": {
      "title": "Die Backspace-Taste",
      "goal": "Backspace löscht einen Buchstaben."
    },
    "3-6": {
      "title": "Die Shift-Taste",
      "goal": "Shift macht große Buchstaben."
    },
    "3-7": {
      "title": "Die Pfeiltasten",
      "goal": "Mit Pfeilen bewegt sich Bobby."
    },
    "3-8": {
      "title": "Alles noch einmal",
      "goal": "Buchstaben, Zahlen und Tasten gemischt."
    },
    "3-m": {
      "title": "Stufen-Abschluss",
      "goal": "Zeig, welche Taste was macht."
    },
    "4-1": {
      "title": "A bis H",
      "goal": "Acht Buchstaben mit Bildern."
    },
    "4-2": {
      "title": "I bis P",
      "goal": "Acht weitere Buchstaben."
    },
    "4-3": {
      "title": "Q bis Z",
      "goal": "Die letzten Buchstaben."
    },
    "4-4": {
      "title": "Groß und klein",
      "goal": "A und a gehören zusammen."
    },
    "4-5": {
      "title": "Finde den Buchstaben",
      "goal": "Vier Buchstaben auf der Tastatur."
    },
    "4-6": {
      "title": "Tippe ein Wort",
      "goal": "Sieben kleine Wörter und dein Name."
    },
    "4-m": {
      "title": "Stufen-Abschluss",
      "goal": "Drei Wörter ohne Hilfe."
    },
    "5-1": {
      "title": "Zahlen von 0 bis 5",
      "goal": "Zähle die Äpfel."
    },
    "5-2": {
      "title": "Zahlen von 6 bis 10",
      "goal": "Jetzt werden es mehr."
    },
    "5-3": {
      "title": "Zahlen von 11 bis 20",
      "goal": "Auch große Mengen kann man zählen."
    },
    "5-4": {
      "title": "Zählen üben",
      "goal": "Blumen zählen."
    },
    "5-5": {
      "title": "Menge und Zahl",
      "goal": "Welche Zahl passt zur Menge?"
    },
    "5-6": {
      "title": "Größer und kleiner",
      "goal": "Welche Zahl ist größer?"
    },
    "5-7": {
      "title": "Plus",
      "goal": "Zwei und eins ergibt drei."
    },
    "5-8": {
      "title": "Minus",
      "goal": "Fünf minus zwei ergibt drei."
    },
    "5-m": {
      "title": "Stufen-Abschluss",
      "goal": "Drei kleine Rechnungen."
    },
    "6-1": {
      "title": "Anweisungen",
      "goal": "Bobby folgt deinen Blöcken."
    },
    "6-2": {
      "title": "Reihenfolge",
      "goal": "Die Reihenfolge macht den Weg."
    },
    "6-3": {
      "title": "Muster",
      "goal": "Was kommt als Nächstes?"
    },
    "6-4": {
      "title": "Logisches Denken",
      "goal": "Was passt nicht? Welcher Weg hilft?"
    },
    "6-5": {
      "title": "Wenn … dann",
      "goal": "Wenn eine Wand kommt, dreh dich."
    },
    "6-6": {
      "title": "Wiederholen",
      "goal": "Dreimal dasselbe ist kürzer."
    },
    "6-7": {
      "title": "Muster im Quadrat",
      "goal": "Erkenne das Muster im Quadrat."
    },
    "6-8": {
      "title": "Was fliegt, was schwimmt?",
      "goal": "Tiere nach ihrem Ort sortieren."
    },
    "6-9": {
      "title": "Groß, mittel, klein",
      "goal": "Formen nach Größe sortieren."
    },
    "6-10": {
      "title": "Was gehört zusammen?",
      "goal": "Dinge miteinander verbinden."
    },
    "6-m": {
      "title": "Stufen-Abschluss",
      "goal": "Drehen, laufen, ankommen."
    },
    "7-1": {
      "title": "Blöcke und Reihenfolge",
      "goal": "Ein Block, ein Schritt."
    },
    "7-2": {
      "title": "Drehen",
      "goal": "Links und rechts drehen."
    },
    "7-3": {
      "title": "Etwas stimmt nicht",
      "goal": "Prüfen, ändern, noch einmal."
    },
    "7-m": {
      "title": "Stufen-Abschluss",
      "goal": "Die letzte große Reise."
    },
    "8-1": {
      "title": "Was ist Code?",
      "goal": "Code ist eine Anleitung für den Computer."
    },
    "8-2": {
      "title": "Der erste Befehl",
      "goal": "alert zeigt eine Nachricht."
    },
    "8-3": {
      "title": "Variablen",
      "goal": "Eine Variable ist eine kleine Kiste."
    },
    "8-4": {
      "title": "Zahlen",
      "goal": "Drei Äpfel in einer Kiste."
    },
    "8-5": {
      "title": "Rechnen",
      "goal": "Zwei und drei ergibt fünf."
    },
    "8-6": {
      "title": "Funktionen",
      "goal": "Eine Anleitung zum Wiederbenutzen."
    },
    "8-m": {
      "title": "Stufen-Abschluss",
      "goal": "Variablen und Rechnen zusammen."
    },
    "9-1": {
      "title": "So liegen die Finger",
      "goal": "Die Grundreihe kennenlernen."
    },
    "9-2": {
      "title": "Linke Hand: A S D F",
      "goal": "Vier Tasten für die linke Hand."
    },
    "9-3": {
      "title": "Rechte Hand: J K L",
      "goal": "Drei Tasten für die rechte Hand."
    },
    "9-4": {
      "title": "Beide Hände",
      "goal": "Abwechselnd links und rechts."
    },
    "9-5": {
      "title": "Kleine Wörter",
      "goal": "Wörter nur mit der Grundreihe."
    },
    "9-6": {
      "title": "Oben links: Q W",
      "goal": "Die obere Reihe mit der linken Hand."
    },
    "9-7": {
      "title": "Oben rechts: O P",
      "goal": "Die obere Reihe mit der rechten Hand."
    },
    "9-8": {
      "title": "Unten: M N",
      "goal": "Mit dem Zeigefinger nach unten greifen."
    },
    "9-9": {
      "title": "Gemischt und komplex",
      "goal": "Längere Wege über die Tastatur."
    },
    "9-10": {
      "title": "Sternen-Rakete",
      "goal": "Tippe den Buchstaben, die Rakete fliegt."
    },
    "9-11": {
      "title": "Wörter-Rakete",
      "goal": "Level und Tempo wählen, dann tippen."
    },
    "9-m": {
      "title": "Stufen-Abschluss",
      "goal": "Zeig, was deine Finger können."
    }
  },
  "activities": {
    "1-1-1": {
      "title": "Ein Computer",
      "speech": "Das ist ein Computer.",
      "prompt": "Das ist ein Computer.",
      "points": [
        "Er rechnet sehr schnell.",
        "Er zeigt Bilder auf dem Monitor.",
        "Er braucht Strom."
      ]
    },
    "1-1-2": {
      "title": "Wo ist der Computer?",
      "speech": "Zeig auf den Computer.",
      "prompt": "Wo ist der Computer?"
    },
    "1-2-1": {
      "title": "Der Monitor",
      "speech": "Der Monitor zeigt Bilder.",
      "prompt": "Der Monitor zeigt Bilder.",
      "points": [
        "Er sieht aus wie ein Fernseher.",
        "Er zeigt, was der Computer macht."
      ]
    },
    "1-2-2": {
      "title": "Wo ist der Monitor?",
      "speech": "Zeig auf den Monitor.",
      "prompt": "Wo ist der Monitor?"
    },
    "1-3-1": {
      "title": "Die Tastatur",
      "speech": "Die Tastatur hat viele Tasten.",
      "prompt": "Die Tastatur hat viele Tasten.",
      "points": [
        "Jede Taste hat ein Zeichen.",
        "Damit schreibst du Buchstaben."
      ]
    },
    "1-3-2": {
      "title": "Wo ist die Tastatur?",
      "speech": "Zeig auf die Tastatur.",
      "prompt": "Wo ist die Tastatur?"
    },
    "1-4-1": {
      "title": "Die Maus",
      "speech": "Die Maus zeigt auf dem Bildschirm.",
      "prompt": "Die Maus zeigt auf dem Bildschirm.",
      "points": [
        "Sie hat einen kleinen Pfeil.",
        "Damit klickst du auf Dinge."
      ]
    },
    "1-4-2": {
      "title": "Wo ist die Maus?",
      "speech": "Zeig auf die Maus.",
      "prompt": "Wo ist die Maus?"
    },
    "1-5-1": {
      "title": "Der Laptop",
      "speech": "Ein Laptop ist ein Computer zum Mitnehmen.",
      "prompt": "Ein Laptop ist ein Computer zum Mitnehmen.",
      "points": [
        "Monitor und Tastatur sind zusammen.",
        "Er hat einen Akku."
      ]
    },
    "1-5-2": {
      "title": "Laptop oder großer Computer?",
      "speech": "Was kann man mitnehmen?",
      "prompt": "Was kann man mitnehmen?"
    },
    "1-6-1": {
      "title": "Lautsprecher und Kamera",
      "speech": "Der Lautsprecher macht Musik.",
      "prompt": "Der Lautsprecher macht Musik.",
      "points": [
        "Die Kamera macht Fotos.",
        "Der Lautsprecher macht Töne."
      ]
    },
    "1-6-2": {
      "title": "Wer macht Fotos?",
      "speech": "Wer macht Fotos?",
      "prompt": "Wer macht Fotos?"
    },
    "1-7-1": {
      "title": "Vieles möglich",
      "speech": "Computer können ganz viel.",
      "prompt": "Computer können ganz viel.",
      "points": [
        "Sie malen Bilder.",
        "Sie spielen Musik.",
        "Sie rechnen mit Zahlen."
      ]
    },
    "1-7-2": {
      "title": "Was gehört zum Computer?",
      "speech": "Ziehe alles zum Computer.",
      "prompt": "Lege alles an seinen Platz."
    },
    "1-8-1": {
      "title": "Teile verbinden",
      "speech": "Verbinde die Teile mit dem Namen.",
      "prompt": "Verbinde jedes Teil mit seinem Namen."
    },
    "1-8-2": {
      "title": "Memory",
      "speech": "Finde die gleichen Bilder.",
      "prompt": "Finde die gleichen Bilder."
    },
    "1-m-1": {
      "title": "Alles gemischt",
      "speech": "Zeig, was du weißt.",
      "prompt": "Was gehört wozu?",
      "deck": [
        {
          "prompt": "Wo ist die Tastatur?"
        },
        {
          "prompt": "Womit klickst du?"
        },
        {
          "prompt": "Wo siehst du Bilder?"
        },
        {
          "prompt": "Was macht Musik?"
        },
        {
          "prompt": "Was macht Fotos?"
        }
      ]
    },
    "2-1-1": {
      "title": "Linie nachfahren",
      "speech": "Fahre mit der Maus an der Linie.",
      "prompt": "Fahre mit der Maus an der Linie entlang."
    },
    "2-2-1": {
      "title": "Was ist anklickbar?",
      "speech": "Was kann man anklicken?",
      "prompt": "Was kann man anklicken?"
    },
    "2-3-1": {
      "title": "Sterne fangen",
      "speech": "Klicke die Sterne an.",
      "prompt": "Klicke auf jeden Stern."
    },
    "2-4-1": {
      "title": "Truhe öffnen",
      "speech": "Klicke zweimal schnell auf die Truhe.",
      "prompt": "Klicke zweimal schnell auf die Truhe."
    },
    "2-5-1": {
      "title": "Schmetterling und Blume",
      "speech": "Ziehe den Schmetterling zur Blume.",
      "prompt": "Ziehe den Schmetterling zur Blume."
    },
    "2-6-1": {
      "title": "Früchte in den Korb",
      "speech": "Lege alle Früchte in den Korb.",
      "prompt": "Lege alle Früchte in den Korb."
    },
    "2-7-1": {
      "title": "Nach unten scrollen",
      "speech": "Scrolle nach unten und finde Bobby.",
      "prompt": "Scrolle nach unten und finde Bobby.",
      "points": [
        "Drehe am Mausrad.",
        "Oder ziehe den Balken."
      ]
    },
    "2-8-1": {
      "title": "Mittlere Sterne",
      "speech": "Klicke die Sterne an.",
      "prompt": "Klicke auf jeden Stern."
    },
    "2-8-2": {
      "title": "Kleine Sterne",
      "speech": "Jetzt werden die Sterne kleiner.",
      "prompt": "Jetzt werden die Sterne kleiner."
    },
    "2-8-3": {
      "title": "Fliegende Sterne",
      "speech": "Die Sterne fliegen. Klicke sie an.",
      "prompt": "Die Sterne fliegen. Klicke sie an."
    },
    "2-8-4": {
      "title": "Bild zusammensetzen",
      "speech": "Setze das Bild zusammen.",
      "prompt": "Setze die vier Teile zusammen."
    },
    "2-8-5": {
      "title": "Neue Linie",
      "speech": "Fahre wieder an der Linie.",
      "prompt": "Fahre mit der Maus an der Linie entlang."
    },
    "2-m-1": {
      "title": "Sonnenbild",
      "speech": "Setze das Sonnenbild zusammen.",
      "prompt": "Setze das Sonnenbild zusammen."
    },
    "3-1-1": {
      "title": "Buchstaben finden",
      "speech": "Drücke immer die markierte Taste.",
      "prompt": "Drücke die Taste, die leuchtet.",
      "hint": "Schau auf den gelben Ring!"
    },
    "3-2-1": {
      "title": "Zahlen finden",
      "speech": "Drücke immer die markierte Zahl.",
      "prompt": "Drücke die Zahl, die leuchtet.",
      "hint": "Die Zahlen sind oben."
    },
    "3-3-1": {
      "title": "Leertaste",
      "speech": "Drücke die Leertaste. Bobby hüpft!",
      "prompt": "Drücke die Leertaste. Bobby hüpft!",
      "hint": "Die Leertaste ist ganz unten."
    },
    "3-4-1": {
      "title": "Enter",
      "speech": "Drücke Enter und öffne die Truhe.",
      "prompt": "Drücke Enter und öffne die Truhe.",
      "hint": "Enter ist rechts."
    },
    "3-5-1": {
      "title": "Backspace",
      "speech": "Drücke Backspace und lösche den Buchstaben.",
      "prompt": "Drücke Backspace und lösche den Buchstaben.",
      "hint": "Backspace ist oben rechts."
    },
    "3-6-1": {
      "title": "Shift",
      "speech": "Drücke Shift für einen großen Buchstaben.",
      "prompt": "Drücke Shift für einen großen Buchstaben.",
      "hint": "Shift ist ganz links."
    },
    "3-7-1": {
      "title": "Pfeiltasten",
      "speech": "Drücke den markierten Pfeil.",
      "prompt": "Drücke den Pfeil, der leuchtet.",
      "hint": "Die Pfeile sind unten rechts."
    },
    "3-8-1": {
      "title": "Gemischte Tasten",
      "speech": "Jetzt wird es gemischt.",
      "prompt": "Jetzt gemischt: Buchstaben, Zahlen und Tasten.",
      "hint": "Schau auf den gelben Ring!"
    },
    "3-m-1": {
      "title": "Tasten-Quiz",
      "speech": "Welche Taste passt?",
      "prompt": "Welche Taste passt?",
      "deck": [
        {
          "prompt": "Womit machst du ein Leerzeichen?"
        },
        {
          "prompt": "Womit öffnest du etwas?"
        },
        {
          "prompt": "Womit machst du große Buchstaben?"
        },
        {
          "prompt": "Womit löschst du einen Buchstaben?"
        }
      ]
    },
    "4-1-1": {
      "title": "A bis H",
      "speech": "Drücke immer den Buchstaben.",
      "prompt": "Drücke den Buchstaben, den du siehst.",
      "letters": [
        {
          "word": "Apfel",
          "art": "apfel"
        },
        {
          "word": "Ball",
          "art": "ball"
        },
        {
          "word": "Computer",
          "art": "computer"
        },
        {
          "word": "Dino",
          "art": "dino"
        },
        {
          "word": "Elefant",
          "art": "elefant"
        },
        {
          "word": "Fisch",
          "art": "fisch"
        },
        {
          "word": "Gitarre",
          "art": "gitarre"
        },
        {
          "word": "Hut",
          "art": "hut"
        }
      ]
    },
    "4-2-1": {
      "title": "I bis P",
      "speech": "Drücke immer den Buchstaben.",
      "prompt": "Drücke den Buchstaben, den du siehst.",
      "letters": [
        {
          "word": "Igel",
          "art": "igel"
        },
        {
          "word": "Jacke",
          "art": "jacke"
        },
        {
          "word": "Katze",
          "art": "katze"
        },
        {
          "word": "Lampe",
          "art": "lampe"
        },
        {
          "word": "Maus",
          "art": "maus"
        },
        {
          "word": "Nase",
          "art": "nase"
        },
        {
          "word": "Orange",
          "art": "orange"
        },
        {
          "word": "Pferd",
          "art": "pferd"
        }
      ]
    },
    "4-3-1": {
      "title": "Q bis Z",
      "speech": "Drücke immer den Buchstaben.",
      "prompt": "Drücke den Buchstaben, den du siehst.",
      "letters": [
        {
          "word": "Qualle",
          "art": "qualle"
        },
        {
          "word": "Roboter",
          "art": "roboter"
        },
        {
          "word": "Sonne",
          "art": "sonne"
        },
        {
          "word": "Tasse",
          "art": "tasse"
        },
        {
          "word": "Uhr",
          "art": "uhr"
        },
        {
          "word": "Vogel",
          "art": "vogel"
        },
        {
          "word": "Wasser",
          "art": "wasser"
        },
        {
          "word": "Xylophon",
          "art": "xylophon"
        },
        {
          "word": "Yoga",
          "art": "yoga"
        },
        {
          "word": "Zebra",
          "art": "zebra"
        }
      ]
    },
    "4-4-1": {
      "title": "A bis F verbinden",
      "speech": "Verbinde jeden großen mit dem kleinen Buchstaben.",
      "prompt": "Verbinde A mit a und so weiter."
    },
    "4-4-2": {
      "title": "G bis L verbinden",
      "speech": "Verbinde jeden großen mit dem kleinen Buchstaben.",
      "prompt": "Verbinde G mit g und so weiter."
    },
    "4-5-1": {
      "title": "A bis F",
      "speech": "Drücke die markierten Buchstaben.",
      "prompt": "Drücke den Buchstaben, der leuchtet.",
      "hint": "Die Buchstaben stehen auf der Tastatur."
    },
    "4-5-2": {
      "title": "G bis L",
      "speech": "Drücke die markierten Buchstaben.",
      "prompt": "Drücke den Buchstaben, der leuchtet.",
      "hint": "Die Buchstaben stehen auf der Tastatur."
    },
    "4-5-3": {
      "title": "M bis R",
      "speech": "Drücke die markierten Buchstaben.",
      "prompt": "Drücke den Buchstaben, der leuchtet.",
      "hint": "Die Buchstaben stehen auf der Tastatur."
    },
    "4-5-4": {
      "title": "S bis Z",
      "speech": "Drücke die markierten Buchstaben.",
      "prompt": "Drücke den Buchstaben, der leuchtet.",
      "hint": "Die Buchstaben stehen auf der Tastatur."
    },
    "4-6-1": {
      "title": "Wörter tippen",
      "speech": "Tippe das Wort Buchstabe für Buchstabe.",
      "prompt": "Tippe das Wort.",
      "words": [
        {
          "text": "KATZE",
          "label": "Katze",
          "art": "katze"
        },
        {
          "text": "HUND",
          "label": "Hund",
          "art": "hund"
        },
        {
          "text": "SONNE",
          "label": "Sonne",
          "art": "sonne"
        },
        {
          "text": "MAMA",
          "label": "Mama",
          "art": "blume"
        },
        {
          "text": "PAPA",
          "label": "Papa",
          "art": "hut"
        },
        {
          "text": "BALL",
          "label": "Ball",
          "art": "ball"
        },
        {
          "text": "EI",
          "label": "Ei",
          "art": "ei"
        }
      ]
    },
    "4-6-2": {
      "title": "Dein Name",
      "speech": "Tippe deinen Namen.",
      "prompt": "Tippe deinen Namen in das Kästchen."
    },
    "4-m-1": {
      "title": "Drei Wörter",
      "speech": "Tippe die drei Wörter.",
      "prompt": "Tippe die drei Wörter.",
      "words": [
        {
          "text": "MAMA",
          "label": "Mama",
          "art": "blume"
        },
        {
          "text": "PAPA",
          "label": "Papa",
          "art": "hut"
        },
        {
          "text": "EI",
          "label": "Ei",
          "art": "ei"
        }
      ]
    },
    "5-1-1": {
      "title": "Äpfel zählen",
      "speech": "Wie viele Äpfel sind es?",
      "prompt": "Wie viele Äpfel sind es?"
    },
    "5-2-1": {
      "title": "Sterne zählen",
      "speech": "Wie viele Sterne sind es?",
      "prompt": "Wie viele Sterne sind es?"
    },
    "5-3-1": {
      "title": "Viele Äpfel",
      "speech": "Wie viele Äpfel sind es?",
      "prompt": "Wie viele Äpfel sind es?"
    },
    "5-4-1": {
      "title": "Blumen zählen",
      "speech": "Wie viele Blumen sind es?",
      "prompt": "Wie viele Blumen sind es?"
    },
    "5-5-1": {
      "title": "Welche Zahl?",
      "speech": "Welche Zahl passt zu den Bildern?",
      "prompt": "Welche Zahl passt zu den Bildern?"
    },
    "5-6-1": {
      "title": "Größer oder kleiner",
      "speech": "Welche Zahl ist größer?",
      "prompt": "Welche Zahl ist größer?",
      "deck": [
        {
          "prompt": "Welche Zahl ist größer?"
        },
        {
          "prompt": "Welche Zahl ist kleiner?"
        },
        {
          "prompt": "Welche Zahl ist größer?"
        }
      ]
    },
    "5-7-1": {
      "title": "Zwei plus eins",
      "speech": "Zwei Äpfel und ein Apfel. Wie viele?",
      "prompt": "Zwei Äpfel und ein Apfel. Wie viele sind es?"
    },
    "5-8-1": {
      "title": "Fünf minus zwei",
      "speech": "Fünf Sterne. Zwei verschwinden.",
      "prompt": "Fünf Sterne. Zwei verschwinden. Wie viele bleiben?"
    },
    "5-m-1": {
      "title": "Rechnen",
      "speech": "Löse die drei Aufgaben.",
      "prompt": "Wie viel ist das?",
      "deck": [
        {
          "prompt": "2 + 1 = ?"
        },
        {
          "prompt": "4 − 2 = ?"
        },
        {
          "prompt": "3 + 3 = ?"
        }
      ]
    },
    "6-1-1": {
      "title": "Zwei Schritte",
      "speech": "Lege zwei Schritte und starte.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 1
      }
    },
    "6-2-1": {
      "title": "Der richtige Weg",
      "speech": "Bringe die drei Bilder in die richtige Reihenfolge.",
      "prompt": "Was kommt zuerst, was danach?"
    },
    "6-3-1": {
      "title": "Muster erkennen",
      "speech": "Was kommt als Nächstes?",
      "prompt": "Was kommt als Nächstes?"
    },
    "6-4-1": {
      "title": "Was ist anders?",
      "speech": "Was passt nicht zu den anderen?",
      "prompt": "Was passt nicht zu den anderen?"
    },
    "6-4-2": {
      "title": "Welcher Weg?",
      "speech": "Der Weg ist zu. Was hilft?",
      "prompt": "Der Weg ist versperrt. Was hilft?"
    },
    "6-5-1": {
      "title": "Wenn Wand, dann rechts",
      "speech": "Wenn eine Wand kommt, dreh dich rechts.",
      "prompt": "Wenn eine Wand kommt, dreh dich rechts.",
      "goal": {
        "x": 0,
        "y": 1
      }
    },
    "6-6-1": {
      "title": "Dreimal vor",
      "speech": "Wiederhole dreimal den Schritt.",
      "prompt": "Wiederhole den Schritt dreimal.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "6-7-1": {
      "title": "Was fehlt im Quadrat?",
      "speech": "Welches Bild fehlt im Quadrat?",
      "prompt": "Welches Bild fehlt im Quadrat?"
    },
    "6-8-1": {
      "title": "Fliegen oder schwimmen",
      "speech": "Was fliegt? Was schwimmt?",
      "prompt": "Lege jedes Tier an den richtigen Ort."
    },
    "6-9-1": {
      "title": "Größen sortieren",
      "speech": "Sortiere die Formen nach Größe.",
      "prompt": "Sortiere: groß, mittel und klein."
    },
    "6-10-1": {
      "title": "Was passt?",
      "speech": "Was gehört zusammen?",
      "prompt": "Was passt zu der Frage?",
      "deck": [
        {
          "prompt": "Wer schwimmt im Wasser?"
        },
        {
          "prompt": "Wer fliegt am Himmel?"
        },
        {
          "prompt": "Wer sagt miau?"
        },
        {
          "prompt": "Was wächst auf der Wiese?"
        }
      ]
    },
    "6-m-1": {
      "title": "Die letzte Ecke",
      "speech": "Finde den Weg um die Ecke.",
      "prompt": "Finde den Weg um die Ecke.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-0-1": {
      "title": "So geht es",
      "speech": "Lege Blöcke unten hin. Dann starte.",
      "prompt": "Lege Blöcke hin und drücke ▶ Los.",
      "points": [
        "Jeder Block ist ein Schritt.",
        "Von oben nach unten.",
        "Mit ▶ läuft Bobby los."
      ]
    },
    "7-1-1": {
      "title": "Geradeaus",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 1
      }
    },
    "7-1-2": {
      "title": "Drei Schritte",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-1-3": {
      "title": "Sammle den Stern",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-0-2": {
      "title": "Drehen",
      "speech": "Drehen kostet keinen Schritt.",
      "prompt": "Drehen ist kein Schritt.",
      "points": [
        "Rechts dreht im Kreis.",
        "Danach läuft Bobby weiter."
      ]
    },
    "7-2-1": {
      "title": "Einmal rechts",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 0,
        "y": 2
      }
    },
    "7-2-2": {
      "title": "Um die Ecke",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-2-3": {
      "title": "Zickzack",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 2
      }
    },
    "7-0-3": {
      "title": "Prüfen und ändern",
      "speech": "Wenn es nicht klappt, ändere einen Block.",
      "prompt": "Wenn es nicht klappt, ändere einen Block.",
      "points": [
        "Anschauen, was passiert.",
        "Einen Block ändern.",
        "Noch einmal starten."
      ]
    },
    "7-3-1": {
      "title": "Dreimal vor",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-3-2": {
      "title": "Treppe",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 0,
        "y": 0
      }
    },
    "7-3-3": {
      "title": "Wenn Wand, dann rechts",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 0,
        "y": 1
      }
    },
    "7-3-4": {
      "title": "Stern oder Wand",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 0
      }
    },
    "7-3-5": {
      "title": "Der Umweg",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 1
      }
    },
    "7-3-6": {
      "title": "Die große Reise",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 4,
        "y": 0
      }
    },
    "7-m-1": {
      "title": "Alles zusammen",
      "speech": "Finde den Weg zum Stern.",
      "prompt": "Bringe Bobby zum Stern.",
      "goal": {
        "x": 4,
        "y": 4
      }
    },
    "8-1-1": {
      "title": "Code ist wie ein Rezept",
      "speech": "Code ist eine Anleitung für den Computer.",
      "prompt": "Code ist eine Anleitung für den Computer.",
      "points": [
        "Ein Rezept sagt, was zu tun ist.",
        "Code auch – nur für Computer."
      ]
    },
    "8-2-1": {
      "title": "Hallo sagen",
      "speech": "Dieser Befehl zeigt eine Nachricht.",
      "prompt": "Dieser Befehl zeigt eine Nachricht.",
      "lineNotes": [
        "Dieser Befehl zeigt einen Text."
      ]
    },
    "8-3-1": {
      "title": "Eine Kiste für den Namen",
      "speech": "Der Computer packt den Namen in eine Kiste.",
      "prompt": "Der Computer packt den Namen in eine Kiste.",
      "lineNotes": [
        "Hier entsteht die Kiste myName.",
        "Der Text daraus wird gezeigt."
      ]
    },
    "8-4-1": {
      "title": "Drei Äpfel",
      "speech": "Drei Äpfel liegen in der Kiste.",
      "prompt": "Drei Äpfel liegen in der Kiste.",
      "lineNotes": [
        "Die Kiste apples bekommt die Zahl drei."
      ]
    },
    "8-5-1": {
      "title": "Fünf Sterne",
      "speech": "Zwei plus drei ergibt fünf.",
      "prompt": "Zwei plus drei ergibt fünf.",
      "lineNotes": [
        "Der Computer rechnet zwei plus drei."
      ]
    },
    "8-6-1": {
      "title": "Hallo, Funktion!",
      "speech": "Eine Funktion kann man immer wieder rufen.",
      "prompt": "Eine Funktion kann man immer wieder rufen.",
      "lineNotes": [
        "Hier wird die Anleitung gebaut.",
        "Der Text darin.",
        "Die Anleitung ist fertig.",
        "Jetzt wird sie ausgeführt."
      ]
    },
    "8-m-1": {
      "title": "Zwei Zahlen",
      "speech": "Zwei Zahlen werden zusammengezählt.",
      "prompt": "Zwei Zahlen werden zusammengezählt.",
      "lineNotes": [
        "Kiste a bekommt zwei.",
        "Kiste b bekommt drei.",
        "Die Summe wird gezeigt."
      ]
    },
    "9-1-1": {
      "title": "Die Grundreihe",
      "speech": "So liegen die Finger auf der Tastatur.",
      "prompt": "So liegen die Finger auf der Tastatur.",
      "points": [
        "Finger auf ASDF legen.",
        "Finger auf JKL legen.",
        "Rücken gerade, Füße still."
      ]
    },
    "9-2-1": {
      "title": "Linke Hand",
      "speech": "Linke Hand: A S D F.",
      "prompt": "Tippe mit der linken Hand."
    },
    "9-3-1": {
      "title": "Rechte Hand",
      "speech": "Rechte Hand: J K L.",
      "prompt": "Tippe mit der rechten Hand."
    },
    "9-4-1": {
      "title": "Zusammen",
      "speech": "Jetzt beide Hände zusammen.",
      "prompt": "Tippe abwechselnd links und rechts."
    },
    "9-5-1": {
      "title": "Wörter mit ASDF JKL",
      "speech": "Tippe kleine Wörter mit den Fingern.",
      "prompt": "Diese Wörter brauchen nur die Grundreihe."
    },
    "9-6-1": {
      "title": "Q und W",
      "speech": "Oben links: Q und W.",
      "prompt": "Q und W gehören zur linken Hand."
    },
    "9-7-1": {
      "title": "O und P",
      "speech": "Oben rechts: O und P.",
      "prompt": "O und P gehören zur rechten Hand."
    },
    "9-8-1": {
      "title": "M und N",
      "speech": "Unten rechts: M und N.",
      "prompt": "M und N liegen unter dem Zeigefinger."
    },
    "9-9-1": {
      "title": "Alles gemischt",
      "speech": "Jetzt wird es gemischt.",
      "prompt": "Buchstaben und Wörter quer über die Tastatur.",
      "sequences": ["qwas", "opmn", "hand", "mond", "plan"]
    },
    "9-10-1": {
      "title": "Buchstaben abschießen",
      "speech": "Triff die Buchstaben mit der Rakete.",
      "prompt": "Drücke den Buchstaben. Die Rakete fliegt los!"
    },
    "9-11-1": {
      "title": "Wörter-Rakete",
      "speech": "Wähle Level und Tempo.",
      "prompt": "Tippe die Buchstaben. Dann startet die Rakete.",
      "levels": [
        { "label": "Leicht", "pool": ["a", "s", "d", "f", "j", "k", "l"] },
        { "label": "Mittel", "pool": ["as", "df", "jk", "kl", "sd", "fj", "lk"] },
        { "label": "Schwer", "pool": ["das", "und", "mal", "als", "kam", "lag"] }
      ]
    },
    "9-m-1": {
      "title": "Finger-Prüfung",
      "speech": "Zeig, was deine Finger können.",
      "prompt": "Alles zusammen: Buchstaben und Wörter."
    }
  }
};

  content.bobbyFor = content.bobbyFor || {};
  content.bobbyFor.de = {
  "welcome": "Hallo, kleine Entdeckerin! Ich bin Bobby.",
  "lessonStart": "Komm, wir schauen uns das an!",
  "correct": [
    "Super gemacht!",
    "Genau!",
    "Du bist klasse!",
    "Wow, das sitzt!",
    "Das hast du toll gemacht!",
    "Ja! Genau so!"
  ],
  "wrong": [
    "Fast! Probier es nochmal.",
    "Kein Problem, noch einmal!",
    "Schau nochmal genau hin.",
    "Das war knapp. Weiter geht es!"
  ],
  "hint": "Schau mal hier …",
  "star": "Ein Stern für dich!",
  "locked": "Frag Mama oder Papa, dann geht es weiter!",
  "bye": "Bis bald, kleiner Entdecker!",
  "next": "Weiter geht es!",
  "allDone": "Du bist eine echte Computer-Entdeckerin!",
  "welcomeNamed": function (name) { return "Hallo, " + name + "! Ich bin Bobby."; },
  "stageDone": function (title) { return "Du hast „" + title + "“ geschafft!"; }
};
  content.bobbyDe = content.bobbyFor.de;
})(typeof globalThis !== 'undefined' ? globalThis : this);
