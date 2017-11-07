import screenIntro from './screens/screen-intro.js';
import screenGreeting from './screens/screen-greeting.js';
import screenRules from './screens/screen-rules.js';
import ScreenGame from './screens/screen-game.js';
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

const Literal = {
  QUOTE: `%22`
};

const loadState = (dataString) => {
  dataString = dataString.split(Literal.QUOTE).join(`"`); // Для Firefox
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return initState();
  }
};

/**
 * @constructor
 */
export default class Application {
  static init(gameData) {
    this.route = {
      [ScreenId.INTRO]: screenIntro,
      [ScreenId.GREETING]: screenGreeting,
      [ScreenId.RULES]: screenRules,
      [ScreenId.GAME]: new ScreenGame(gameData),
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

  static showRules(state) {
    location.hash = `${ScreenId.RULES}?${saveState(state)}`;
  }

  static showGame(state) {
    location.hash = `${ScreenId.GAME}?${saveState(state)}`;
  }

  static showStats(state) {
    Loader.saveResults(state, state.userName).then(() => {
      location.hash = `${ScreenId.STATS}?${saveState(state)}`;
    });
  }

  static changeLocation(id, state) {
    location.hash = `${id}?${saveState(state)}`;
  }

}
