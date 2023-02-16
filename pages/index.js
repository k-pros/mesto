import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForms from "../components/PopupWithForm.js";
import initialCards from '../utils/initial-cards.js';
import PopupWithImage from "../components/PopupWithImage.js";
import {
  selectorPopupFormEditProfile,
  selectorPopupFormAddCard,
  selectorPopupWithImage,
  selectorCardTemplate,
  selectorProfileName,
  selectorProfileJob,
  selectorCardList,
  formProfileEdit,
  btnProfileEdit,
  formAddCard,
  btnAddCard,
  nameInput,
  jobInput,
  config
} from '../utils/constants.js'

// создание экземпляра класса попапа с изображением
const popupWithImage = new PopupWithImage(selectorPopupWithImage);
popupWithImage.setEventListeners();

// функция создания карточки
const renderCard = (cardData) => {
  const card = new Card({
    data: cardData, 
    // обработчик открытия попапа с изображением
    handleCardClick: () => {  
      popupWithImage.open(cardData);
    }},
    selectorCardTemplate);
  return card.createCard();
}

// создание экземпляра карточек по-умолчанию
const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const newCard = renderCard(cardData); // генерация разметки карточки
    cardList.addItem(newCard); // добавление карточки в контейнер
  }
}, selectorCardList);

// отрисовка карточек
cardList.renderItems();

// создание экземпляра с информацией о пользователе
const userInfo = new UserInfo({ selectorProfileName, selectorProfileJob }); 

// создание экземпляра попапа с формой редактирования профайла
const popupFormProfileEdit = new PopupWithForms({
  popupSelector: selectorPopupFormEditProfile,
  // обработчик отправки формы редактирования профайла
  handleFormSubmit: (userData) => {
    // добавление данных на страницу 
    userInfo.setUserInfo(userData['input-name'], userData['input-job']);
    popupFormProfileEdit.close(); // закрытие попапа
  }
});

// установка слушателей для попапа редактирования профиля
popupFormProfileEdit.setEventListeners();

// открытие попапа с формой редактирования профайла
const openPopupProfileEdit = () => {
  // передача в поля формы значений из профайла
  nameInput.value = userInfo.getUserInfo().profileName;
  jobInput.value = userInfo.getUserInfo().profileJob;
  popupFormProfileEdit.open(); // открытие попапа
}

// установка слушателя на кнопку редактирования профайла
btnProfileEdit.addEventListener('click', openPopupProfileEdit);


// создание экземпляра попапа с формой добавления новой карточки
const popupFormAddCart = new PopupWithForms({
  popupSelector: selectorPopupFormAddCard,
  // обработчик отправки формы добавления новой карточки
  handleFormSubmit: (inputData) => {
    const cardData = {
      name: inputData['input-name-card'],
      link: inputData['input-img-link']
    }

    const newCard = new Section({
      items: []
    }, selectorCardList);
    
    const card = renderCard(cardData); // генерация разметки карточки
    newCard.addItem(card); // добавление карточки в контейнер
    popupFormAddCart.close(); // закрытие попапа
    }
});

// установка слушателя на попап с формой добавления новой карточки
popupFormAddCart.setEventListeners();

// обработчик кнопки добавления карточки
btnAddCard.addEventListener('click', () => {
  // делаем кнопку добавления карточки неактивной перед открытием попапа
  addCardFormValidator.disableSubmitButton();
  popupFormAddCart.open(); // открытие попапа
});

// создание экземпляра валидатора формы редактирования профайла
const editFormValidator = new FormValidator (config, formProfileEdit);
// создание экземпляра валидатора формы добавления новой карточки
const addCardFormValidator = new FormValidator (config, formAddCard);

// валидация форм
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();