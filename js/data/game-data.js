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
 * Текущее состояние пользователя
 */
export const User = {
  lives: Config.LIVES
};

/**
 * Бонусы за скорость
 * @enum {number}
 */
export const Bonus = {
  FAST: 50, // За каждый быстрый ответ дополнительно начисляется 50 очков.
  SLOW: -50, // За каждый медленный ответ с игрока снимается 50 очков.
  NORMAL: 0, // За обычный ответ нет бонусов и штрафов.
  LIFE: 50, // За каждое неиспользованное право на ошибку добавляется 50 очков.
  CORRECT: 100 // За каждый правильный ответ даётся 100 очков.
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
  },
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
  },
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
  }

];


// wrong slow fast correct unknown
let userAnswers = [];

export const getAnswers = () =>{
  return userAnswers;
};

/**
 * Добавление ответа в список
 * @param {boolean} correct
 * @param {number} time
 */
export const addAnswer = (correct, time) =>{
  let type = ``;
  if (correct) {
    type = `correct`;
  } else {
    type = `wrong`;
    User.lives--;
  }

  time = `normal`;

  userAnswers.push({correct, speed: time, type});
};

/**
 * Новое прохождение
 */
export const newAttempt = () =>{
  User.lives = Config.LIVES;
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
  score += Bonus.LIFE * userLives;

  return score;
};

/**
 * Функция подсчета всей набранной статистики
 * @param {Array.<Object>} answers
 * @param {number} userLives
 * @return {Object}
 */
export const countStats = (answers, userLives) => {
  let stats = {
    total: 0,
    correctAnswersCount: 0,
    correctAnswersBonus: 0,
    slowAnswersCount: 0,
    slowAnswersBonus: 0,
    userLivesCount: userLives,
    userLivesBonus: 0
  };

  if (!Array.isArray(answers) || typeof userLives !== `number`) {
    // throw new Error(`invalid input data`);
    return null;
  }

  if (answers.length < 10 || userLives < 0) {
    return -1;
  }

  // Производим подсчет заработанных очков
  stats.correctAnswersBonus = answers.reduce((sum, answer) => {
    // За каждый правильный ответ
    if (answer.correct) {
      // даётся 100 очков.
      sum += Bonus.CORRECT;
      // бонус за скорость
      sum += Bonus[answer.speed.toUpperCase()];

      stats.correctAnswers++;
    }
    return sum;
  }, 0);

  // За каждое неиспользованное право на ошибку добавляется 50 очков.
  stats.userLivesBonus += Bonus.LIFE * stats.userLivesCount;

  stats.total = stats.correctAnswersBonus + stats.userLivesBonus;

  return stats;
};
