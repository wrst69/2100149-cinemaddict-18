import UserRankView from './view/user-rank-view.js';
import MainPresenter from './presenter/presenter.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import { render } from './framework/render.js';
import FilmsModel from './model/films-model.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('main');
const footerStatisticElement = document.querySelector('.footer__statistics');

const mainPresenter = new MainPresenter(mainElement);
const filmsModel = new FilmsModel();

render(new UserRankView(), headerElement);
mainPresenter.init(filmsModel);
render(new FooterStatisticView(), footerStatisticElement);
