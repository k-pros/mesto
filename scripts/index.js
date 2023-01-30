import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from './initial-cards.js';
import {closePopup, openPopup} from './utils.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const page = document.querySelector('.page');
const cardsList = document.querySelector('.cards__list');
const btnProfileEdit = page.querySelector('.profile__edit-btn');
const btnAddCard = page.querySelector('.profile__add-btn');
const popups = page.querySelectorAll('.popup');
const cardTemplate = page.querySelector('#cards-template');

// форма редактирования профиля
const popupProfileEdit = page.querySelector('.popup_type_profile-edit');
const formProfileEdit = page.querySelector('.popup__form_type_profile-edit');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const nameInput = page.querySelector('.popup__input_type_name'); 
const jobInput = page.querySelector('.popup__input_type_job');

// форма добавления новой карточки
const popupAddCard = page.querySelector('.popup_type_add-card');
const formAddCard = page.querySelector('.popup__form_type_add-card');
const newCardNameInput = page.querySelector('.popup__input_type_name-card');
const newCardLinkInput = page.querySelector('.popup__input_type_img-link');

// закрытие popup при клике по overlay и крестику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    const overlay = (evt.target.classList.contains('popup_opened'));
    const buttonClose = (evt.target.classList.contains('popup__close')); // кнопка - крестик

    if (overlay || buttonClose) {
      closePopup(popup);
    }
  });
});

// отображение карточек
const renderCard = (cardData) => {
  const card = new Card(cardData, cardTemplate);
  cardsList.prepend(card.createCard());

}

// загрузка карточек из массива
initialCards.forEach(item => {
  renderCard(item);
});

// открытие формы редактирования профиля
const openProfileEdit = () => {
  // передача в поля формы значений из профайла
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupProfileEdit);
}

// обработчик кнопки редактирования профайла
btnProfileEdit.addEventListener('click', openProfileEdit);

// обработчик кнопки добавления карточки
btnAddCard.addEventListener('click', () => {
  // делаем кнопку добавления карточки неактивной перед открытием popup
  addCardFormValidator.disableSubmitButton();
  openPopup(popupAddCard);
});

// обработчик отправки формы редактирования профайла
const handleFormProfileEdit = (evt) => {
  evt.preventDefault();
  
  // перезапись значений профайла
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

formProfileEdit.addEventListener('submit', handleFormProfileEdit);

// обработчик формы добавления новой карточки
function handleFormAddCard (evt) {
  evt.preventDefault();
  const cardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }
  renderCard(cardData);
  closePopup(popupAddCard); 
  formAddCard.reset(); // обнуление полей ввода после добавления карточки 
}

formAddCard.addEventListener('submit', handleFormAddCard);

const editFormValidator = new FormValidator (config, formProfileEdit);
const addCardFormValidator = new FormValidator (config, formAddCard);

// валидация форм
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();