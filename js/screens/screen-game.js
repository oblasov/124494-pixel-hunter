import {renderScreen} from '../render-screen.js';

import screenGreeting from './screen-greeting.js';

import screenStats from './screen-stats.js';

import GameView from '../view/game-view.js';
import GameThreeView from '../view/game-three-view.js';

import {screens, user, getAnswers, addAnswer, GameType} from '../data/game-data.js';

/**
 * Игровой экран
 *
 */
export default () => {

  let num = 0;

  const renderGameScreen = () => {

    if (num === screens.length || user.lives < 0) {
      // Экран с результатами, блок #stats, должен показываться по нажатию
      // на любой ответ на последнем игровом экране, любой блок .game__option
      renderScreen(screenStats());

    } else {

      let view = {};
      // выбираем отображение в зависимости от типа игры
      switch (screens[num].type) {
        // если нужно выбрать из трех картинок
        case GameType.THREE:
          view = new GameThreeView(screens[num], getAnswers());
          break;
        default:
          view = new GameView(screens[num], getAnswers());
          break;
      }

      // добавляем коллбек при ответе пользователя
      view.onAnswer = (answer) => {
        addAnswer(answer);
        renderGameScreen();
      };

      // отлавливаем событие клика по кнопке "Назад"
      view.onBackButtonClick = () => {
        // отрисовываем первый экран
        renderScreen(screenGreeting());
      };

      renderScreen(view.getMarkup());
    }

    num++;

  };

  renderGameScreen();

};

