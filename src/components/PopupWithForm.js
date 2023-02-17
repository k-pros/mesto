// класс PopupWithForms отвечает за открытие попапа с формой
import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }
  
  // метод, собирающий данные всех полей формы.
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}