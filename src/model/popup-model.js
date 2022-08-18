import { generateFilm } from '../mock/film.js';

export default class PopupModel {
  film = generateFilm();

  getFilm = () => this.film;
}
