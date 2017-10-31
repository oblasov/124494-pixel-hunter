/**
 * Возвращает шаблон вопросов для игрового экрана
 * @param {Object} screen
 * @return {string}
 */
export default (screen) => {
  return screen.questions.reduce((str, question, index) => {
    str += `        
        <div class="game__option">
          <img src="${question.img}" alt="Option ${index + 1}" width="${screen.imgWidth}" height="${screen.imgHeight}">
          
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

    return str;
  }, ``);
};
