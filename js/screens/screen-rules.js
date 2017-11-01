import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenGame from './screen-game.js';

import screenGreeting from './screen-greeting.js';

import getTemplate from '../templates/rules.js';

export default () => {
  /**
   * 3. Экран правил игры, блок #rules.
   * @type {Element}
   */
  const element = getElementFromTemplate(getTemplate());

  // Экран первой игры, блок #game-1, должен показываться по отправке формы на экране правил игры.
  // Кнопка отправки .rules__button.
  const form = element.querySelector(`.rules__form`);
  const input = element.querySelector(`.rules__input`);
  const btn = element.querySelector(`.rules__button`);

  input.addEventListener(`keyup`, () => {
    // Кнопка отправки должна быть отключена, disabled, пока в поле с именем игрока ничего не введено.
    btn.disabled = !input.value;
  });

  form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    screenGame();
  });


  // Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
  const backBtn = element.querySelector(`.header__back .back`);
  backBtn.addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return element;

};
