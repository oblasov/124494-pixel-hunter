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
  }

  tick() {
    if (this.value > 0) {
      this.value--;
    }

    if (this.value <= 0) {
      this._onExpire();
    }

    return this;
  }

  start() {
    this._idInterval = setInterval(() => {
      this.tick();
    }, 1000);
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

}

export default Timer;
