import App from './application';
import {adapt} from './data/game-data';
import Loader from './loader';
import ScreenSplash from './screens/screen-splash';

import {renderScreen} from './render-screen';

const splash = new ScreenSplash();
renderScreen(splash.getMarkup());
splash.start();

// получаем данные и инициализируем наше приложение
Loader.loadData().then(adapt).then((gameData) => App.init(gameData)).then(() => splash.stop()).catch(window.console.error);
