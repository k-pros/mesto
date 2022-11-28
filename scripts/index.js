let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-btn');
let popup = page.querySelector('.popup');
let popupClose = page.querySelector('.popup__close');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
let nameInput = page.querySelector('.popup__input-username'); 
let jobInput = page.querySelector('.popup__input-work');

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popup.addEventListener('submit', handleFormSubmit);