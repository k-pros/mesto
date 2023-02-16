// класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
    constructor({ selectorProfileName, selectorProfileJob }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileJob = document.querySelector(selectorProfileJob);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent
    }
    return userInfo;
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(profileName, profileJob) {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
} 