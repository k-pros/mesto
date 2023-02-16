// класс Popup отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  // метод закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // метод добавляет слушатель клика по иконке закрытия попапа и оверлею
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      const overlay = evt.target.classList.contains('popup_opened'); 
      const buttonClose = evt.target.classList.contains('popup__close'); // кнопка - крестик
      
      if (overlay || buttonClose) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBind); // установка слушателя нажатия клавиши Esc
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBind); // удаление слушателя нажатия клавиши Esc
  }
}