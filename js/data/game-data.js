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
export const user = {
  lives: Config.LIVES
};

/**
 * Бонусы за скорость
 * @enum {number}
 */
export const Bonus = {
  FAST: 150, // За каждый быстрый ответ дополнительно начисляется 50 очков.
  SLOW: 50, // За каждый медленный ответ с игрока снимается 50 очков.
  LIFE: 50, // За каждое неиспользованное право на ошибку добавляется 50 очков.
  CORRECT: 100 // За каждый правильный ответ даётся 100 очков.
};

/**
 * Типы вопросов
 * @enum {string}
 */
const QuestionType = {
  PAINT: `paint`,
  PHOTO: `photo`
};

/**
 * Типы игры
 * @enum {string}
 */
export const GameType = {
  THREE: `game__content--triple`
};

/**
 * Вопросы для игрока
 * @type {Array.<Object>}
 */
const questionsData = [
  {
    img: `https://k42.kn3.net/CF42609C8.jpg`,
    type: QuestionType.PAINT
  },
  {
    img: `https://k32.kn3.net/5C7060EC5.jpg`,
    type: QuestionType.PAINT
  },

  {
    img: `http://i.imgur.com/1KegWPz.jpg`,
    type: QuestionType.PHOTO
  },

  {
    img: `https://k42.kn3.net/D2F0370D6.jpg`,
    type: QuestionType.PAINT
  },
  {
    img: `https://i.imgur.com/DiHM5Zb.jpg`,
    type: QuestionType.PHOTO
  },
  {
    img: `http://i.imgur.com/DKR1HtB.jpg`,
    type: QuestionType.PHOTO
  }

];


export const isCorrect = (src, type, questions) => {
  return questions.some((question) => {
    return question.img === src && question.type === type;
  });
};


/**
 * Набор данных об экранах
 * @type {Array.<Object>}
 */
export const screens = [
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    questions: questionsData.slice(0, 2),
    btns: true,
    imgWidth: 458,
    imgHeight: 468
  },
  {
    task: `Угадай, фото или рисунок?`,
    type: `game__content--wide`,
    questions: questionsData.slice(2, 3),
    btns: true,
    imgWidth: 705,
    imgHeight: 455
  },
  {
    task: `Найдите рисунок среди изображений`,
    type: `game__content--triple`,
    questions: questionsData.slice(3),
    btns: false,
    imgWidth: 304,
    imgHeight: 455,
    correctAnswerType: QuestionType.PAINT
  },
  {
    task: `Найдите фото среди изображение`,
    type: `game__content--triple`,
    questions: questionsData.slice(3),
    btns: false,
    imgWidth: 304,
    imgHeight: 455,
    correctAnswerType: QuestionType.PHOTO
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    questions: questionsData.slice(0, 2),
    btns: true,
    imgWidth: 458,
    imgHeight: 468
  },
  {
    task: `Угадай, фото или рисунок?`,
    type: `game__content--wide`,
    questions: questionsData.slice(2, 3),
    btns: true,
    imgWidth: 705,
    imgHeight: 455
  },
  {
    task: `Найдите рисунок среди изображений`,
    type: `game__content--triple`,
    questions: questionsData.slice(3),
    btns: false,
    imgWidth: 304,
    imgHeight: 455,
    correctAnswerType: QuestionType.PAINT
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    questions: questionsData.slice(0, 2),
    btns: true,
    imgWidth: 458,
    imgHeight: 468
  },
  {
    task: `Угадай, фото или рисунок?`,
    type: `game__content--wide`,
    questions: questionsData.slice(2, 3),
    btns: true,
    imgWidth: 705,
    imgHeight: 455
  },
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    questions: questionsData.slice(0, 2),
    btns: true,
    imgWidth: 458,
    imgHeight: 468
  }

];


/**
 * Типы ответов
 * @enum {string}
 */
export const AnswerType = {
  WRONG: `wrong`,
  SLOW: `slow`,
  FAST: `fast`,
  CORRECT: `correct`,
  UNKNOWN: `unknown`
};

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
    type = AnswerType.CORRECT;
  } else {
    type = AnswerType.WRONG;
    user.lives--;
  }

  time = `normal`;

  userAnswers.push({correct, speed: time, type});
};

/**
 * Новое прохождение
 */
export const newAttempt = () =>{
  user.lives = Config.LIVES;
  userAnswers = [];
};

/**
 * Функция подсчета всей набранной статистики
 * @param {Array.<Object>} answers
 * @param {number} userLives
 * @return {Object}
 */
export const countStats = (answers, userLives) => {
  const stats = {
    total: 0,
    correctAnswersCount: 0,
    correctAnswersBonus: 0,
    slowAnswersCount: 0,
    slowAnswersBonus: 0,
    userLivesCount: userLives,
    userLivesBonus: 0
  };

  if (!Array.isArray(answers) || typeof userLives !== `number` || isNaN(userLives)) {
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
      // бонус по типу ответа
      sum += Bonus[answer.type.toUpperCase()];
      stats.correctAnswersCount++;
    }
    return sum;
  }, 0);

  // За каждое неиспользованное право на ошибку добавляется 50 очков.
  stats.userLivesBonus += Bonus.LIFE * stats.userLivesCount;

  stats.total = stats.correctAnswersBonus + stats.userLivesBonus;

  return stats;
};
