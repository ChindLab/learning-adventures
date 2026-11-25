/**
 * stage3.js – English source content. German lives in i18n/de-DE.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 3,
  "title": "Keyboard Adventures",
  "subtitle": "Find the right key.",
  "icon": "tastatur",
  "achievement": {
    "id": "s3",
    "title": "Keyboard Explorer",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "3-1",
      "title": "What is a keyboard?",
      "goal": "Find ten letters on the keyboard.",
      "activities": [
        {
          "id": "3-1-1",
          "type": "keyPress",
          "title": "Find letters",
          "speech": "Always press the highlighted key.",
          "prompt": "Press the key that glows.",
          "pool": [
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l"
          ],
          "layout": "letters",
          "count": 10,
          "hint": "Look at the yellow ring!"
        },
        {
          "id": "3-1-2",
          "type": "matchPairs",
          "title": "Key memory",
          "speech": "Find the matching keys.",
          "prompt": "Find two cards with the same key.",
          "mode": "memory",
          "seed": 9,
          "pairs": [
            {
              "a": {
                "art": "kreis",
                "label": "A"
              },
              "b": {
                "art": "kreis",
                "label": "A"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "S"
              },
              "b": {
                "art": "kreis",
                "label": "S"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "D"
              },
              "b": {
                "art": "kreis",
                "label": "D"
              }
            },
            {
              "a": {
                "art": "kreis",
                "label": "F"
              },
              "b": {
                "art": "kreis",
                "label": "F"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "3-2",
      "title": "Finding numbers",
      "goal": "Find ten numbers on the keyboard.",
      "activities": [
        {
          "id": "3-2-1",
          "type": "keyPress",
          "title": "Find numbers",
          "speech": "Always press the highlighted number.",
          "prompt": "Press the number that glows.",
          "pool": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "layout": "numbers",
          "count": 10,
          "hint": "The numbers are at the top."
        }
      ]
    },
    {
      "id": "3-3",
      "title": "The space bar",
      "goal": "The space bar makes Bobby jump.",
      "activities": [
        {
          "id": "3-3-1",
          "type": "keyPress",
          "title": "Space bar",
          "speech": "Press the space bar. Bobby jumps!",
          "prompt": "Press the space bar. Bobby jumps!",
          "key": " ",
          "layout": "letters",
          "count": 10,
          "hint": "The space bar is at the bottom."
        }
      ]
    },
    {
      "id": "3-4",
      "title": "The Enter key",
      "goal": "Enter opens the chest.",
      "activities": [
        {
          "id": "3-4-1",
          "type": "keyPress",
          "title": "Enter",
          "speech": "Press Enter and open the chest.",
          "prompt": "Press Enter and open the chest.",
          "key": "Enter",
          "layout": "letters",
          "count": 10,
          "hint": "Enter is on the right."
        }
      ]
    },
    {
      "id": "3-5",
      "title": "The Backspace key",
      "goal": "Backspace deletes a letter.",
      "activities": [
        {
          "id": "3-5-1",
          "type": "keyPress",
          "title": "Backspace",
          "speech": "Press Backspace and delete the letter.",
          "prompt": "Press Backspace and delete the letter.",
          "key": "Backspace",
          "layout": "letters",
          "count": 10,
          "hint": "Backspace is at the top right."
        }
      ]
    },
    {
      "id": "3-6",
      "title": "The Shift key",
      "goal": "Shift makes capital letters.",
      "activities": [
        {
          "id": "3-6-1",
          "type": "keyPress",
          "title": "Shift",
          "speech": "Press Shift for a capital letter.",
          "prompt": "Press Shift for a capital letter.",
          "key": "Shift",
          "layout": "letters",
          "count": 10,
          "hint": "Shift is on the far left."
        }
      ]
    },
    {
      "id": "3-7",
      "title": "The arrow keys",
      "goal": "Bobby moves with the arrows.",
      "activities": [
        {
          "id": "3-7-1",
          "type": "keyPress",
          "title": "Arrow keys",
          "speech": "Press the highlighted arrow.",
          "prompt": "Press the arrow that glows.",
          "pool": [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
          ],
          "layout": "letters",
          "count": 10,
          "hint": "The arrows are at the bottom right."
        }
      ]
    },
    {
      "id": "3-8",
      "title": "Everything again",
      "goal": "Letters, numbers and keys mixed.",
      "activities": [
        {
          "id": "3-8-1",
          "type": "keyPress",
          "title": "Mixed keys",
          "speech": "Now it gets mixed.",
          "prompt": "Mixed now: letters, numbers and keys.",
          "pool": [
            "a",
            "s",
            "d",
            "3",
            "Enter",
            "ArrowLeft"
          ],
          "layout": "all",
          "count": 10,
          "hint": "Look at the yellow ring!"
        }
      ]
    },
    {
      "id": "3-m",
      "title": "Stage finale",
      "goal": "Show which key does what.",
      "milestone": true,
      "activities": [
        {
          "id": "3-m-1",
          "type": "pickOne",
          "title": "Key quiz",
          "speech": "Which key fits?",
          "prompt": "Which key fits?",
          "deck": [
            {
              "prompt": "How do you make a space?",
              "options": [
                {
                  "id": "space",
                  "label": "Space bar"
                },
                {
                  "id": "enter",
                  "label": "Enter"
                },
                {
                  "id": "shift",
                  "label": "Shift"
                }
              ],
              "answer": "space"
            },
            {
              "prompt": "How do you open something?",
              "options": [
                {
                  "id": "enter",
                  "label": "Enter"
                },
                {
                  "id": "space",
                  "label": "Space bar"
                }
              ],
              "answer": "enter"
            },
            {
              "prompt": "How do you make capital letters?",
              "options": [
                {
                  "id": "shift",
                  "label": "Shift"
                },
                {
                  "id": "space",
                  "label": "Space bar"
                }
              ],
              "answer": "shift"
            },
            {
              "prompt": "How do you delete a letter?",
              "options": [
                {
                  "id": "backspace",
                  "label": "Backspace"
                },
                {
                  "id": "enter",
                  "label": "Enter"
                }
              ],
              "answer": "backspace"
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
