import UserRankView from './view/user-rank-view.js';
import MainPresenter from './presenter/main-presenter.js';
import {render} from './render.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('main');

const mainPresenter = new MainPresenter();

render(new UserRankView(), headerElement);
mainPresenter.init(mainElement);
