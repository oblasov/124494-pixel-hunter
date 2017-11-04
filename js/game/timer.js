const TIMER_EXPIRED_VALUE = 0; // значение истчекшего таймера
const TIMER_BLINKED_VALUE = 5; // значение истчекшего таймера
const TIMER_BLINKED_INTERVAL = 500; // периодичность мигания таймера

/**
 * @param {number} value
 * @constructor
 */
class Timer {
  constructor(value = 0) {
    this.value = value;

    /**
     * @type {?Function}
     */
    this.onExpire = null;

    /**
     * @type {?Function}
     */
    this.onChange = null;
  }

  tick() {
    if (this.value > TIMER_EXPIRED_VALUE) {
      this.value--;
      // мигание таймера при его истечении
      if (this.value <= TIMER_BLINKED_VALUE) {
        this._startBlinking();
      }
    }
    // таймер истек
    if (this.value <= TIMER_EXPIRED_VALUE) {
      this._onExpire();
    }

    // коллбек об изменении
    this._onChange();
    return this;
  }

  start() {
    this._stopBlinking();
    this._idInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    this._stopBlinking();
    clearInterval(this._idInterval);
    // коллбек об изменении
    this._onChange();
  }

  /**
   * @private
   */
  _onExpire() {
    this._stopBlinking();
    clearInterval(this._idInterval);
    // Вызываем коллбэк
    if (typeof this.onExpire === `function`) {
      this.onExpire();
    }
  }

  /**
   * @param {number} value
   * @private
   */
  _onChange(value = this.value) {
    // Вызываем коллбэк
    if (typeof this.onChange === `function`) {
      this.onChange(value);
    }
  }

  /**
   * Таймер начинает мигать
   * @private
   * @return {boolean}
   */
  _startBlinking() {
    if (typeof this._idBlinkInterval === `number`) {
      return false;
    }
    let visible = false;
    this._idBlinkInterval = setInterval(() => {
      this._onChange((visible) ? this.value : ``);
      visible = !visible;
    }, TIMER_BLINKED_INTERVAL);
    return true;
  }

  /**
   * Остановить мигание таймера
   * @private
   */
  _stopBlinking() {
    clearInterval(this._idBlinkInterval);
    this._idBlinkInterval = null;
    // коллбек об изменении
    this._onChange();
  }

}

export default Timer;
