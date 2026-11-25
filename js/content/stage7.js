/**
 * stage7.js – English source content. German lives in i18n/de.js.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  var stage = {
  "id": 7,
  "title": "Programming Games",
  "subtitle": "Bobby runs whatever you tell him.",
  "icon": "roboter",
  "achievement": {
    "id": "s7",
    "title": "Junior Programmer",
    "art": "pokal"
  },
  "lessons": [
    {
      "id": "7-1",
      "title": "Blocks and order",
      "goal": "One block, one step.",
      "activities": [
        {
          "id": "7-0-1",
          "type": "explain",
          "title": "This is how it works",
          "speech": "Place blocks below. Then start.",
          "prompt": "Place blocks and press ▶ Go.",
          "art": "roboter",
          "points": [
            "Each block is one step.",
            "From top to bottom.",
            "Press ▶ and Bobby starts."
          ]
        },
        {
          "id": "7-1-1",
          "type": "gridRun",
          "title": "Straight ahead",
          "speech": "Find the way to the star.",
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
          "requiredStars": 0,
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
        },
        {
          "id": "7-1-2",
          "type": "gridRun",
          "title": "Three steps",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
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
          "requiredStars": 0,
          "palette": [
            "forward"
          ],
          "maxBlocks": 4,
          "selftestProgram": [
            {
              "type": "forward"
            },
            {
              "type": "forward"
            },
            {
              "type": "forward"
            }
          ]
        },
        {
          "id": "7-1-3",
          "type": "gridRun",
          "title": "Collect the star",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
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
          "stars": [
            [
              2,
              1
            ]
          ],
          "requiredStars": 1,
          "palette": [
            "forward",
            "collect"
          ],
          "maxBlocks": 5,
          "selftestProgram": [
            {
              "type": "forward"
            },
            {
              "type": "forward"
            },
            {
              "type": "collect"
            },
            {
              "type": "forward"
            }
          ]
        }
      ]
    },
    {
      "id": "7-2",
      "title": "Turning",
      "goal": "Turn left and right.",
      "activities": [
        {
          "id": "7-0-2",
          "type": "explain",
          "title": "Turning",
          "speech": "Turning costs no step.",
          "prompt": "Turning is not a step.",
          "art": "block-right",
          "points": [
            "Right turns in a circle.",
            "Then Bobby keeps walking."
          ]
        },
        {
          "id": "7-2-1",
          "type": "gridRun",
          "title": "Once right",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 3,
            "h": 3
          },
          "start": {
            "x": 0,
            "y": 0,
            "dir": "E"
          },
          "goal": {
            "x": 0,
            "y": 2
          },
          "walls": [],
          "stars": [],
          "requiredStars": 0,
          "palette": [
            "forward",
            "right"
          ],
          "maxBlocks": 4,
          "selftestProgram": [
            {
              "type": "right"
            },
            {
              "type": "forward"
            },
            {
              "type": "forward"
            }
          ]
        },
        {
          "id": "7-2-2",
          "type": "gridRun",
          "title": "Around the corner",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
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
          "requiredStars": 0,
          "palette": [
            "forward",
            "left"
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
        },
        {
          "id": "7-2-3",
          "type": "gridRun",
          "title": "Zigzag",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 5,
            "h": 5
          },
          "start": {
            "x": 0,
            "y": 4,
            "dir": "E"
          },
          "goal": {
            "x": 2,
            "y": 2
          },
          "walls": [],
          "stars": [],
          "requiredStars": 0,
          "palette": [
            "forward",
            "left"
          ],
          "maxBlocks": 5,
          "selftestProgram": [
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
    },
    {
      "id": "7-3",
      "title": "Something is wrong",
      "goal": "Check, change, try again.",
      "activities": [
        {
          "id": "7-0-3",
          "type": "explain",
          "title": "Check and change",
          "speech": "If it does not work, change a block.",
          "prompt": "If it does not work, change a block.",
          "art": "bobby",
          "points": [
            "Watch what happens.",
            "Change one block.",
            "Start again."
          ]
        },
        {
          "id": "7-3-1",
          "type": "gridRun",
          "title": "Three times forward",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 5,
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
          "requiredStars": 0,
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
        },
        {
          "id": "7-3-2",
          "type": "gridRun",
          "title": "Staircase",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 3,
            "h": 5
          },
          "start": {
            "x": 0,
            "y": 4,
            "dir": "E"
          },
          "goal": {
            "x": 0,
            "y": 0
          },
          "walls": [],
          "stars": [],
          "requiredStars": 0,
          "palette": [
            "forward",
            "left",
            "repeat"
          ],
          "maxBlocks": 4,
          "selftestProgram": [
            {
              "type": "left"
            },
            {
              "type": "repeat",
              "times": 4,
              "body": [
                {
                  "type": "forward"
                }
              ]
            }
          ]
        },
        {
          "id": "7-3-3",
          "type": "gridRun",
          "title": "If wall, then right",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
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
          "requiredStars": 0,
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
        },
        {
          "id": "7-3-4",
          "type": "gridRun",
          "title": "Star or wall",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 3,
            "h": 2
          },
          "start": {
            "x": 0,
            "y": 0,
            "dir": "E"
          },
          "goal": {
            "x": 2,
            "y": 0
          },
          "walls": [],
          "stars": [
            [
              0,
              0
            ]
          ],
          "requiredStars": 1,
          "palette": [
            "forward",
            "collect",
            "if"
          ],
          "maxBlocks": 4,
          "selftestProgram": [
            {
              "type": "if",
              "condition": "star",
              "body": [
                {
                  "type": "collect"
                }
              ]
            },
            {
              "type": "forward"
            },
            {
              "type": "forward"
            }
          ]
        },
        {
          "id": "7-3-5",
          "type": "gridRun",
          "title": "The detour",
          "speech": "Find the way to the star.",
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
          "walls": [
            [
              1,
              1
            ]
          ],
          "stars": [],
          "requiredStars": 0,
          "palette": [
            "forward",
            "left",
            "right"
          ],
          "maxBlocks": 7,
          "selftestProgram": [
            {
              "type": "right"
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
            },
            {
              "type": "left"
            },
            {
              "type": "forward"
            }
          ],
          "prefill": [
            {
              "type": "forward"
            },
            {
              "type": "forward"
            }
          ]
        },
        {
          "id": "7-3-6",
          "type": "gridRun",
          "title": "The big journey",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 5,
            "h": 5
          },
          "start": {
            "x": 0,
            "y": 4,
            "dir": "E"
          },
          "goal": {
            "x": 4,
            "y": 0
          },
          "walls": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ]
          ],
          "stars": [
            [
              4,
              4
            ],
            [
              4,
              2
            ]
          ],
          "requiredStars": 2,
          "palette": [
            "forward",
            "left",
            "collect",
            "repeat"
          ],
          "maxBlocks": 9,
          "selftestProgram": [
            {
              "type": "repeat",
              "times": 4,
              "body": [
                {
                  "type": "forward"
                }
              ]
            },
            {
              "type": "collect"
            },
            {
              "type": "left"
            },
            {
              "type": "forward"
            },
            {
              "type": "forward"
            },
            {
              "type": "collect"
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
    },
    {
      "id": "7-m",
      "title": "Stage finale",
      "goal": "The last big journey.",
      "milestone": true,
      "activities": [
        {
          "id": "7-m-1",
          "type": "gridRun",
          "title": "Everything together",
          "speech": "Find the way to the star.",
          "prompt": "Get Bobby to the star.",
          "grid": {
            "w": 5,
            "h": 5
          },
          "start": {
            "x": 0,
            "y": 0,
            "dir": "E"
          },
          "goal": {
            "x": 4,
            "y": 4
          },
          "walls": [],
          "stars": [],
          "requiredStars": 0,
          "palette": [
            "forward",
            "right",
            "repeat"
          ],
          "maxBlocks": 10,
          "selftestProgram": [
            {
              "type": "repeat",
              "times": 4,
              "body": [
                {
                  "type": "forward"
                }
              ]
            },
            {
              "type": "right"
            },
            {
              "type": "repeat",
              "times": 4,
              "body": [
                {
                  "type": "forward"
                }
              ]
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
