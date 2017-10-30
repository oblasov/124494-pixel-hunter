import getHeader from './header.js';
import getQuestions from './questions.js';
import getStats from './stats-list.js';
import getFooter from './footer.js';

/**
 * Возвращает шаблон игрового экрана
 * @param {Object} screen
 * @param {Array.<Object>} userAnswers
 * @return {string}
 */
const getGameTemplate = (screen, userAnswers) => {

  return `
    
    ${getHeader(true)}
    
    <div class="game">
      <p class="game__task">${screen.task}</p>
      
      <form class="game__content ${ screen.type ? screen.type : ``}">
      
        ${getQuestions(screen)}
        
      </form>
      
      <div class="stats">
      ${getStats(userAnswers)}
      </div>
      
    </div>
    
    ${getFooter()}
    
    `;
};

export default getGameTemplate;
