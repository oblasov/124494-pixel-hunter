import assert from 'assert';

import {Config} from '../data/game-data.js';

import Timer from './timer.js';


describe(`game`, () => {
  describe(`Timer`, () => {

    it(`should allow to enter valid data`, () => {
      assert(typeof (new Timer(Config.TIMER).value) === `number`);
    });

    it(`should set time, during which the timer will work`, () => {
      assert.strictEqual((new Timer(10).value), 10);
    });

    it(`method tick() decreases the timer by one`, () => {
      const timer = new Timer(Config.TIMER);
      assert.strictEqual(timer.value - 1, timer.tick().value);
    });

    it(`the timer should announce that it is finished`, () => {
      // флаг, закончен ли таймер
      let isExpired = false;
      // создаем таймер с нулевым значением
      const timer = new Timer(0);
      // передаем коллбек при окончании таймера
      timer.onExpire = () => {
        isExpired = true;
      };
      // обновляем таймер
      timer.tick();

      assert(isExpired);
    });
  });

});
