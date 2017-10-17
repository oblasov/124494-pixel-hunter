import assert from 'assert';

import {startConfigs} from '../data/game-data.js';

import {Timer} from './game.js';


describe(`game`, () => {
  describe(`Timer`, () => {

    it(`should allow to enter valid data`, () => {
      assert(typeof (new Timer(startConfigs.timer).value) === `number`);
    });

    it(`should set time, during which the timer will work`, () => {
      assert.strictEqual((new Timer(10).value), 10);
    });

    it(`method tick() decreases the timer by one`, () => {
      assert.strictEqual((new Timer(startConfigs.timer).tick().value), new Timer(startConfigs.timer).value - 1);
    });

    it(`the timer should announce that it is finished`, () => {
      // флаг, закончен ли таймер
      let isExpired = false;
      // создаем таймер с нулевым значение
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
