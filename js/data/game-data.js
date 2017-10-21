/**
 * Стартовые параметры игры
 * @enum {number}
 */
export const Config = {
  LIVES: 3,
  TIMER: 30
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
 * Функция подсчета набранных пользователем очков
 * @param {Array.<Object>} userAnswers
 * @param {number} userLives
 * @return {number}
 */
export const countUserScore = (userAnswers, userLives) => {
  let score = 0;

  if (!Array.isArray(userAnswers) || typeof userLives !== `number`) {
    // throw new Error(`invalid input data`);
    return null;
  }

  if (userAnswers.length < 10 || userLives < 0) {
    return -1;
  }

  // Производим подсчет заработанных очков
  score = userAnswers.reduce((sum, answer) => {
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
