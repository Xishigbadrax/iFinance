import Cookies from "js-cookie";

export default class Auth {
  static setToken(token, name, userId, userData) {
    Cookies.set("authToken", token);
    Cookies.set("userName", name);
    Cookies.set("uId", userId);
    Cookies.set("userData", userData);
  }
  static setMode(mode) {
    Cookies.set("darkMode", mode);
  }
  static setImage(img) {
    Cookies.set("image", img);
  }

  static destroyId() {
    Cookies.remove("uId");
  }
  static destroyToken() {
    Cookies.remove("authToken");
  }
  static destroyMode() {
    Cookies.remove("darkMode");
  }

  static getMode() {
    const mode = Cookies.get("darkMode");
    return mode;
  }
  static getImage() {
    const img = Cookies.get("image");
    return img;
  }
  static getToken() {
    const token = Cookies.get("authToken");
    return token;
  }
  static getUserData() {
    const token = Cookies.get("userData");
    return token;
  }
  static getName() {
    const userName = Cookies.get("userName");
    return userName;
  }
  static getUserId() {
    const userId = Cookies.get("uId");
    return userId;
  }

  static loggedIn() {
    return this.getToken() != null;
  }
}
