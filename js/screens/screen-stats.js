import {renderScreen} from '../render-screen.js';

import App from '../application';

import {countStats} from '../data/game-data.js';

import StatsVictoryView from '../view/stats-victory-view.js';
import StatsFailView from '../view/stats-fail-view.js';

/**
 * 7. Экран с результатами, блок #stats.
 * @constructor
 */
class ScreenStats {

  constructor() {
    // класс отрисовки экрана правил
    this.view = null;
  }

  init(state) {
    // текущее состояние приложения
    this.state = state;
    //
    if (this.state.userLives >= 0) {
      this.view = new StatsVictoryView(countStats(this.state.userAnswers, this.state.userLives), this.state.userAnswers);
    } else {
      this.view = new StatsFailView(this.state.userAnswers);
    }

    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    this.view.onBackButtonClick = () => {
      // отрисовываем первый экран
      App.showGreeting(this.state);
    };
    // отрисовываем этот экран
    renderScreen(this.view.getMarkup());

  }

}

export default new ScreenStats();
