import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

export default class FilmPresenter {
  #film = null;
  #filmsContainer = null;
  #filmComponent = null;
  #popupComponent = null;
  #changeData = null;

  constructor(filmsContainer, changeData) {
    this.#filmsContainer = filmsContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    const onFilmCardClickHandler = () => {
      const removePopup = () => {
        remove(this.#popupComponent);
        document.body.classList.remove('hide-overflow');
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          removePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      removePopup();
      this.#popupComponent = new PopupView(film);

      document.addEventListener('keydown', onEscKeyDown);

      const onPopupCloseButtonClickHandler = () => {
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      };

      this.#popupComponent.setCloseButtonClickHandler(onPopupCloseButtonClickHandler);
      this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
      this.#popupComponent.setHistoryClickHandler(this.#handleHistoryClick);
      this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

      document.body.classList.add('hide-overflow');
      document.body.appendChild(this.#popupComponent.element);
    };

    this.#filmComponent = new FilmCardView(film);
    this.#filmComponent.setClickHandler(onFilmCardClickHandler);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setHistoryClickHandler(this.#handleHistoryClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null ) {
      render(this.#filmComponent, this.#filmsContainer);
    } else {
      if (this.#filmsContainer.contains(prevFilmComponent.element)) {
        replace(this.#filmComponent, prevFilmComponent);
      }

      remove(prevFilmComponent);
      remove(prevPopupComponent);
    }
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  #handleWatchlistClick = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(this.#film);
  };

  #handleHistoryClick = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(this.#film);
  };
}
