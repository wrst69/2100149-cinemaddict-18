import { generateFilm } from '../mock/film.js';

export default class FilmsModel {
  filmsCount = 5;
  films = Array.from({ length: this.filmsCount }, generateFilm);

  getFilms = () => this.films;
}
