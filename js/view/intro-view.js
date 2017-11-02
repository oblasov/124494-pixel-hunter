import AbstractView from './abstract-view';
import getFooter from '../templates/footer.js';

/**
 * Класс отрисовки главного экрана
 * @constructor
 */
export default class GreetingView extends AbstractView {
  get template() {

    return `

    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
    
    ${getFooter()}
    
    `;

  }

  bind() {
    const intro = this.element;
    const nextButton = intro.querySelector(`.intro__asterisk`);
    // Экран приветствия, блок #greeting, должен показываться по нажатию на символ звёздочки, элемент .intro__asterisk на главном экране

    nextButton.addEventListener(`click`, () => {
      this.onNextButtonClick();
    });
  }

  onNextButtonClick() {

  }

}
