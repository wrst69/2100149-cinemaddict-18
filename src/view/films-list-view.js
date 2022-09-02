import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListView = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
  </section>`
);

export default class FilmListView extends AbstractView {
  get template() {
    return createFilmsListView();
  }
}
