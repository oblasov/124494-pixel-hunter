import assert from 'assert';

import {startConfigs, countUserScore} from '../data/game-data.js';

describe(`gameData`, () => {
  describe(`getUserAnswers`, () => {

    const normalAnswers = [
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`},
      {correct: true, speed: `normal`}
    ];

    const badAnswers = [
      {correct: true, speed: `slow`},
      {correct: true, speed: `slow`},
      {correct: false, speed: `slow`},
      {correct: true, speed: `slow`},
      {correct: true, speed: `slow`},
      {correct: false, speed: `slow`},
      {correct: true, speed: `slow`},
      {correct: true, speed: `slow`},
      {correct: true, speed: `slow`},
      {correct: false, speed: `slow`}
    ];

    const bestAnswers = [
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`},
      {correct: true, speed: `fast`}
    ];

    it(`should allow to enter valid data`, () => {
      assert(typeof countUserScore(normalAnswers, startConfigs.lives) === `number`);
    });

    it(`should return -1, if user didn't answer all 10 questions`, () => {
      assert.strictEqual(countUserScore([], startConfigs.lives), -1);
      assert.strictEqual(countUserScore(normalAnswers.slice(0, 9), startConfigs.lives), -1);
    });

    it(`should return 1150, if user gave all answers with normal speed and saved all lives`, () => {
      assert.strictEqual(countUserScore(normalAnswers, startConfigs.lives), 1150);
    });

    it(`should return 350, if user gave all answers with slow speed and lost all lives`, () => {
      assert.strictEqual(countUserScore(badAnswers, 0), 350);
    });

    it(`should return 1650, if user gave all answers with fast speed and saved all lives`, () => {
      assert.strictEqual(countUserScore(bestAnswers, 3), 1650);
    });

    it(`should deal with corner cases correctly`, () => {
      assert(!countUserScore(``, startConfigs.lives));
      assert(!countUserScore(null, startConfigs.lives));
      // assert(!countUserScore(undefined, startConfigs.lives));

      assert(!countUserScore(normalAnswers, ``));
      assert(!countUserScore(normalAnswers, null));
      // assert(!countUserScore(normalAnswers, undefined));
    });

    it(`should deal with invalid data`, () => {
      assert(!countUserScore(0, startConfigs.lives));
      assert(!countUserScore(1, startConfigs.lives));
      assert(!countUserScore(true, startConfigs.lives));
      assert(!countUserScore(`string`, startConfigs.lives));

      assert(!countUserScore(normalAnswers, true));
      assert(!countUserScore(normalAnswers, {}));
      assert(!countUserScore(normalAnswers, []));
      assert(!countUserScore(normalAnswers, `string`));
    });

  });

});
