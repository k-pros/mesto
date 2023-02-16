// класс Section отвечает за отрисовку элементов на странице. 
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer; // функция, отвечающая за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка массива элементов
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  // добавление DOM-элементов в контейнер 
  addItem(element) {
    this._container.prepend(element);
  }
}
