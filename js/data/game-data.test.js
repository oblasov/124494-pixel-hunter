import assert from 'assert';

import {Config, countUserScore} from '../data/game-data.js';

describe(`gameData`, () => {
  describe(`getUserAnswers`, () => {

    const normalAnswers = Array(10).fill({correct: true, speed: `normal`});

    const badAnswers = Array(10).fill({correct: true, speed: `slow`}).fill({correct: false, speed: `slow`}, 0, 3);

    const bestAnswers = Array(10).fill({correct: true, speed: `fast`});

    it(`should allow to enter valid data`, () => {
      assert(typeof countUserScore(normalAnswers, Config.LIVES) === `number`);
    });

    it(`should return -1, if user didn't answer all 10 questions`, () => {
      assert.strictEqual(countUserScore([], Config.LIVES), -1);
      assert.strictEqual(countUserScore(normalAnswers.slice(0, 9), Config.LIVES), -1);
    });

    it(`should return 1150, if user gave all answers with normal speed and saved all lives`, () => {
      assert.strictEqual(countUserScore(normalAnswers, Config.LIVES), 1150);
    });

    it(`should return 350, if user gave all answers with slow speed and lost all lives`, () => {
      assert.strictEqual(countUserScore(badAnswers, 0), 350);
    });

    it(`should return 1650, if user gave all answers with fast speed and saved all lives`, () => {
      assert.strictEqual(countUserScore(bestAnswers, 3), 1650);
    });

    it(`should deal with corner cases correctly`, () => {
      assert(!countUserScore(``, Config.LIVES));
      assert(!countUserScore(NaN, Config.LIVES));
      assert(!countUserScore({}, Config.LIVES));
      assert(!countUserScore(null, Config.LIVES));
      assert(!countUserScore(void (0), Config.LIVES));

      assert(!countUserScore(normalAnswers, ``));
      assert(!countUserScore(normalAnswers, NaN));
      assert(!countUserScore(normalAnswers, {}));
      assert(!countUserScore(normalAnswers, null));
      assert(!countUserScore(normalAnswers, void (0)));
    });

    it(`should deal with invalid data`, () => {
      assert(!countUserScore(0, Config.LIVES));
      assert(!countUserScore(1, Config.LIVES));
      assert(!countUserScore(true, Config.LIVES));
      assert(!countUserScore(`string`, Config.LIVES));

      assert(!countUserScore(normalAnswers, true));
      assert(!countUserScore(normalAnswers, {}));
      assert(!countUserScore(normalAnswers, []));
      assert(!countUserScore(normalAnswers, `string`));
    });

  });

});
