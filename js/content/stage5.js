/**
 * stage5.js – English source content. German lives in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 5,
  "title": "Numbers",
  "subtitle": "Count, compare, plus and minus.",
  "icon": "uhr",
  "achievement": {
    "id": "s5",
    "title": "Number Explorer",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "5-1",
      "title": "Numbers from 0 to 5",
      "goal": "Count the apples.",
      "activities": [
        {
          "id": "5-1-1",
          "type": "countObjects",
          "title": "Count apples",
          "speech": "How many apples are there?",
          "prompt": "How many apples are there?",
          "mode": "count",
          "art": "apfel",
          "count": 4
        }
      ]
    },
    {
      "id": "5-2",
      "title": "Numbers from 6 to 10",
      "goal": "Now there are more.",
      "activities": [
        {
          "id": "5-2-1",
          "type": "countObjects",
          "title": "Count stars",
          "speech": "How many stars are there?",
          "prompt": "How many stars are there?",
          "mode": "count",
          "art": "stern",
          "count": 7
        }
      ]
    },
    {
      "id": "5-3",
      "title": "Numbers from 11 to 20",
      "goal": "You can count big amounts too.",
      "activities": [
        {
          "id": "5-3-1",
          "type": "countObjects",
          "title": "Many apples",
          "speech": "How many apples are there?",
          "prompt": "How many apples are there?",
          "mode": "count",
          "art": "apfel",
          "count": 12
        }
      ]
    },
    {
      "id": "5-4",
      "title": "Practise counting",
      "goal": "Count flowers.",
      "activities": [
        {
          "id": "5-4-1",
          "type": "countObjects",
          "title": "Count flowers",
          "speech": "How many flowers are there?",
          "prompt": "How many flowers are there?",
          "mode": "count",
          "art": "blume",
          "count": 9
        }
      ]
    },
    {
      "id": "5-5",
      "title": "Amount and number",
      "goal": "Which number matches the amount?",
      "activities": [
        {
          "id": "5-5-1",
          "type": "countObjects",
          "title": "Which number?",
          "speech": "Which number matches the pictures?",
          "prompt": "Which number matches the pictures?",
          "mode": "match",
          "art": "ball",
          "count": 6
        }
      ]
    },
    {
      "id": "5-6",
      "title": "Bigger and smaller",
      "goal": "Which number is bigger?",
      "activities": [
        {
          "id": "5-6-1",
          "type": "pickOne",
          "title": "Bigger or smaller",
          "speech": "Which number is bigger?",
          "prompt": "Which number is bigger?",
          "deck": [
            {
              "prompt": "Which number is bigger?",
              "options": [
                {
                  "id": "5",
                  "label": "5"
                },
                {
                  "id": "8",
                  "label": "8"
                },
                {
                  "id": "3",
                  "label": "3"
                }
              ],
              "answer": "8"
            },
            {
              "prompt": "Which number is smaller?",
              "options": [
                {
                  "id": "7",
                  "label": "7"
                },
                {
                  "id": "2",
                  "label": "2"
                },
                {
                  "id": "9",
                  "label": "9"
                }
              ],
              "answer": "2"
            },
            {
              "prompt": "Which number is bigger?",
              "options": [
                {
                  "id": "10",
                  "label": "10"
                },
                {
                  "id": "6",
                  "label": "6"
                }
              ],
              "answer": "10"
            }
          ]
        }
      ]
    },
    {
      "id": "5-7",
      "title": "Plus",
      "goal": "Two and one makes three.",
      "activities": [
        {
          "id": "5-7-1",
          "type": "countObjects",
          "title": "Two plus one",
          "speech": "Two apples and one apple. How many?",
          "prompt": "Two apples and one apple. How many are there?",
          "mode": "add",
          "art": "apfel",
          "a": 2,
          "b": 1
        }
      ]
    },
    {
      "id": "5-8",
      "title": "Minus",
      "goal": "Five minus two makes three.",
      "activities": [
        {
          "id": "5-8-1",
          "type": "countObjects",
          "title": "Five minus two",
          "speech": "Five stars. Two disappear.",
          "prompt": "Five stars. Two disappear. How many are left?",
          "mode": "sub",
          "art": "stern",
          "a": 5,
          "b": 2
        }
      ]
    },
    {
      "id": "5-m",
      "title": "Stage finale",
      "goal": "Three little sums.",
      "milestone": true,
      "activities": [
        {
          "id": "5-m-1",
          "type": "pickOne",
          "title": "Sums",
          "speech": "Solve the three tasks.",
          "prompt": "How much is that?",
          "deck": [
            {
              "prompt": "2 + 1 = ?",
              "options": [
                {
                  "id": "2",
                  "label": "2"
                },
                {
                  "id": "3",
                  "label": "3"
                },
                {
                  "id": "4",
                  "label": "4"
                }
              ],
              "answer": "3"
            },
            {
              "prompt": "4 − 2 = ?",
              "options": [
                {
                  "id": "1",
                  "label": "1"
                },
                {
                  "id": "2",
                  "label": "2"
                },
                {
                  "id": "3",
                  "label": "3"
                }
              ],
              "answer": "2"
            },
            {
              "prompt": "3 + 3 = ?",
              "options": [
                {
                  "id": "5",
                  "label": "5"
                },
                {
                  "id": "6",
                  "label": "6"
                },
                {
                  "id": "7",
                  "label": "7"
                }
              ],
              "answer": "6"
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
