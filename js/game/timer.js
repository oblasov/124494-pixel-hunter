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

    if (this.value <= 5) {
      this._startBlinking();
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
    this._stopBlinking();
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
    if (this._idBlinkInterval) {
      return false;
    }
    let visible = false;
    this._idBlinkInterval = setInterval(() => {
      this._onChange((visible) ? this.value : ``);
      visible = !visible;
    }, 300);
    return true;
  }

  /**
   * Остановить мигание таймера
   * @private
   */
  _stopBlinking() {
    clearInterval(this._idBlinkInterval);
    // коллбек об изменении
    this._onChange();
  }

}

export default Timer;
