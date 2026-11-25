/**
 * stage2.js – English source content. German lives in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 2,
  "title": "Mouse Adventures",
  "subtitle": "Point, click, drag, scroll.",
  "icon": "maus",
  "achievement": {
    "id": "s2",
    "title": "Mouse Master",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "2-1",
      "title": "Move the mouse",
      "goal": "Move the pointer along the line.",
      "activities": [
        {
          "id": "2-1-1",
          "type": "target",
          "title": "Trace the line",
          "speech": "Move the mouse along the line.",
          "prompt": "Move the mouse along the line.",
          "mode": "trace"
        }
      ]
    },
    {
      "id": "2-2",
      "title": "The pointer",
      "goal": "Some things can be clicked.",
      "activities": [
        {
          "id": "2-2-1",
          "type": "pickOne",
          "title": "What can you click?",
          "speech": "What can you click?",
          "prompt": "What can you click?",
          "options": [
            {
              "id": "truhe",
              "art": "truhe",
              "label": "Chest with a button"
            },
            {
              "id": "blume",
              "art": "blume",
              "label": "Picture of a flower"
            }
          ],
          "answer": "truhe",
          "columns": 2
        }
      ]
    },
    {
      "id": "2-3",
      "title": "Clicking",
      "goal": "Click the stars.",
      "activities": [
        {
          "id": "2-3-1",
          "type": "target",
          "title": "Catch the stars",
          "speech": "Click the stars.",
          "prompt": "Click on each star.",
          "mode": "pop",
          "art": "stern",
          "size": "xl",
          "count": 6
        }
      ]
    },
    {
      "id": "2-4",
      "title": "Double click",
      "goal": "Two quick clicks open the chest.",
      "activities": [
        {
          "id": "2-4-1",
          "type": "target",
          "title": "Open the chest",
          "speech": "Click the chest twice, quickly.",
          "prompt": "Click the chest twice, quickly.",
          "mode": "pop",
          "art": "truhe",
          "size": "l",
          "count": 3,
          "dbl": true
        }
      ]
    },
    {
      "id": "2-5",
      "title": "Hold and drag",
      "goal": "Drag the butterfly to the flower.",
      "activities": [
        {
          "id": "2-5-1",
          "type": "dragDrop",
          "title": "Butterfly and flower",
          "speech": "Drag the butterfly to the flower.",
          "prompt": "Drag the butterfly to the flower.",
          "items": [
            {
              "id": "schmetterling",
              "art": "schmetterling",
              "label": "Butterfly"
            }
          ],
          "targets": [
            {
              "id": "blume",
              "art": "blume",
              "label": "Flower",
              "accepts": [
                "schmetterling"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "2-6",
      "title": "Drag and drop",
      "goal": "Put all the fruit in the basket.",
      "activities": [
        {
          "id": "2-6-1",
          "type": "dragDrop",
          "title": "Fruit in the basket",
          "speech": "Put all the fruit in the basket.",
          "prompt": "Put all the fruit in the basket.",
          "items": [
            {
              "id": "apfel1",
              "art": "apfel",
              "label": "Apple"
            },
            {
              "id": "apfel2",
              "art": "apfel",
              "label": "Apple"
            },
            {
              "id": "banane1",
              "art": "banane",
              "label": "Banana"
            },
            {
              "id": "banane2",
              "art": "banane",
              "label": "Banana"
            },
            {
              "id": "orange1",
              "art": "orange",
              "label": "Orange"
            },
            {
              "id": "orange2",
              "art": "orange",
              "label": "Orange"
            }
          ],
          "targets": [
            {
              "id": "korb",
              "art": "korb",
              "label": "Basket",
              "accepts": [
                "apfel1",
                "apfel2",
                "banane1",
                "banane2",
                "orange1",
                "orange2"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "2-7",
      "title": "Scrolling",
      "goal": "Scroll down and find Bobby.",
      "activities": [
        {
          "id": "2-7-1",
          "type": "explain",
          "title": "Scroll down",
          "speech": "Scroll down and find Bobby.",
          "prompt": "Scroll down and find Bobby.",
          "art": "blume",
          "scroll": true,
          "points": [
            "Turn the mouse wheel.",
            "Or drag the bar."
          ]
        }
      ]
    },
    {
      "id": "2-8",
      "title": "Become a mouse master",
      "goal": "Four games for steady hands.",
      "activities": [
        {
          "id": "2-8-1",
          "type": "target",
          "title": "Medium stars",
          "speech": "Click the stars.",
          "prompt": "Click on each star.",
          "mode": "pop",
          "art": "stern",
          "size": "l",
          "count": 7
        },
        {
          "id": "2-8-2",
          "type": "target",
          "title": "Small stars",
          "speech": "Now the stars get smaller.",
          "prompt": "Now the stars get smaller.",
          "mode": "pop",
          "art": "stern",
          "size": "m",
          "count": 8
        },
        {
          "id": "2-8-3",
          "type": "target",
          "title": "Flying stars",
          "speech": "The stars are flying. Click them.",
          "prompt": "The stars are flying. Click them.",
          "mode": "pop",
          "art": "stern",
          "size": "s",
          "count": 6,
          "moving": true
        },
        {
          "id": "2-8-4",
          "type": "puzzle",
          "title": "Build the picture",
          "speech": "Put the picture together.",
          "prompt": "Put the four pieces together.",
          "cols": 2,
          "rows": 2,
          "art": "blume"
        },
        {
          "id": "2-8-5",
          "type": "target",
          "title": "New line",
          "speech": "Move along the line again.",
          "prompt": "Move the mouse along the line.",
          "mode": "trace",
          "path": "M 12 20 C 40 10, 55 45, 40 62 S 18 82, 44 88 S 78 70, 88 40"
        }
      ]
    },
    {
      "id": "2-m",
      "title": "Stage finale",
      "goal": "One last picture for real mouse masters.",
      "milestone": true,
      "activities": [
        {
          "id": "2-m-1",
          "type": "puzzle",
          "title": "Sun picture",
          "speech": "Put the sun picture together.",
          "prompt": "Put the sun picture together.",
          "cols": 3,
          "rows": 2,
          "art": "sonne"
        }
      ]
    }
  ]
};

  if (content.register) { content.register(stage); }
  else { content.stages = (content.stages || []); content.stages.push(stage); }
  if (typeof module !== 'undefined' && module.exports) { module.exports = stage; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
