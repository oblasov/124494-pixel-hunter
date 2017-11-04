const URL = `https://es.dump.academy/pixel-hunter/`;

/**
 * Класс загрузчика
 * @constructor
 */
export default class Loader {
  static loadData() {
    return fetch(`${URL}questions`).then((data) => data.json());
  }

  static loadResults(name) {
    return fetch(`${URL}stats/${name}`).then((data) => data.json());
  }

  static saveResults(data, name) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}stats/${name}`, requestSettings);
  }
}
