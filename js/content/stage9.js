/**
 * stage9.js – English source content. German lives in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 9,
  "title": "Finger Training",
  "subtitle": "Typing with all fingers, without hurry.",
  "icon": "hand-left",
  "alwaysOpen": true,
  "achievement": {
    "id": "s9",
    "title": "Typing Pro",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "9-1",
      "title": "How the fingers lie",
      "goal": "Get to know the home row.",
      "activities": [
        {
          "id": "9-1-1",
          "type": "explain",
          "title": "The home row",
          "speech": "This is how the fingers rest.",
          "prompt": "This is how the fingers rest.",
          "art": "hand-left",
          "points": [
            "Fingers on ASDF.",
            "Fingers on JKL.",
            "Back straight, feet still."
          ]
        }
      ]
    },
    {
      "id": "9-2",
      "title": "Left hand: A S D F",
      "goal": "Four keys for the left hand.",
      "activities": [
        {
          "id": "9-2-1",
          "type": "homeRow",
          "title": "Left hand",
          "speech": "Left hand: A S D F.",
          "prompt": "Type with your left hand.",
          "sequences": [
            "asdf",
            "fdsa",
            "as",
            "df"
          ]
        }
      ]
    },
    {
      "id": "9-3",
      "title": "Right hand: J K L",
      "goal": "Three keys for the right hand.",
      "activities": [
        {
          "id": "9-3-1",
          "type": "homeRow",
          "title": "Right hand",
          "speech": "Right hand: J K L.",
          "prompt": "Type with your right hand.",
          "sequences": [
            "jkl",
            "lkj",
            "jk",
            "kl"
          ]
        }
      ]
    },
    {
      "id": "9-4",
      "title": "Both hands",
      "goal": "Alternate left and right.",
      "activities": [
        {
          "id": "9-4-1",
          "type": "homeRow",
          "title": "Together",
          "speech": "Now both hands together.",
          "prompt": "Type alternating left and right.",
          "sequences": [
            "fj",
            "dk",
            "sl",
            "aj"
          ]
        }
      ]
    },
    {
      "id": "9-5",
      "title": "Little words",
      "goal": "Words that only need the home row.",
      "activities": [
        {
          "id": "9-5-1",
          "type": "homeRow",
          "title": "Words with ASDF JKL",
          "speech": "Type little words with your fingers.",
          "prompt": "These words only need the home row.",
          "sequences": [
            "als",
            "das",
            "lass",
            "fall"
          ]
        }
      ]
    },
    {
      "id": "9-6",
      "title": "Top left: Q W",
      "goal": "The top row with the left hand.",
      "activities": [
        {
          "id": "9-6-1",
          "type": "homeRow",
          "title": "Q and W",
          "speech": "Top left: Q and W.",
          "prompt": "Q and W belong to the left hand.",
          "sequences": [
            "qw",
            "wq",
            "qwqw",
            "qwas"
          ]
        }
      ]
    },
    {
      "id": "9-7",
      "title": "Top right: O P",
      "goal": "The top row with the right hand.",
      "activities": [
        {
          "id": "9-7-1",
          "type": "homeRow",
          "title": "O and P",
          "speech": "Top right: O and P.",
          "prompt": "O and P belong to the right hand.",
          "sequences": [
            "op",
            "po",
            "opop",
            "opkl"
          ]
        }
      ]
    },
    {
      "id": "9-8",
      "title": "Bottom: M N",
      "goal": "Reach down with your index finger.",
      "activities": [
        {
          "id": "9-8-1",
          "type": "homeRow",
          "title": "M and N",
          "speech": "Bottom right: M and N.",
          "prompt": "M and N sit under your index finger.",
          "sequences": [
            "mn",
            "nm",
            "mnmn",
            "mama",
            "mann"
          ]
        }
      ]
    },
    {
      "id": "9-9",
      "title": "Mixed and complex",
      "goal": "Longer paths across the keyboard.",
      "activities": [
        {
          "id": "9-9-1",
          "type": "homeRow",
          "title": "Everything mixed",
          "speech": "Now it gets mixed.",
          "prompt": "Letters and words across the keyboard.",
          "sequences": [
            "qwas",
            "opmn",
            "hand",
            "moon",
            "plan"
          ]
        }
      ]
    },
    {
      "id": "9-10",
      "title": "Star Rocket",
      "goal": "Type the letter, the rocket flies.",
      "activities": [
        {
          "id": "9-10-1",
          "type": "rocket",
          "title": "Shoot the letters",
          "speech": "Hit the letters with the rocket.",
          "prompt": "Press the letter. The rocket takes off!",
          "pool": [
            "a",
            "s",
            "d",
            "f",
            "j",
            "k",
            "l"
          ],
          "count": 12
        }
      ]
    },
    {
      "id": "9-11",
      "title": "Word Rocket",
      "goal": "Pick a level and tempo, then type.",
      "activities": [
        {
          "id": "9-11-1",
          "type": "rocket",
          "title": "Word Rocket",
          "speech": "Choose level and tempo.",
          "prompt": "Type the letters. Then the rocket starts.",
          "chooseLevel": true,
          "count": 8,
          "levels": [
            {
              "label": "Easy",
              "speed": 4.5,
              "lanes": 3,
              "pool": [
                "a",
                "s",
                "d",
                "f",
                "j",
                "k",
                "l"
              ]
            },
            {
              "label": "Medium",
              "speed": 5.5,
              "lanes": 4,
              "pool": [
                "as",
                "df",
                "jk",
                "kl",
                "sd",
                "fj",
                "lk"
              ]
            },
            {
              "label": "Hard",
              "speed": 6.5,
              "lanes": 4,
              "pool": [
                "all",
                "dad",
                "sad",
                "fall",
                "lad",
                "fad"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "9-m",
      "title": "Stage finale",
      "goal": "Show what your fingers can do.",
      "milestone": true,
      "activities": [
        {
          "id": "9-m-1",
          "type": "homeRow",
          "title": "Finger test",
          "speech": "Show what your fingers can do.",
          "prompt": "All together: letters and words.",
          "sequences": [
            "qwas",
            "opmn",
            "moon",
            "plan",
            "hand"
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
