/**
 * Массив всех экранов
 * @type {Array}
 */
let screens = [];

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
 * Сохранение шаблонов экранов в массив screens
 */
const getScreens = () => {
  screens = screensIds.map((screenId, i) => {
    let element;
    // главный экран уже отрисован
    if (i === 0) {
      // создаем его шаблон
      element = document.createDocumentFragment();
      Array.from(container.children).forEach((elem) => {
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
    return element;
  });
};

/**
 * Очистка контейнера экранов
 */
const clearContainer = () => {
  container.innerHTML = ``;
};

/**
 * Отрисовка экрана по его порядковому номеру
 * @param {number} screenNum
 */
const renderScreen = (screenNum = currentScreen) => {
  const screen = screens[screenNum].cloneNode(true);
  clearContainer();
  container.appendChild(screen);
  // сохраняем номер текущего экрана
  currentScreen = screenNum;
};

/**
 * Отрисовываем предыдущий экран
 */
const prevScreen = () => {
  if (currentScreen - 1 < 0) {
    return;
  }
  currentScreen--;
  renderScreen();
};

/**
 * Отрисовываем следующий экран
 */
const nextScreen = () => {
  if (currentScreen + 1 >= screens.length) {
    return;
  }
  currentScreen++;
  renderScreen();
};

document.addEventListener(`keydown`, (e) => {
  e.preventDefault();

  // Если ALt не нажат
  if (!e.altKey) {
    return;
  }

  switch (e.key) {
    // Нажата стрелка влево
    case `ArrowLeft`:
      // пытаемся отрисовать предыдущий экран
      prevScreen();
      break;
    // Нажата стрелка вправо
    case `ArrowRight`:
      // пытаемся отрисовать следующий экран
      nextScreen();
      break;
  }

});

// получаем экраны
getScreens();

// отрисовываем первый экран
renderScreen(0);
