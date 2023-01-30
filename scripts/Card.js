import {openPopup} from './utils.js';
import {popupVewImage, imgPopup, imgTitlePopup} from './constants.js'

class Card {
  constructor({name, link}, selectorTemplate) {
    this._name = name;
    this._link = link;
    this._selectorTemplate = selectorTemplate;
  }

  // получение шаблона карточки
  _getTemplateCard() {
    const card = this._selectorTemplate
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return card;
  }

  // обработчик кнопки like
  _handleLikeButton() {
    this._btnLike.classList.toggle("cards__btn_active");
  }

  // обработчик кнопки удаления карточки
  _handleTrashButton() {
    this._newCard.remove();
    this._newCard = null;
  }

  // обработчик открытия popup с изображением
  _handlePopupViewImage() {
    imgPopup.src = this._link;
    imgPopup.alt = this._name;
    imgTitlePopup.textContent = this._name;
    openPopup(popupVewImage);
  }

  _setEventListeners() {
    // слушатель кнопки like
    this._btnLike = this._newCard.querySelector(".cards__btn");
    this._btnLike.addEventListener("click", () => this._handleLikeButton());

    // слушатель кнопки удаления карточки
    this._btnTrash = this._newCard.querySelector('.cards__trash');
      this._btnTrash.addEventListener('click', () => this._handleTrashButton());

    // слушатель клика по изображению
    this._cardImage = this._newCard.querySelector('.cards__img');
    this._cardImage.addEventListener('click', () => this._handlePopupViewImage());  
  }
  
  // наполнение шаблона карточки данными
  _setData() {
    // добавление описания карточки
    const cardName = this._newCard.querySelector('.cards__title');
    cardName.textContent = this._name;
    
    // добавление ссылки на изображение
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  // создание карточки
  createCard() {
    this._newCard = this._getTemplateCard();
    this._setEventListeners();
    this._setData();

    return this._newCard;
  }
}

export default Card;