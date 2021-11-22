import Cookies from 'js-cookie';

export default class Auth {
  static setToken(token, name) {
    Cookies.set('authToken', token);
    Cookies.set('userName', name);
    
  }
 

  static destroyToken() {
    Cookies.remove('authToken');
  }

  static getToken() {
    const token = Cookies.get('authToken');
    return token;
  }
  static getName() {
    const userName = Cookies.get('userName');
    return userName;
  }

  static loggedIn() {
    return this.getToken() != null;
  }
}
