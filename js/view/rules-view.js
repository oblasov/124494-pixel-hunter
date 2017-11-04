import AbstractView from './abstract-view';
import getHeader from '../templates/header';
import getFooter from '../templates/footer';

/**
 * Класс отрисовки экрана правил
 * @constructor
 */
export default class GreetingView extends AbstractView {
  get template() {

    return `
    
    ${getHeader()}
    
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    
    ${getFooter()}
    
    `;

  }

  bind() {
    const rules = this.element;
    // Экран первой игры, блок #game-1, должен показываться по отправке формы на экране правил игры.
    // Кнопка отправки .rules__button.
    const form = rules.querySelector(`.rules__form`);
    const input = rules.querySelector(`.rules__input`);
    const btn = rules.querySelector(`.rules__button`);
    const backBtn = rules.querySelector(`.header__back .back`);

    input.addEventListener(`keyup`, () => {
      // Кнопка отправки должна быть отключена, disabled, пока в поле с именем игрока ничего не введено.
      btn.disabled = !input.value.trim();
    });

    form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      this.onSubmit(input.value);
    });


    // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
    backBtn.addEventListener(`click`, () => {
      this.onBackButtonClick();
    });

  }

  onBackButtonClick() {

  }

  onSubmit() {

  }
}
