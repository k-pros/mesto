export const selectorPopupFormEditProfile = '.popup_type_profile-edit';
export const selectorPopupFormAddCard = '.popup_type_add-card';
export const selectorPopupWithImage = '.popup_type_image';
export const selectorCardTemplate = '#cards-template';
export const selectorCardList = '.cards__list';
export const selectorProfileName = '.profile__name';
export const selectorProfileJob = '.profile__job';

const page = document.querySelector('.page');
export const btnProfileEdit = page.querySelector('.profile__edit-btn');
export const btnAddCard = page.querySelector('.profile__add-btn');

// форма редактирования профиля
export const formProfileEdit = page.querySelector(selectorPopupFormEditProfile);
export const nameInput = page.querySelector('.popup__input_type_name'); 
export const jobInput = page.querySelector('.popup__input_type_job');

// форма добавления новой карточки
export const formAddCard = page.querySelector(selectorPopupFormAddCard);

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}