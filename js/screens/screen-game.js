import {renderScreen} from '../render-screen';

import App from '../application';

import GameView from '../view/game-view';
import GameThreeView from '../view/game-three-view';

import {screens, user, getAnswers, isCorrect, addAnswer, GameType} from '../data/game-data';

/**
 * 4. Игровой экран
 * @constructor
 */
class ScreenGame {

  constructor() {
    // класс отрисовки экрана правил
    this.view = null;
    // номер игрового экрана
    this._gameScreenNum = 0;
  }

  init() {
    this.renderGameScreen();
  }

  renderGameScreen() {

    if (this._gameScreenNum === screens.length || user.lives < 0) {
      // Экран с результатами, блок #stats, должен показываться по нажатию
      // на любой ответ на последнем игровом экране, любой блок .game__option
      App.showStats();
    } else {
      const screenData = screens[this._gameScreenNum];
      // выбираем отображение в зависимости от типа игры
      switch (screens[this._gameScreenNum].type) {
        // если нужно выбрать из трех картинок
        case GameType.THREE:
          this.view = new GameThreeView(screenData, getAnswers());
          break;
        default:
          this.view = new GameView(screenData, getAnswers());
          break;
      }

      // добавляем коллбек при ответе пользователя
      this.view.onAnswer = (answersData) => {
        // проверяем все ли ответы пользователя верны
        const correct = answersData.every((answer) => {
          return isCorrect(answer.img, answer.type, screenData.questions);
        });
        // добавляем ответ
        addAnswer(correct);
        this.renderGameScreen();
      };

      // отлавливаем событие клика по кнопке "Назад"
      this.view.onBackButtonClick = () => {
        // отрисовываем первый экран
        App.showGreeting();
      };
      // отрисовываем этот экран
      renderScreen(this.view.getMarkup());
    }

    this._gameScreenNum++;

  }

}

export default new ScreenGame();
