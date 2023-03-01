// класс Section отвечает за отрисовку элементов на странице. 
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // функция, отвечающая за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка массива элементов
  renderItems(cards) {
    cards.forEach((item) => this._renderer(item));
  }

  // добавление DOM-элементов в контейнер 
  addItem(element) {
    this._container.prepend(element);
  }
}