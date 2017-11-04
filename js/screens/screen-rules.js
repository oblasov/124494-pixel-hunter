import {renderScreen} from '../render-screen';

import App from '../application';
import {setUserName} from '../data/state';
import RulesView from '../view/rules-view';

/**
 * 3. Экран правил игры, блок #rules.
 * @constructor
 */
class ScreenRules {
  constructor() {
    // класс отрисовки экрана правил
    this.view = new RulesView();
  }

  init(state) {
    this.state = state;
    // Экран первой игры, блок #game-1, должен показываться по отправке формы на экране правил игры.
    // Кнопка отправки .rules__button.
    this.view.onSubmit = (name) => {
      this.state = setUserName(name, this.state);
      App.showGame(this.state);
    };

    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    this.view.onBackButtonClick = () => {
      App.showGreeting();
    };
    // отрисовываем этот экран
    renderScreen(this.view.getMarkup());
  }

}

export default new ScreenRules();
