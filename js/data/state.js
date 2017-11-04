import {Config, AnswerType} from '../data/game-data';

/**
 * Состояние игры
 * @type {{lives: (Config|number), time: (Config|number), userName: string, answers: Array}}
 */
const state = {
  userLives: Config.LIVES, // Текущее количество жизней игрока
  time: Config.TIMER,
  userName: ``,
  userAnswers: [],
  gameScreenNum: 0
};

/**
 * Начальное состояние игры
 * @return {Object}
 */
export const initState = () => {
  return Object.assign({}, state);
};

/**
 * Добавление ответа в список
 * @param {boolean} correct
 * @param {number} time
 * @param {Object} prevState
 * @return {Object}
 */
export const addAnswer = (correct, time, prevState) =>{
  let newState = Object.assign({}, prevState);

  let type = ``;
  if (correct) {
    if (time >= 20) {
      type = AnswerType.FAST;
    } else if (time < 10) {
      type = AnswerType.SLOW;
    } else {
      type = AnswerType.CORRECT;
    }
  } else {
    type = AnswerType.WRONG;
    newState = setLives(newState, newState.userLives--);
  }

  newState.userAnswers = [...newState.userAnswers, {correct, speed: time, type}];

  return newState;
};

/**
 * Устанавливает количество жизней
 * @param {Object} prevState
 * @param {number} userLives
 * @return {Object}
 */
export const setLives = (prevState, userLives) => {
  const newState = Object.assign({}, prevState);
  newState.lives = userLives;
  return newState;
};

/**
 * Устанавливает следующий номер игрового экрана
 * @param {Object} prevState
 * @return {Object}
 */
export const nextGameScreen = (prevState) => {
  const newState = Object.assign({}, prevState);
  newState.gameScreenNum++;
  return newState;
};

/**
 * Устанавливает имя пользователя
 * @param {string} userName
 * @param {Object} prevState
 * @return {Object}
 */
export const setUserName = (userName, prevState) => {
  const newState = Object.assign({}, prevState);
  newState.userName = userName.trim();
  return newState;
};
