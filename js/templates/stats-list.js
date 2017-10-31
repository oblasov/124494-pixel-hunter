/**
 * Формирует список ответов
 * @param {Array.<Object>} userAnswers
 * @return {string}
 */
export default (userAnswers = []) => {
  return `
<ul class="stats">
  ${userAnswers.reduce((str, answer) => {
    str += `<li class="stats__result stats__result--${answer.type}"></li>`;
    return str;
  }, ``)}
  
  ${new Array(10 - userAnswers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
  
</ul>`;

};

