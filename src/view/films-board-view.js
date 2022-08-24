import { createElement } from '../render.js';

const createFilmsBoardView = () => '<section class="films"></section>';

export default class FilmBoardView {
  #element = null;

  get template() {
    return createFilmsBoardView();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
