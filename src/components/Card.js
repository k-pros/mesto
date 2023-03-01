// класс Card отвечает за создание карточки
export default class Card {
  constructor({data, handleCardClick, handleTrashButton, handleLikeButton}, selectorTemplate) {
    this.cardId = data._id;
    this._userId = data.userId;
    this._cardOwnerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likesArray = data.likes;
    this._handleLikeButton = handleLikeButton;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButton;
  }

  // метод проверки является ли пользователь создателем карточки
  _checkOwner() {
    this._isOwner = (this._cardOwnerId === this._userId) ? true : false;
  }

  // получение шаблона карточки
  _getTemplateCard() {
    const card = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

      // удаление из шаблона элемента корзины для не создателя карточки
      if(!this._isOwner) {
        const trash = card.querySelector('.cards__trash');
        card.removeChild(trash);
      }
    return card;
  }
  
  _setEventListeners() {
    // слушатель кнопки like
    this._btnLike = this.cardElement.querySelector(".cards__btn");
    this._btnLike.addEventListener('click', () => this._handleLikeButton(this));
    
    // слушатель кнопки удаления карточки для создателя карточки
    if(this._isOwner) {
      this._btnTrash = this.cardElement.querySelector('.cards__trash');
      this._btnTrash.addEventListener('click', () => this._handleTrashButton(this)); // передача текущей карточки в функцию 
    }

    // слушатель клика по изображению
    this._cardImage = this.cardElement.querySelector('.cards__img');
    this._cardImage.addEventListener('click', () => this._handleCardClick());  
  }
  
  // метод проверки наличия лайка от пользователя
  isLiked() {
    return this._likesArray.some((likeUsers) => {
      return likeUsers._id === this._userId;
    });
  }
  
  // переключатель кнопки like
  _toggleLikeButton() {
    if(this.isLiked()) {
      this._btnLike.classList.add("cards__btn_active");
    } else {
      this._btnLike.classList.remove("cards__btn_active");
    }
  }
  
  // метод обновления массива с лайками
  setLikes(dataLikes) {
    this._likesArray = dataLikes;
    this._likesAmount.textContent = this._likesArray.length;
    this._toggleLikeButton();
  }

  // наполнение шаблона карточки данными
  _setData() {
    // добавление описания карточки
    const cardName = this.cardElement.querySelector('.cards__title');
    cardName.textContent = this._name;
    // добавление ссылки на изображение
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // добавление количества лайков
    this._likesAmount.textContent = this._likesArray.length
  }
  
  // создание карточки
  createCard() {
    this._checkOwner();
    this.cardElement = this._getTemplateCard();
    this._likesAmount = this.cardElement.querySelector('.cards__likes-amount')
    this._setEventListeners();
    this._toggleLikeButton();
    this._setData();

    return this.cardElement;
  }
}