import App from './application';
import {initState} from './data/state';

// инициализируем наше приложение
App.init();
// отрисовываем первый экран
App.showIntro(initState());
