/**
 * stage6.js – English source content. German lives in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 6,
  "title": "Logic Games",
  "subtitle": "Instructions, patterns and clever paths.",
  "icon": "roboter",
  "achievement": {
    "id": "s6",
    "title": "Little Logic Genius",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "6-1",
      "title": "Instructions",
      "goal": "Bobby follows your blocks.",
      "activities": [
        {
          "id": "6-1-1",
          "type": "gridRun",
          "title": "Two steps",
          "speech": "Place two steps and start.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 3,
            "h": 3
          },
          "start": {
            "x": 0,
            "y": 1,
            "dir": "E"
          },
          "goal": {
            "x": 2,
            "y": 1
          },
          "walls": [],
          "stars": [],
          "palette": [
            "forward"
          ],
          "maxBlocks": 3,
          "selftestProgram": [
            {
              "type": "forward"
            },
            {
              "type": "forward"
            }
          ]
        }
      ]
    },
    {
      "id": "6-2",
      "title": "Order",
      "goal": "The order makes the path.",
      "activities": [
        {
          "id": "6-2-1",
          "type": "sequence",
          "title": "The right way",
          "speech": "Put the three pictures in the right order.",
          "prompt": "What comes first, what next?",
          "layout": "order",
          "seed": 3,
          "cards": [
            {
              "id": "start",
              "label": "Start",
              "icon": "bobby"
            },
            {
              "id": "turn",
              "label": "Turn right",
              "icon": "block-right"
            },
            {
              "id": "goal",
              "label": "To the star",
              "icon": "stern"
            }
          ],
          "solution": [
            "start",
            "turn",
            "goal"
          ]
        }
      ]
    },
    {
      "id": "6-3",
      "title": "Patterns",
      "goal": "What comes next?",
      "activities": [
        {
          "id": "6-3-1",
          "type": "pattern",
          "title": "Spot the pattern",
          "speech": "What comes next?",
          "prompt": "What comes next?",
          "rounds": [
            {
              "sequence": [
                {
                  "color": "rot"
                },
                {
                  "color": "blau"
                },
                {
                  "color": "rot"
                }
              ],
              "options": [
                {
                  "id": "rot",
                  "color": "rot"
                },
                {
                  "id": "blau",
                  "color": "blau"
                },
                {
                  "id": "gelb",
                  "color": "gelb"
                }
              ],
              "answer": "rot"
            },
            {
              "sequence": [
                {
                  "art": "kreis"
                },
                {
                  "art": "quadrat"
                },
                {
                  "art": "kreis"
                },
                {
                  "art": "quadrat"
                }
              ],
              "options": [
                {
                  "id": "kreis",
                  "art": "kreis"
                },
                {
                  "id": "dreieck",
                  "art": "dreieck"
                },
                {
                  "id": "quadrat",
                  "art": "quadrat"
                }
              ],
              "answer": "kreis"
            },
            {
              "sequence": [
                {
                  "value": 1
                },
                {
                  "value": 2
                },
                {
                  "value": 1
                }
              ],
              "options": [
                {
                  "id": "1",
                  "value": 1
                },
                {
                  "id": "2",
                  "value": 2
                },
                {
                  "id": "3",
                  "value": 3
                }
              ],
              "answer": "1"
            }
          ]
        }
      ]
    },
    {
      "id": "6-4",
      "title": "Logical thinking",
      "goal": "What does not fit? Which path helps?",
      "activities": [
        {
          "id": "6-4-1",
          "type": "pickOne",
          "title": "What is different?",
          "speech": "What does not fit with the others?",
          "prompt": "What does not fit with the others?",
          "options": [
            {
              "id": "katze",
              "art": "katze",
              "label": "Cat"
            },
            {
              "id": "hund",
              "art": "hund",
              "label": "Dog"
            },
            {
              "id": "laptop",
              "art": "laptop",
              "label": "Laptop"
            }
          ],
          "answer": "laptop"
        },
        {
          "id": "6-4-2",
          "type": "pickOne",
          "title": "Which way?",
          "speech": "The path is blocked. What helps?",
          "prompt": "The path is blocked. What helps?",
          "options": [
            {
              "id": "forward",
              "art": "block-forward",
              "label": "Straight on"
            },
            {
              "id": "right",
              "art": "block-right",
              "label": "Around the corner"
            }
          ],
          "answer": "right"
        }
      ]
    },
    {
      "id": "6-5",
      "title": "If … then",
      "goal": "If a wall comes, turn.",
      "activities": [
        {
          "id": "6-5-1",
          "type": "gridRun",
          "title": "If wall, then right",
          "speech": "If a wall comes, turn right.",
          "prompt": "If a wall comes, turn right.",
          "grid": {
            "w": 2,
            "h": 2
          },
          "start": {
            "x": 0,
            "y": 0,
            "dir": "E"
          },
          "goal": {
            "x": 0,
            "y": 1
          },
          "walls": [
            [
              1,
              0
            ]
          ],
          "stars": [],
          "palette": [
            "forward",
            "right",
            "if"
          ],
          "maxBlocks": 3,
          "selftestProgram": [
            {
              "type": "if",
              "condition": "wall",
              "body": [
                {
                  "type": "right"
                }
              ]
            },
            {
              "type": "forward"
            }
          ]
        }
      ]
    },
    {
      "id": "6-6",
      "title": "Repeat",
      "goal": "Three times the same is shorter.",
      "activities": [
        {
          "id": "6-6-1",
          "type": "gridRun",
          "title": "Three times forward",
          "speech": "Repeat the step three times.",
          "prompt": "Repeat the step three times.",
          "grid": {
            "w": 4,
            "h": 3
          },
          "start": {
            "x": 0,
            "y": 1,
            "dir": "E"
          },
          "goal": {
            "x": 3,
            "y": 1
          },
          "walls": [],
          "stars": [],
          "palette": [
            "forward",
            "repeat"
          ],
          "maxBlocks": 3,
          "selftestProgram": [
            {
              "type": "repeat",
              "times": 3,
              "body": [
                {
                  "type": "forward"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "6-7",
      "title": "Patterns in a square",
      "goal": "Find the pattern in the square.",
      "activities": [
        {
          "id": "6-7-1",
          "type": "pattern",
          "title": "What is missing?",
          "speech": "Which picture is missing in the square?",
          "prompt": "Which picture is missing in the square?",
          "rounds": [
            {
              "layout": "grid",
              "sequence": [
                {
                  "color": "rot"
                },
                {
                  "color": "blau"
                },
                {
                  "color": "blau"
                }
              ],
              "options": [
                {
                  "id": "rot",
                  "color": "rot"
                },
                {
                  "id": "gelb",
                  "color": "gelb"
                },
                {
                  "id": "gruen",
                  "color": "grün"
                }
              ],
              "answer": "rot"
            },
            {
              "layout": "grid",
              "sequence": [
                {
                  "art": "kreis"
                },
                {
                  "art": "dreieck"
                },
                {
                  "art": "dreieck"
                }
              ],
              "options": [
                {
                  "id": "kreis",
                  "art": "kreis"
                },
                {
                  "id": "quadrat",
                  "art": "quadrat"
                },
                {
                  "id": "stern",
                  "art": "stern"
                }
              ],
              "answer": "kreis"
            },
            {
              "layout": "grid",
              "sequence": [
                {
                  "value": 1
                },
                {
                  "value": 2
                },
                {
                  "value": 2
                }
              ],
              "options": [
                {
                  "id": "1",
                  "value": 1
                },
                {
                  "id": "2",
                  "value": 2
                },
                {
                  "id": "3",
                  "value": 3
                }
              ],
              "answer": "1"
            }
          ]
        }
      ]
    },
    {
      "id": "6-8",
      "title": "What flies, what swims?",
      "goal": "Sort animals by where they live.",
      "activities": [
        {
          "id": "6-8-1",
          "type": "dragDrop",
          "title": "Fly or swim",
          "speech": "What flies? What swims?",
          "prompt": "Put each animal in the right place.",
          "items": [
            {
              "id": "vogel",
              "art": "vogel",
              "label": "Bird"
            },
            {
              "id": "schmetterling",
              "art": "schmetterling",
              "label": "Butterfly"
            },
            {
              "id": "fisch",
              "art": "fisch",
              "label": "Fish"
            },
            {
              "id": "qualle",
              "art": "qualle",
              "label": "Jellyfish"
            }
          ],
          "targets": [
            {
              "id": "luft",
              "art": "sonne",
              "label": "Flies",
              "accepts": [
                "vogel",
                "schmetterling"
              ]
            },
            {
              "id": "wasser",
              "art": "wasser",
              "label": "Swims",
              "accepts": [
                "fisch",
                "qualle"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "6-9",
      "title": "Big, medium, small",
      "goal": "Sort shapes by size.",
      "activities": [
        {
          "id": "6-9-1",
          "type": "dragDrop",
          "title": "Sort sizes",
          "speech": "Sort the shapes by size.",
          "prompt": "Sort: big, medium and small.",
          "items": [
            {
              "id": "gross-kreis",
              "art": "kreis",
              "label": "big circle",
              "size": 104
            },
            {
              "id": "gross-quadrat",
              "art": "quadrat",
              "label": "big square",
              "size": 104
            },
            {
              "id": "mittel-kreis",
              "art": "kreis",
              "label": "medium circle",
              "size": 82
            },
            {
              "id": "mittel-quadrat",
              "art": "quadrat",
              "label": "medium square",
              "size": 82
            },
            {
              "id": "klein-kreis",
              "art": "kreis",
              "label": "small circle",
              "size": 58
            },
            {
              "id": "klein-quadrat",
              "art": "quadrat",
              "label": "small square",
              "size": 58
            }
          ],
          "targets": [
            {
              "id": "gross",
              "label": "Big",
              "accepts": [
                "gross-kreis",
                "gross-quadrat"
              ]
            },
            {
              "id": "mittel",
              "label": "Medium",
              "accepts": [
                "mittel-kreis",
                "mittel-quadrat"
              ]
            },
            {
              "id": "klein",
              "label": "Small",
              "accepts": [
                "klein-kreis",
                "klein-quadrat"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "6-10",
      "title": "What belongs together?",
      "goal": "Connect things.",
      "activities": [
        {
          "id": "6-10-1",
          "type": "pickOne",
          "title": "What fits?",
          "speech": "What belongs together?",
          "prompt": "What fits the question?",
          "deck": [
            {
              "prompt": "Who swims in water?",
              "options": [
                {
                  "id": "fisch",
                  "art": "fisch",
                  "label": "Fish"
                },
                {
                  "id": "vogel",
                  "art": "vogel",
                  "label": "Bird"
                },
                {
                  "id": "katze",
                  "art": "katze",
                  "label": "Cat"
                }
              ],
              "answer": "fisch"
            },
            {
              "prompt": "Who flies in the sky?",
              "options": [
                {
                  "id": "vogel",
                  "art": "vogel",
                  "label": "Bird"
                },
                {
                  "id": "fisch",
                  "art": "fisch",
                  "label": "Fish"
                },
                {
                  "id": "hund",
                  "art": "hund",
                  "label": "Dog"
                }
              ],
              "answer": "vogel"
            },
            {
              "prompt": "Who says meow?",
              "options": [
                {
                  "id": "katze",
                  "art": "katze",
                  "label": "Cat"
                },
                {
                  "id": "hund",
                  "art": "hund",
                  "label": "Dog"
                },
                {
                  "id": "vogel",
                  "art": "vogel",
                  "label": "Bird"
                }
              ],
              "answer": "katze"
            },
            {
              "prompt": "What grows in the meadow?",
              "options": [
                {
                  "id": "blume",
                  "art": "blume",
                  "label": "Flower"
                },
                {
                  "id": "ball",
                  "art": "ball",
                  "label": "Ball"
                },
                {
                  "id": "apfel",
                  "art": "apfel",
                  "label": "Apple"
                }
              ],
              "answer": "blume"
            }
          ]
        }
      ]
    },
    {
      "id": "6-11",
      "title": "Memory Workshop",
      "goal": "Remember the cards and find every pair.",
      "activities": [
        {
          "id": "6-11-1",
          "type": "matchPairs",
          "title": "Animal Memory",
          "speech": "Find the matching animal cards.",
          "prompt": "Turn over two matching cards.",
          "mode": "memory",
          "seed": 10,
          "pairs": [
            {
              "a": { "art": "katze", "label": "Cat" },
              "b": { "art": "katze", "label": "Cat" }
            },
            {
              "a": { "art": "hund", "label": "Dog" },
              "b": { "art": "hund", "label": "Dog" }
            },
            {
              "a": { "art": "vogel", "label": "Bird" },
              "b": { "art": "vogel", "label": "Bird" }
            },
            {
              "a": { "art": "fisch", "label": "Fish" },
              "b": { "art": "fisch", "label": "Fish" }
            }
          ]
        },
        {
          "id": "6-11-2",
          "type": "matchPairs",
          "title": "Number Memory",
          "speech": "Find the matching number cards.",
          "prompt": "Turn over two matching numbers.",
          "mode": "memory",
          "seed": 11,
          "pairs": [
            {
              "a": { "art": "kreis", "label": "1" },
              "b": { "art": "kreis", "label": "1" }
            },
            {
              "a": { "art": "kreis", "label": "2" },
              "b": { "art": "kreis", "label": "2" }
            },
            {
              "a": { "art": "kreis", "label": "3" },
              "b": { "art": "kreis", "label": "3" }
            },
            {
              "a": { "art": "kreis", "label": "4" },
              "b": { "art": "kreis", "label": "4" }
            },
            {
              "a": { "art": "kreis", "label": "5" },
              "b": { "art": "kreis", "label": "5" }
            },
            {
              "a": { "art": "kreis", "label": "6" },
              "b": { "art": "kreis", "label": "6" }
            }
          ]
        },
        {
          "id": "6-11-3",
          "type": "matchPairs",
          "title": "Code Memory",
          "speech": "Find the matching command blocks.",
          "prompt": "Remember each command block.",
          "mode": "memory",
          "seed": 12,
          "pairs": [
            {
              "a": { "art": "block-forward", "label": "Forward" },
              "b": { "art": "block-forward", "label": "Forward" }
            },
            {
              "a": { "art": "block-back", "label": "Back" },
              "b": { "art": "block-back", "label": "Back" }
            },
            {
              "a": { "art": "block-left", "label": "Turn left" },
              "b": { "art": "block-left", "label": "Turn left" }
            },
            {
              "a": { "art": "block-right", "label": "Turn right" },
              "b": { "art": "block-right", "label": "Turn right" }
            },
            {
              "a": { "art": "block-jump", "label": "Jump" },
              "b": { "art": "block-jump", "label": "Jump" }
            },
            {
              "a": { "art": "block-repeat", "label": "Repeat" },
              "b": { "art": "block-repeat", "label": "Repeat" }
            },
            {
              "a": { "art": "block-if", "label": "If" },
              "b": { "art": "block-if", "label": "If" }
            },
            {
              "a": { "art": "block-collect", "label": "Collect" },
              "b": { "art": "block-collect", "label": "Collect" }
            }
          ]
        }
      ]
    },
    {
      "id": "6-m",
      "title": "Stage finale",
      "goal": "Turn, walk, arrive.",
      "milestone": true,
      "activities": [
        {
          "id": "6-m-1",
          "type": "gridRun",
          "title": "The last corner",
          "speech": "Find the way around the corner.",
          "prompt": "Find the way around the corner.",
          "grid": {
            "w": 4,
            "h": 4
          },
          "start": {
            "x": 0,
            "y": 3,
            "dir": "E"
          },
          "goal": {
            "x": 3,
            "y": 1
          },
          "walls": [],
          "stars": [],
          "palette": [
            "forward",
            "left",
            "right",
            "repeat"
          ],
          "maxBlocks": 7,
          "selftestProgram": [
            {
              "type": "forward"
            },
            {
              "type": "forward"
            },
            {
              "type": "forward"
            },
            {
              "type": "left"
            },
            {
              "type": "forward"
            },
            {
              "type": "forward"
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
