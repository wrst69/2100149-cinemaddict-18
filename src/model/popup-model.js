import { generateFilm } from '../mock/film.js';

export default class PopupModel {
  #film = generateFilm();

  get film() {
    return this.#film;
  }
}
