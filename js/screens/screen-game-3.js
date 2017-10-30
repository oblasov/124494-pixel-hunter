import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenStats from './screen-stats.js';

import screenGreeting from './screen-greeting.js';

import getTemplate from '../templates/game.js';

import {screens, getAnswers, setAnswers} from '../data/game-data.js';

export default (data) => {
  /**
   * 6. Экран третьей игры, блок #game-3
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate(screens[`screen-game-3`], getAnswers()));

  // Экран с результатами, блок #stats, должен показываться по нажатию
  // на любой ответ на третьем игровом экране, любой блок .game__option

  const gameOptions = element.querySelectorAll(`.game__option`);
  gameOptions.forEach((gameOption) => {
    gameOption.addEventListener(`click`, () => {

      // сохраняем ответы
      /*gameAnswers.forEach((answer) => {*/
      let obj = {correct: true, speed: `normal`, type: `correct`};

      setAnswers(obj);
      //})

      renderScreen(screenStats());
    });
  });

  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  const backBtn = element.querySelector(`.header__back .back`);
  backBtn.addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return element;
};
