const page = document.querySelector('.page');
const btnProfileEdit = page.querySelector('.profile__edit-btn');
const btnAddCard = page.querySelector('.profile__add-btn');
const popupClose = page.querySelectorAll('.popup__close');

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

// открытие popup
function openPopup (popupName) {
  popupName.classList.add('popup_opened');
}

// создание карточек из массива при загрузке страницы
const cardsTemplate = document.querySelector('#cards-template').content;
const cardsList = document.querySelector('.cards__list');

const createCards = (cardName, cardImage) => {
  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);
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
const renderCards = (cardName, cardImage) => {
  cardsList.prepend(createCards(cardName, cardImage));
}

// загрузка карточек из массива
initialCards.forEach(item => {
  renderCards(item.name, item.link);
});

// открытие формы редактирования профиля
const openProfileEdit = () => {
  // передача в поля формы значений из профайла
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupProfileEdit);
}

// закрытие popup
const closePopup = item => {
  item.classList.remove('popup_opened');
}

// установка обработчиков для кнопок Закрыть
popupClose.forEach(item => {
  const currentPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(currentPopup));
});

btnProfileEdit.addEventListener('click', openProfileEdit); // обработчик кнопки редактирования профайла
btnAddCard.addEventListener('click', () => openPopup(popupAddCard)); // обработчик кнопки добавления карточки

// обработчик отправки формы редактирования профайла
const handleFormSubmit = evt => {
  evt.preventDefault();
  
  // перезапись значений профайла
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

formProfileEdit.addEventListener('submit', handleFormSubmit);


// обработчик формы добавления новой карточки
function handleFormAddCard (evt) {
  evt.preventDefault(); 
  renderCards(newCardNameInput.value, newCardLinkInput.value);
  closePopup(popupAddCard); 
}

formAddCard.addEventListener('submit', handleFormAddCard);