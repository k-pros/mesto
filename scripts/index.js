const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const page = document.querySelector('.page');
const btnProfileEdit = page.querySelector('.profile__edit-btn');
const btnAddCard = page.querySelector('.profile__add-btn');
const popups = page.querySelectorAll('.popup');

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

// popup с изображением
const popupVewImage = page.querySelector('.popup_type_image');
const imgPopup = popupVewImage.querySelector('.popup__img'); 
const imgTitlePopup = popupVewImage.querySelector('.popup__img-title');

// закрытие popup
function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
  
  //удаление слушателя нажатия клавиши Esc
  document.removeEventListener('keydown', keyEscHandler);
}

// //обработчик нажатия клавиши Esc
function keyEscHandler (evt) {
  if (evt.key === 'Escape') {
    const currentPopup = page.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

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

// открытие popup
function openPopup (popupName) {
  popupName.classList.add('popup_opened');

  // установка слушателя нажатия клавиши Esc
  document.addEventListener('keydown', keyEscHandler);
}

// создание карточек из массива при загрузке страницы
const cardsTemplate = document.querySelector('#cards-template').content.querySelector('.cards__item');
const cardsList = document.querySelector('.cards__list');

const createCard = (cardName, cardImage) => {
  const cardsItem = cardsTemplate.cloneNode(true);
  cardsItem.querySelector('.cards__title').textContent = cardName;

  const currentImage = cardsItem.querySelector('.cards__img');
  currentImage.src = cardImage;
  currentImage.alt = cardName;

  // обработчик кнопки like
  const btnLike = cardsItem.querySelector('.cards__btn');
    btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('cards__btn_active');
  });

  // обработчик кнопки удаления карточки
  const btnTrash = cardsItem.querySelector('.cards__trash');
  btnTrash.addEventListener('click', () => {
    cardsItem.remove();
  });

  // открытие popup с изображением
  currentImage.addEventListener('click', () => {
    imgPopup.src = cardImage;
    imgPopup.alt = cardName;
    imgTitlePopup.textContent = cardName;
    openPopup(popupVewImage);
  });
  
  return cardsItem;
}

// отображение карточек
const renderCard = (cardName, cardImage) => {
  cardsList.prepend(createCard(cardName, cardImage));
}

// загрузка карточек из массива
initialCards.forEach(item => {
  renderCard(item.name, item.link);
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
  const saveButton = formAddCard.querySelector('.popup__button');
  disableButton(saveButton, config);

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
  renderCard(newCardNameInput.value, newCardLinkInput.value);
  closePopup(popupAddCard); 
  formAddCard.reset(); // обнуление полей ввода при после добавления карточки 
}

formAddCard.addEventListener('submit', handleFormAddCard);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(config);