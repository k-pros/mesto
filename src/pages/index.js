import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForms from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api.js";
import {
  selectorPopupWithConfirmation,
  selectorPopupFormEditProfile,
  selectorPopupFormEditAvatar,
  selectorPopupFormAddCard,
  selectorPopupWithImage,
  selectorProfileAvatar,
  selectorCardTemplate,
  selectorProfileName,
  selectorProfileJob,
  selectorCardList,
  formProfileEdit,
  formAvatarEdit,
  btnEditProfile,
  btnEditAvatar,
  formAddCard,
  btnAddCard,
  nameInput,
  jobInput,
  config,
} from "../utils/constants.js";

// создание экземпляра класса API
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "d07cac4a-a748-4986-b798-f3cab5a20c72",
    "Content-Type": "application/json",
  },
});

let userId = null; // id пользователя

// загрузка c сервера карточек и информации о пользователе, и отображение их на странице
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id; // получение id пользователя
    userInfo.setUserInfo(userData); // добавление данных профиля на страницу
    cardList.renderItems(initialCards.reverse()); // отрисовка карточек
  })
  .catch((err) => console.log(err));


// функция создания карточки
const renderCard = (cardData) => {
  cardData.userId = userId; // добавление в объект id пользователя

  const card = new Card(
    {
      data: cardData,
      // обработчик открытия попапа с изображением
      handleCardClick: () => {
        popupWithImage.open(cardData);
      },
      // обработчик открытия попапа с подтверждением удаления карточки
      handleTrashButton: (card) => {
        popupWithConfirmation.open(card); // открытие попапа и передача в него карточки 
      },
      handleLikeButton: (card) => {
        if(!card.isLiked()) {
          api.addLikeCard(card.cardId)
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch((err) => console.log(err));
        } else {
          api.deleteLikeCard(card.cardId)
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch((err) => console.log(err));
        }
      }
    },
    selectorCardTemplate
    );
  return card.createCard(); // создание карточки
};

// создание экземпляра карточек по-умолчанию
const cardList = new Section(
  {
    renderer: (cardData) => {
      const newCard = renderCard(cardData); // генерация разметки карточки
      cardList.addItem(newCard); // добавление карточки в контейнер
    },
  },
  selectorCardList
);


// создание экземпляра с информацией о пользователе
const userInfo = new UserInfo(
  selectorProfileName,
  selectorProfileJob,
  selectorProfileAvatar
);

// создание экземпляра попапа с формой редактирования профайла
const popupFormEditProfile = new PopupWithForms({
  popupSelector: selectorPopupFormEditProfile,
  // обработчик отправки формы редактирования профайла
  handleFormSubmit: (userData) => {
    popupFormEditProfile.waitLoading('Сохранение...'); // изменение текста кнопки сабмита во время отправки данных на сервер
    api.updateUserInfo(userData)
      .then(() => {        
        userInfo.setUserInfo(userData); // добавление полученных с сервера данных на страницу
      })
      .then(() => {
        popupFormEditProfile.close(); // закрытие попапа
      })
      .catch((err) => console.log(err))
      .finally(() => popupFormEditProfile.waitLoading()); // изменение текста кнопки сабмита на изначальное
  },
});

// установка слушателей для попапа редактирования профиля
popupFormEditProfile.setEventListeners();

// открытие попапа с формой редактирования профайла
const openPopupProfileEdit = () => {
  // передача в поля формы значений из профайла
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.profileName;
  jobInput.value = infoObject.profileJob;

  popupFormEditProfile.open(); // открытие попапа
};
// установка слушателя на кнопку редактирования профайла
btnEditProfile.addEventListener("click", () => {
  openPopupProfileEdit();
  editFormValidator.resetValidation(); // сброс ошибок с инпутов
});

// создание экземпляра попапа с формой добавления новой карточки
const popupFormAddCart = new PopupWithForms({
  popupSelector: selectorPopupFormAddCard,
  // обработчик отправки формы добавления новой карточки
  handleFormSubmit: (inputData) => {
    popupFormAddCart.waitLoading('Сохранение...'); // изменение текста кнопки сабмита во время отправки данных на сервер
    api.addNewCard(inputData)
      .then((card) => {
      // добавление полученных с сервера данных на страницу
      const newCard = renderCard(card); // генерация разметки карточки
      cardList.addItem(newCard); // добавление карточки в контейнер
      popupFormAddCart.close(); // закрытие попапа
      })
      .catch((err) => console.log(err))
      .finally(() => popupFormAddCart.waitLoading()); // изменение текста кнопки сабмита на изначальное
  },
});
// установка слушателя на попап с формой добавления новой карточки
popupFormAddCart.setEventListeners();

// открытие попапа с формой добавления новой карточки
const openPopupAddCard = () => {
  addCardFormValidator.disableSubmitButton(); // делаем кнопку добавления карточки неактивной перед открытием попапа
  popupFormAddCart.open(); // открытие попапа
};

// обработчик кнопки добавления карточки
btnAddCard.addEventListener("click", () => {
  openPopupAddCard();
  addCardFormValidator.resetValidation(); // сброс ошибок с инпутов
});

// создание экземпляра класса попапа с изображением
const popupWithImage = new PopupWithImage(selectorPopupWithImage);
popupWithImage.setEventListeners();

// создание экземпляра попапа с формой редактирования аватара
const popupFormEditAvatar = new PopupWithForms({
  popupSelector: selectorPopupFormEditAvatar,
  // обработчик отправки формы редактирования аватара
  handleFormSubmit: (data) => {
    popupFormEditAvatar.waitLoading('Сохранение...'); // изменение текста кнопки сабмита во время отправки данных на сервер
    api.updateAvatar(data)
      .then(() => {
        userInfo.setUserInfo(data); // добавление полученных с сервера данных на страницу
      })
      .then(() => {
        popupFormEditAvatar.close(); // закрытие попапа
      })
      .catch((err) => console.log(err))
      .finally(() => popupFormEditAvatar.waitLoading()); // изменение текста кнопки сабмита на изначальное
  },
});
// установка слушателя на попап с формой редактирования аватара
popupFormEditAvatar.setEventListeners();

// обработчик кнопки редактирования аватара
btnEditAvatar.addEventListener("click", () => {
  popupFormEditAvatar.open();
  editAvatarFormValidator.resetValidation() // сброс ошибок с инпутов
});

// создание экземпляра класса попапа с подтверждением удаления карточки
const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: selectorPopupWithConfirmation,
  // обработчик удаления карточки
  handleFormSubmit: (card) => {
    api.deleteCard(card.cardId) // передача Id карточки в метод удаления
      .then(() => {
        card.cardElement.remove(); // удаление разметки карточки со страницы
        card = null;
        popupWithConfirmation.close()
      })
        .catch((err) => console.log(err))   
  }
});
popupWithConfirmation.setEventListeners();

// создание экземпляра валидатора формы редактирования профайла
const editFormValidator = new FormValidator(config, formProfileEdit);
// создание экземпляра валидатора формы редактирования аватара
const editAvatarFormValidator = new FormValidator(config, formAvatarEdit)
// создание экземпляра валидатора формы добавления новой карточки
const addCardFormValidator = new FormValidator(config, formAddCard);

// валидация форм
editFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
addCardFormValidator.enableValidation();