/**
 * Возвращает шаблон вопросов для игрового экрана
 * @param {Object} screen
 * @return {string}
 */
export default (screen) => {
  const options = screen.questions.map((question, index) => {
    return `        
        <div class="game__option">
          <img src="${question.image.url}" alt="Option ${index + 1}" width="${question.image.width}" height="${question.image.height}">
          
          ${screen.btns ? `
          <label class="game__answer game__answer--photo">
            <input name="question${index + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${index + 1}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>` : ``}
          
        </div>`;
  });

  return options.join(``);

};
