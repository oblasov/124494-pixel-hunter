import {renderScreen} from '../render-screen.js';

import screenGame from './screen-game.js';

import screenGreeting from './screen-greeting.js';

import RulesView from '../view/rules-view';

/**
 * 3. Экран правил игры, блок #rules.
 * @return {Element}
 */
export default () => {

  // класс отрисовки экрана правил
  const view = new RulesView();

  // Экран первой игры, блок #game-1, должен показываться по отправке формы на экране правил игры.
  // Кнопка отправки .rules__button.
  view.onSubmit = () => {
    screenGame();
  };


  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  view.onBackButtonClick = () => {
    renderScreen(screenGreeting());
  };

  return view.getMarkup();

};
