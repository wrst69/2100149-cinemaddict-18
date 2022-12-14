import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createFilterView = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button data-sort-type="${SortType.DEFAULT}" sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class FilterView extends AbstractView {
  get template() {
    return createFilterView();
  }


  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
