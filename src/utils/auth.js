import Cookies from 'js-cookie';

export default class Auth {
  static setToken(token, name, userId,userData) {
    Cookies.set('authToken', token);
    Cookies.set('userName', name);
    Cookies.set('uId', userId);
    Cookies.set('userData', userData);
    
  }
 

  static destroyToken() {
    Cookies.remove('authToken');
  }

  static getToken() {
    const token = Cookies.get('authToken');
    return token;
  }
  static getUserData() {
    const token = Cookies.get('userData');
    return token;
  }
  static getName() {
    const userName = Cookies.get('userName');
    return userName;
  }
  static getUserId() {
    const userId = Cookies.get('uId');
    return userId;
  }

  static loggedIn() {
    return this.getToken() != null;
  }
}
