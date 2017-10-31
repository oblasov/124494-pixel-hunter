import {getElementFromTemplate, renderScreen} from '../render-screen.js';


import screenGreeting from './screen-greeting.js';

import getTemplate from '../templates/stats.js';

import {getAnswers} from '../data/game-data.js';


export default () => {
  /**
   * 7. Экран с результатами, блок #stats.
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate(getAnswers()));


  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  const backBtn = element.querySelector(`.header__back .back`);
  backBtn.addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return element;

};
