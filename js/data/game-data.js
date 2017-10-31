/**
 * Стартовые параметры игры
 * @enum {number}
 */
export const Config = {
  LIVES: 3,
  TIMER: 30,
  TIME: 0
};

/**
 * Бонусы за скорость
 * @enum {number}
 */
const Bonus = {
  FAST: 50, // За каждый быстрый ответ дополнительно начисляется 50 очков
  SLOW: -50, // За каждый медленный ответ с игрока снимается 50 очков.
  NORMAL: 0
};

/**
 * Вопросы для игрока
 * @type {Array.<Object>}
 */
const questions = [
  {
    img: `https://k42.kn3.net/CF42609C8.jpg`,
    type: `paint`
  },
  {
    img: `https://k32.kn3.net/5C7060EC5.jpg`,
    type: `paint`
  },

  {
    img: `http://i.imgur.com/1KegWPz.jpg`,
    type: `photo`
  },

  {
    img: `https://k42.kn3.net/D2F0370D6.jpg`,
    type: `paint`
  },
  {
    img: `https://i.imgur.com/DiHM5Zb.jpg`,
    type: `photo`
  },
  {
    img: `http://i.imgur.com/DKR1HtB.jpg`,
    type: `photo`
  }

];


export const isCorrect = (src, type) => {
  let res = questions.find((question) => {
    return question.img === src && question.type === type;
  });

  return typeof res === `object`;
};


/**
 * Набор данных об экранах
 * @type {Array.<Object>}
 */
export const screens = [
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    questions: questions.slice(0, 2),
    btns: true,
    imgWidth: 458,
    imgHeight: 468
  },
  {
    task: `Угадай, фото или рисунок?`,
    type: `game__content--wide`,
    questions: questions.slice(2, 3),
    btns: true,
    imgWidth: 705,
    imgHeight: 455
  },
  {
    task: `Найдите рисунок среди изображений`,
    type: `game__content--triple`,
    questions: questions.slice(3),
    btns: false,
    imgWidth: 304,
    imgHeight: 455
  }

];


// wrong slow fast correct unknown
let userAnswers = [];

export const getAnswers = () =>{
  return userAnswers;
};

export const addAnswer = (correct, time) =>{
  let type = ``;
  if (correct) {
    type = `correct`;
  } else {
    type = `wrong`;
  }

  time = `normal`;

  userAnswers.push({correct, speed: time, type});
};

export const clearAnswers = () =>{
  userAnswers = [];
};

/**
 * Функция подсчета набранных пользователем очков
 * @param {Array.<Object>} answers
 * @param {number} userLives
 * @return {number}
 */
export const countUserScore = (answers, userLives) => {
  let score = 0;

  if (!Array.isArray(answers) || typeof userLives !== `number`) {
    // throw new Error(`invalid input data`);
    return null;
  }

  if (answers.length < 10 || userLives < 0) {
    return -1;
  }

  // Производим подсчет заработанных очков
  score = answers.reduce((sum, answer) => {
    // За каждый правильный ответ
    if (answer.correct) {
      // даётся 100 очков.
      sum += 100;
      // бонус за скорость
      sum += Bonus[answer.speed.toUpperCase()];
    }
    return sum;
  }, 0);

  // За каждое неиспользованное право на ошибку добавляется 50 очков.
  score += 50 * userLives;

  return score;
};

const normalAnswers = Array(10).fill({correct: true, speed: `normal`});
console.log(countUserScore(normalAnswers, Config.LIVES));
