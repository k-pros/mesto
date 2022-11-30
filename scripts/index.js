let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-btn');
let popup = page.querySelector('.popup');
let popupClose = page.querySelector('.popup__close');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
let nameInput = page.querySelector('.popup__input_type_name'); 
let jobInput = page.querySelector('.popup__input_type_job');
let formProfileEdit = page.querySelector('.popup__form') 

// открытие формы редактирования профиля
function openPopup () {
  popup.classList.add('popup_opened');

  // передача в поля формы значений из профайла
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрытие формы редактирования профиля
function closePopup () {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

// обработчик отправки формы
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  
  // перезапись значений профайла
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formProfileEdit.addEventListener('submit', handleFormSubmit);