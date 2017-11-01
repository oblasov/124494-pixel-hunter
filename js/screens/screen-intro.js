import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenGreeting from './screen-greeting.js';

import getTemplate from '../templates/intro.js';

export default () => {
  /**
   * 1. Главный экран, на основе блока #intro
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate());

  // Экран приветствия, блок #greeting, должен показываться по нажатию на символ звёздочки, элемент .intro__asterisk на главном экране
  element.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return element;
};
