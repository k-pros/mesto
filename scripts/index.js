let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-btn');
let addButton = page.querySelector('.profile__add-btn');
let popup = page.querySelector('.popup');
let popupClose = page.querySelector('.popup__close');
let saveButton = page.querySelector('.popup__btn');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
let nameInput = page.querySelector('.popup__input-username'); 
let jobInput = page.querySelector('.popup__input-work');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

saveButton.addEventListener('click', function (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
});