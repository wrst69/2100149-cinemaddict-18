import { RenderPosition, render, remove} from '../framework/render.js';
import { sortByDate, sortByRating } from '../utils.js';
import { filter } from '../filter-utils.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import FilmPresenter from './film-presenter.js';
import { filterPresenter } from '../main.js';
import SortView from '../view/sort-view.js';
import FilmBoardView from '../view/films-board-view.js';
import NoFilmsView from '../view/no-film-view.js';
import FilmListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #container = null;
  #filmsModel = null;
  #filtersModel = null;
  #commentsModel = null;
  #filmBoard = null;
  #filmsContainer = null;
  #filterComponent = null;
  #sortComponent = null;
  #showMoreButtonComponent = null;
  #currentSortType = SortType.DEFAULT;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresenter = new Map();

  constructor(container, filmsModel, filtersModel, commentsModel) {
    this.#container = container;

    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filtersModel.filter;
    const sortType = this.#currentSortType;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[filterType](films);

    switch (sortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderFilmBoard();
    this.#renderFilmsContainer();
  };

  #renderFilmBoard = () => {
    this.#filmBoard = new FilmBoardView();
    render(this.#filmBoard, this.#container);
    this.#filmBoard = this.#filmBoard.element.lastElementChild;
  };

  #renderSort = () => {
    this.#filterComponent = document.querySelector('.main-navigation');

    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#filterComponent, RenderPosition.AFTEREND);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsContainer({ resetRenderedFilmsCount: true });
    this.#renderSort();
    this.#renderFilmsContainer();
  };

  #renderFilmsContainer = () => {
    const films = this.films;
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this.#filmsContainer = new NoFilmsView();
      render(this.#filmsContainer, this.#filmBoard);
      return;
    }

    this.#filmsContainer = new FilmListView();
    render(this.#filmsContainer, this.#filmBoard);

    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)));

    this.#renderSort();

    if (filmsCount > this.#renderedFilmsCount) {
      this.#renderShowMoreButtonComponent();
    }
  };

  #clearFilmsContainer = ({ resetRenderedFilmsCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#filmsContainer);
    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmsCount) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsContainer, this.#commentsModel, this.#handleViewAction);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderShowMoreButtonComponent = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this.#filmBoard);
  };

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);

    this.#renderFilms(films);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleViewAction = (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, updateFilm);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, updateComment);
        this.#filmsModel.updateFilm(updateType, updateFilm);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, updateFilm);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        filterPresenter.init();
        if (document.querySelector('.film-details')) {
          break;
        }
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        if (document.querySelector('.film-details')) {
          break;
        }
        filterPresenter.init();
        this.#clearFilmsContainer({ resetRenderedFilmsCount: false, resetSortType: false });
        this.#renderFilmsContainer();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsContainer({ resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderFilmsContainer();
        break;
    }
  };
}
