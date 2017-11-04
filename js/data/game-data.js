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
  PAINT: `painting`,
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
 * Проверка, правильный ли ответ
 * @param {string} src
 * @param {string} type
 * @param {Array.<Object>} questions
 * @return {boolean}
 */
export const isCorrect = (src, type, questions) => {
  return questions.some((question) => {
    return question.img === src && question.type === type;
  });
};

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
    fastAnswersCount: 0,
    fastAnswersBonus: 0,
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

      switch (answer.type) {
        // если нужно выбрать из трех картинок
        case AnswerType.SLOW:
          stats.slowAnswersCount++;
          stats.slowAnswersBonus += Bonus[answer.type.toUpperCase()];
          break;
        case AnswerType.FAST:
          stats.fastAnswersCount++;
          stats.fastAnswersBonus += Bonus[answer.type.toUpperCase()];
          break;
      }
    }
    return sum;
  }, 0);

  // За каждое неиспользованное право на ошибку добавляется 50 очков.
  stats.userLivesBonus += Bonus.LIFE * stats.userLivesCount;

  stats.total = stats.correctAnswersBonus + stats.userLivesBonus;

  return stats;
};

export const adapt = (data) => {

  return data.map((dataObj) => {
    const screen = {};
    screen.task = dataObj.question;
    switch (dataObj.type) {
      case `one-of-three`:
        screen.correctAnswerType = (screen.task === `Найдите рисунок среди изображений`) ? QuestionType.PAINT : QuestionType.PHOTO;
        screen.type = `game__content--triple`;
        break;
      case `tinder-like`:
        screen.type = `game__content--wide`;
        screen.btns = true;
        break;
      default:
        screen.btns = true;
        break;
    }

    screen.questions = dataObj.answers.slice(0);

    return screen;
  });

};
