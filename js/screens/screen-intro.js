import {renderScreen} from '../render-screen';

import screenGreeting from './screen-greeting';

import IntroView from '../view/intro-view';

/**
 * 1. Главный экран, на основе блока #intro
 * @return {Element}
 */
export default () => {

  // класс отрисовки главного экрана
  const view = new IntroView();

  // Экран приветствия, блок #greeting, должен показываться по нажатию
  // на символ звёздочки, элемент .intro__asterisk на главном экране
  view.onNextButtonClick = () => {
    renderScreen(screenGreeting());
  };

  return view.getMarkup();

};
