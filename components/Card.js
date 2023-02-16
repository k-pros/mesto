// класс Card отвечает за создание карточки
export default class Card {
  constructor({data, handleCardClick}, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  // получение шаблона карточки
  _getTemplateCard() {
    const card = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.cards__item')
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

  _setEventListeners() {
    // слушатель кнопки like
    this._btnLike = this._newCard.querySelector(".cards__btn");
    this._btnLike.addEventListener('click', () => this._handleLikeButton());

    // слушатель кнопки удаления карточки
    this._btnTrash = this._newCard.querySelector('.cards__trash');
      this._btnTrash.addEventListener('click', () => this._handleTrashButton());

    // слушатель клика по изображению
    this._cardImage = this._newCard.querySelector('.cards__img');
    this._cardImage.addEventListener('click', () => this._handleCardClick());  
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