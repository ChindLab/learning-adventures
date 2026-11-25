/**
 * stage4.js – English source content. German lives in i18n/de-DE.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 4,
  "title": "Letters & Typing",
  "subtitle": "From A to Z and the first words.",
  "icon": "buch",
  "achievement": {
    "id": "s4",
    "title": "Little Typing Star",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "4-1",
      "title": "A to H",
      "goal": "Eight letters with pictures.",
      "activities": [
        {
          "id": "4-1-1",
          "type": "typeText",
          "title": "A to H",
          "speech": "Always press the letter.",
          "prompt": "Press the letter you see.",
          "mode": "alphabet",
          "letters": [
            {
              "key": "A",
              "art": "apfel",
              "word": "Apple"
            },
            {
              "key": "B",
              "art": "ball",
              "word": "Ball"
            },
            {
              "key": "C",
              "art": "katze",
              "word": "Cat"
            },
            {
              "key": "D",
              "art": "hund",
              "word": "Dog"
            },
            {
              "key": "E",
              "art": "elefant",
              "word": "Elephant"
            },
            {
              "key": "F",
              "art": "fisch",
              "word": "Fish"
            },
            {
              "key": "G",
              "art": "gitarre",
              "word": "Guitar"
            },
            {
              "key": "H",
              "art": "hut",
              "word": "Hat"
            }
          ]
        }
      ]
    },
    {
      "id": "4-2",
      "title": "I to P",
      "goal": "Eight more letters.",
      "activities": [
        {
          "id": "4-2-1",
          "type": "typeText",
          "title": "I to P",
          "speech": "Always press the letter.",
          "prompt": "Press the letter you see.",
          "mode": "alphabet",
          "letters": [
            {
              "key": "I",
              "art": "eis",
              "word": "Ice cream"
            },
            {
              "key": "J",
              "art": "jacke",
              "word": "Jacket"
            },
            {
              "key": "K",
              "art": "drachen",
              "word": "Kite"
            },
            {
              "key": "L",
              "art": "lampe",
              "word": "Lamp"
            },
            {
              "key": "M",
              "art": "maus",
              "word": "Mouse"
            },
            {
              "key": "N",
              "art": "nase",
              "word": "Nose"
            },
            {
              "key": "O",
              "art": "orange",
              "word": "Orange"
            },
            {
              "key": "P",
              "art": "pferd",
              "word": "Pony"
            }
          ]
        }
      ]
    },
    {
      "id": "4-3",
      "title": "Q to Z",
      "goal": "The last letters.",
      "activities": [
        {
          "id": "4-3-1",
          "type": "typeText",
          "title": "Q to Z",
          "speech": "Always press the letter.",
          "prompt": "Press the letter you see.",
          "mode": "alphabet",
          "letters": [
            {
              "key": "Q",
              "art": "krone",
              "word": "Queen"
            },
            {
              "key": "R",
              "art": "roboter",
              "word": "Robot"
            },
            {
              "key": "S",
              "art": "sonne",
              "word": "Sun"
            },
            {
              "key": "T",
              "art": "tasse",
              "word": "Tea"
            },
            {
              "key": "U",
              "art": "regenschirm",
              "word": "Umbrella"
            },
            {
              "key": "V",
              "art": "vase",
              "word": "Vase"
            },
            {
              "key": "W",
              "art": "wasser",
              "word": "Water"
            },
            {
              "key": "X",
              "art": "xylophon",
              "word": "Xylophone"
            },
            {
              "key": "Y",
              "art": "yoga",
              "word": "Yoga"
            },
            {
              "key": "Z",
              "art": "zebra",
              "word": "Zebra"
            }
          ]
        }
      ]
    },
    {
      "id": "4-4",
      "title": "Big and small",
      "goal": "A and a belong together.",
      "activities": [
        {
          "id": "4-4-1",
          "type": "matchPairs",
          "title": "Connect A to F",
          "speech": "Connect each capital with the small letter.",
          "prompt": "Connect A with a and so on.",
          "mode": "columns",
          "seed": 12,
          "pairs": [
            {
              "a": {
                "art": "kreis",
                "label": "A"
              },
              "b": {
                "art": "kreis",
                "label": "a"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "B"
              },
              "b": {
                "art": "kreis",
                "label": "b"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "C"
              },
              "b": {
                "art": "kreis",
                "label": "c"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "D"
              },
              "b": {
                "art": "kreis",
                "label": "d"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "E"
              },
              "b": {
                "art": "kreis",
                "label": "e"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "F"
              },
              "b": {
                "art": "kreis",
                "label": "f"
              }
            }
          ]
        },
        {
          "id": "4-4-2",
          "type": "matchPairs",
          "title": "Connect G to L",
          "speech": "Connect each capital with the small letter.",
          "prompt": "Connect G with g and so on.",
          "mode": "columns",
          "seed": 14,
          "pairs": [
            {
              "a": {
                "art": "quadrat",
                "label": "G"
              },
              "b": {
                "art": "quadrat",
                "label": "g"
              }
            },
            {
              "a": {
                "art": "quadrat",
                "label": "H"
              },
              "b": {
                "art": "quadrat",
                "label": "h"
              }
            },
            {
              "a": {
                "art": "quadrat",
                "label": "I"
              },
              "b": {
                "art": "quadrat",
                "label": "i"
              }
            },
            {
              "a": {
                "art": "quadrat",
                "label": "J"
              },
              "b": {
                "art": "quadrat",
                "label": "j"
              }
            },
            {
              "a": {
                "art": "quadrat",
                "label": "K"
              },
              "b": {
                "art": "quadrat",
                "label": "k"
              }
            },
            {
              "a": {
                "art": "quadrat",
                "label": "L"
              },
              "b": {
                "art": "quadrat",
                "label": "l"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "4-5",
      "title": "Find the letter",
      "goal": "Four letters on the keyboard.",
      "activities": [
        {
          "id": "4-5-1",
          "type": "keyPress",
          "title": "A to F",
          "speech": "Press the highlighted letters.",
          "prompt": "Press the letter that glows.",
          "pool": [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f"
          ],
          "layout": "letters",
          "count": 8,
          "hint": "The letters are on the keyboard."
        },
        {
          "id": "4-5-2",
          "type": "keyPress",
          "title": "G to L",
          "speech": "Press the highlighted letters.",
          "prompt": "Press the letter that glows.",
          "pool": [
            "g",
            "h",
            "i",
            "j",
            "k",
            "l"
          ],
          "layout": "letters",
          "count": 8,
          "hint": "The letters are on the keyboard."
        },
        {
          "id": "4-5-3",
          "type": "keyPress",
          "title": "M to R",
          "speech": "Press the highlighted letters.",
          "prompt": "Press the letter that glows.",
          "pool": [
            "m",
            "n",
            "o",
            "p",
            "q",
            "r"
          ],
          "layout": "letters",
          "count": 8,
          "hint": "The letters are on the keyboard."
        },
        {
          "id": "4-5-4",
          "type": "keyPress",
          "title": "S to Z",
          "speech": "Press the highlighted letters.",
          "prompt": "Press the letter that glows.",
          "pool": [
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
          ],
          "layout": "letters",
          "count": 8,
          "hint": "The letters are on the keyboard."
        }
      ]
    },
    {
      "id": "4-6",
      "title": "Type a word",
      "goal": "Seven little words and your name.",
      "activities": [
        {
          "id": "4-6-1",
          "type": "typeText",
          "title": "Type words",
          "speech": "Type the word letter by letter.",
          "prompt": "Type the word.",
          "mode": "words",
          "words": [
            {
              "text": "CAT",
              "art": "katze",
              "label": "Cat"
            },
            {
              "text": "DOG",
              "art": "hund",
              "label": "Dog"
            },
            {
              "text": "SUN",
              "art": "sonne",
              "label": "Sun"
            },
            {
              "text": "MOM",
              "art": "blume",
              "label": "Mom"
            },
            {
              "text": "DAD",
              "art": "hut",
              "label": "Dad"
            },
            {
              "text": "BALL",
              "art": "ball",
              "label": "Ball"
            },
            {
              "text": "EGG",
              "art": "ei",
              "label": "Egg"
            }
          ]
        },
        {
          "id": "4-6-2",
          "type": "typeText",
          "title": "Your name",
          "speech": "Type your name.",
          "prompt": "Type your name in the box.",
          "mode": "free"
        }
      ]
    },
    {
      "id": "4-m",
      "title": "Stage finale",
      "goal": "Three words without help.",
      "milestone": true,
      "activities": [
        {
          "id": "4-m-1",
          "type": "typeText",
          "title": "Three words",
          "speech": "Type the three words.",
          "prompt": "Type the three words.",
          "mode": "words",
          "words": [
            {
              "text": "MOM",
              "art": "blume",
              "label": "Mom"
            },
            {
              "text": "DAD",
              "art": "hut",
              "label": "Dad"
            },
            {
              "text": "EGG",
              "art": "ei",
              "label": "Egg"
            }
          ]
        }
      ]
    }
  ]
};

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
