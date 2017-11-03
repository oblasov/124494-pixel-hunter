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
    this.timer = new Timer(this.state.time);
    this.renderGameScreen();
  }

  renderGameScreen() {
    if (this._gameScreenNum === screens.length || this.state.userLives < 0) {
      // Экран с результатами, блок #stats, должен показываться по нажатию
      // на любой ответ на последнем игровом экране, любой блок .game__option
      App.showStats(this.state);
    } else {

      const screenData = screens[this._gameScreenNum];

      // выбираем отображение в зависимости от типа игры
      this.view = (screens[this._gameScreenNum].type === GameType.THREE) ?
        new GameThreeView(screenData, this.state.userAnswers, this.state) :
        new GameView(screenData, this.state.userAnswers, this.state);

      // добавляем коллбек при ответе пользователя
      this.view.onAnswer = (answersData = null) => {
        // останавливаем таймер
        this.timer.stop();
        // флаг, правильный ли ответ
        const correct = (answersData) ?
          // проверяем все ли ответы пользователя верны
          answersData.every((answer) => {
            return isCorrect(answer.img, answer.type, screenData.questions);
          }) : false;

        // добавляем ответ
        this.state = addAnswer(correct, this.timer.value, this.state);
        this.renderGameScreen(this.state);
      };

      // отлавливаем событие клика по кнопке "Назад"
      this.view.onBackButtonClick = () => {
        if (confirm(`Вы уверены, что хотите вернуться? Игра будет потеряна`)) { // eslint-disable-line
          // останавливаем таймер
          this.timer.stop();
          // отрисовываем первый экран
          App.showGreeting();
        }
      };
      // отрисовываем этот экран
      renderScreen(this.view.getMarkup());

      // перерисовываем таймер при его изменении
      this.timer.onChange = (time) => {
        this.view.setTime(time);
      };
      // запускаем таймер
      this.timer.value = this.state.time;
      this.timer.start();
      // если таймер истек, считаем, что пользователь ответил неверно
      this.timer.onExpire = () => {
        this.view.onAnswer();
      };
    }

    this._gameScreenNum++;


  }

}

export default new ScreenGame();
