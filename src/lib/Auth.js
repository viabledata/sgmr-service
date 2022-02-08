class Auth {
  static storeToken(token) {
    sessionStorage.setItem('token', token);
  }

  static retrieveToken() {
    return sessionStorage.getItem('token');
  }

  static logout() {
    sessionStorage.clear();
  }

  static isAuthorized() {
    return this.retrieveToken();
  }
}

export default Auth;
