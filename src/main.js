import UserRankView from './view/user-rank-view.js';
import MainPresenter from './presenter/presenter.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import {render} from './render.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('main');
const footerStatisticElement = document.querySelector('.footer__statistics');

const mainPresenter = new MainPresenter();

render(new UserRankView(), headerElement);
mainPresenter.init(mainElement);
render(new FooterStatisticView(), footerStatisticElement);
