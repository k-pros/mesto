// класс PopupWithConfirmation отвечает за открытие попапа подтверждения удаления карточки
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card); // передача карточки в обработчик
    });
  }

  open(card) {
    this._card = card; // добавление свойства с текущей карточкой
    super.open();
  }
}