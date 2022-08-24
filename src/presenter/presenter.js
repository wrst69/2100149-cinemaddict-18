import NavigationView from '../view/navigation-view.js';
import FilterView from '../view/filter-view.js';
import FilmBoardView from '../view/films-board-view.js';
import FilmListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import { render } from '../render.js';

export default class MainPresenter {
  #filmBoard = null;
  #filmsContainer = null;
  #filmsModel = null;
  #filmsList = null;

  init = (container, filmsModel) => {
    this.#filmBoard = new FilmBoardView();
    this.#filmsContainer = new FilmListView();
    this.#filmsModel = filmsModel;
    this.#filmsList = [...this.#filmsModel.films];

    render(new NavigationView(), container);
    render(new FilterView(), container);
    render(this.#filmBoard, container);
    render(this.#filmsContainer, this.#filmBoard.element);
    for (let i = 0; i < this.#filmsList.length; i++) {
      this.#renderFilm(this.#filmsList[i]);
    }
    render(new ShowMoreButtonView(), this.#filmBoard.element.lastElementChild);
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardView(film);

    filmComponent.element.addEventListener('click', () => {
      const popupComponent = new PopupView(film);

      const removePopup = () => {
        document.querySelector('body').removeChild(popupComponent.element);
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

      document.body.appendChild(popupComponent.element);
    });

    render(filmComponent, this.#filmsContainer.element.lastElementChild);
  };
}
