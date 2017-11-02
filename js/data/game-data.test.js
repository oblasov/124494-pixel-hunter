import assert from 'assert';

import {Config, countStats, AnswerType} from '../data/game-data.js';

describe(`gameData`, () => {
  describe(`getUserAnswers`, () => {

    const normalAnswers = Array(10).fill({correct: true, speed: `normal`, type: AnswerType.CORRECT});

    const badAnswers = Array(10).fill({correct: true, speed: `slow`, type: AnswerType.SLOW});
    badAnswers.fill({correct: false, speed: `slow`, type: AnswerType.SLOW}, 0, 3);

    const bestAnswers = Array(10).fill({correct: true, speed: `fast`, type: AnswerType.FAST});

    it(`should allow to enter valid data`, () => {
      assert(typeof (countStats(normalAnswers, Config.LIVES).total) === `number`);
    });

    it(`should return -1, if user didn't answer all 10 questions`, () => {
      assert.strictEqual(countStats([], Config.LIVES), -1);
      assert.strictEqual(countStats(normalAnswers.slice(0, 9), Config.LIVES), -1);
    });

    it(`should return 1150, if user gave all answers with normal speed and saved all lives`, () => {
      assert.strictEqual(countStats(normalAnswers, Config.LIVES).total, 1150);
    });

    it(`should return 350, if user gave all answers with slow speed and lost all lives`, () => {
      assert.strictEqual(countStats(badAnswers, 0).total, 350);
    });

    it(`should return 1650, if user gave all answers with fast speed and saved all lives`, () => {
      assert.strictEqual(countStats(bestAnswers, 3).total, 1650);
    });

    it(`should deal with corner cases correctly`, () => {
      assert(!countStats(``, Config.LIVES));
      assert(!countStats(NaN, Config.LIVES));
      assert(!countStats({}, Config.LIVES));
      assert(!countStats(null, Config.LIVES));
      assert(!countStats(void (0), Config.LIVES));

      assert(!countStats(normalAnswers, ``));
      assert(!countStats(normalAnswers, NaN));
      assert(!countStats(normalAnswers, {}));
      assert(!countStats(normalAnswers, null));
      assert(!countStats(normalAnswers, void (0)));
    });

    it(`should deal with invalid data`, () => {
      assert(!countStats(0, Config.LIVES));
      assert(!countStats(1, Config.LIVES));
      assert(!countStats(true, Config.LIVES));
      assert(!countStats(`string`, Config.LIVES));

      assert(!countStats(normalAnswers, true));
      assert(!countStats(normalAnswers, {}));
      assert(!countStats(normalAnswers, []));
      assert(!countStats(normalAnswers, `string`));
    });

  });

});
