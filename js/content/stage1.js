/**
 * stage1.js – English source content. German lives in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 1,
  "title": "My Computer",
  "subtitle": "What is a computer and what belongs to it?",
  "icon": "computer",
  "achievement": {
    "id": "s1",
    "title": "Computer Explorer",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "1-1",
      "title": "What is a computer?",
      "goal": "We look at a computer.",
      "activities": [
        {
          "id": "1-1-1",
          "type": "explain",
          "title": "A computer",
          "speech": "This is a computer.",
          "prompt": "This is a computer.",
          "art": "computer",
          "points": [
            "It calculates very fast.",
            "It shows pictures on the monitor.",
            "It needs electricity."
          ]
        },
        {
          "id": "1-1-2",
          "type": "pickOne",
          "title": "Where is the computer?",
          "speech": "Point to the computer.",
          "prompt": "Where is the computer?",
          "options": [
            {
              "id": "maus",
              "art": "maus",
              "label": "Mouse"
            },
            {
              "id": "computer",
              "art": "computer",
              "label": "Computer"
            },
            {
              "id": "laptop",
              "art": "laptop",
              "label": "Laptop"
            }
          ],
          "answer": "computer"
        }
      ]
    },
    {
      "id": "1-2",
      "title": "The monitor",
      "goal": "The monitor shows us pictures.",
      "activities": [
        {
          "id": "1-2-1",
          "type": "explain",
          "title": "The monitor",
          "speech": "The monitor shows pictures.",
          "prompt": "The monitor shows pictures.",
          "art": "monitor",
          "points": [
            "It looks like a television.",
            "It shows what the computer does."
          ]
        },
        {
          "id": "1-2-2",
          "type": "pickOne",
          "title": "Where is the monitor?",
          "speech": "Point to the monitor.",
          "prompt": "Where is the monitor?",
          "options": [
            {
              "id": "monitor",
              "art": "monitor",
              "label": "Monitor"
            },
            {
              "id": "lautsprecher",
              "art": "lautsprecher",
              "label": "Speaker"
            },
            {
              "id": "tastatur",
              "art": "tastatur",
              "label": "Keyboard"
            }
          ],
          "answer": "monitor"
        }
      ]
    },
    {
      "id": "1-3",
      "title": "The keyboard",
      "goal": "We write with the keyboard.",
      "activities": [
        {
          "id": "1-3-1",
          "type": "explain",
          "title": "The keyboard",
          "speech": "The keyboard has many keys.",
          "prompt": "The keyboard has many keys.",
          "art": "tastatur",
          "points": [
            "Every key has a symbol.",
            "You use it to write letters."
          ]
        },
        {
          "id": "1-3-2",
          "type": "pickOne",
          "title": "Where is the keyboard?",
          "speech": "Point to the keyboard.",
          "prompt": "Where is the keyboard?",
          "options": [
            {
              "id": "maus",
              "art": "maus",
              "label": "Mouse"
            },
            {
              "id": "tastatur",
              "art": "tastatur",
              "label": "Keyboard"
            },
            {
              "id": "monitor",
              "art": "monitor",
              "label": "Monitor"
            }
          ],
          "answer": "tastatur"
        }
      ]
    },
    {
      "id": "1-4",
      "title": "The mouse",
      "goal": "The mouse points at things.",
      "activities": [
        {
          "id": "1-4-1",
          "type": "explain",
          "title": "The mouse",
          "speech": "The mouse points at the screen.",
          "prompt": "The mouse points at the screen.",
          "art": "maus",
          "points": [
            "It has a little arrow.",
            "You use it to click on things."
          ]
        },
        {
          "id": "1-4-2",
          "type": "pickOne",
          "title": "Where is the mouse?",
          "speech": "Point to the mouse.",
          "prompt": "Where is the mouse?",
          "options": [
            {
              "id": "tastatur",
              "art": "tastatur",
              "label": "Keyboard"
            },
            {
              "id": "maus",
              "art": "maus",
              "label": "Mouse"
            },
            {
              "id": "kamera",
              "art": "kamera",
              "label": "Camera"
            }
          ],
          "answer": "maus"
        }
      ]
    },
    {
      "id": "1-5",
      "title": "The laptop",
      "goal": "A laptop is a computer to carry.",
      "activities": [
        {
          "id": "1-5-1",
          "type": "explain",
          "title": "The laptop",
          "speech": "A laptop is a computer to carry.",
          "prompt": "A laptop is a computer to carry.",
          "art": "laptop",
          "points": [
            "Screen and keyboard are together.",
            "It has a battery."
          ]
        },
        {
          "id": "1-5-2",
          "type": "pickOne",
          "title": "Laptop or big computer?",
          "speech": "What can you carry?",
          "prompt": "What can you carry?",
          "options": [
            {
              "id": "computer",
              "art": "computer",
              "label": "Computer"
            },
            {
              "id": "laptop",
              "art": "laptop",
              "label": "Laptop"
            }
          ],
          "answer": "laptop",
          "columns": 2
        }
      ]
    },
    {
      "id": "1-6",
      "title": "Speaker and camera",
      "goal": "Computers can hear and speak.",
      "activities": [
        {
          "id": "1-6-1",
          "type": "explain",
          "title": "Speaker and camera",
          "speech": "The speaker plays music.",
          "prompt": "The speaker plays music.",
          "art": "lautsprecher",
          "points": [
            "The camera takes photos.",
            "The speaker makes sounds."
          ]
        },
        {
          "id": "1-6-2",
          "type": "pickOne",
          "title": "Who takes photos?",
          "speech": "Who takes photos?",
          "prompt": "Who takes photos?",
          "options": [
            {
              "id": "kamera",
              "art": "kamera",
              "label": "Camera"
            },
            {
              "id": "lautsprecher",
              "art": "lautsprecher",
              "label": "Speaker"
            },
            {
              "id": "tastatur",
              "art": "tastatur",
              "label": "Keyboard"
            }
          ],
          "answer": "kamera"
        }
      ]
    },
    {
      "id": "1-7",
      "title": "What can computers do?",
      "goal": "Computers paint, calculate and play music.",
      "activities": [
        {
          "id": "1-7-1",
          "type": "explain",
          "title": "So many things",
          "speech": "Computers can do a lot.",
          "prompt": "Computers can do a lot.",
          "art": "computer",
          "points": [
            "They paint pictures.",
            "They play music.",
            "They calculate with numbers."
          ]
        },
        {
          "id": "1-7-2",
          "type": "dragDrop",
          "title": "What belongs to a computer?",
          "speech": "Drag everything to the computer.",
          "prompt": "Put everything in its place.",
          "items": [
            {
              "id": "monitor",
              "art": "monitor",
              "label": "Monitor"
            },
            {
              "id": "tastatur",
              "art": "tastatur",
              "label": "Keyboard"
            },
            {
              "id": "maus",
              "art": "maus",
              "label": "Mouse"
            },
            {
              "id": "lautsprecher",
              "art": "lautsprecher",
              "label": "Speaker"
            }
          ],
          "targets": [
            {
              "id": "platz-monitor",
              "label": "Screen",
              "accepts": [
                "monitor"
              ]
            },
            {
              "id": "platz-tastatur",
              "label": "Writing",
              "accepts": [
                "tastatur"
              ]
            },
            {
              "id": "platz-maus",
              "label": "Pointing",
              "accepts": [
                "maus"
              ]
            },
            {
              "id": "platz-ton",
              "label": "Listening",
              "accepts": [
                "lautsprecher"
              ]
            }
          ],
          "mode": "bins"
        }
      ]
    },
    {
      "id": "1-8",
      "title": "Review everything",
      "goal": "We remember all the parts.",
      "activities": [
        {
          "id": "1-8-1",
          "type": "matchPairs",
          "title": "Connect the parts",
          "speech": "Connect the parts with the name.",
          "prompt": "Connect each part with its name.",
          "mode": "columns",
          "seed": 4,
          "pairs": [
            {
              "a": {
                "art": "monitor",
                "label": "Monitor"
              },
              "b": {
                "art": "monitor",
                "label": "Screen"
              }
            },
            {
              "a": {
                "art": "tastatur",
                "label": "Keyboard"
              },
              "b": {
                "art": "tastatur",
                "label": "Keys"
              }
            },
            {
              "a": {
                "art": "maus",
                "label": "Mouse"
              },
              "b": {
                "art": "maus",
                "label": "Pointer"
              }
            },
            {
              "a": {
                "art": "laptop",
                "label": "Laptop"
              },
              "b": {
                "art": "laptop",
                "label": "On the go"
              }
            }
          ]
        },
        {
          "id": "1-8-2",
          "type": "matchPairs",
          "title": "Memory",
          "speech": "Find the matching pictures.",
          "prompt": "Find the matching pictures.",
          "mode": "memory",
          "seed": 6,
          "pairs": [
            {
              "a": {
                "art": "monitor",
                "label": "Monitor"
              },
              "b": {
                "art": "monitor",
                "label": "Monitor"
              }
            },
            {
              "a": {
                "art": "tastatur",
                "label": "Keyboard"
              },
              "b": {
                "art": "tastatur",
                "label": "Keyboard"
              }
            },
            {
              "a": {
                "art": "maus",
                "label": "Mouse"
              },
              "b": {
                "art": "maus",
                "label": "Mouse"
              }
            },
            {
              "a": {
                "art": "laptop",
                "label": "Laptop"
              },
              "b": {
                "art": "laptop",
                "label": "Laptop"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "1-m",
      "title": "Stage finale",
      "goal": "Show what you already know.",
      "milestone": true,
      "activities": [
        {
          "id": "1-m-1",
          "type": "pickOne",
          "title": "Everything mixed",
          "speech": "Show what you know.",
          "prompt": "What belongs where?",
          "deck": [
            {
              "prompt": "Where is the keyboard?",
              "options": [
                {
                  "id": "maus",
                  "art": "maus",
                  "label": "Mouse"
                },
                {
                  "id": "tastatur",
                  "art": "tastatur",
                  "label": "Keyboard"
                },
                {
                  "id": "monitor",
                  "art": "monitor",
                  "label": "Monitor"
                }
              ],
              "answer": "tastatur"
            },
            {
              "prompt": "What do you click with?",
              "options": [
                {
                  "id": "maus",
                  "art": "maus",
                  "label": "Mouse"
                },
                {
                  "id": "laptop",
                  "art": "laptop",
                  "label": "Laptop"
                },
                {
                  "id": "kamera",
                  "art": "kamera",
                  "label": "Camera"
                }
              ],
              "answer": "maus"
            },
            {
              "prompt": "Where do you see pictures?",
              "options": [
                {
                  "id": "monitor",
                  "art": "monitor",
                  "label": "Monitor"
                },
                {
                  "id": "tastatur",
                  "art": "tastatur",
                  "label": "Keyboard"
                },
                {
                  "id": "maus",
                  "art": "maus",
                  "label": "Mouse"
                }
              ],
              "answer": "monitor"
            },
            {
              "prompt": "What makes music?",
              "options": [
                {
                  "id": "lautsprecher",
                  "art": "lautsprecher",
                  "label": "Speaker"
                },
                {
                  "id": "maus",
                  "art": "maus",
                  "label": "Mouse"
                },
                {
                  "id": "drucker",
                  "art": "drucker",
                  "label": "Printer"
                }
              ],
              "answer": "lautsprecher"
            },
            {
              "prompt": "What takes photos?",
              "options": [
                {
                  "id": "kamera",
                  "art": "kamera",
                  "label": "Camera"
                },
                {
                  "id": "laptop",
                  "art": "laptop",
                  "label": "Laptop"
                },
                {
                  "id": "tastatur",
                  "art": "tastatur",
                  "label": "Keyboard"
                }
              ],
              "answer": "kamera"
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
