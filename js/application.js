import screenIntro from './screens/screen-intro.js';
import screenGreeting from './screens/screen-greeting.js';
import screenRules from './screens/screen-rules.js';
import screenGame from './screens/screen-game.js';
import screenStats from './screens/screen-stats.js';
import {initState} from './data/state';
import Loader from './loader';

const ScreenId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  return JSON.parse(dataString);
};

/**
 * @constructor
 */
export default class Application {
  static init() {
    this.route = {
      [ScreenId.INTRO]: screenIntro,
      [ScreenId.GREETING]: screenGreeting,
      [ScreenId.RULES]: screenRules,
      [ScreenId.GAME]: screenGame,
      [ScreenId.STATS]: screenStats
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);

      this.changeHash(id, data);
    };
    // вешаем обработчик на изменение хеша
    window.onhashchange = hashChangeHandler;
    // запускаем обработчик изменения хеша
    hashChangeHandler();
  }

  static changeHash(id, data) {
    //
    const controller = this.route[id];

    if (controller) {
      if (!data) {
        controller.init(initState());
      } else {
        controller.init(loadState(data));
      }
      controller.id = id;
    }
  }

  static showIntro() {
    location.hash = ScreenId.INTRO;
  }

  static showGreeting() {
    // сбрасываем состояние игры на изначальное
    location.hash = `${ScreenId.GREETING}?${saveState(initState())}`;
  }

  static showRules() {
    location.hash = ScreenId.RULES;
  }

  static showGame(state) {
    location.hash = `${ScreenId.GAME}?${saveState(state)}`;
  }

  static showStats(state) {
    Loader.saveResults(state).then(() => {
      location.hash = `${ScreenId.STATS}`;
    });
  }

  static changeLocation(id, state) {
    location.hash = `${id}?${saveState(state)}`;
  }

}
