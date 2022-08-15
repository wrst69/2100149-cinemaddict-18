import { createElement } from '../render.js';

const createFilmsBoardView = () => '<section class="films"></section>';

export default class FilmBoardView {
  getTemplate() {
    return createFilmsBoardView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
