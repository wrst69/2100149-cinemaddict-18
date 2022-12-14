import { generateFilm } from '../mock/film.js';
const FILMS_COUNT = 14;

export default class FilmsModel {
  #films = Array.from({ length: FILMS_COUNT }, generateFilm);

  get films() {
    return this.#films;
  }
}
