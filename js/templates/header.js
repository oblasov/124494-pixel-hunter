import {Config, user} from '../data/game-data.js';

/**
 * Возвращает шаблон header
 * @param {Object} data
 * @return {string}
 */
export default (data) => {

  const gamePanel = data ? `
      <h1 class="game__timer">NN</h1>
      <div class="game__lives">
        ${new Array(Config.LIVES - user.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
        ${new Array(user.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      </div>` : ``;


  return `

    <header class="header">
    
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      
      ${gamePanel}
      
    </header>`;

};
