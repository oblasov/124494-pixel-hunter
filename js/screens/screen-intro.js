import {renderScreen} from '../render-screen';

import IntroView from '../view/intro-view';

import App from '../application';

/**
 * 1. Главный экран, на основе блока #intro
 * @constructor
 */
class ScreenIntro {
  constructor() {
    // класс отрисовки главного экрана
    this.view = new IntroView();
  }

  init() {
    // Экран приветствия, блок #greeting, должен показываться по нажатию
    // на символ звёздочки, элемент .intro__asterisk на главном экране
    this.view.onNextButtonClick = () => {
      // отрисовываем слудующий экран
      App.showGreeting();
    };
    // отрисовываем этот экран
    renderScreen(this.view.getMarkup());
  }
}

export default new ScreenIntro();
