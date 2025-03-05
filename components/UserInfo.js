export default class UserInfo {
  constructor({name, ocupation}) {
    this.userName = name;
    this.userOcupation = ocupation;
  }

  getUserInfo() {
    return {
      userName: this.userName,
      userOcupation: this.userOcupation,
    }
  }

  setUserInfo(name,ocupation) {
    this.userName.textContent = name;
    this.userOcupation.textContent = ocupation

  }

}