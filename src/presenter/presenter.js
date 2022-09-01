import NavigationView from '../view/navigation-view.js';
import FilterView from '../view/filter-view.js';
import FilmBoardView from '../view/films-board-view.js';
import FilmListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import NoFilmsView from '../view/no-film-view.js';
import { render } from '../render.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #filmBoard = null;
  #filmsContainer = null;
  #filmsModel = null;
  #filmsList = null;
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  init = (container, filmsModel) => {
    this.#filmBoard = new FilmBoardView();
    this.#filmsContainer = new FilmListView();
    this.#filmsModel = filmsModel;
    this.#filmsList = [...this.#filmsModel.films];

    render(new NavigationView(), container);
    render(new FilterView(), container);
    render(this.#filmBoard, container);

    if (this.#filmsList.length === 0) {
      this.#filmsContainer = new NoFilmsView();
      render(this.#filmsContainer, this.#filmBoard.element);
    } else {
      this.#filmsContainer = new FilmListView();
      render(this.#filmsContainer, this.#filmBoard.element);

      this.#filmsContainer = this.#filmsContainer.element.lastElementChild;

      for (let i = 0; i < Math.min(this.#filmsList.length, FILMS_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#filmsList[i]);
      }

      if (this.#filmsList.length > FILMS_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmBoard.element.lastElementChild);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    }
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#filmsList
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#filmsList.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardView(film);

    filmComponent.element.addEventListener('click', () => {
      const popupComponent = new PopupView(film);

      const removePopup = () => {
        document.body.removeChild(popupComponent.element);
        document.body.classList.remove('hide-overflow');
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          removePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      document.addEventListener('keydown', onEscKeyDown);

      popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      document.body.classList.add('hide-overflow');
      document.body.appendChild(popupComponent.element);
    });
    render(filmComponent, this.#filmsContainer);
  };
}
