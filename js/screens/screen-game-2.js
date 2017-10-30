import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenGame3 from './screen-game-3.js';

import screenGreeting from './screen-greeting.js';

import getTemplate from '../templates/game.js';

import {screens, getAnswers, setAnswers} from '../data/game-data.js';

export default (data) => {
  /**
   * 5. Экран второй игры, блок #game-2
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate(screens[`screen-game-2`], getAnswers()));

  // Экран третьей игры, блок #game-3, должен показываться
  // по нажатию на любой ответ на втором игровом экране, любой блок .game__answer.
  const form = element.querySelector(`.game__content`);

  form.addEventListener(`change`, () => {
    const gameAnswers = form.querySelectorAll(`.game__answer input:checked`);

    // сохраняем ответы
    gameAnswers.forEach((answer) => {
      let obj = {correct: true, speed: `normal`, type: `correct`};
      setAnswers(obj);
    })

    if (gameAnswers.length >= 1) {
      renderScreen(screenGame3());
    }
  });

  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  const backBtn = element.querySelector(`.header__back .back`);
  backBtn.addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return element;
};
