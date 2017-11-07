import AbstractView from '../view/abstract-view';


export default class SplashScreen extends AbstractView {
  constructor() {
    super();
    this.cursor = 0;
    this.interval = 50;
    this.symbolsSeq = `/—\\|`;
  }

  get template() {
    return `<div></div>`;
  }

  showError(errorMessage) {
    this.element.textContent = errorMessage;
  }

  start() {
    this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
    this.element.textContent = this.symbolsSeq[this.cursor];
    this.timeout = setTimeout(() => this.start(), this.interval);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
