import screenIntro from './screens/screen-intro.js';
import screenGreeting from './screens/screen-greeting.js';
import screenRules from './screens/screen-rules.js';
import screenGame from './screens/screen-game.js';
import screenStats from './screens/screen-stats.js';

/**
 * @constructor
 */
export default class Application {

  static showIntro() {
    screenIntro.init();
  }

  static showGreeting() {
    screenGreeting.init();
  }

  static showRules() {
    screenRules.init();
  }

  static showGame() {
    screenGame.init();
  }

  static showStats() {
    screenStats.init();
  }

}
