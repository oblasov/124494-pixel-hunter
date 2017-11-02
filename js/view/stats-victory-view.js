import AbstractView from './abstract-view';
import getHeader from '../templates/header.js';
import getFooter from '../templates/footer.js';
import getStats from '../templates/stats-list.js';

import {Bonus} from '../data/game-data.js';

/**
 * Класс отрисовки экрана статистики
 * @constructor
 */
export default class StatsView extends AbstractView {
  constructor(stats, userAnswers) {
    super();

    this._stats = stats;
    this._userAnswers = userAnswers;

    /**
     * @type {?Function}
     */
    this.onBackButtonClick = null;
  }

  get template() {
    const title = `Победа!`;
    let content = ``;

    const data = this._stats;

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
          ${getStats(this._userAnswers)}
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

    // возвращаем шаблон
    return `

    ${getHeader()}
    
    <div class="result">
      <h1>${title}</h1>

      ${content}
      
    </div>
    
    ${getFooter()}
    
    `;

  }

  bind() {
    const stats = this.element;
    const backBtn = stats.querySelector(`.header__back .back`);

    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    backBtn.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

  }

  onBackButtonClick() {

  }

}