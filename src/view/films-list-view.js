import { createElement } from '../render.js';

const createFilmsListView = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
  </section>`
);

export default class FilmListView {
  #element = null;

  get template() {
    return createFilmsListView();
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
