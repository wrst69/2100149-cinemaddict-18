import { UserAction, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

export default class FilmPresenter {
  #film = null;
  #filmsContainer = null;
  #filmComponent = null;
  #popupComponent = null;

  #commentsModel = null;
  #comments = null;

  #changeData = null;

  constructor(filmsContainer, commentsModel, changeData) {
    this.#filmsContainer = filmsContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;
    this.#comments = this.#commentsModel.get(this.#film);

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    const setFilmHandlers = () => {
      const onFilmCardClickHandler = () => {
        const removePopup = () => {
          remove(this.#popupComponent);
          document.body.classList.remove('hide-overflow');
          this.init(this.#film);
        };

        const onEscKeyDown = (evt) => {
          if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            removePopup();
            document.removeEventListener('keydown', onEscKeyDown);
          }
        };

        const onCommandEnterKeyDown = (evt) => {

          if (evt.key === 'Enter' && evt.key === 'Meta') {
            console.log(evt.target);
            evt.preventDefault();
            //removePopup();
            //document.removeEventListener('keydown', onEscKeyDown);
          }
        };

        const onPopupCloseButtonClickHandler = () => {
          removePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        };

        const setPopupHandlers = () => {
          document.addEventListener('keydown', onEscKeyDown);
          document.addEventListener('keydown', onCommandEnterKeyDown);
          this.#popupComponent.setCloseButtonClickHandler(onPopupCloseButtonClickHandler);
          this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
          this.#popupComponent.setHistoryClickHandler(this.#handleHistoryClick);
          this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
          this.#popupComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);
          this.#popupComponent.setSendCommentHandler(this.#handleSendCommentClick);
        };

        if (this.#popupComponent) {
          removePopup();
        }

        this.#popupComponent = new PopupView(this.#film, this.#comments);
        setPopupHandlers();
        document.body.classList.add('hide-overflow');
        document.body.appendChild(this.#popupComponent.element);
      };

      this.#filmComponent.setClickHandler(onFilmCardClickHandler);
      this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
      this.#filmComponent.setHistoryClickHandler(this.#handleHistoryClick);
      this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    };

    this.#filmComponent = new FilmCardView(film);
    setFilmHandlers();

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmsContainer.element);
    } else {
      if (this.#filmsContainer.element.contains(prevFilmComponent.element)) {
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

  #handleDeleteButtonClick = (commentId) => {
    this.#film.comments = this.#film.comments.filter((comment) => comment !== commentId);
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      this.#film,
      this.#comments.find((comment) => comment.id === commentId)
    );
  };

  #handleSendCommentClick = (comment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      this.#film,
      comment
    );
  };

  #handleWatchlistClick = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this.#film);
  };

  #handleHistoryClick = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this.#film);
  };
}
