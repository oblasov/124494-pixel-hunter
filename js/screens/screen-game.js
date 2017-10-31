import {renderScreen} from '../render-screen.js';

import screenGreeting from './screen-greeting.js';

import screenStats from './screen-stats.js';

import Question from '../game/question.js';


import {screens, User} from '../data/game-data.js';


export default () => {

  let num = 0;

  const renderGameScreen = () => {

    let screen;

    if (num === screens.length || User.lives < 0) {
      // Экран с результатами, блок #stats, должен показываться по нажатию
      // на любой ответ на последнем игровом экране, любой блок .game__option
      renderScreen(screenStats());

    } else {
      screen = new Question(screens[num]);

      // добавляем коллбек при ответе пользователя
      screen.onAnswered = () => {
        renderGameScreen();
      };

      // отлавливаем событие клика по кнопке "Назад"
      screen.back = () => {
        // отрисовываем первый экран
        renderScreen(screenGreeting());
      };

      screen.render();
    }

    num++;

  };

  renderGameScreen();

};

