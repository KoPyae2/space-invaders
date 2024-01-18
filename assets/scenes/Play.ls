{
  "_$ver": 1,
  "_$id": "ab9d5udu",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "05f19e06-e062-408a-bdb2-b4704ff12869",
      "scriptPath": "../src/Play.ts",
      "bullet": {
        "_$uuid": "ba8bcc00-e963-4974-942c-ca7b6ea5d0f1",
        "_$type": "Prefab"
      },
      "enemy": {
        "_$uuid": "1dc37658-1068-4d77-b15e-91714f9504bf",
        "_$type": "Prefab"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "tebdl97m",
      "_$type": "Box",
      "name": "Box",
      "width": 700,
      "height": 1080,
      "_mouseState": 2,
      "centerX": 0,
      "centerY": 0,
      "_$child": [
        {
          "_$id": "n3vqr9e5",
          "_$type": "Sprite",
          "name": "bg",
          "width": 700,
          "height": 1080,
          "alpha": 0.98
        },
        {
          "_$id": "ha92nopd",
          "_$type": "Sprite",
          "name": "bulletContainer",
          "width": 700,
          "height": 1080,
          "zOrder": 51
        },
        {
          "_$id": "2c85g8h4",
          "_$type": "Sprite",
          "name": "enemyContainer",
          "width": 700,
          "height": 1080
        },
        {
          "_$id": "erk92uhi",
          "_$prefab": "3631126e-a3c3-4674-85c5-747ddb97d7fa",
          "name": "Score",
          "active": true,
          "x": 12,
          "y": 12,
          "visible": true,
          "left": 12,
          "top": 12
        },
        {
          "_$id": "2yox8pe6",
          "_$type": "Button",
          "name": "playBtn",
          "x": 290,
          "y": 520,
          "width": 120,
          "height": 40,
          "_mouseState": 2,
          "centerX": 0,
          "centerY": 0,
          "skin": "res://c33591f7-1dd3-42e1-91cd-cfef82ee5d02",
          "label": "Play",
          "labelFont": "Bahnschrift",
          "labelSize": 20
        },
        {
          "_$id": "a57njxc8",
          "_$type": "Box",
          "name": "player",
          "x": 278,
          "y": 806,
          "width": 144,
          "height": 176,
          "centerX": 0,
          "_$child": [
            {
              "_$id": "hzxuzjyq",
              "_$type": "Image",
              "name": "playerPlane",
              "width": 144,
              "height": 176,
              "visible": false,
              "_mouseState": 2,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "skin": "res://af1a9388-203e-41cc-a193-69e493261ae0",
              "color": "#ffffff"
            }
          ]
        }
      ]
    }
  ]
}