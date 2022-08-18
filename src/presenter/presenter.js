import NavigationView from '../view/navigation-view.js';
import FilterView from '../view/filter-view.js';
import FilmBoardView from '../view/films-board-view.js';
import FilmListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render } from '../render.js';

export default class MainPresenter {
  init = (container, filmsModel) => {
    this.filmBoard = new FilmBoardView();
    this.filmsContainer = new FilmListView();
    this.filmsModel = filmsModel;
    this.filmsList = [...this.filmsModel.getFilms()];

    render(new NavigationView(), container);
    render(new FilterView(), container);
    render(this.filmBoard, container);
    render(this.filmsContainer, this.filmBoard.getElement());
    for (let i = 0; i < this.filmsList.length; i++) {
      render(new FilmCardView(this.filmsList[i]), this.filmsContainer.getElement().lastElementChild);
    }
    render(new ShowMoreButtonView(), this.filmBoard.getElement().lastElementChild);
  };
}
