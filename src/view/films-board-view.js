import AbstractView from '../framework/view/abstract-view.js';

const createFilmsBoardView = () => '<section class="films"></section>';

export default class FilmBoardView extends AbstractView {
  get template() {
    return createFilmsBoardView();
  }
}
