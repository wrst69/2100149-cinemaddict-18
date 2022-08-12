
import FilterView from '../view/filter-view.js';
import FilmBoardView from '../view/films-board-view.js';
import FilmListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../render.js';

export default class MainPresenter {
  init = (container) => {
    this.filmBoard = new FilmBoardView();
    render(new FilterView(), container);
    const filmsContainer = new FilmListView();
    console.log(filmsContainer.getElement().children);
    render(filmsContainer, container);
  };
}


/* export default class BoardPresenter {
  boardComponent = new BoardView();
  taskListComponent = new TaskListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TaskView(), this.taskListComponent.getElement());
    }

    render(new LoadMoreButtonView(), this.boardComponent.getElement());
  };
} */
