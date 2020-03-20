class Auth {
  static storeToken(token) {
    localStorage.setItem('token', token);
  }

  static retrieveToken() {
    return localStorage.getItem('token');
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('redux');
  }

  static isAuthorized() {
    return this.retrieveToken();
  }
}

export default Auth;
