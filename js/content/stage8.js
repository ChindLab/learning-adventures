/**
 * stage8.js – English source content. German lives in i18n/de-DE.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 8,
  "title": "My First JavaScript",
  "subtitle": "What code is and what it does.",
  "icon": "monitor",
  "achievement": {
    "id": "s8",
    "title": "First Programmer",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "8-1",
      "title": "What is code?",
      "goal": "Code is an instruction for the computer.",
      "activities": [
        {
          "id": "8-1-1",
          "type": "explain",
          "title": "Code is like a recipe",
          "speech": "Code is an instruction for the computer.",
          "prompt": "Code is an instruction for the computer.",
          "art": "computer",
          "points": [
            "A recipe says what to do.",
            "Code does too — for computers."
          ]
        }
      ]
    },
    {
      "id": "8-2",
      "title": "The first command",
      "goal": "alert shows a message.",
      "activities": [
        {
          "id": "8-2-1",
          "type": "jsDemo",
          "title": "Say hello",
          "speech": "This command shows a message.",
          "prompt": "This command shows a message.",
          "code": "alert(\"Hallo!\");",
          "viz": "alert",
          "lineNotes": [
            "This command shows a text."
          ]
        }
      ]
    },
    {
      "id": "8-3",
      "title": "Variables",
      "goal": "A variable is a little box.",
      "activities": [
        {
          "id": "8-3-1",
          "type": "jsDemo",
          "title": "A box for the name",
          "speech": "The computer puts the name in a box.",
          "prompt": "The computer puts the name in a box.",
          "code": "let myName = \"Anna\";\nalert(myName);",
          "viz": "box",
          "lineNotes": [
            "This creates the box myName.",
            "The text inside it is shown."
          ]
        }
      ]
    },
    {
      "id": "8-4",
      "title": "Numbers",
      "goal": "Three apples in a box.",
      "activities": [
        {
          "id": "8-4-1",
          "type": "jsDemo",
          "title": "Three apples",
          "speech": "Three apples are in the box.",
          "prompt": "Three apples are in the box.",
          "code": "let apples = 3;",
          "viz": "apples",
          "lineNotes": [
            "The box apples gets the number three."
          ]
        }
      ]
    },
    {
      "id": "8-5",
      "title": "Calculating",
      "goal": "Two and three makes five.",
      "activities": [
        {
          "id": "8-5-1",
          "type": "jsDemo",
          "title": "Five stars",
          "speech": "Two plus three makes five.",
          "prompt": "Two plus three makes five.",
          "code": "let result = 2 + 3;",
          "viz": "stars",
          "lineNotes": [
            "The computer calculates two plus three."
          ]
        }
      ]
    },
    {
      "id": "8-6",
      "title": "Functions",
      "goal": "An instruction you can reuse.",
      "activities": [
        {
          "id": "8-6-1",
          "type": "jsDemo",
          "title": "Hello, function!",
          "speech": "You can call a function again and again.",
          "prompt": "You can call a function again and again.",
          "code": "function sayHello() {\n  alert(\"Hallo!\");\n}\nsayHello();",
          "viz": "function",
          "lineNotes": [
            "This builds the instruction.",
            "The text inside.",
            "The instruction is ready.",
            "Now it runs."
          ]
        }
      ]
    },
    {
      "id": "8-m",
      "title": "Stage finale",
      "goal": "Variables and calculating together.",
      "milestone": true,
      "activities": [
        {
          "id": "8-m-1",
          "type": "jsDemo",
          "title": "Two numbers",
          "speech": "Two numbers are added together.",
          "prompt": "Two numbers are added together.",
          "code": "let a = 2;\nlet b = 3;\nalert(a + b);",
          "viz": "alert",
          "lineNotes": [
            "Box a gets two.",
            "Box b gets three.",
            "The sum is shown."
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
