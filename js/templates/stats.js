import getHeader from './header.js';
import getFooter from './footer.js';
import getStats from './stats-list.js';

import {user, Bonus, countStats} from '../data/game-data.js';

/**
 * Возвращает шаблон экрана статистики
 * @param {Object} userAnswers
 * @return {string}
 */
export default (userAnswers) => {
  let title = ``;
  let content = ``;

  const data = countStats(userAnswers, user.lives);

  if (user.lives >= 0) {

    title = `Победа!`;

    let bonusForFast = `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${data.fastAnswersCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${Bonus.FAST - Bonus.CORRECT}</td>
          <td class="result__total">${data.fastAnswersBonus}</td>
        </tr>`;

    let bonusForLifes = `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${data.userLivesCount}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${Bonus.LIFE}</td>
          <td class="result__total">${data.userLivesBonus}</td>
        </tr>
    `;
    let bonusForSlow = `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${data.slowAnswersCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${Bonus.SLOW - Bonus.CORRECT}</td>
          <td class="result__total">${data.slowAnswersBonus}</td>
          </tr>
`;

    content = `
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${getStats(userAnswers)}
          </td>
          <td class="result__points">×&nbsp;${Bonus.CORRECT}</td>
          <td class="result__total">${data.correctAnswersBonus}</td>
        </tr>
        
        ${data.slowAnswersBonus ? bonusForSlow : ``}
        
        ${data.userLivesBonus ? bonusForLifes : ``}
        
        ${data.fastAnswersBonus ? bonusForFast : ``}
        
        <tr>
          <td colspan="5" class="result__total  result__total--final">${data.total}</td>
        </tr>
      </table>`;

  } else {

    title = `Поражение...`;

    content = `<table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            ${getStats(userAnswers)}
          </td>
          <td class="result__total"></td>
          <td class="result__total result__total--final">fail</td>
        </tr>
      </table>`;
  }

  // возвращаем шаблон
  return `

    ${getHeader()}
    
    <div class="result">
      <h1>${title}</h1>

      ${content}
      
    </div>
    
    ${getFooter()}
    
    `;
};
