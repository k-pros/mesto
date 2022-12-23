const page = document.querySelector('.page');
const btnProfileEdit = page.querySelector('.profile__edit-btn');
const btnAddCard = page.querySelector('.profile__add-btn');
const popup = page.querySelector('.popup');
const popupClose = page.querySelectorAll('.popup__close');
const btnLike = page.querySelectorAll('.cards__btn');
const imgCard = page.querySelectorAll('.cards__img');

// форма редактирования профиля
const popupProfileEdit = page.querySelector('.popup_type_profile-edit');
const formProfileEdit = page.querySelector('.popup__form_type_profile-edit');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const nameInput = page.querySelector('.popup__input_type_name'); 
const jobInput = page.querySelector('.popup__input_type_job');

// форма добавления новой карточки
const popupAddCard = page.querySelector('.popup_type_add-card');

// popup с изображением
const popupImage = page.querySelector('.popup_type_image');

// открытие popup
function openPopup (popupName) {
  popupName.classList.add('popup_opened');
}

// открытие формы редактирования профиля
function openProfileEdit () {
  openPopup(popupProfileEdit);

  // передача в поля формы значений из профайла
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открытие popup с изображением
// imgCard.forEach(item => {
//   const currentImage = item.closest('.popup');
//   console.log(currentImage);
//   // console.log(btnLike);
//   item.addEventListener('click', () => openPopup(currentImage));
// });

// закрытие popup
function closePopup (item) {
  item.classList.remove('popup_opened');
}

// установка обработчиков для кнопок Закрыть
popupClose.forEach(item => {
  const currentPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(currentPopup));
});


btnProfileEdit.addEventListener('click', openProfileEdit); // обработчик кнопки редактирования профайла
btnAddCard.addEventListener('click', () => openPopup(popupAddCard)); // обработчик кнопки добавления карточки
// imgCard.addEventListener('click', () => openPopup(popupImage.closest('.popup'))) // обработчик клика по изображению


// обработчик отправки формы редактирования профайла
function handleFormSubmit (evt) {
  evt.preventDefault();
  
  // перезапись значений профайла
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

formProfileEdit.addEventListener('submit', handleFormSubmit);

// нажатие кнопки like
btnLike.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('cards__btn_active');
  });
});


// // обработчик формы добавления новой карточки
// function handleFormSubmit (evt) {
//   evt.preventDefault(); 
  
//   closePopup();
// }
// formProfileEdit.addEventListener('submit', handleFormSubmit);






// const page = document.querySelector('.page');
// const btnProfileEdit = page.querySelector('.profile__edit-btn');
// const popup = page.querySelector('.popup');

// // форма редактирования профиля
// const popupProfileEdit = page.querySelector('.popup_type_profile-edit');
// const popupClose = page.querySelector('.popup__close');
// const profileName = page.querySelector('.profile__name');
// const profileJob = page.querySelector('.profile__job');
// const nameInput = page.querySelector('.popup__input_type_name'); 
// const jobInput = page.querySelector('.popup__input_type_job');
// const formProfileEdit = page.querySelector('.popup__form') 

// const btnAddCard = page.querySelector('.profile__add-btn');
// const popupNewCard = page.querySelector('.popup_type_new-card');

// // открытие формы редактирования профиля
// function openPopup () {
//   popup.classList.add('popup_opened');

//   // передача в поля формы значений из профайла
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// }

// // закрытие формы редактирования профиля
// function closePopup () {
//   popup.classList.remove('popup_opened');
// }

// btnProfileEdit.addEventListener('click', openPopup);
// popupClose.addEventListener('click', closePopup);

// // обработчик отправки формы
// function handleFormSubmit (evt) {
//   evt.preventDefault(); 
  
//   // перезапись значений профайла
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup();
// }

// formProfileEdit.addEventListener('submit', handleFormSubmit);