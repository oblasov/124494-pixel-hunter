/**
 * Стартовые параметры игры
 * @enum {number}
 */
export const startConfigs = {
  lives: 3,
  timer: 30
};

/**
 * Функция подсчета набранных пользователем очков
 * @param {Array.<Object>} userAnswers
 * @param {number} userLives
 * @return {number}
 */
export const countUserScore = (userAnswers, userLives) => {
  let score = 0;

  if (typeof userAnswers !== `object` || userAnswers === null || typeof userLives !== `number`) {
    return null;
  }

  if (userAnswers.length < 10 || userLives < 0) {
    return -1;
  }

  // Производим подсчет заработанных очков
  userAnswers.forEach((answer) => {
    // За каждый правильный ответ
    if (answer.correct) {
      // даётся 100 очков.
      score += 100;
      switch (answer.speed) {
        // За каждый быстрый ответ дополнительно начисляется 50 очков
        // Таким образом, быстрый ответ приносит игроку 150 очков.
        case `fast`:
          score += 50;
          break;
        // За каждый медленный ответ с игрока снимается 50 очков.
        // Таким образом, каждый медленный ответ приносит игроку 50 очков.
        case `slow`:
          score -= 50;
          break;
        case `normal`:
          break;
        default:
          break;
      }
    }
  });

  // За каждое неиспользованное право на ошибку добавляется 50 очков.
  score += 50 * userLives;

  return score;
};
