//import {getElementFromTemplate} from '../model.js';

import {getElementFromTemplate, renderScreen} from '../render-screen.js';

import screenGame1 from './screen-game-1.js';

import screenGreeting from './screen-greeting.js';

/**
 * 3. Экран правил игры, блок #rules.
 * @type {Element}
 */
const element = getElementFromTemplate(`
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
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
    <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>`);

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
  renderScreen(screenGame1);
});


// Нажатие на кнопку «Назад» в левом верхнем углу должно с любого экрана возвращать на экран приветствия.
const backBtn = element.querySelector(`.header__back .back`);
backBtn.addEventListener(`click`, () => {
  renderScreen(screenGreeting);
});

export default element;
