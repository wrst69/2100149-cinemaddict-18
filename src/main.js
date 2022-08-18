import UserRankView from './view/user-rank-view.js';
import MainPresenter from './presenter/presenter.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import { render } from './render.js';
import FilmsModel from './model/films-model.js';
import PopupModel from './model/popup-model.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('main');
const footerStatisticElement = document.querySelector('.footer__statistics');

const mainPresenter = new MainPresenter();
const filmsModel = new FilmsModel();
const popupModel = new PopupModel();

render(new UserRankView(), headerElement);
mainPresenter.init(mainElement, filmsModel, popupModel);
render(new FooterStatisticView(), footerStatisticElement);
