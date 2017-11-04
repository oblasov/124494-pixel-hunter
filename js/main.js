import App from './application';
import {adapt} from './data/game-data';
import Loader from './loader';

// получаем данные и инициализируем наше приложение
Loader.loadData().then(adapt).then((gameData) => App.init(gameData));
