// класс PopupWithImage отвечает за открытие попапа с изображением
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__img-title');
  }

  open({ name, link }) {
    this._popupImg.src = link;
    this._popupTitle.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}