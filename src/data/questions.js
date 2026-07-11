// Question bank for the Cantonese game.
// Pure data — no logic. Each question maps an English word/phrase to its
// correct Cantonese answer plus three wrong options.

export const QUESTIONS = [
  {
    id: 1,
    english: "Hello",
    correct: { characters: "你好", jyutping: "nei5 hou2" },
    wrong: [
      { characters: "再見" },
      { characters: "多謝" },
      { characters: "早晨" },
    ],
    hint: "你",
  },
  {
    id: 2,
    english: "Thank you",
    correct: { characters: "唔該", jyutping: "m4 goi1" },
    wrong: [
      { characters: "你好" },
      { characters: "拜拜" },
      { characters: "對唔住" },
    ],
    hint: "唔",
  },
  {
    id: 3,
    english: "Goodbye",
    correct: { characters: "拜拜", jyutping: "baai1 baai3" },
    wrong: [
      { characters: "早晨" },
      { characters: "唔該" },
      { characters: "你好" },
    ],
    hint: "拜",
  },
  {
    id: 4,
    english: "Good morning",
    correct: { characters: "早晨", jyutping: "zou2 san4" },
    wrong: [
      { characters: "晚安" },
      { characters: "你好" },
      { characters: "再見" },
    ],
    hint: "早",
  },
  {
    id: 5,
    english: "Cat",
    correct: { characters: "貓", jyutping: "maau1" },
    wrong: [
      { characters: "狗" },
      { characters: "魚" },
      { characters: "鳥" },
    ],
    hint: "貓",
  },
  {
    id: 6,
    english: "Red",
    correct: { characters: "紅色", jyutping: "hung4 sik1" },
    wrong: [
      { characters: "藍色" },
      { characters: "黃色" },
      { characters: "綠色" },
    ],
    hint: "紅",
  },
  {
    id: 7,
    english: "Water",
    correct: { characters: "水", jyutping: "seoi2" },
    wrong: [
      { characters: "飯" },
      { characters: "麵" },
      { characters: "茶" },
    ],
    hint: "水",
  },
  {
    id: 8,
    english: "Mummy",
    correct: { characters: "媽媽", jyutping: "maa1 maa1" },
    wrong: [
      { characters: "爸爸" },
      { characters: "哥哥" },
      { characters: "姐姐" },
    ],
    hint: "媽",
  },
  {
    id: 9,
    english: "Hand",
    correct: { characters: "手", jyutping: "sau2" },
    wrong: [
      { characters: "腳" },
      { characters: "眼" },
      { characters: "耳" },
    ],
    hint: "手",
  },
  {
    id: 10,
    english: "One",
    correct: { characters: "一", jyutping: "jat1" },
    wrong: [
      { characters: "二" },
      { characters: "三" },
      { characters: "四" },
    ],
    hint: "一",
  },
];
