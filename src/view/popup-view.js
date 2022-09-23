import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate, humanizeFilmRuntime } from '../utils.js';
import { allComments } from '../mock/comment.js';

const createPopup = (film) => {
  const { comments, filmInfo, checkedEmoji, userComment} = film;
  const currentFilmComments = [];

  allComments.forEach((item) => {
    if (comments.some((comment) => comment === item.id)) {
      currentFilmComments.push(item);
    }
  });

  const generateGenresTemplate = (items) => {
    let genresTemplate = '';
    items.forEach((item) => {
      genresTemplate += `<span class="film-details__genre">${item}</span>`;
    });
    return genresTemplate;
  };

  const generateCommentsTemplate = (items) => {
    const getCommentDate = (commentDate) => {
      const currentDate = dayjs();
      const minuteDifference = currentDate.diff(commentDate, 'minute');
      const hourDifference = currentDate.diff(commentDate, 'hour');
      if (minuteDifference === 0) {
        return 'now';
      }
      else if (minuteDifference < 0) {
        return '';
      } else if (minuteDifference > 0 && minuteDifference < 60) {
        return 'a few minutes ago';
      } else if (hourDifference > 0 && hourDifference < 24) {
        return (hourDifference === 1) ? 'a hour ago' : `${hourDifference} hours ago`;
      } else if (hourDifference >= 24 && hourDifference < 48) {
        return 'yesterday';
      } else {
        return humanizeDate(commentDate, 'YYYY/MM/DD HH:MM');
      }
    };

    let commentsTemplate = '';

    items.forEach((item) => {
      commentsTemplate +=
        `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${item.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${item.author}</span>
            <span class="film-details__comment-day">${getCommentDate(item.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
    });

    return commentsTemplate;
  };

  const generateEmojiButtons = () => {
    const emojis = ['smile', 'sleeping', 'puke', 'angry'];
    let emojisTemplate = '';

    emojis.forEach((emoji) => {
      emojisTemplate +=
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${(checkedEmoji === emoji) ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`;
    });

    return emojisTemplate;
  };

  return (
    `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDate(filmInfo.release.date, 'DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${humanizeFilmRuntime(filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${generateGenresTemplate(filmInfo.genre)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${currentFilmComments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${generateCommentsTemplate(currentFilmComments)}
          </ul>

          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">
              ${(checkedEmoji) ? `<img src="./images/emoji/${checkedEmoji}.png" width="50" height="50">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${(userComment) ? userComment : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              ${generateEmojiButtons()}
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>`);
};

export default class PopupView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = PopupView.parseFilmToState(film);
    this.setInnerHandlers();
  }

  get template() {
    return createPopup(this._state);
  }

  _restoreHandlers = () => {
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setHistoryClickHandler(this._callback.historyClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setInnerHandlers();

  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setHistoryClickHandler = (callback) => {
    this._callback.historyClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#historyClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };

  setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((element) => {
      element.addEventListener('click', this.#emojiClickHandler);
    });
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#userCommentInputHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #historyClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.historyClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedEmoji: evt.target.value,
      scrollPosition: this.element.scrollTop
    });
    this.element.scroll(0, this._state.scrollPosition);
  };

  #userCommentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      userComment: evt.target.value,
    });
  };

  static parseFilmToState = (
    film,
    checkedEmoji = null,
    userComment = null,
    scrollPosition = 0
  ) => ({
    ...film,
    checkedEmoji,
    userComment,
    scrollPosition
  });
}
