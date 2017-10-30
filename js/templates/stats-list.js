/**
 * Формирует список ответов
 * @param {Array.<Object>} userAnswers
 * @return {string}
 */
export default (userAnswers = []) => {
  return `<ul class="stats">
  ${userAnswers.reduce((str, answer) => {
    str += `<li class="stats__result stats__result--${answer.type}"></li>`;
    return str;
  }, ``)}
        </ul>`;
};
