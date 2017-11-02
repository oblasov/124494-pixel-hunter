import AbstractView from './abstract-view';
import getHeader from '../templates/header.js';
import getQuestions from '../templates/questions.js';
import getStats from '../templates/stats-list.js';
import getFooter from '../templates/footer.js';

import {isCorrect} from '../data/game-data.js';

/**
 * Класс отрисовки игрового экрана
 * @constructor
 */
export default class GameView extends AbstractView {
  constructor(screen, userAnswers) {
    super();

    this._screen = screen;
    this._userAnswers = userAnswers;

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
    
    ${getHeader(true)}
    
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
    const form = element.querySelector(`.game__content`);
    const options = element.querySelectorAll(`.game__option`);
    const backBtn = element.querySelector(`.header__back .back`);

    form.addEventListener(`change`, () => {

      const answers = form.querySelectorAll(`input:checked`);

      if (options.length === answers.length) {

        // дан ли верный ответ на все вопросы экрана
        const correct = Array.from(answers).every((answer, index) => {
          return isCorrect(this._screen.questions[index].img, answer.value, this._screen.questions);
        });

        this.onAnswer(correct);
      }

    });

    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    backBtn.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });
  }

  onBackButtonClick() {

  }

  onAnswer() {

  }

}
