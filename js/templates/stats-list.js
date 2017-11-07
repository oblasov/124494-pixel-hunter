import {Config} from '../data/game-data';
/**
 * Формирует список ответов
 * @param {Array.<Object>} userAnswers
 * @return {string}
 */
export default (userAnswers = []) => {

  const list = userAnswers.map((answer) => {
    return `<li class="stats__result stats__result--${answer.type}"></li>`;
  });

  return `
      <ul class="stats">
      
        ${list.join(``)}
        
        ${new Array(Config.NUMBER_OF_QUESTIONS - userAnswers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
        
      </ul>
  `;

};

