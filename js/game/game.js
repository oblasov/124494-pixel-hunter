/**
 * @param {number} value
 * @constructor
 */
export const Timer = function (value = 0) {
  this.value = value;
};

Timer.prototype.tick = function () {
  if (this.value > 0) {
    this.value--;
  }

  if (this.value <= 0) {
    this._onExpire();
  }

  return this;
};

Timer.prototype.start = function () {
  this._idInterval = setInterval(() => {
    this.tick();
  }, 1000);

};

/**
 * @private
 */
Timer.prototype._onExpire = function () {
  clearInterval(this._idInterval);
  // Вызываем коллбэк
  if (typeof this.onExpire === `function`) {
    this.onExpire();
  }
};

/**
 * @type {?Function}
 */
Timer.prototype.onExpire = null;
