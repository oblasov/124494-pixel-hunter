import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenGame2 from './screen-game-2.js';

import screenGreeting from './screen-greeting.js';

import getTemplate from '../templates/game.js';

import {screens, getAnswers, setAnswers} from '../data/game-data.js';

export default (data) => {
  /**
   * 4. Экран первой игры, блок #game-1
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate(screens[`screen-game-1`], getAnswers()));

  // Экран второй игры, блок #game-2, должен показываться после того,
  // как будут выбраны оба варианта ответа на экране #game-1.
  const form = element.querySelector(`.game__content`);
  const options = element.querySelectorAll(`.game__option`);

  form.addEventListener(`change`, () => {
    const gameAnswers = form.querySelectorAll(`input:checked`);

    // сохраняем ответы
    gameAnswers.forEach((answer) => {
      let obj = {correct: true, speed: `normal`, type: `correct`};
      setAnswers(obj);
    });

    if (options.length === gameAnswers.length) {
      renderScreen(screenGame2());
    }
  });

  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  const backBtn = element.querySelector(`.header__back .back`);
  backBtn.addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return element;
};

