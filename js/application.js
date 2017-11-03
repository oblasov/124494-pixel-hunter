import screenIntro from './screens/screen-intro.js';
import screenGreeting from './screens/screen-greeting.js';
import screenRules from './screens/screen-rules.js';
import screenGame from './screens/screen-game.js';
import screenStats from './screens/screen-stats.js';
import {initState} from './data/state';
/**
 * @constructor
 */
export default class Application {

  static showIntro() {
    screenIntro.init();
  }

  static showGreeting() {
    // сбрасываем состояние игры на изначальное
    screenGreeting.init(initState());
  }

  static showRules(state) {
    screenRules.init(state);
  }

  static showGame(state) {
    screenGame.init(state);
  }

  static showStats(state) {
    screenStats.init(state);
  }

}
