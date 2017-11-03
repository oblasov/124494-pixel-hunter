import {renderScreen} from '../render-screen.js';

import {newAttempt} from '../data/game-data.js';

import GreetingView from '../view/greeting-view.js';

import App from '../application';

/**
 * 2. Экран приветствия, блок #greeting
 * @constructor
 */
class ScreenGreeting {

  constructor() {
    // класс отрисовки экрана приветствия
    this.view = new GreetingView();

    // очищаем массив ответов
    newAttempt();
  }

  init() {
    // Экран с правилами игры, блок #rules,
    // должен показываться по нажатию на блок со стрелкой вправо,
    // элемент .greeting__continue на экране приветствия.
    this.view.onNextButtonClick = () => {
      App.showRules();
    };
    // отрисовываем этот экран
    renderScreen(this.view.getMarkup());
  }

}

export default new ScreenGreeting();
