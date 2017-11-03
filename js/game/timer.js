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
    if (this.value > 0) {
      this.value--;
    }

    if (this.value <= 0) {
      this._onExpire();
    }
    // коллбек об изменении
    this._onChange();
    return this;
  }

  start() {
    this._idInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    clearInterval(this._idInterval);
    // коллбек об изменении
    this._onChange();
  }

  /**
   * @private
   */
  _onExpire() {
    clearInterval(this._idInterval);
    // Вызываем коллбэк
    if (typeof this.onExpire === `function`) {
      this.onExpire();
    }
  }

  /**
   * @private
   */
  _onChange() {
    // Вызываем коллбэк
    if (typeof this.onChange === `function`) {
      this.onChange(this.value);
    }
  }

}

export default Timer;
