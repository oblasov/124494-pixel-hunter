/**
 * Контейнер для отрисовки экрана
 * @type {Element}
 */
const container = document.querySelector(`.central`);

/**
 * Очистка контейнера экранов
 */
const clearContainer = () => {
  container.innerHTML = ``;
};

/**
 * Отрисовка переданного экрана
 * @param {Element} element
 */
export const renderScreen = (element) => {
  clearContainer();
  container.appendChild(element);
};


/**
 * @param {String} html
 * @return {Element}
 */
export const getElementFromTemplate = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};
