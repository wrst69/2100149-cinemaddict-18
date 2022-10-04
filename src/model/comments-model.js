import Observable from '../framework/observable.js';
import { allComments } from '../mock/comment.js';

export default class CommentsModel extends Observable {
  #comments = allComments;

  constructor() {
    super();
  }

  get = (film) => film.comments.map((commentId) =>
    this.#comments.find((comment) =>
      comment.id === commentId)
  );

  addComment = (updateType, update) => {
    this.#comments.push(update);
    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
