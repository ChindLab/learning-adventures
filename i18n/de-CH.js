/**
 * i18n/gsw.js – Swiss German (Zürich-style dialect) translation.
 *
 * Experimental dialect overlay: Swiss German, not Swiss Standard German.
 * Loaded after the stages and before app.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.translations = content.translations || {};
  content.translations['de-CH'] = {
  "lexicon": {
    "Mouse": "Muus",
    "Star": "Stern",
    "Speaker": "Luutsprecher",
    "Keyboard": "Tastatur",
    "Camera": "Kamera",
    "Screen": "Bildschirm",
    "Writing": "Schriibe",
    "Pointing": "Zeige",
    "Listening": "Lose",
    "Keys": "Taste",
    "Pointer": "Pfyl",
    "On the go": "Unterwägs",
    "Printer": "Drucker",
    "Chest with a button": "Truhe mit eme Chnopf",
    "Picture of a flower": "Bild von ere Blume",
    "Butterfly": "Schmetterling",
    "Flower": "Blume",
    "Apple": "Öpfel",
    "Banana": "Banane",
    "Basket": "Chorb",
    "Space bar": "Leertaste",
    "Turn right": "Rächts dreie",
    "Forward": "Vorwärts",
    "Back": "Zrugg",
    "Turn left": "Links dreie",
    "Jump": "Springe",
    "Repeat": "Widerhole",
    "If": "Wenn",
    "Collect": "Sammle",
    "To the star": "Zum Stern",
    "Cat": "Chatz",
    "Dog": "Hund",
    "Straight on": "Gradus",
    "Around the corner": "Um d'Egge",
    "Bird": "Vogel",
    "Fish": "Fisch",
    "Jellyfish": "Qualle",
    "Flies": "Flügt",
    "Swims": "Schwimmt",
    "big circle": "grosse Chreis",
    "big square": "grosses Quadrat",
    "medium circle": "mittlere Chreis",
    "medium square": "mittleres Quadrat",
    "small circle": "chliine Chreis",
    "small square": "chliises Quadrat",
    "Big": "Gross",
    "Medium": "Mittel",
    "Easy": "Eifach",
    "Hard": "Schwierig",
    "Small": "Chlii"
  },
  "achievements": {
    "s1": "Computer-Entdecker",
    "s2": "Muus-Meister",
    "s3": "Tastatur-Entdecker",
    "s4": "Chliine Tipp-Star",
    "s5": "Zahle-Entdecker",
    "s6": "Chliises Logik-Genie",
    "s7": "Junior-Programmierer",
    "s8": "Ersti Programmiererin",
    "s9": "Tipp-Profi"
  },
  "stages": {
    "1": {
      "title": "Mis Computer",
      "subtitle": "Was isch en Computer und was ghört dezue?"
    },
    "2": {
      "title": "Muus-Abentüür",
      "subtitle": "Zeige, klicke, ziehe, scrolle."
    },
    "3": {
      "title": "Tastatur-Abentüür",
      "subtitle": "Find die richtig Taste."
    },
    "4": {
      "title": "Buechstabe & Tippe",
      "subtitle": "Vo A bis Z und die erschte Wörter."
    },
    "5": {
      "title": "Zahle",
      "subtitle": "Zähle, vergliiche, plus und minus."
    },
    "6": {
      "title": "Logik-Spiil",
      "subtitle": "Aawisige, Muster und schlaus Wäg."
    },
    "7": {
      "title": "Programmier-Spiil",
      "subtitle": "Bobby lauft, was du ihm seisch."
    },
    "8": {
      "title": "Mis erschte JavaScript",
      "subtitle": "Was Code isch und was er macht."
    },
    "9": {
      "title": "Finger-Training",
      "subtitle": "Tippe mit allne Finger, ganz ohni Eile."
    }
  },
  "lessons": {
    "1-1": {
      "title": "Was isch en Computer?",
      "goal": "Mir lueged uns en Computer a."
    },
    "1-2": {
      "title": "De Monitor",
      "goal": "De Monitor zeigt uns Bilder."
    },
    "1-3": {
      "title": "D'Tastatur",
      "goal": "Mit de Tastatur schriibed mir."
    },
    "1-4": {
      "title": "D'Muus",
      "goal": "Mit de Muus zeigsch uf Sache."
    },
    "1-5": {
      "title": "De Laptop",
      "goal": "En Laptop isch en Computer zum Mitnäh."
    },
    "1-6": {
      "title": "Luutsprecher und Kamera",
      "goal": "Computer chönd lose und rede."
    },
    "1-7": {
      "title": "Was chönd Computer?",
      "goal": "Computer chönd male, rächne und Musig mache."
    },
    "1-8": {
      "title": "Alles widerhole",
      "goal": "Mir erinnered uns an alli Teil."
    },
    "1-m": {
      "title": "Stufe-Abschluss",
      "goal": "Zeig, was du scho weisch."
    },
    "2-1": {
      "title": "D'Muus bewege",
      "goal": "Fahr mit em Pfyl an de Linie entlang."
    },
    "2-2": {
      "title": "De Pfyl",
      "goal": "Mängisch chamer Sache aaklicke."
    },
    "2-3": {
      "title": "Klicke",
      "goal": "Klick d'Sterne a."
    },
    "2-4": {
      "title": "Doppelklick",
      "goal": "Zwei schnälli Klicks gönd d'Truhe uf."
    },
    "2-5": {
      "title": "Halte und ziehe",
      "goal": "Zieh de Schmetterling zur Blume."
    },
    "2-6": {
      "title": "Ziehe und ablege",
      "goal": "Leg alli Frücht i de Chorb."
    },
    "2-7": {
      "title": "Scrolle",
      "goal": "Scroll nach unde und find de Bobby."
    },
    "2-8": {
      "title": "Muus-Meister wärde",
      "goal": "Vier Spiil für ruhigi Händ."
    },
    "2-m": {
      "title": "Stufe-Abschluss",
      "goal": "Es letschts Bild für echti Muus-Meister."
    },
    "3-1": {
      "title": "Was isch e Tastatur?",
      "goal": "Find zeh Buechstabe uf de Tastatur."
    },
    "3-2": {
      "title": "Zahle finde",
      "goal": "Find zeh Zahle uf de Tastatur."
    },
    "3-3": {
      "title": "D'Leertaste",
      "goal": "D'Leertaste macht de Bobby hüpfe."
    },
    "3-4": {
      "title": "D'Enter-Taste",
      "goal": "Enter macht d'Truhe uf."
    },
    "3-5": {
      "title": "D'Backspace-Taste",
      "goal": "Backspace löscht en Buechstabe."
    },
    "3-6": {
      "title": "D'Shift-Taste",
      "goal": "Shift macht grossi Buechstabe."
    },
    "3-7": {
      "title": "D'Pfiltaste",
      "goal": "Mit de Pfyl bewegt sich de Bobby."
    },
    "3-8": {
      "title": "Alles nomal",
      "goal": "Buechstabe, Zahle und Taste gmischlet."
    },
    "3-m": {
      "title": "Stufe-Abschluss",
      "goal": "Zeig, welli Taste was macht."
    },
    "4-1": {
      "title": "A bis H",
      "goal": "Acht Buechstabe mit Bilder."
    },
    "4-2": {
      "title": "I bis P",
      "goal": "Acht wiiteri Buechstabe."
    },
    "4-3": {
      "title": "Q bis Z",
      "goal": "Die letschte Buechstabe."
    },
    "4-4": {
      "title": "Gross und chlii",
      "goal": "A und a ghöred zäme."
    },
    "4-5": {
      "title": "Find de Buechstabe",
      "goal": "Vier Buechstabe uf de Tastatur."
    },
    "4-6": {
      "title": "Tipp es Wort",
      "goal": "Sibe chliini Wörter und din Name."
    },
    "4-m": {
      "title": "Stufe-Abschluss",
      "goal": "Drei Wörter ohni Hilf."
    },
    "5-1": {
      "title": "Zahle vo 0 bis 5",
      "goal": "Zähl d'Öpfel."
    },
    "5-2": {
      "title": "Zahle vo 6 bis 10",
      "goal": "Jetzt werded's meh."
    },
    "5-3": {
      "title": "Zahle vo 11 bis 20",
      "goal": "Au grossi Mänge chamer zähle."
    },
    "5-4": {
      "title": "Zähle üebe",
      "goal": "Blueme zähle."
    },
    "5-5": {
      "title": "Mängi und Zahl",
      "goal": "Welli Zahl passt zur Mängi?"
    },
    "5-6": {
      "title": "Grösser und chliiner",
      "goal": "Welli Zahl isch grösser?"
    },
    "5-7": {
      "title": "Plus",
      "goal": "Zwei und eis git drüü."
    },
    "5-8": {
      "title": "Minus",
      "goal": "Füf minus zwei git drüü."
    },
    "5-m": {
      "title": "Stufe-Abschluss",
      "goal": "Drei chliini Rächlige."
    },
    "6-1": {
      "title": "Aawisige",
      "goal": "De Bobby folgt dine Blöck."
    },
    "6-2": {
      "title": "Reihefolg",
      "goal": "D'Reihefolg macht de Wäg."
    },
    "6-3": {
      "title": "Muster",
      "goal": "Was chunnt als Nächst?"
    },
    "6-4": {
      "title": "Logischs Denke",
      "goal": "Was passt nöd? Wellen Wäg hilft?"
    },
    "6-5": {
      "title": "Wenn … denn",
      "goal": "Wenn e Wand chunnt, dreisch di."
    },
    "6-6": {
      "title": "Widerhole",
      "goal": "Dreimal s'Gliche isch chürzer."
    },
    "6-7": {
      "title": "Muster im Quadrat",
      "goal": "Erkenn s'Muster im Quadrat."
    },
    "6-8": {
      "title": "Was flügt, was schwimmt?",
      "goal": "Tier nach ihrem Ort sortiere."
    },
    "6-9": {
      "title": "Gross, mittel, chlii",
      "goal": "Forme nach Grössi sortiere."
    },
    "6-10": {
      "title": "Was ghört zäme?",
      "goal": "Sache mitenand verbinde."
    },
    "6-11": {
      "title": "Memory-Werkstatt",
      "goal": "Merk dir d'Charte und find alli Paar."
    },
    "6-m": {
      "title": "Stufe-Abschluss",
      "goal": "Dreie, laufe, aacho."
    },
    "7-1": {
      "title": "Blöck und Reihefolg",
      "goal": "Ei Block, ei Schritt."
    },
    "7-2": {
      "title": "Dreie",
      "goal": "Links und rächts dreie."
    },
    "7-3": {
      "title": "Öppis stimmt nöd",
      "goal": "Prüefe, ändere, nomal."
    },
    "7-m": {
      "title": "Stufe-Abschluss",
      "goal": "Die letscht gross Reis."
    },
    "8-1": {
      "title": "Was isch Code?",
      "goal": "Code isch e Aaleitig für de Computer."
    },
    "8-2": {
      "title": "De erschti Befehl",
      "goal": "alert zeigt e Nachricht."
    },
    "8-3": {
      "title": "Variablen",
      "goal": "E Variable isch e chliini Chischte."
    },
    "8-4": {
      "title": "Zahle",
      "goal": "Drei Öpfel i ere Chischte."
    },
    "8-5": {
      "title": "Rächne",
      "goal": "Zwei und drüü git füf."
    },
    "8-6": {
      "title": "Funktione",
      "goal": "E Aaleitig zum Widerbruuche."
    },
    "8-m": {
      "title": "Stufe-Abschluss",
      "goal": "Variablen und Rächne zäme."
    },
    "9-1": {
      "title": "So liged d'Finger",
      "goal": "D'Grundreihe kennelehrne."
    },
    "9-2": {
      "title": "Linki Hand: A S D F",
      "goal": "Vier Taste für d'linki Hand."
    },
    "9-3": {
      "title": "Rächti Hand: J K L",
      "goal": "Drei Taste für d'rächti Hand."
    },
    "9-4": {
      "title": "Beidi Händ",
      "goal": "Abwechsligs links und rächts."
    },
    "9-5": {
      "title": "Chliini Wörter",
      "goal": "Wörter nur mit de Grundreihe."
    },
    "9-6": {
      "title": "Obe links: Q W",
      "goal": "D'oberschti Reihe mit de linke Hand."
    },
    "9-7": {
      "title": "Obe rächts: O P",
      "goal": "D'oberschti Reihe mit de rächte Hand."
    },
    "9-8": {
      "title": "Unde: M N",
      "goal": "Mit em Zeigfinger nach unde grieffe."
    },
    "9-9": {
      "title": "Gmischlet und komplex",
      "goal": "Längeri Wäg über d'Tastatur."
    },
    "9-10": {
      "title": "Sterne-Rakete",
      "goal": "Tipp de Buechstabe, d'Rakete flügt."
    },
    "9-11": {
      "title": "Wörter-Rakete",
      "goal": "Level und Tempo wähle, denn tippe."
    },
    "9-m": {
      "title": "Stufe-Abschluss",
      "goal": "Zeig, was dini Finger chönd."
    }
  },
  "activities": {
    "1-1-1": {
      "title": "En Computer",
      "speech": "Das isch en Computer.",
      "prompt": "Das isch en Computer.",
      "points": [
        "Er rächnet sehr schnäll.",
        "Er zeigt Bilder uf em Monitor.",
        "Er bruucht Strom."
      ]
    },
    "1-1-2": {
      "title": "Wo isch de Computer?",
      "speech": "Zeig uf de Computer.",
      "prompt": "Wo isch de Computer?"
    },
    "1-2-1": {
      "title": "De Monitor",
      "speech": "De Monitor zeigt Bilder.",
      "prompt": "De Monitor zeigt Bilder.",
      "points": [
        "Er gseht us wie en Färnseher.",
        "Er zeigt, was de Computer macht."
      ]
    },
    "1-2-2": {
      "title": "Wo isch de Monitor?",
      "speech": "Zeig uf de Monitor.",
      "prompt": "Wo isch de Monitor?"
    },
    "1-3-1": {
      "title": "D'Tastatur",
      "speech": "D'Tastatur het vill Taste.",
      "prompt": "D'Tastatur het vill Taste.",
      "points": [
        "Jedi Taste het es Zeiche.",
        "Damit schriibsch Buechstabe."
      ]
    },
    "1-3-2": {
      "title": "Wo isch d'Tastatur?",
      "speech": "Zeig uf d'Tastatur.",
      "prompt": "Wo isch d'Tastatur?"
    },
    "1-4-1": {
      "title": "D'Muus",
      "speech": "D'Muus zeigt uf em Bildschirm.",
      "prompt": "D'Muus zeigt uf em Bildschirm.",
      "points": [
        "Sie het en chliine Pfyl.",
        "Damit klicksch uf Sache."
      ]
    },
    "1-4-2": {
      "title": "Wo isch d'Muus?",
      "speech": "Zeig uf d'Muus.",
      "prompt": "Wo isch d'Muus?"
    },
    "1-5-1": {
      "title": "De Laptop",
      "speech": "En Laptop isch en Computer zum Mitnäh.",
      "prompt": "En Laptop isch en Computer zum Mitnäh.",
      "points": [
        "Monitor und Tastatur sind zäme.",
        "Er het en Akku."
      ]
    },
    "1-5-2": {
      "title": "Laptop oder grosse Computer?",
      "speech": "Was chamer mitnäh?",
      "prompt": "Was chamer mitnäh?"
    },
    "1-6-1": {
      "title": "Luutsprecher und Kamera",
      "speech": "De Luutsprecher macht Musig.",
      "prompt": "De Luutsprecher macht Musig.",
      "points": [
        "D'Kamera macht Fotos.",
        "De Luutsprecher macht Töne."
      ]
    },
    "1-6-2": {
      "title": "Wer macht Fotos?",
      "speech": "Wer macht Fotos?",
      "prompt": "Wer macht Fotos?"
    },
    "1-7-1": {
      "title": "Vil möglich",
      "speech": "Computer chönd ganz vil.",
      "prompt": "Computer chönd ganz vil.",
      "points": [
        "Sie maled Bilder.",
        "Sie spieled Musig.",
        "Sie rächned mit Zahle."
      ]
    },
    "1-7-2": {
      "title": "Was ghört zum Computer?",
      "speech": "Zieh alles zum Computer.",
      "prompt": "Leg alles an sin Platz."
    },
    "1-8-1": {
      "title": "Teil verbinde",
      "speech": "Verbinde d'Teil mit em Name.",
      "prompt": "Verbinde jedes Teil mit sim Name."
    },
    "1-8-2": {
      "title": "Memory",
      "speech": "Find die gliche Bilder.",
      "prompt": "Find die gliche Bilder."
    },
    "1-m-1": {
      "title": "Alles gmischlet",
      "speech": "Zeig, was du weisch.",
      "prompt": "Was ghört wozu?",
      "deck": [
        {
          "prompt": "Wo isch d'Tastatur?"
        },
        {
          "prompt": "Womit klicksch?"
        },
        {
          "prompt": "Wo gsehsch Bilder?"
        },
        {
          "prompt": "Was macht Musig?"
        },
        {
          "prompt": "Was macht Fotos?"
        }
      ]
    },
    "2-1-1": {
      "title": "Linie nachfahre",
      "speech": "Fahr mit de Muus an de Linie.",
      "prompt": "Fahr mit de Muus an de Linie entlang."
    },
    "2-2-1": {
      "title": "Was chamer aaklicke?",
      "speech": "Was chamer aaklicke?",
      "prompt": "Was chamer aaklicke?"
    },
    "2-3-1": {
      "title": "Sterne fange",
      "speech": "Klick d'Sterne a.",
      "prompt": "Klick uf jede Stern."
    },
    "2-3-2": {
      "title": "Muus-Memory",
      "speech": "Find die gliche Bilder.",
      "prompt": "Klick zwei gliichi Charte a."
    },
    "2-4-1": {
      "title": "Truhe ufmache",
      "speech": "Klick zweimal schnäll uf d'Truhe.",
      "prompt": "Klick zweimal schnäll uf d'Truhe."
    },
    "2-5-1": {
      "title": "Schmetterling und Blume",
      "speech": "Zieh de Schmetterling zur Blume.",
      "prompt": "Zieh de Schmetterling zur Blume."
    },
    "2-6-1": {
      "title": "Frücht in Chorb",
      "speech": "Leg alli Frücht i de Chorb.",
      "prompt": "Leg alli Frücht i de Chorb."
    },
    "2-7-1": {
      "title": "Nach unde scrolle",
      "speech": "Scroll nach unde und find de Bobby.",
      "prompt": "Scroll nach unde und find de Bobby.",
      "points": [
        "Dreih am Muusrad.",
        "Oder zieh de Balke."
      ]
    },
    "2-8-1": {
      "title": "Mittleri Sterne",
      "speech": "Klick d'Sterne a.",
      "prompt": "Klick uf jede Stern."
    },
    "2-8-2": {
      "title": "Chliini Sterne",
      "speech": "Jetzt werded d'Sterne chliiner.",
      "prompt": "Jetzt werded d'Sterne chliiner."
    },
    "2-8-3": {
      "title": "Flügendi Sterne",
      "speech": "D'Sterne flüged. Klick sie a.",
      "prompt": "D'Sterne flüged. Klick sie a."
    },
    "2-8-4": {
      "title": "Bild zämesetze",
      "speech": "Setz s'Bild zäme.",
      "prompt": "Setz die vier Teil zäme."
    },
    "2-8-5": {
      "title": "Neui Linie",
      "speech": "Fahr wider an de Linie.",
      "prompt": "Fahr mit de Muus an de Linie entlang."
    },
    "2-m-1": {
      "title": "Sunnebild",
      "speech": "Setz s'Sunnebild zäme.",
      "prompt": "Setz s'Sunnebild zäme."
    },
    "3-1-1": {
      "title": "Buechstabe finde",
      "speech": "Drück immer di markierti Taste.",
      "prompt": "Drück d'Taste, wo lüüchtet.",
      "hint": "Lueg uf de gäl Ring!"
    },
    "3-1-2": {
      "title": "Taste-Memory",
      "speech": "Find die gliche Taste.",
      "prompt": "Find zwei Charte mit de gliche Taste."
    },
    "3-2-1": {
      "title": "Zahle finde",
      "speech": "Drück immer di markierti Zahl.",
      "prompt": "Drück d'Zahl, wo lüüchtet.",
      "hint": "D'Zahle sind obe."
    },
    "3-3-1": {
      "title": "Leertaste",
      "speech": "Drück d'Leertaste. De Bobby hüpft!",
      "prompt": "Drück d'Leertaste. De Bobby hüpft!",
      "hint": "D'Leertaste isch ganz unde."
    },
    "3-4-1": {
      "title": "Enter",
      "speech": "Drück Enter und mach d'Truhe uf.",
      "prompt": "Drück Enter und mach d'Truhe uf.",
      "hint": "Enter isch rächts."
    },
    "3-5-1": {
      "title": "Backspace",
      "speech": "Drück Backspace und lösch de Buechstabe.",
      "prompt": "Drück Backspace und lösch de Buechstabe.",
      "hint": "Backspace isch obe rächts."
    },
    "3-6-1": {
      "title": "Shift",
      "speech": "Drück Shift für en grosse Buechstabe.",
      "prompt": "Drück Shift für en grosse Buechstabe.",
      "hint": "Shift isch ganz links."
    },
    "3-7-1": {
      "title": "Pfiltaste",
      "speech": "Drück de markiert Pfyl.",
      "prompt": "Drück de Pfyl, wo lüüchtet.",
      "hint": "D'Pfyl sind unde rächts."
    },
    "3-8-1": {
      "title": "Gmischleti Taste",
      "speech": "Jetzt wird's gmischlet.",
      "prompt": "Jetzt gmischlet: Buechstabe, Zahle und Taste.",
      "hint": "Lueg uf de gäl Ring!"
    },
    "3-m-1": {
      "title": "Taste-Quiz",
      "speech": "Welli Taste passt?",
      "prompt": "Welli Taste passt?",
      "deck": [
        {
          "prompt": "Womit machsch es Leerzeiche?"
        },
        {
          "prompt": "Womit machsch öppis uf?"
        },
        {
          "prompt": "Womit machsch grossi Buechstabe?"
        },
        {
          "prompt": "Womit löschsch en Buechstabe?"
        }
      ]
    },
    "4-1-1": {
      "title": "A bis H",
      "speech": "Drück immer de Buechstabe.",
      "prompt": "Drück de Buechstabe, wo du gsehsch.",
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
      "speech": "Drück immer de Buechstabe.",
      "prompt": "Drück de Buechstabe, wo du gsehsch.",
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
          "word": "Chatz",
          "art": "katze"
        },
        {
          "word": "Lampe",
          "art": "lampe"
        },
        {
          "word": "Muus",
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
      "speech": "Drück immer de Buechstabe.",
      "prompt": "Drück de Buechstabe, wo du gsehsch.",
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
          "word": "Sunn",
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
      "title": "A bis F verbinde",
      "speech": "Verbinde jede grosse mit em chliine Buechstabe.",
      "prompt": "Verbinde A mit a und so wiiter."
    },
    "4-4-2": {
      "title": "G bis L verbinde",
      "speech": "Verbinde jede grosse mit em chliine Buechstabe.",
      "prompt": "Verbinde G mit g und so wiiter."
    },
    "4-5-1": {
      "title": "A bis F",
      "speech": "Drück di markierte Buechstabe.",
      "prompt": "Drück de Buechstabe, wo lüüchtet.",
      "hint": "D'Buechstabe stönd uf de Tastatur."
    },
    "4-5-2": {
      "title": "G bis L",
      "speech": "Drück di markierte Buechstabe.",
      "prompt": "Drück de Buechstabe, wo lüüchtet.",
      "hint": "D'Buechstabe stönd uf de Tastatur."
    },
    "4-5-3": {
      "title": "M bis R",
      "speech": "Drück di markierte Buechstabe.",
      "prompt": "Drück de Buechstabe, wo lüüchtet.",
      "hint": "D'Buechstabe stönd uf de Tastatur."
    },
    "4-5-4": {
      "title": "S bis Z",
      "speech": "Drück di markierte Buechstabe.",
      "prompt": "Drück de Buechstabe, wo lüüchtet.",
      "hint": "D'Buechstabe stönd uf de Tastatur."
    },
    "4-6-1": {
      "title": "Wörter tippe",
      "speech": "Tipp s'Wort Buechstabe für Buechstabe.",
      "prompt": "Tipp s'Wort.",
      "words": [
        {
          "text": "CHATZ",
          "label": "Chatz",
          "art": "katze"
        },
        {
          "text": "HUND",
          "label": "Hund",
          "art": "hund"
        },
        {
          "text": "SUNN",
          "label": "Sunn",
          "art": "sonne"
        },
        {
          "text": "MAMI",
          "label": "Mami",
          "art": "blume"
        },
        {
          "text": "PAPI",
          "label": "Papi",
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
      "title": "Din Name",
      "speech": "Tipp din Name.",
      "prompt": "Tipp din Name i s'Chästli."
    },
    "4-m-1": {
      "title": "Drei Wörter",
      "speech": "Tipp die drei Wörter.",
      "prompt": "Tipp die drei Wörter.",
      "words": [
        {
          "text": "MAMI",
          "label": "Mami",
          "art": "blume"
        },
        {
          "text": "PAPI",
          "label": "Papi",
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
      "title": "Öpfel zähle",
      "speech": "Wie viel Öpfel sind's?",
      "prompt": "Wie viel Öpfel sind's?"
    },
    "5-2-1": {
      "title": "Sterne zähle",
      "speech": "Wie viel Sterne sind's?",
      "prompt": "Wie viel Sterne sind's?"
    },
    "5-3-1": {
      "title": "Vil Öpfel",
      "speech": "Wie viel Öpfel sind's?",
      "prompt": "Wie viel Öpfel sind's?"
    },
    "5-4-1": {
      "title": "Blueme zähle",
      "speech": "Wie viel Blueme sind's?",
      "prompt": "Wie viel Blueme sind's?"
    },
    "5-5-1": {
      "title": "Welli Zahl?",
      "speech": "Welli Zahl passt zu de Bilder?",
      "prompt": "Welli Zahl passt zu de Bilder?"
    },
    "5-6-1": {
      "title": "Grösser oder chliiner",
      "speech": "Welli Zahl isch grösser?",
      "prompt": "Welli Zahl isch grösser?",
      "deck": [
        {
          "prompt": "Welli Zahl isch grösser?"
        },
        {
          "prompt": "Welli Zahl isch chliiner?"
        },
        {
          "prompt": "Welli Zahl isch grösser?"
        }
      ]
    },
    "5-7-1": {
      "title": "Zwei plus eis",
      "speech": "Zwei Öpfel und en Öpfel. Wie viel?",
      "prompt": "Zwei Öpfel und en Öpfel. Wie viel sind's?"
    },
    "5-8-1": {
      "title": "Füf minus zwei",
      "speech": "Füf Sterne. Zwei verschwinded.",
      "prompt": "Füf Sterne. Zwei verschwinded. Wie viel blibed?"
    },
    "5-m-1": {
      "title": "Rächne",
      "speech": "Lös die drei Ufgabe.",
      "prompt": "Wie viel isch das?",
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
      "title": "Zwei Schritt",
      "speech": "Leg zwei Schritt und starte.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 1
      }
    },
    "6-2-1": {
      "title": "De richtig Wäg",
      "speech": "Bring die drei Bilder i d'richtig Reihefolg.",
      "prompt": "Was chunnt zerscht, was derno?"
    },
    "6-3-1": {
      "title": "Muster erkenne",
      "speech": "Was chunnt als Nächst?",
      "prompt": "Was chunnt als Nächst?"
    },
    "6-4-1": {
      "title": "Was isch anders?",
      "speech": "Was passt nöd zu de andere?",
      "prompt": "Was passt nöd zu de andere?"
    },
    "6-4-2": {
      "title": "Wellen Wäg?",
      "speech": "De Wäg isch zue. Was hilft?",
      "prompt": "De Wäg isch versperrt. Was hilft?"
    },
    "6-5-1": {
      "title": "Wenn Wand, denn rächts",
      "speech": "Wenn e Wand chunnt, dreisch di rächts.",
      "prompt": "Wenn e Wand chunnt, dreisch di rächts.",
      "goal": {
        "x": 0,
        "y": 1
      }
    },
    "6-6-1": {
      "title": "Dreimal vor",
      "speech": "Widerhole dreimal de Schritt.",
      "prompt": "Widerhole de Schritt dreimal.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "6-7-1": {
      "title": "Was fehlt im Quadrat?",
      "speech": "Welles Bild fehlt im Quadrat?",
      "prompt": "Welles Bild fehlt im Quadrat?"
    },
    "6-8-1": {
      "title": "Flüge oder schwimme",
      "speech": "Was flügt? Was schwimmt?",
      "prompt": "Leg jedes Tier an de richtig Ort."
    },
    "6-9-1": {
      "title": "Grössene sortiere",
      "speech": "Sortier d'Forme nach Grössi.",
      "prompt": "Sortier: gross, mittel und chlii."
    },
    "6-10-1": {
      "title": "Was passt?",
      "speech": "Was ghört zäme?",
      "prompt": "Was passt zu de Frag?",
      "deck": [
        {
          "prompt": "Wer schwimmt im Wasser?"
        },
        {
          "prompt": "Wer flügt am Himmel?"
        },
        {
          "prompt": "Wer seit miau?"
        },
        {
          "prompt": "Was wachst uf de Wiese?"
        }
      ]
    },
    "6-11-1": {
      "title": "Tier-Memory",
      "speech": "Find die gliche Tiercharte.",
      "prompt": "Deck zwei gliichi Charte uf."
    },
    "6-11-2": {
      "title": "Zahle-Memory",
      "speech": "Find die gliche Zahlecharte.",
      "prompt": "Deck zwei gliichi Zahle uf."
    },
    "6-11-3": {
      "title": "Code-Memory",
      "speech": "Find die gliche Befehlsblöck.",
      "prompt": "Merk dir alli Befehlsblöck."
    },
    "6-m-1": {
      "title": "Die letscht Egge",
      "speech": "Find de Wäg um d'Egge.",
      "prompt": "Find de Wäg um d'Egge.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-0-1": {
      "title": "So gaht's",
      "speech": "Leg Blöck unde ane. Denn starte.",
      "prompt": "Leg Blöck ane und drück ▶ Los.",
      "points": [
        "Jede Block isch en Schritt.",
        "Vo obe nach unde.",
        "Mit ▶ lauft de Bobby los."
      ]
    },
    "7-1-1": {
      "title": "Gradus",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 1
      }
    },
    "7-1-2": {
      "title": "Drei Schritt",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-1-3": {
      "title": "Sammle de Stern",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-0-2": {
      "title": "Dreie",
      "speech": "Dreie chostet kei Schritt.",
      "prompt": "Dreie isch kei Schritt.",
      "points": [
        "Rächts dreit im Chreis.",
        "Derno lauft de Bobby wiiter."
      ]
    },
    "7-2-1": {
      "title": "Eimal rächts",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 0,
        "y": 2
      }
    },
    "7-2-2": {
      "title": "Um d'Egge",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-2-3": {
      "title": "Zickzack",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 2
      }
    },
    "7-0-3": {
      "title": "Prüefe und ändere",
      "speech": "Wenn's nöd klappt, änderesch en Block.",
      "prompt": "Wenn's nöd klappt, änderesch en Block.",
      "points": [
        "Aaluege, was passiert.",
        "En Block ändere.",
        "Nomal starte."
      ]
    },
    "7-3-1": {
      "title": "Dreimal vor",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 3,
        "y": 1
      }
    },
    "7-3-2": {
      "title": "Stäge",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 0,
        "y": 0
      }
    },
    "7-3-3": {
      "title": "Wenn Wand, denn rächts",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 0,
        "y": 1
      }
    },
    "7-3-4": {
      "title": "Stern oder Wand",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 0
      }
    },
    "7-3-5": {
      "title": "De Umwäg",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 2,
        "y": 1
      }
    },
    "7-3-6": {
      "title": "Die gross Reis",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 4,
        "y": 0
      }
    },
    "7-m-1": {
      "title": "Alles zäme",
      "speech": "Find de Wäg zum Stern.",
      "prompt": "Bring de Bobby zum Stern.",
      "goal": {
        "x": 4,
        "y": 4
      }
    },
    "8-1-1": {
      "title": "Code isch wie es Rezäpt",
      "speech": "Code isch e Aaleitig für de Computer.",
      "prompt": "Code isch e Aaleitig für de Computer.",
      "points": [
        "Es Rezäpt seit, was z'tue isch.",
        "Code au – nur für Computer."
      ]
    },
    "8-2-1": {
      "title": "Hallo säge",
      "speech": "De Befehl zeigt e Nachricht.",
      "prompt": "De Befehl zeigt e Nachricht.",
      "lineNotes": [
        "De Befehl zeigt en Text."
      ]
    },
    "8-3-1": {
      "title": "E Chischte für de Name",
      "speech": "De Computer packt de Name i e Chischte.",
      "prompt": "De Computer packt de Name i e Chischte.",
      "lineNotes": [
        "Da entstaht d'Chischte myName.",
        "De Text darus wird zeigt."
      ]
    },
    "8-4-1": {
      "title": "Drei Öpfel",
      "speech": "Drei Öpfel ligged i de Chischte.",
      "prompt": "Drei Öpfel ligged i de Chischte.",
      "lineNotes": [
        "D'Chischte apples bechunnt d'Zahl drei."
      ]
    },
    "8-5-1": {
      "title": "Füf Sterne",
      "speech": "Zwei plus drüü git füf.",
      "prompt": "Zwei plus drüü git füf.",
      "lineNotes": [
        "De Computer rächnet zwei plus drüü."
      ]
    },
    "8-6-1": {
      "title": "Hallo, Funktion!",
      "speech": "E Funktion chamer immer wider rüefe.",
      "prompt": "E Funktion chamer immer wider rüefe.",
      "lineNotes": [
        "Da wird d'Aaleitig baut.",
        "De Text dinne.",
        "D'Aaleitig isch fertig.",
        "Jetzt wird sie usgfüehrt."
      ]
    },
    "8-m-1": {
      "title": "Zwei Zahle",
      "speech": "Zwei Zahle werded zämegzählt.",
      "prompt": "Zwei Zahle werded zämegzählt.",
      "lineNotes": [
        "Chischte a bechunnt zwei.",
        "Chischte b bechunnt drüü.",
        "D'Summe wird zeigt."
      ]
    },
    "9-1-1": {
      "title": "D'Grundreihe",
      "speech": "So liged d'Finger uf de Tastatur.",
      "prompt": "So liged d'Finger uf de Tastatur.",
      "points": [
        "Finger uf ASDF lege.",
        "Finger uf JKL lege.",
        "Rugge grad, Füess still."
      ]
    },
    "9-2-1": {
      "title": "Linki Hand",
      "speech": "Linki Hand: A S D F.",
      "prompt": "Tipp mit de linke Hand."
    },
    "9-3-1": {
      "title": "Rächti Hand",
      "speech": "Rächti Hand: J K L.",
      "prompt": "Tipp mit de rächte Hand."
    },
    "9-4-1": {
      "title": "Zäme",
      "speech": "Jetzt beidi Händ zäme.",
      "prompt": "Tipp abwechsligs links und rächts."
    },
    "9-5-1": {
      "title": "Wörter mit ASDF JKL",
      "speech": "Tipp chliini Wörter mit de Finger.",
      "prompt": "Die Wörter bruuched nur d'Grundreihe."
    },
    "9-6-1": {
      "title": "Q und W",
      "speech": "Obe links: Q und W.",
      "prompt": "Q und W ghöred zur linke Hand."
    },
    "9-7-1": {
      "title": "O und P",
      "speech": "Obe rächts: O und P.",
      "prompt": "O und P ghöred zur rächte Hand."
    },
    "9-8-1": {
      "title": "M und N",
      "speech": "Unde rächts: M und N.",
      "prompt": "M und N liged under em Zeigfinger."
    },
    "9-9-1": {
      "title": "Alles gmischlet",
      "speech": "Jetzt wird's gmischlet.",
      "prompt": "Buechstabe und Wörter quer über d'Tastatur.",
      "sequences": ["qwas", "opmn", "hand", "mond", "plan"]
    },
    "9-10-1": {
      "title": "Buechstabe abschiesse",
      "speech": "Triff d'Buechstabe mit de Rakete.",
      "prompt": "Drück de Buechstabe. D'Rakete flügt los!"
    },
    "9-11-1": {
      "title": "Wörter-Rakete",
      "speech": "Wähl Level und Tempo.",
      "prompt": "Tipp d'Buechstabe. Denn startet d'Rakete.",
      "levels": [
        { "label": "Eifach", "pool": ["a", "s", "d", "f", "j", "k", "l"] },
        { "label": "Mittel", "pool": ["as", "df", "jk", "kl", "sd", "fj", "lk"] },
        { "label": "Schwierig", "pool": ["das", "und", "mal", "als", "kam", "lag"] }
      ]
    },
    "9-m-1": {
      "title": "Finger-Prüefig",
      "speech": "Zeig, was dini Finger chönd.",
      "prompt": "Alles zäme: Buechstabe und Wörter."
    }
  }
};

  content.ui = content.ui || {};
  content.ui['de-CH'] = {
    " and ": " und ",
    " for ": " wie ",
    " min": " min",
    " of ": " vo ",
    " sec": " Sek",
    " – done": " – fertig",
    " – locked": " – gsperrt",
    " – not yet": " – na nöd",
    "% correct": "% richtig",
    "About this app": "Über die App",
    "Add child": "Chind dezue",
    "All children": "Alli Chind",
    "All good. Keep it up!": "Alles guet. Wiiter so!",
    "All letters hit!": "Alli Buechstabe troffe!",
    "Almost! The green cards are already right.": "Fasch! D'grüene Charte stimmed scho.",
    "Almost! Try a different piece.": "Fasch! Probier es anders Teil.",
    "Back to the map": "Zrugg zur Charte",
    "Backup": "Backup",
    "Backup \"{name}\" with {count} child(ren).": "Backup \"{name}\" mit {count} Chind.",
    "Bela – My First Computer School": "Bela – Mis erschti Computer-Schuel",
    "Bobby does not understand this code.": "De Bobby verstaht de Code nöd.",
    "Bobby got confused.": "De Bobby isch chli verwirrt.",
    "Bobby reached the star!": "De Bobby isch am Stern aacho!",
    "Bobby's Computer School runs completely offline. No data is sent to a server.": "Bobbys Computer-Schuel lauft ganz offline. Es werded kei Date an en Server gschickt.",
    "Cancel": "Abbräche",
    "Change sound": "Ton ändere",
    "Check": "Prüefe",
    "Child's language": "Sproch vom Chind",
    "Child's name": "Name vom Chind",
    "Choose voice": "Stimm wähle",
    "Come on, let us take a look!": "Chumm, mir lueged's a!",
    "Continue": "Wiiter",
    "Done": "Fertig",
    "Done!": "Fertig!",
    "Done! The picture is complete.": "Fertig! S'Bild isch vollständig.",
    "Every trophy is a big piece of the adventure.": "Jede Trophäe isch es grosses Stück vom Abentüür.",
    "Face-down card": "Verdeckti Charte",
    "Fast": "Schnäll",
    "Follow the line with the arrow keys": "Folg de Linie mit de Pfiltaste",
    "For grown-ups": "Für Erwachseni",
    "Get Bobby to the star!": "Bring de Bobby zum Stern!",
    "Get Bobby to the star.": "Bring de Bobby zum Stern.",
    "Go": "Los",
    "Good to see you, little explorer!": "Schön, dass du da bisch, chliine Entdecker!",
    "Good to see you, {name}!": "Schön, dass du da bisch, {name}!",
    "Hello! This is how I sound.": "Hallo! So tönt mini Stimm.",
    "Hit the letters with the rocket.": "Triff d'Buechstabe mit de Rakete.",
    "If wall": "Wenn Wand",
    "Key ": "Taste ",
    "Learning time": "Lernziit",
    "Left hand": "Linki Hand",
    "Lessons": "Lektione",
    "Let's go!": "Los gaht's!",
    "Letter ": "Buechstabe ",
    "Letters ": "Buechstabe ",
    "Level and tempo": "Level und Tempo",
    "Listen": "Lose",
    "Load backup": "Backup lade",
    "Load this backup": "Das Backup lade",
    "Look at the yellow ring!": "Lueg uf de gäl Ring!",
    "My Achievements": "Mini Erfolg",
    "My First Computer School": "Mis erschti Computer-Schuel",
    "Needs practice": "Bruucht Üebig",
    "New instruction: ": "Neui Aawisig: ",
    "Next": "Wiiter",
    "No blocks yet. Tap a block below.": "Na kei Blöck. Tipp unde uf en Block.",
    "No play time recorded yet.": "Na kei Spielziit ufgschribe.",
    "No voice found": "Kei Stimm gfunde",
    "Normal": "Normal",
    "Not at the star yet. Try again!": "Na nöd am Stern. Probier's nomal!",
    "Not quite. Try again.": "Nöd ganz. Probier's nomal.",
    "Now tap the matching target.": "Tipp jetzt s'passende Ziel.",
    "Now: ": "Jetzt: ",
    "Off": "Us",
    "On": "A",
    "Only learning progress and settings are stored on this device.": "Nur de Lernfortschritt und d'Iistellige werded uf dem Grät gspiicheret.",
    "Oops, nothing here.": "Hoppla, da isch nüt.",
    "Overview": "Übersicht",
    "Parent area": "Elterebereich",
    "Piece ": "Teil ",
    "Please solve the task.": "Bitte lös d'Ufgabe.",
    "Press the key ": "Drück uf d'Taste ",
    "Press ▶ and watch.": "Drück ▶ und lueg zue.",
    "Progress has been reset.": "De Fortschritt isch zruggsetzt.",
    "Progress is not being saved. The browser is blocking storage.": "De Fortschritt wird nöd gspiicheret. De Browser blockiert de Spiicher.",
    "Progress stays on this device. A backup file helps when changing computers.": "De Fortschritt blibt uf dem Grät. E Backup-Datei hilft bim Wechsel vom Computer.",
    "Put the picture together!": "Setz s'Bild zäme!",
    "Put the picture together.": "Setz s'Bild zäme.",
    "Put {n} on the plate": "Leg {n} uf de Teller",
    "Read aloud": "Lut vorlese",
    "Really delete every child's progress?": "Wirklich de Fortschritt vo allne Chind lösche?",
    "Really delete the progress of {name}?": "Wirklich de Fortschritt vo {name} lösche?",
    "Reduced motion": "Weniger Bewegung",
    "Remove": "Wegnäh",
    "Remove block": "Block wegnäh",
    "Rename": "Umbenenne",
    "Repeat ×": "Widerhole ×",
    "Reset progress": "Fortschritt zruggsetze",
    "Rest your fingers on the home row.": "Leg dini Finger uf d'Grundreihe.",
    "Right hand": "Rächti Hand",
    "Run: ": "Lauf: ",
    "Save progress": "Fortschritt spiichere",
    "Scroll down …": "Scroll nach unde …",
    "Scrollable area": "Scrollbare Bereich",
    "Sessions": "Sitzige",
    "Settings": "Iistellige",
    "Skip activity": "Aktivität überspringe",
    "Slot ": "Platz ",
    "Slow": "Langsam",
    "Soon!": "Gli!",
    "Sound": "Ton",
    "Stage complete ✓": "Stufe fertig ✓",
    "Stages": "Stufe",
    "Stars": "Sterne",
    "Stars collected": "Sterne gsammlet",
    "Tap a slot first.": "Tipp zerscht uf en Platz.",
    "Tap the target": "Tipp s'Ziel a",
    "That is quite a long journey!": "Das isch e ganz schöni Reis!",
    "That was JavaScript!": "Das isch JavaScript gsi!",
    "That was not right. Try again.": "Das isch nöd richtig gsi. Probier's nomal.",
    "The last profile cannot be removed.": "S'letschte Profil chamer nöd wegnäh.",
    "The next block goes here.": "De nächst Block chunnt da ane.",
    "There is a wall. Change the path!": "Da isch e Wand. Änder de Wäg!",
    "This child": "Das Chind",
    "this child": "Das Chind",
    "This game is missing.": "Das Spiil fehlt.",
    "This is not a Bela backup.": "Das isch kes Bela-Backup.",
    "This lesson does not exist.": "Die Lektion git's nöd.",
    "This stage does not exist.": "Die Stufe git's nöd.",
    "Time for this activity": "Ziit für die Aktivität",
    "Type your name": "Tipp din Name",
    "Type {word}": "Tipp {word}",
    "Type: ": "Tipp: ",
    "Unlock all stages": "Alli Stufe ufmache",
    "Version 1.0 · No ads · No external links": "Version 1.0 · Kei Werbig · Kei externe Links",
    "Voice": "Stimm",
    "We are going back to the map.": "Mir gönd zrugg zur Charte.",
    "We do not need more blocks.": "Mir bruuched kei wiiteri Blöck.",
    "What comes next?": "Was chunnt als Nächst?",
    "Which progress do you want to delete?": "Wellen Fortschritt wotsch lösche?",
    "Who is playing?": "Wer spielt?",
    "Yes, delete": "Ja, lösche",
    "Your achievements!": "Dini Erfolg!",
    "Your name": "Din Name",
    "lessons": "Lektione",
    "not started": "na nöd aagfange",
    "started": "aagfange",
    "{n} stars": "{n} Sterne",
    "{title} is finished.": "{title} isch fertig.",
    "↺ Clear": "↺ Leere",
    "▶ Go": "▶ Los",
    "▶ Step": "▶ Schritt",
    "▶▶ All": "▶▶ Alles",
    "★ done": "★ fertig"
  };

  content.bobbyFor = content.bobbyFor || {};
  content.bobbyFor['de-CH'] = {
  "welcome": "Hallo, chliini Entdeckerin! Ich bi de Bobby.",
  "lessonStart": "Chumm, mir lueged uns das a!",
  "correct": [
    "Super gmacht!",
    "Genau!",
    "Du bisch eifach super!",
    "Wow, das hocket!",
    "Das hesch toll gmacht!",
    "Ja! Genau so!"
  ],
  "wrong": [
    "Fasch! Probier's nomal.",
    "Keis Problem, nomal!",
    "Lueg nomal genau hi.",
    "Das isch knapp gsi. Wiiter gaht's!"
  ],
  "hint": "Lueg mal da …",
  "star": "En Stern für dich!",
  "locked": "Frag d'Mami oder de Papi, denn gaht's wiiter!",
  "bye": "Bis bald, chliine Entdecker!",
  "next": "Wiiter gaht's!",
  "allDone": "Du bisch en echte Computer-Entdecker!",
  "welcomeNamed": function (name) { return "Hallo, " + name + "! Ich bi de Bobby."; },
  "stageDone": function (title) { return "Du hesch „" + title + "“ gschafft!"; }
};
  content.bobbyDeCh = content.bobbyFor['de-CH'];
})(typeof globalThis !== 'undefined' ? globalThis : this);
