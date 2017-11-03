import AbstractView from './abstract-view';
import getHeader from '../templates/header.js';
import getQuestions from '../templates/questions.js';
import getStats from '../templates/stats-list.js';
import getFooter from '../templates/footer.js';

/**
 * Класс отрисовки игрового экрана
 * @constructor
 */
export default class GameView extends AbstractView {
  constructor(screen, userAnswers, state) {
    super();

    this._screen = screen;
    this._userAnswers = userAnswers;
    this._state = state;
    /**
     * @type {?Function}
     */
    this.onAnswer = null;

    /**
     * @type {?Function}
     */
    this.onBackButtonClick = null;
  }

  get template() {

    return `
    
    ${getHeader(this._state)}
    
    <div class="game">
      <p class="game__task">${this._screen.task}</p>
      
      <form class="game__content ${ this._screen.type ? this._screen.type : ``}">
      
        ${getQuestions(this._screen)}
        
      </form>
      
      <div class="stats">
      ${getStats(this._userAnswers)}
      </div>
      
    </div>
    
    ${getFooter()}
    
    `;

  }

  bind() {
    const element = this.element;
    const backBtn = element.querySelector(`.header__back .back`);

    const gameOptions = element.querySelectorAll(`.game__option`);
    gameOptions.forEach((gameOption, index) => {
      gameOption.addEventListener(`click`, () => {
        // передаем данные по ответу в обработчик ответа
        this.onAnswer([{img: this._screen.questions[index].img, type: this._screen.correctAnswerType}]);
      });
    });


    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    backBtn.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

    // Устанавливаем таймер
    this.setTime(this._state.time);
  }

  onBackButtonClick() {

  }

  onAnswer() {

  }

  setTime(time = this.state.timer) {
    const timer = this.element.querySelector(`.game__timer`);
    timer.innerHTML = time;
  }

}
