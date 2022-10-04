import { render } from './framework/render.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import UserRankView from './view/user-rank-view.js';
import FooterStatisticView from './view/footer-statistic-view.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('main');
const footerStatisticElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filtersModel = new FilterModel();

const filterPresenter = new FilterPresenter(mainElement, filtersModel, filmsModel);
const mainPresenter = new MainPresenter(mainElement, filmsModel, filtersModel, commentsModel);


render(new UserRankView(), headerElement);
filterPresenter.init();
mainPresenter.init();

render(new FooterStatisticView(), footerStatisticElement);

export { filterPresenter };
