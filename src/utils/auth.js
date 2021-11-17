import Cookies from 'js-cookie';

export default class Auth {
  static setToken(token) {
   
    
    Cookies.set('authToken', token);
    
  }

  static destroyToken() {
    Cookies.remove('authToken');
  }

  static getToken() {
    const token = Cookies.get('authToken');

    return token;
  }

  static loggedIn() {
    return this.getToken() != null;
  }
}
