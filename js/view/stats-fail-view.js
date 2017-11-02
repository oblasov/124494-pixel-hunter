import AbstractView from './abstract-view';
import getHeader from '../templates/header.js';
import getFooter from '../templates/footer.js';
import getStats from '../templates/stats-list.js';


/**
 * Класс отрисовки экрана статистики
 * @constructor
 */
export default class StatsView extends AbstractView {
  constructor(userAnswers) {
    super();

    this._userAnswers = userAnswers;

    /**
     * @type {?Function}
     */
    this.onBackButtonClick = null;
  }

  get template() {
    const title = `Поражение...`;

    const content = `<table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          ${getStats(this._userAnswers)}
        </td>
        <td class="result__total"></td>
        <td class="result__total result__total--final">fail</td>
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
