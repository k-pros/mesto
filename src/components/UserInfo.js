// класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(selectorProfileName, selectorProfileJob, selectorProfileAvatar) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileJob = document.querySelector(selectorProfileJob);
    this._profileAvatar = document.querySelector(selectorProfileAvatar);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
    return userInfo;
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar }) {
    if (name && about) {
      this._profileName.textContent = name;
      this._profileJob.textContent = about;
    }
    if (avatar) {
      this._profileAvatar.src = avatar;
    }
  }
} 