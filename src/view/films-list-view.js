import { createElement } from '../render.js';

const createFilmsListView = () => (
  `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
);

export default class FilmListView {
  getTemplate() {
    return createFilmsListView();
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
