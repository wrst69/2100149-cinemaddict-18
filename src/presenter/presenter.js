import { generateFilteredFilms } from '../mock/filter.js';
import { RenderPosition, render, remove} from '../framework/render.js';
import { updateItem, sortByDate, sortByRating} from '../utils.js';
import { SortType } from '../const.js';
import NavigationView from '../view/navigation-view.js';
import FilterView from '../view/filter-view.js';
import FilmBoardView from '../view/films-board-view.js';
import FilmListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmsView from '../view/no-film-view.js';
import FilmPresenter from './film-presenter.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #container = null;
  #filmBoard = new FilmBoardView();
  #filmsContainer = null;
  #filmsList = null;
  #filmsNavigation = null;
  #sortComponent = new FilterView();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilmsList = [];
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresenter = new Map();

  constructor(container) {
    this.#container = container;
  }

  init = (filmsModel) => {
    this.#filmsList = [...filmsModel.films];
    this.#sourcedFilmsList = [...filmsModel.films];
    this.#renderFilmBoard();
    this.#renderFilmsContainer();
    this.#renderNavigation();
    this.#renderFilms();
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#sourcedFilmsList = updateItem(this.#sourcedFilmsList, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    this.#renderNavigation();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilms();
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#filmsList.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#filmsList.sort(sortByRating);
        break;
      default:
        this.#filmsList = [...this.#sourcedFilmsList];
    }

    this.#currentSortType = sortType;
  };

  #renderFilmBoard = () => {
    render(this.#filmBoard, this.#container);
  };

  #renderFilters = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilmsContainer = () => {
    if (this.#filmsList.length === 0) {
      this.#filmsContainer = new NoFilmsView();
      render(this.#filmsContainer, this.#filmBoard.element);
    } else {
      this.#renderFilters();
      this.#filmsContainer = new FilmListView();
      render(this.#filmsContainer, this.#filmBoard.element);
    }

    this.#filmsContainer = this.#filmsContainer.element.lastElementChild;
  };

  #renderNavigation = () => {
    const filteredFilms = generateFilteredFilms(this.#filmsList);
    if (this.#filmsNavigation) {
      remove(this.#filmsNavigation);
    }
    this.#filmsNavigation = new NavigationView(filteredFilms);
    render(this.#filmsNavigation, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsContainer, this.#handleFilmChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = () => {
    this.#filmsList
      .slice(0, FILMS_COUNT_PER_STEP)
      .forEach((item) => {
        this.#renderFilm(item);
      });

    if (this.#filmsList.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButtonComponent();
    }
  };

  #renderShowMoreButtonComponent = () => {
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this.#filmBoard.element.lastElementChild);
  };

  #handleShowMoreButtonClick = () => {
    this.#filmsList
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsList.length) {
      remove(this.#showMoreButtonComponent);
    }
  };
}
