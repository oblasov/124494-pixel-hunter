import {renderScreen} from '../render-screen';

import App from '../application';
import Timer from '../game/timer';
import GameView from '../view/game-view';
import GameThreeView from '../view/game-three-view';

import {screens, isCorrect, GameType} from '../data/game-data';
import {addAnswer} from '../data/state';

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

  init(state) {
    // текущее состояние игры
    this.state = state;
    this.renderGameScreen();
  }

  renderGameScreen() {
    if (this._gameScreenNum === screens.length || this.state.userLives < 0) {
      // Экран с результатами, блок #stats, должен показываться по нажатию
      // на любой ответ на последнем игровом экране, любой блок .game__option
      App.showStats(this.state);
    } else {
      const timer = new Timer(this.state.time);
      const screenData = screens[this._gameScreenNum];
      // выбираем отображение в зависимости от типа игры
      switch (screens[this._gameScreenNum].type) {
        // если нужно выбрать из трех картинок
        case GameType.THREE:
          this.view = new GameThreeView(screenData, this.state.userAnswers, this.state);
          break;
        default:
          this.view = new GameView(screenData, this.state.userAnswers, this.state);
          break;
      }

      // добавляем коллбек при ответе пользователя
      this.view.onAnswer = (answersData = null) => {
        // флаг, правильный ли ответ
        let correct = false;
        // останавливаем таймер
        timer.stop();
        if (answersData) {
          // проверяем все ли ответы пользователя верны
          correct = answersData.every((answer) => {
            return isCorrect(answer.img, answer.type, screenData.questions);
          });
        }
        // добавляем ответ
        this.state = addAnswer(correct, timer.value, this.state);
        this.renderGameScreen(this.state);
      };

      // отлавливаем событие клика по кнопке "Назад"
      this.view.onBackButtonClick = () => {
        // отрисовываем первый экран
        App.showGreeting();
      };
      // отрисовываем этот экран
      renderScreen(this.view.getMarkup());

      // перерисовываем таймер при его изменении
      timer.onChange = (time) => {
        this.view.setTime(time);
      };
      // запускаем таймер
      timer.start();
      // если таймер истек считаем, что пользователь ответил неверно
      timer.onExpire = () => {
        this.view.onAnswer();
      };
    }

    this._gameScreenNum++;


  }

}

export default new ScreenGame();
