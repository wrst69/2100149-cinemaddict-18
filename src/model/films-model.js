import { generateFilm } from '../mock/film.js';
const filmsCount = 5;

export default class FilmsModel {
  #films = Array.from({ length: filmsCount }, generateFilm);

  get films() {
    return this.#films;
  }
}
