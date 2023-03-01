export const selectorPopupFormEditProfile = '.popup_type_profile-edit';
export const selectorPopupFormAddCard = '.popup_type_add-card';
export const selectorPopupFormEditAvatar = '.popup_type_edit-avatar';
export const selectorPopupWithConfirmation = '.popup_type_delete';
export const selectorPopupWithImage = '.popup_type_image';
export const selectorCardTemplate = '#cards-template';
export const selectorCardList = '.cards__list';
export const selectorProfileName = '.profile__name';
export const selectorProfileJob = '.profile__job';
export const selectorProfileAvatar = '.profile__avatar';

const page = document.querySelector('.page');
export const btnEditProfile = page.querySelector('.profile__edit-btn');
export const btnAddCard = page.querySelector('.profile__add-btn');
export const btnEditAvatar = page.querySelector('.profile__avatar-edit-btn');

// форма редактирования профиля
export const formProfileEdit = page.querySelector(selectorPopupFormEditProfile);
export const nameInput = page.querySelector('.popup__input_type_name'); 
export const jobInput = page.querySelector('.popup__input_type_job');
export const profileName = page.querySelector(selectorProfileName);
export const profileJob = page.querySelector(selectorProfileJob);

// форма редактирования аватара
export const formAvatarEdit = page.querySelector(selectorPopupFormEditAvatar)

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