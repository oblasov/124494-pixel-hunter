import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenRules from './screen-rules.js';

import getTemplate from '../templates/greeting.js';

export default (data) => {
  /**
   * 2. Экран приветствия, блок #greeting
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate());

  // Экран с правилами игры, блок #rules,
  // должен показываться по нажатию на блок со стрелкой вправо,
  // элемент .greeting__continue на экране приветствия.
  element.querySelector(`.greeting__continue`).addEventListener(`click`, () => {
    renderScreen(screenRules());
  });

  return element;

};
