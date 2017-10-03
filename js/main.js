/**
 * Массив всех экранов
 * @type {Array}
 */
const screens = [];

/**
 * Контейнер для отрисовки экрана
 * @type {Element}
 */
const container = document.querySelector(`.central`);

/**
 *
 * @type {[string]}
 */
const screensIds = [
  `main`,
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`
];

/**
 * Номер текущего, отрисованного экрана
 * @type {number}
 */
let currentScreen = 0;

/**
 * список keyCode для событий нажатия клавиш
 * @enum {number}
 */
const Keys = {
  ALT: 18,
  LEFT: 37,
  RIGHT: 39
};

/**
 * Сохранение шаблонов экранов в массив screens
 */
function getScreens() {
  screensIds.forEach(function (screenId) {
    let element;
    // главный экран уже отрисован
    if (screenId === screensIds[0]) {
      element = document.createDocumentFragment();
      Array.from(container.children).forEach(function (elem) {
        element.appendChild(elem);
      });
    // остальные экраны берем из шаблонов
    } else {
      const template = document.querySelector(`#${screenId}`);
      if (`content` in template) {
        element = template.content.cloneNode(true);
      } else {
        element = template.cloneNode(true);
      }
    }
    screens.push(element);
  });
}

/**
 * Очистка контейнера экранов
 */
function clearContainer() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Отрисовка экрана по его порядковому номеру
 * @param {number} screenNum
 */
function renderScreen(screenNum) {
  if (typeof (screenNum) !== `number`) {
    screenNum = currentScreen;
  } else {
    currentScreen = screenNum;
  }
  const screen = screens[currentScreen].cloneNode(true);
  clearContainer();
  container.appendChild(screen);
}

/**
 * Отрисовываем предыдущий экран
 */
function prevScreen() {

  let screenNum = currentScreen - 1;

  if (screenNum < 0) {
    return;
  }
  currentScreen--;
  renderScreen();
}

/**
 * Отрисовываем следующий экран
 */
function nextScreen() {

  let screenNum = currentScreen + 1;

  if (screenNum >= screens.length) {
    return;
  }
  currentScreen++;
  renderScreen();
}


/**
 * Нажата ли клавиша Alt
 * @type {boolean}
 */
let keyAltIsPressed = false;

document.addEventListener(`keydown`, function (e) {
  e.preventDefault();

  // Нажат Alt
  if (e.keyCode === Keys.ALT) {
    // переключаем флаг
    keyAltIsPressed = true;
  // Нажата стрелка влево
  } else if (e.keyCode === Keys.LEFT) {
    // Если ALt нажат
    if (keyAltIsPressed) {
      // пытаемся отрисовать предыдущий экран
      prevScreen();
    }
  // Нажата стрелка вправо
  } else if (e.keyCode === Keys.RIGHT) {
    // Если ALt нажат
    if (keyAltIsPressed) {
      // пытаемся отрисовать следующий экран
      nextScreen();
    }
  }

});

document.addEventListener(`keyup`, function (e) {
  // Отпущен Alt
  if (e.keyCode === Keys.ALT) {
    // переключаем флаг
    keyAltIsPressed = false;
  }
});

// получаем экраны
getScreens();

// отрисовываем первый экран
renderScreen(0);
