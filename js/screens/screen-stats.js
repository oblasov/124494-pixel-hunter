import {renderScreen} from '../render-screen.js';

import App from '../application';

import {getAnswers, countStats, user} from '../data/game-data.js';

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

  init() {

    if (user.lives >= 0) {
      this.view = new StatsVictoryView(countStats(getAnswers(), user.lives), getAnswers());
    } else {
      this.view = new StatsFailView(getAnswers());
    }

    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    this.view.onBackButtonClick = () => {
      // отрисовываем первый экран
      App.showGreeting();
    };
    // отрисовываем этот экран
    renderScreen(this.view.getMarkup());

  }

}

export default new ScreenStats();
