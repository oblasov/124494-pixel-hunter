import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import getTemplate from '../templates/game.js';

import {getAnswers, addAnswer, isCorrect} from '../data/game-data.js';


/**
 * @param {number} value
 * @constructor
 */
export default class ScreenGame {
  constructor(data) {
    this._data = data;

    /**
     * @type {?Function}
     */
    this.onAnswered = null;

    /**
     * @type {?Function}
     */
    this.back = null;
  }

  render() {

    const element = getElementFromTemplate(getTemplate(this._data, getAnswers()));
    const form = element.querySelector(`.game__content`);
    const options = element.querySelectorAll(`.game__option`);

    // если нужно выбрать из трех картинок
    if (this._data.type === `game__content--triple`) {

      const gameOptions = element.querySelectorAll(`.game__option`);
      gameOptions.forEach((gameOption) => {
        gameOption.addEventListener(`click`, () => {
          const img = gameOption.querySelector(`img`);

          addAnswer(isCorrect(img.src, `paint`));

          this._onAnswered();
        });
      });
    } else {

      form.addEventListener(`change`, () => {
        const answers = form.querySelectorAll(`input:checked`);

        if (options.length === answers.length) {

          // дан ли верный ответ на все вопросы экрана
          const correct = Array.from(answers).every((answer) => {
            const img = answer.parentElement.parentElement.querySelector(`img`);
            return isCorrect(img.src, answer.value);
          });

          addAnswer(correct);

          this._onAnswered();
        }
      });
    }


    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    const backBtn = element.querySelector(`.header__back .back`);
    backBtn.addEventListener(`click`, () => {

      this._back();
    });

    this.element = element;

    renderScreen(this.element);

  }

  /**
   * @private
   */
  _onAnswered() {

    // Вызываем коллбэк
    if (typeof this.onAnswered === `function`) {
      this.onAnswered();
    }
  }

  /**
   * @private
   */
  _back() {
    // Вызываем коллбэк
    if (typeof this.back === `function`) {
      this.back();
    }
  }


}
