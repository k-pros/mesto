function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
  
  //удаление слушателя нажатия клавиши Esc
  document.removeEventListener('keydown', keyEscHandler);
}

// //обработчик нажатия клавиши Esc
function keyEscHandler (evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

// открытие popup
function openPopup (popupName) {
  popupName.classList.add('popup_opened');

  // установка слушателя нажатия клавиши Esc
  document.addEventListener('keydown', keyEscHandler);
}

export {closePopup, keyEscHandler, openPopup};