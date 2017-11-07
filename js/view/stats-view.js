import AbstractView from './abstract-view';
import getHeader from '../templates/header.js';
import getFooter from '../templates/footer.js';
import getStats from '../templates/stats-list.js';

import {Bonus} from '../data/game-data.js';
import {countStats} from '../data/game-data.js';
/**
 * Класс отрисовки экрана статистики
 * @constructor
 */
export default class StatsView extends AbstractView {
  constructor(scores, victoryFlag) {
    super();

    this._data = scores;
    this._victoryFlag = victoryFlag;
    /**
     * @type {?Function}
     */
    this.onBackButtonClick = null;
  }

  get template() {
    const title = this._victoryFlag ? `Победа!` : `Поражение...`;
    const content = this._data.reverse().map((passage, index) => StatsView.getTable(passage, index));

    // возвращаем шаблон
    return `

    ${getHeader()}
    
    <div class="result">
      <h1>${title}</h1>

      ${content.join(``)}
      
    </div>
    
    ${getFooter()}
    
    `;

  }

  bind() {
    const stats = this.element;
    const backButton = stats.querySelector(`.header__back .back`);

    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

  }

  onBackButtonClick() {

  }

  static getTable(data, index) {

    const userAnswers = data.userAnswers;

    if (!userAnswers) {
      return ``;
    }

    let bonusForFast = ``;
    let bonusForLifes = ``;
    let bonusForSlow = ``;

    data = countStats(data.userAnswers, data.userLives);

    if (typeof data === `object`) {

      bonusForFast = `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${data.fastAnswersCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${Bonus.FAST - Bonus.CORRECT}</td>
          <td class="result__total">${data.fastAnswersBonus}</td>
        </tr>`;

      bonusForLifes = `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${data.userLivesCount}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${Bonus.LIFE}</td>
          <td class="result__total">${data.userLivesBonus}</td>
        </tr>
    `;

      bonusForSlow = `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${data.slowAnswersCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${Bonus.SLOW - Bonus.CORRECT}</td>
          <td class="result__total">${data.slowAnswersBonus}</td>
          </tr>
      `;
    }

    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${index + 1}.</td>
        <td colspan="2">
          ${getStats(userAnswers)}
        </td>
        <td class="result__points">${data.correctAnswersBonus ? `×&nbsp;` : ``}${data.correctAnswersBonus ? Bonus.CORRECT : ``}</td>
        <td class="result__total">${data.correctAnswersBonus ? data.correctAnswersBonus : ``}</td>
      </tr>
      
      ${data.slowAnswersBonus ? bonusForSlow : ``}
      
      ${data.userLivesBonus ? bonusForLifes : ``}
      
      ${data.fastAnswersBonus ? bonusForFast : ``}
      
      <tr>
        <td colspan="5" class="result__total  result__total--final">${data.total ? data.total : `FAIL`}</td>
      </tr>
    </table>`;

  }
}
