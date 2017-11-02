import {renderScreen} from '../render-screen.js';

import screenGreeting from './screen-greeting.js';

import {getAnswers, countStats, user} from '../data/game-data.js';

import StatsVictoryView from '../view/stats-victory-view.js';
import StatsFailView from '../view/stats-fail-view.js';

/**
 * 7. Экран с результатами, блок #stats.
 * @return {Element}
 */
export default () => {

  let view = {};

  if (user.lives >= 0) {
    view = new StatsVictoryView(countStats(getAnswers(), user.lives), getAnswers());
  } else {
    view = new StatsFailView(getAnswers());
  }

  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  view.onBackButtonClick = () => {
    // отрисовываем первый экран
    renderScreen(screenGreeting());
  };

  return view.getMarkup();

};
