import { createElement } from '../render.js';

const createFooterStatisticView = () => '<p>130 291 movies inside</p>';

export default class FooterStatisticView {
  getTemplate() {
    return createFooterStatisticView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
