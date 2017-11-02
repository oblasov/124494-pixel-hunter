import {renderScreen} from '../render-screen.js';

import screenRules from './screen-rules.js';

import {newAttempt} from '../data/game-data.js';

import GreetingView from '../view/greeting-view.js';

/**
 * 2. Экран приветствия, блок #greeting
 * @return {Element}
 */
export default () => {

  // очищаем массив ответов
  newAttempt();

  // класс отрисовки экрана приветствия
  const view = new GreetingView();

  // Экран с правилами игры, блок #rules,
  // должен показываться по нажатию на блок со стрелкой вправо,
  // элемент .greeting__continue на экране приветствия.
  view.onNextButtonClick = () => {
    renderScreen(screenRules());
  };

  return view.getMarkup();

};
