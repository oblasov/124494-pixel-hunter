import {renderScreen} from '../render-screen.js';

import App from '../application';

import StatsVictoryView from '../view/stats-view.js';

import Loader from '../loader';
import ScreenSplash from '../screens/screen-splash';
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
    const splash = new ScreenSplash();
    renderScreen(splash.getMarkup());
    splash.start();
    // загружаем результаты с сервера
    Loader.loadResults().then((scores) => {
      this.state = scores[scores.length - 1];
      this.showScreen(scores);
    }).then(() => splash.stop());
  }

  showScreen(scores) {

    this.view = new StatsVictoryView(scores, this.state.userLives >= 0);

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
