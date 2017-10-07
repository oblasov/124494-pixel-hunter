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
const renderScreen = (element) => {
  clearContainer();
  container.appendChild(element);
};


export default renderScreen;
