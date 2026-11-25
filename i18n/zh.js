/**
 * i18n/zh.js – Simplified Chinese translation (English is the source in
 * js/content/stage*.js).
 *
 * Loaded after the stages and before app.js. Switch a profile to "zh" and the
 * localizer applies this overlay; "en" uses the source as-is.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.translations = content.translations || {};
  content.translations.zh = {
  "lexicon": {
    "Mouse": "鼠标",
    "Computer": "电脑",
    "Laptop": "笔记本电脑",
    "Monitor": "显示器",
    "Speaker": "音箱",
    "Keyboard": "键盘",
    "Camera": "摄像头",
    "Screen": "屏幕",
    "Writing": "写字",
    "Pointing": "指向",
    "Listening": "听声音",
    "Keys": "按键",
    "Pointer": "指针",
    "On the go": "随身带",
    "Printer": "打印机",
    "Chest with a button": "带按钮的箱子",
    "Picture of a flower": "一朵花的画",
    "Butterfly": "蝴蝶",
    "Flower": "花朵",
    "Apple": "苹果",
    "Banana": "香蕉",
    "Orange": "橙子",
    "Basket": "篮子",
    "Space bar": "空格键",
    "Enter": "回车键",
    "Shift": "Shift 键",
    "Backspace": "退格键",
    "Cat": "猫",
    "Dog": "狗",
    "Sun": "太阳",
    "Mom": "妈妈",
    "Dad": "爸爸",
    "Ball": "球",
    "Egg": "鸡蛋",
    "Start": "出发",
    "Turn right": "向右转",
    "To the star": "去星星那里",
    "Straight on": "一直向前",
    "Around the corner": "绕过拐角",
    "Bird": "鸟",
    "Fish": "鱼",
    "Jellyfish": "水母",
    "Flies": "会飞",
    "Swims": "会游",
    "big circle": "大圆圈",
    "big square": "大正方形",
    "medium circle": "中圆圈",
    "medium square": "中正方形",
    "small circle": "小圆圈",
    "small square": "小正方形",
    "Big": "大",
    "Medium": "中",
    "Easy": "简单",
    "Hard": "困难",
    "Small": "小"
  },
  "achievements": {
    "s1": "电脑小探险家",
    "s2": "鼠标小达人",
    "s3": "键盘小探险家",
    "s4": "打字小星星",
    "s5": "数字小探险家",
    "s6": "逻辑小天才",
    "s7": "编程小能手",
    "s8": "第一位小程序员",
    "s9": "打字小高手"
  },
  "stages": {
    "1": {
      "title": "我的电脑",
      "subtitle": "什么是电脑？电脑有哪些部分？"
    },
    "2": {
      "title": "鼠标大冒险",
      "subtitle": "指向、点击、拖动、滚动。"
    },
    "3": {
      "title": "键盘大冒险",
      "subtitle": "找到正确的按键。"
    },
    "4": {
      "title": "字母和打字",
      "subtitle": "从 A 到 Z，还有第一批单词。"
    },
    "5": {
      "title": "数字",
      "subtitle": "数一数、比一比、加一加、减一减。"
    },
    "6": {
      "title": "逻辑游戏",
      "subtitle": "指令、规律和聪明的路线。"
    },
    "7": {
      "title": "编程游戏",
      "subtitle": "你让 Bobby 怎么走，他就怎么走。"
    },
    "8": {
      "title": "我的第一个 JavaScript",
      "subtitle": "代码是什么，它能做什么。"
    },
    "9": {
      "title": "手指练习",
      "subtitle": "用所有手指打字，不着急。"
    }
  },
  "lessons": {
    "1-1": {
      "title": "什么是电脑？",
      "goal": "我们来看一台电脑。"
    },
    "1-2": {
      "title": "显示器",
      "goal": "显示器给我们看图片。"
    },
    "1-3": {
      "title": "键盘",
      "goal": "我们用键盘写字。"
    },
    "1-4": {
      "title": "鼠标",
      "goal": "鼠标可以指向东西。"
    },
    "1-5": {
      "title": "笔记本电脑",
      "goal": "笔记本电脑可以随身带。"
    },
    "1-6": {
      "title": "音箱和摄像头",
      "goal": "电脑能听，也能说。"
    },
    "1-7": {
      "title": "电脑会做什么？",
      "goal": "电脑会画画、算数、放音乐。"
    },
    "1-8": {
      "title": "全部复习",
      "goal": "我们记住所有的部件。"
    },
    "1-m": {
      "title": "本关总复习",
      "goal": "展示你已经会的。"
    },
    "2-1": {
      "title": "移动鼠标",
      "goal": "让指针沿着线走。"
    },
    "2-2": {
      "title": "指针",
      "goal": "有些东西可以点击。"
    },
    "2-3": {
      "title": "点击",
      "goal": "点击星星。"
    },
    "2-4": {
      "title": "双击",
      "goal": "快速点两下，打开宝箱。"
    },
    "2-5": {
      "title": "按住拖动",
      "goal": "把蝴蝶拖到花朵上。"
    },
    "2-6": {
      "title": "拖放",
      "goal": "把所有水果放进篮子。"
    },
    "2-7": {
      "title": "滚动",
      "goal": "向下滚动，找到 Bobby。"
    },
    "2-8": {
      "title": "成为鼠标小达人",
      "goal": "四个小游戏，练习稳稳的手。"
    },
    "2-m": {
      "title": "本关总复习",
      "goal": "给真正鼠标小达人的最后一幅画。"
    },
    "3-1": {
      "title": "什么是键盘？",
      "goal": "在键盘上找到十个字母。"
    },
    "3-2": {
      "title": "找数字",
      "goal": "在键盘上找到十个数字。"
    },
    "3-3": {
      "title": "空格键",
      "goal": "空格键让 Bobby 跳起来。"
    },
    "3-4": {
      "title": "回车键",
      "goal": "回车键打开宝箱。"
    },
    "3-5": {
      "title": "退格键",
      "goal": "退格键可以删掉一个字母。"
    },
    "3-6": {
      "title": "Shift 键",
      "goal": "Shift 键打出大写字母。"
    },
    "3-7": {
      "title": "方向键",
      "goal": "用方向键让 Bobby 走。"
    },
    "3-8": {
      "title": "全部再来一遍",
      "goal": "字母、数字和按键混在一起。"
    },
    "3-m": {
      "title": "本关总复习",
      "goal": "说说每个按键做什么。"
    },
    "4-1": {
      "title": "A 到 H",
      "goal": "八个字母，配图片。"
    },
    "4-2": {
      "title": "I 到 P",
      "goal": "再来八个字母。"
    },
    "4-3": {
      "title": "Q 到 Z",
      "goal": "最后几个字母。"
    },
    "4-4": {
      "title": "大写和小写",
      "goal": "A 和 a 是一对。"
    },
    "4-5": {
      "title": "找字母",
      "goal": "键盘上的四个字母。"
    },
    "4-6": {
      "title": "打一个单词",
      "goal": "七个小单词，还有你的名字。"
    },
    "4-m": {
      "title": "本关总复习",
      "goal": "不用帮忙，打出三个单词。"
    },
    "5-1": {
      "title": "0 到 5 的数字",
      "goal": "数一数苹果。"
    },
    "5-2": {
      "title": "6 到 10 的数字",
      "goal": "现在更多了。"
    },
    "5-3": {
      "title": "11 到 20 的数字",
      "goal": "很多也能数清楚。"
    },
    "5-4": {
      "title": "练习数数",
      "goal": "数一数花朵。"
    },
    "5-5": {
      "title": "数量和数字",
      "goal": "哪个数字和数量一样多？"
    },
    "5-6": {
      "title": "大和小",
      "goal": "哪个数字更大？"
    },
    "5-7": {
      "title": "加法",
      "goal": "二加一等于三。"
    },
    "5-8": {
      "title": "减法",
      "goal": "五减二等于三。"
    },
    "5-m": {
      "title": "本关总复习",
      "goal": "三道小算式。"
    },
    "6-1": {
      "title": "指令",
      "goal": "Bobby 会跟着你的积木走。"
    },
    "6-2": {
      "title": "顺序",
      "goal": "顺序决定路线。"
    },
    "6-3": {
      "title": "规律",
      "goal": "下一个是什么？"
    },
    "6-4": {
      "title": "动动脑筋",
      "goal": "哪个不一样？哪条路能走？"
    },
    "6-5": {
      "title": "如果……就……",
      "goal": "前面有墙，就转弯。"
    },
    "6-6": {
      "title": "重复",
      "goal": "相同的三步，写一次就够。"
    },
    "6-7": {
      "title": "方格里的规律",
      "goal": "找出方格里的规律。"
    },
    "6-8": {
      "title": "谁会飞，谁会游？",
      "goal": "按动物的家来分类。"
    },
    "6-9": {
      "title": "大、中、小",
      "goal": "按大小给图形分类。"
    },
    "6-10": {
      "title": "什么和什么是一对？",
      "goal": "把东西连起来。"
    },
    "6-m": {
      "title": "本关总复习",
      "goal": "转弯、走路、到达。"
    },
    "7-1": {
      "title": "积木和顺序",
      "goal": "一块积木，走一步。"
    },
    "7-2": {
      "title": "转弯",
      "goal": "向左转，向右转。"
    },
    "7-3": {
      "title": "看一看，改一改",
      "goal": "看一看，改一改，再试一次。"
    },
    "7-m": {
      "title": "本关总复习",
      "goal": "最后一段大旅程。"
    },
    "8-1": {
      "title": "什么是代码？",
      "goal": "代码是给电脑的指令。"
    },
    "8-2": {
      "title": "第一条指令",
      "goal": "alert 会显示一条消息。"
    },
    "8-3": {
      "title": "变量",
      "goal": "变量就是一个小盒子。"
    },
    "8-4": {
      "title": "数字",
      "goal": "盒子里有三个苹果。"
    },
    "8-5": {
      "title": "算一算",
      "goal": "二加三等于五。"
    },
    "8-6": {
      "title": "函数",
      "goal": "一段可以反复用的指令。"
    },
    "8-m": {
      "title": "本关总复习",
      "goal": "变量和计算一起用。"
    },
    "9-1": {
      "title": "手指怎么放",
      "goal": "认识中间这一排键。"
    },
    "9-2": {
      "title": "左手：A S D F",
      "goal": "左手负责四个键。"
    },
    "9-3": {
      "title": "右手：J K L",
      "goal": "右手负责三个键。"
    },
    "9-4": {
      "title": "两只手一起",
      "goal": "左右手轮流来。"
    },
    "9-5": {
      "title": "小单词",
      "goal": "只用中间一排键就能打的单词。"
    },
    "9-6": {
      "title": "左上：Q W",
      "goal": "用左手打上面一排。"
    },
    "9-7": {
      "title": "右上：O P",
      "goal": "用右手打上面一排。"
    },
    "9-8": {
      "title": "下面：M N",
      "goal": "用食指往下伸。"
    },
    "9-9": {
      "title": "混合练习",
      "goal": "在键盘上走更长的路。"
    },
    "9-10": {
      "title": "星星火箭",
      "goal": "打出字母，火箭就飞。"
    },
    "9-11": {
      "title": "单词火箭",
      "goal": "选好难度和速度，再打字。"
    },
    "9-m": {
      "title": "本关总复习",
      "goal": "看看手指的本领。"
    }
  },
  "activities": {
    "1-1-1": {
      "title": "一台电脑",
      "speech": "这是一台电脑。",
      "prompt": "这是一台电脑。",
      "points": [
        "它算得特别快。",
        "它在显示器上显示图片。",
        "它需要电。"
      ]
    },
    "1-1-2": {
      "title": "电脑在哪里？",
      "speech": "指一指电脑。",
      "prompt": "电脑在哪里？"
    },
    "1-2-1": {
      "title": "显示器",
      "speech": "显示器会显示图片。",
      "prompt": "显示器会显示图片。",
      "points": [
        "它看起来像电视机。",
        "它显示电脑在做的事。"
      ]
    },
    "1-2-2": {
      "title": "显示器在哪里？",
      "speech": "指一指显示器。",
      "prompt": "显示器在哪里？"
    },
    "1-3-1": {
      "title": "键盘",
      "speech": "键盘上有很多按键。",
      "prompt": "键盘上有很多按键。",
      "points": [
        "每个按键都有符号。",
        "你用键盘写字母。"
      ]
    },
    "1-3-2": {
      "title": "键盘在哪里？",
      "speech": "指一指键盘。",
      "prompt": "键盘在哪里？"
    },
    "1-4-1": {
      "title": "鼠标",
      "speech": "鼠标在屏幕上指来指去。",
      "prompt": "鼠标在屏幕上指来指去。",
      "points": [
        "它有一个小箭头。",
        "你用它在东西上点击。"
      ]
    },
    "1-4-2": {
      "title": "鼠标在哪里？",
      "speech": "指一指鼠标。",
      "prompt": "鼠标在哪里？"
    },
    "1-5-1": {
      "title": "笔记本电脑",
      "speech": "笔记本电脑可以随身带。",
      "prompt": "笔记本电脑可以随身带。",
      "points": [
        "屏幕和键盘连在一起。",
        "它里面有一块电池。"
      ]
    },
    "1-5-2": {
      "title": "笔记本电脑还是大电脑？",
      "speech": "哪一个可以随身带？",
      "prompt": "哪一个可以随身带？"
    },
    "1-6-1": {
      "title": "音箱和摄像头",
      "speech": "音箱会放音乐。",
      "prompt": "音箱会放音乐。",
      "points": [
        "摄像头会拍照。",
        "音箱会发出声音。"
      ]
    },
    "1-6-2": {
      "title": "什么会拍照？",
      "speech": "什么会拍照？",
      "prompt": "什么会拍照？"
    },
    "1-7-1": {
      "title": "能做很多事",
      "speech": "电脑会做很多事。",
      "prompt": "电脑会做很多事。",
      "points": [
        "它们会画画。",
        "它们会放音乐。",
        "它们会用数字算数。"
      ]
    },
    "1-7-2": {
      "title": "电脑有哪些部分？",
      "speech": "把每样东西拖到电脑这边。",
      "prompt": "把每样东西放到该放的位置。"
    },
    "1-8-1": {
      "title": "连一连部件",
      "speech": "把部件和名字连起来。",
      "prompt": "把每个部件和它的名字连起来。"
    },
    "1-8-2": {
      "title": "记忆翻牌",
      "speech": "找出一样的图片。",
      "prompt": "找出一样的图片。"
    },
    "1-m-1": {
      "title": "全部混在一起",
      "speech": "展示你会的。",
      "prompt": "什么应该放在哪里？",
      "deck": [
        {
          "prompt": "键盘在哪里？"
        },
        {
          "prompt": "你用什么点击？"
        },
        {
          "prompt": "你在哪里看到图片？"
        },
        {
          "prompt": "什么会放音乐？"
        },
        {
          "prompt": "什么会拍照？"
        }
      ]
    },
    "2-1-1": {
      "title": "沿着线走",
      "speech": "让鼠标沿着线移动。",
      "prompt": "让鼠标沿着线移动。"
    },
    "2-2-1": {
      "title": "什么可以点？",
      "speech": "什么可以点击？",
      "prompt": "什么可以点击？"
    },
    "2-3-1": {
      "title": "接住星星",
      "speech": "点击星星。",
      "prompt": "点击每一颗星星。"
    },
    "2-4-1": {
      "title": "打开宝箱",
      "speech": "快速点两下宝箱。",
      "prompt": "快速点两下宝箱。"
    },
    "2-5-1": {
      "title": "蝴蝶和花朵",
      "speech": "把蝴蝶拖到花朵上。",
      "prompt": "把蝴蝶拖到花朵上。"
    },
    "2-6-1": {
      "title": "水果进篮子",
      "speech": "把所有水果放进篮子。",
      "prompt": "把所有水果放进篮子。"
    },
    "2-7-1": {
      "title": "向下滚动",
      "speech": "向下滚动，找到 Bobby。",
      "prompt": "向下滚动，找到 Bobby。",
      "points": [
        "转动鼠标滚轮。",
        "或者拖动滚动条。"
      ]
    },
    "2-8-1": {
      "title": "中等星星",
      "speech": "点击星星。",
      "prompt": "点击每一颗星星。"
    },
    "2-8-2": {
      "title": "小星星",
      "speech": "现在星星变小了。",
      "prompt": "现在星星变小了。"
    },
    "2-8-3": {
      "title": "飞行的星星",
      "speech": "星星在飞，点击它们。",
      "prompt": "星星在飞，点击它们。"
    },
    "2-8-4": {
      "title": "拼出图画",
      "speech": "把图画拼起来。",
      "prompt": "把四块拼在一起。"
    },
    "2-8-5": {
      "title": "新的线",
      "speech": "再沿着线走一次。",
      "prompt": "让鼠标沿着线移动。"
    },
    "2-m-1": {
      "title": "太阳图画",
      "speech": "把太阳图画拼起来。",
      "prompt": "把太阳图画拼起来。"
    },
    "3-1-1": {
      "title": "找字母",
      "speech": "每次都按亮起来的键。",
      "prompt": "按下亮起来的键。",
      "hint": "看看黄色的圆环！"
    },
    "3-2-1": {
      "title": "找数字",
      "speech": "每次都按亮起来的数字。",
      "prompt": "按下亮起来的数字。",
      "hint": "数字在上面一排。"
    },
    "3-3-1": {
      "title": "空格键",
      "speech": "按下空格键，Bobby 就跳！",
      "prompt": "按下空格键，Bobby 就跳！",
      "hint": "空格键在最下面。"
    },
    "3-4-1": {
      "title": "回车键",
      "speech": "按回车键，打开宝箱。",
      "prompt": "按回车键，打开宝箱。",
      "hint": "回车键在右边。"
    },
    "3-5-1": {
      "title": "退格键",
      "speech": "按退格键，删掉字母。",
      "prompt": "按退格键，删掉字母。",
      "hint": "退格键在右上方。"
    },
    "3-6-1": {
      "title": "Shift 键",
      "speech": "按 Shift 键，打出大写字母。",
      "prompt": "按 Shift 键，打出大写字母。",
      "hint": "Shift 键在最左边。"
    },
    "3-7-1": {
      "title": "方向键",
      "speech": "按亮起来的方向键。",
      "prompt": "按下亮起来的箭头。",
      "hint": "方向键在右下方。"
    },
    "3-8-1": {
      "title": "混合按键",
      "speech": "现在混在一起了。",
      "prompt": "现在混合：字母、数字和按键。",
      "hint": "看看黄色的圆环！"
    },
    "3-m-1": {
      "title": "按键小测验",
      "speech": "哪个按键最合适？",
      "prompt": "哪个按键最合适？",
      "deck": [
        {
          "prompt": "怎么打出一个空格？"
        },
        {
          "prompt": "怎么打开一样东西？"
        },
        {
          "prompt": "怎么打出大写字母？"
        },
        {
          "prompt": "怎么删掉一个字母？"
        }
      ]
    },
    "4-1-1": {
      "title": "A 到 H",
      "speech": "每次都按这个字母。",
      "prompt": "按下你看到的字母。"
    },
    "4-2-1": {
      "title": "I 到 P",
      "speech": "每次都按这个字母。",
      "prompt": "按下你看到的字母。"
    },
    "4-3-1": {
      "title": "Q 到 Z",
      "speech": "每次都按这个字母。",
      "prompt": "按下你看到的字母。"
    },
    "4-4-1": {
      "title": "连 A 到 F",
      "speech": "把大写和小写连起来。",
      "prompt": "把 A 和 a 连起来，依此类推。"
    },
    "4-4-2": {
      "title": "连 G 到 L",
      "speech": "把大写和小写连起来。",
      "prompt": "把 G 和 g 连起来，依此类推。"
    },
    "4-5-1": {
      "title": "A 到 F",
      "speech": "按亮起来的字母。",
      "prompt": "按下亮起来的字母。",
      "hint": "字母在键盘上。"
    },
    "4-5-2": {
      "title": "G 到 L",
      "speech": "按亮起来的字母。",
      "prompt": "按下亮起来的字母。",
      "hint": "字母在键盘上。"
    },
    "4-5-3": {
      "title": "M 到 R",
      "speech": "按亮起来的字母。",
      "prompt": "按下亮起来的字母。",
      "hint": "字母在键盘上。"
    },
    "4-5-4": {
      "title": "S 到 Z",
      "speech": "按亮起来的字母。",
      "prompt": "按下亮起来的字母。",
      "hint": "字母在键盘上。"
    },
    "4-6-1": {
      "title": "打单词",
      "speech": "一个字母一个字母地打。",
      "prompt": "打出这个单词。",
      "words": [
        { "text": "CAT", "label": "猫", "art": "katze" },
        { "text": "DOG", "label": "狗", "art": "hund" },
        { "text": "SUN", "label": "太阳", "art": "sonne" },
        { "text": "MOM", "label": "妈妈", "art": "blume" },
        { "text": "DAD", "label": "爸爸", "art": "hut" },
        { "text": "BALL", "label": "球", "art": "ball" },
        { "text": "EGG", "label": "蛋", "art": "ei" }
      ]
    },
    "4-6-2": {
      "title": "你的名字",
      "speech": "打出你的名字。",
      "prompt": "在方框里打出你的名字。"
    },
    "4-m-1": {
      "title": "三个单词",
      "speech": "打出这三个单词。",
      "prompt": "打出这三个单词。",
      "words": [
        { "text": "MOM", "label": "妈妈", "art": "blume" },
        { "text": "DAD", "label": "爸爸", "art": "hut" },
        { "text": "EGG", "label": "蛋", "art": "ei" }
      ]
    },
    "5-1-1": {
      "title": "数苹果",
      "speech": "一共有几个苹果？",
      "prompt": "一共有几个苹果？"
    },
    "5-2-1": {
      "title": "数星星",
      "speech": "一共有几颗星星？",
      "prompt": "一共有几颗星星？"
    },
    "5-3-1": {
      "title": "很多苹果",
      "speech": "一共有几个苹果？",
      "prompt": "一共有几个苹果？"
    },
    "5-4-1": {
      "title": "数花朵",
      "speech": "一共有几朵花？",
      "prompt": "一共有几朵花？"
    },
    "5-5-1": {
      "title": "哪个数字？",
      "speech": "哪个数字和图片一样多？",
      "prompt": "哪个数字和图片一样多？"
    },
    "5-6-1": {
      "title": "更大还是更小",
      "speech": "哪个数字更大？",
      "prompt": "哪个数字更大？",
      "deck": [
        {
          "prompt": "哪个数字更大？"
        },
        {
          "prompt": "哪个数字更小？"
        },
        {
          "prompt": "哪个数字更大？"
        }
      ]
    },
    "5-7-1": {
      "title": "二加一",
      "speech": "两个苹果，再加一个。一共几个？",
      "prompt": "两个苹果，再加一个。一共几个？"
    },
    "5-8-1": {
      "title": "五减二",
      "speech": "五颗星星，去掉两颗。",
      "prompt": "五颗星星，去掉两颗。还剩几颗？"
    },
    "5-m-1": {
      "title": "算一算",
      "speech": "做出这三道题。",
      "prompt": "等于多少呢？",
      "deck": [
        {
          "prompt": "2 + 1 = ?"
        },
        {
          "prompt": "4 − 2 = ?"
        },
        {
          "prompt": "3 + 3 = ?"
        }
      ]
    },
    "6-1-1": {
      "title": "两步",
      "speech": "放两块积木，然后开始。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "6-2-1": {
      "title": "正确的顺序",
      "speech": "把三张图片排好顺序。",
      "prompt": "先做什么，再做什么？"
    },
    "6-3-1": {
      "title": "找出规律",
      "speech": "下一个是什么？",
      "prompt": "下一个是什么？"
    },
    "6-4-1": {
      "title": "哪一个不一样？",
      "speech": "哪一个和其他不一样？",
      "prompt": "哪一个和其他不一样？"
    },
    "6-4-2": {
      "title": "走哪条路？",
      "speech": "路被挡住了，怎么办？",
      "prompt": "路被挡住了，怎么办？"
    },
    "6-5-1": {
      "title": "如果有墙，就向右",
      "speech": "前面有墙，就向右转。",
      "prompt": "前面有墙，就向右转。"
    },
    "6-6-1": {
      "title": "向前三次",
      "speech": "重复走三步。",
      "prompt": "重复走三步。"
    },
    "6-7-1": {
      "title": "缺了什么？",
      "speech": "方格里缺了哪张图？",
      "prompt": "方格里缺了哪张图？"
    },
    "6-8-1": {
      "title": "会飞还是会游",
      "speech": "谁会飞？谁会游？",
      "prompt": "把每只动物放到对的地方。"
    },
    "6-9-1": {
      "title": "按大小分类",
      "speech": "按大小给图形分类。",
      "prompt": "分类：大、中、小。"
    },
    "6-10-1": {
      "title": "什么最合适？",
      "speech": "什么和什么是一对？",
      "prompt": "什么和问题最配？",
      "deck": [
        {
          "prompt": "谁在水里游？"
        },
        {
          "prompt": "谁在天上飞？"
        },
        {
          "prompt": "谁喵喵叫？"
        },
        {
          "prompt": "什么在草地上长？"
        }
      ]
    },
    "6-m-1": {
      "title": "最后一个拐角",
      "speech": "找到绕过拐角的路。",
      "prompt": "找到绕过拐角的路。"
    },
    "7-0-1": {
      "title": "这样来玩",
      "speech": "在下面放积木，然后开始。",
      "prompt": "放好积木，按 ▶ 开始。",
      "points": [
        "每块积木走一步。",
        "从上到下。",
        "按 ▶，Bobby 就出发。"
      ]
    },
    "7-1-1": {
      "title": "一直向前",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-1-2": {
      "title": "三步",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-1-3": {
      "title": "收集星星",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-0-2": {
      "title": "转弯",
      "speech": "转弯不算一步。",
      "prompt": "转弯不算一步。",
      "points": [
        "向右转，Bobby 就换个方向。",
        "然后 Bobby 继续走。"
      ]
    },
    "7-2-1": {
      "title": "向右转一次",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-2-2": {
      "title": "绕过拐角",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-2-3": {
      "title": "之字形",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-0-3": {
      "title": "看一看，改一改",
      "speech": "走不通就换一块积木。",
      "prompt": "走不通就换一块积木。",
      "points": [
        "看看发生了什么。",
        "换掉一块积木。",
        "再开始一次。"
      ]
    },
    "7-3-1": {
      "title": "向前三次",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-3-2": {
      "title": "楼梯",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-3-3": {
      "title": "如果有墙，就向右",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-3-4": {
      "title": "星星还是墙",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-3-5": {
      "title": "绕个弯",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-3-6": {
      "title": "大旅程",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "7-m-1": {
      "title": "全部一起",
      "speech": "找到去星星的路。",
      "prompt": "让 Bobby 走到星星那里。"
    },
    "8-1-1": {
      "title": "代码像菜谱",
      "speech": "代码是给电脑的指令。",
      "prompt": "代码是给电脑的指令。",
      "points": [
        "菜谱告诉你怎么做。",
        "代码也一样，只是讲给电脑听。"
      ]
    },
    "8-2-1": {
      "title": "打个招呼",
      "speech": "这条指令会显示一条消息。",
      "prompt": "这条指令会显示一条消息。",
      "lineNotes": [
        "这条指令显示一段文字。"
      ]
    },
    "8-3-1": {
      "title": "装名字的小盒子",
      "speech": "电脑把名字放进小盒子里。",
      "prompt": "电脑把名字放进小盒子里。",
      "lineNotes": [
        "这里创建了盒子 myName。",
        "盒子里的文字会显示出来。"
      ]
    },
    "8-4-1": {
      "title": "三个苹果",
      "speech": "盒子里有三个苹果。",
      "prompt": "盒子里有三个苹果。",
      "lineNotes": [
        "盒子 apples 拿到了数字三。"
      ]
    },
    "8-5-1": {
      "title": "五颗星星",
      "speech": "二加三等于五。",
      "prompt": "二加三等于五。",
      "lineNotes": [
        "电脑算出二加三。"
      ]
    },
    "8-6-1": {
      "title": "你好，函数！",
      "speech": "函数可以一遍又一遍地用。",
      "prompt": "函数可以一遍又一遍地用。",
      "lineNotes": [
        "这里搭好这段指令。",
        "里面的文字。",
        "指令准备好了。",
        "现在它开始运行。"
      ]
    },
    "8-m-1": {
      "title": "两个数字",
      "speech": "两个数字加在一起。",
      "prompt": "两个数字加在一起。",
      "lineNotes": [
        "盒子 a 拿到二。",
        "盒子 b 拿到三。",
        "显示它们的和。"
      ]
    },
    "9-1-1": {
      "title": "中间这一排",
      "speech": "手指这样放。",
      "prompt": "手指这样放。",
      "points": [
        "手指放在 ASDF 上。",
        "手指放在 JKL 上。",
        "背挺直，脚放好。"
      ]
    },
    "9-2-1": {
      "title": "左手",
      "speech": "左手：A S D F。",
      "prompt": "用左手打字。"
    },
    "9-3-1": {
      "title": "右手",
      "speech": "右手：J K L。",
      "prompt": "用右手打字。"
    },
    "9-4-1": {
      "title": "一起",
      "speech": "现在两只手一起。",
      "prompt": "左右手轮流打字。"
    },
    "9-5-1": {
      "title": "用 ASDF JKL 打单词",
      "speech": "用手指打出小单词。",
      "prompt": "这些单词只用中间一排键。"
    },
    "9-6-1": {
      "title": "Q 和 W",
      "speech": "左上：Q 和 W。",
      "prompt": "Q 和 W 归左手。"
    },
    "9-7-1": {
      "title": "O 和 P",
      "speech": "右上：O 和 P。",
      "prompt": "O 和 P 归右手。"
    },
    "9-8-1": {
      "title": "M 和 N",
      "speech": "右下：M 和 N。",
      "prompt": "M 和 N 在食指下面。"
    },
    "9-9-1": {
      "title": "全部混合",
      "speech": "现在混在一起了。",
      "prompt": "键盘上的字母和单词。",
      "sequences": ["qwas", "opmn", "hand", "moon", "plan"]
    },
    "9-10-1": {
      "title": "击落字母",
      "speech": "用火箭击落字母。",
      "prompt": "按下字母，火箭就起飞！"
    },
    "9-11-1": {
      "title": "单词火箭",
      "speech": "选好难度和速度。",
      "prompt": "打出字母，然后火箭出发。",
      "levels": [
        { "label": "简单", "pool": ["a", "s", "d", "f", "j", "k", "l"] },
        { "label": "中等", "pool": ["as", "df", "jk", "kl", "sd", "fj", "lk"] },
        { "label": "困难", "pool": ["all", "dad", "sad", "fall", "lad", "fad"] }
      ]
    },
    "9-m-1": {
      "title": "手指小测验",
      "speech": "看看你的手指多厉害。",
      "prompt": "全部一起：字母和单词。"
    }
  }
};

  content.ui = content.ui || {};
  content.ui.zh = {
    " and ": " 和 ",
    " for ": "，像 ",
    " min": " 分",
    " of ": " / ",
    " sec": " 秒",
    " – done": " – 已完成",
    " – locked": " – 未解锁",
    " – not yet": " – 还没开始",
    "% correct": "% 正确",
    "About this app": "关于这个应用",
    "Add child": "添加孩子",
    "All children": "所有孩子",
    "All good. Keep it up!": "都很好，继续保持！",
    "All letters hit!": "所有字母都打中了！",
    "Almost! The green cards are already right.": "快好了！绿色的卡片已经对了。",
    "Almost! Try a different piece.": "快好了！换一块试试。",
    "Back to the map": "返回地图",
    "Backup": "备份",
    "Bela – My First Computer School": "Bela – 我的第一所电脑学校",
    "Bobby does not understand this code.": "Bobby 看不懂这段代码。",
    "Bobby got confused.": "Bobby 有点糊涂了。",
    "Bobby reached the star!": "Bobby 到达星星了！",
    "Bobby's Computer School runs completely offline. No data is sent to a server.": "Bobby 的电脑学校完全离线运行，不会把数据发到服务器。",
    "Cancel": "取消",
    "Change sound": "切换声音",
    "Check": "检查",
    "Child's language": "孩子的语言",
    "Child's name": "孩子的名字",
    "Choose voice": "选择语音",
    "Come on, let us take a look!": "来，我们一起看看吧！",
    "Continue": "继续",
    "Done": "完成",
    "Done!": "完成了！",
    "Done! The picture is complete.": "完成了！图画拼好了。",
    "Every trophy is a big piece of the adventure.": "每个奖杯都是冒险里重要的一部分。",
    "Face-down card": "背面朝上的卡片",
    "Fast": "快",
    "Follow the line with the arrow keys": "用方向键沿着线走",
    "For grown-ups": "给大人",
    "Get Bobby to the star!": "让 Bobby 走到星星！",
    "Get Bobby to the star.": "让 Bobby 走到星星。",
    "Go": "开始",
    "Good to see you, little explorer!": "见到你真好，小探险家！",
    "Hello! This is how I sound.": "你好！我的声音是这样的。",
    "Hit the letters with the rocket.": "用火箭击落字母。",
    "If wall": "如果有墙",
    "Key ": "按键 ",
    "Learning time": "学习时间",
    "Left hand": "左手",
    "Lessons": "课程",
    "Let's go!": "出发吧！",
    "Letter ": "字母 ",
    "Letters ": "字母 ",
    "Level and tempo": "难度和速度",
    "Listen": "听一听",
    "Load backup": "载入备份",
    "Load this backup": "载入这个备份",
    "Look at the yellow ring!": "看看黄色的圆环！",
    "My Achievements": "我的成就",
    "My First Computer School": "我的第一所电脑学校",
    "Needs practice": "还要多练练",
    "New instruction: ": "新指令：",
    "Next": "下一个",
    "No blocks yet. Tap a block below.": "还没有积木。点下面的积木吧。",
    "No play time recorded yet.": "还没有记录游戏时间。",
    "No voice found": "没有找到语音",
    "Normal": "正常",
    "Not at the star yet. Try again!": "还没到星星，再试一次！",
    "Not quite. Try again.": "还差一点，再试一次。",
    "Now tap the matching target.": "现在点一下配对的地方。",
    "Now: ": "现在：",
    "Off": "关",
    "On": "开",
    "Only learning progress and settings are stored on this device.": "这台设备只保存学习进度和设置。",
    "Oops, nothing here.": "哎呀，这里还没有内容。",
    "Overview": "总览",
    "Parent area": "家长区",
    "Piece ": "拼图块 ",
    "Please solve the task.": "请完成任务。",
    "Press the key ": "按下这个键 ",
    "Press ▶ and watch.": "按 ▶ 看一看。",
    "Progress has been reset.": "进度已经重置。",
    "Progress is not being saved. The browser is blocking storage.": "进度没能保存。浏览器阻止了存储。",
    "Progress stays on this device. A backup file helps when changing computers.": "进度只留在这台设备上。换电脑时，备份文件会有帮助。",
    "Put the picture together!": "把图画拼起来！",
    "Put the picture together.": "把图画拼起来。",
    "Read aloud": "朗读",
    "Really delete every child's progress?": "真的要删除每个孩子的进度吗？",
    "Reduced motion": "减少动画",
    "Remove": "移除",
    "Remove block": "移除积木",
    "Rename": "改名",
    "Repeat ×": "重复 ×",
    "Reset progress": "重置进度",
    "Rest your fingers on the home row.": "手指轻轻放在中间一排键上。",
    "Right hand": "右手",
    "Run: ": "运行：",
    "Save progress": "保存进度",
    "Scroll down …": "向下滚动 …",
    "Scrollable area": "可滚动区域",
    "Sessions": "练习次数",
    "Settings": "设置",
    "Skip activity": "跳过任务",
    "Slot ": "位置 ",
    "Slow": "慢",
    "Soon!": "马上就好！",
    "Sound": "声音",
    "Stage complete ✓": "本关完成 ✓",
    "Stages": "关卡",
    "Stars": "星星",
    "Stars collected": "收集的星星",
    "Tap a slot first.": "先点一个位置。",
    "Tap the target": "点击目标",
    "That is quite a long journey!": "这段旅程真长！",
    "That was JavaScript!": "这就是 JavaScript！",
    "That was not right. Try again.": "这次还差一点，再试一次。",
    "The last profile cannot be removed.": "最后一个档案不能移除。",
    "The next block goes here.": "下一块积木放在这里。",
    "There is a wall. Change the path!": "前面有墙，改一改路线！",
    "This child": "这个孩子",
    "This game is missing.": "找不到这个游戏。",
    "This is not a Bela backup.": "这不是 Bela 的备份文件。",
    "This lesson does not exist.": "没有这节课。",
    "This stage does not exist.": "没有这一关。",
    "Time for this activity": "这项任务的时间",
    "Type your name": "输入你的名字",
    "Type: ": "输入：",
    "Unlock all stages": "解锁所有关卡",
    "Version 1.0 · No ads · No external links": "版本 1.0 · 没有广告 · 没有外部链接",
    "Voice": "语音",
    "We are going back to the map.": "我们回到地图吧。",
    "We do not need more blocks.": "不需要更多积木了。",
    "What comes next?": "下一个是什么？",
    "Which progress do you want to delete?": "你想删除哪个进度？",
    "Who is playing?": "谁在玩？",
    "Yes, delete": "是的，删除",
    "Your achievements!": "你的成就！",
    "Your name": "你的名字",
    "lessons": "节课",
    "not started": "还没开始",
    "started": "已经开始",
    "↺ Clear": "↺ 清除",
    "▶ Go": "▶ 开始",
    "▶ Step": "▶ 单步",
    "▶▶ All": "▶▶ 全部",
    "★ done": "★ 完成",
    "this child": "这个孩子",
    "Good to see you, {name}!": "见到你真好，{name}！",
    "{n} stars": "{n} 颗星星",
    "{title} is finished.": "{title} 完成了。",
    "Really delete the progress of {name}?": "真的要删除{name}的进度吗？",
    "Backup \"{name}\" with {count} child(ren).": "备份\"{name}\"，包含 {count} 个孩子。",
    "Put {n} on the plate": "把 {n} 放到盘子里",
    "Type {word}": "输入 {word}"
  };

  content.bobbyFor = content.bobbyFor || {};
  content.bobbyFor.zh = {
    welcome: "你好，小探险家！我是 Bobby。",
    welcomeNamed: function (name) { return "你好，" + name + "！我是 Bobby。"; },
    lessonStart: "来，我们一起看看吧！",
    correct: [
      "做得好！",
      "答对了！",
      "你真棒！",
      "哇，你记住了！",
      "太棒了！",
      "对！就是这样！"
    ],
    wrong: [
      "快好了，再试一次。",
      "没关系，再来一次！",
      "再仔细看一看。",
      "就差一点点，我们继续！"
    ],
    hint: "看这里 …",
    star: "送你一颗星星！",
    stageDone: function (title) { return "你完成了“" + title + "”！"; },
    locked: "问问爸爸妈妈，我们就可以继续啦！",
    bye: "再见，小探险家！",
    next: "我们继续吧！",
    allDone: "你是真正的电脑小探险家！"
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
