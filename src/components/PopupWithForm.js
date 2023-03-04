// класс PopupWithForms отвечает за открытие попапа с формой
import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
    this._submitButtonDefaultText = this._submitButton.textContent;
  }
  
  // метод собирает данные всех полей формы.
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  // метод записывает данные в поля формы.
  _setInputValues(data) {
    this._inputList.forEach((input) => input.value = data[input.name]);
  }

  // метод изменяет текст кнопки сабмита во время ожидания ответа сервера после отправки данных
  waitLoading(TextButton) {
    // проверка передан ли параметр
    if(typeof TextButton !== 'undefined'){ 
      this._submitButton.textContent = TextButton; // изменение текста кнопки на новое
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText; // возвращение исходного текста кнопки после ответа сервера 
    }
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