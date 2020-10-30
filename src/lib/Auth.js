class Auth {
  static storeToken(token) {
    localStorage.setItem('token', token);
  }

  static retrieveToken() {
    return localStorage.getItem('token');
  }

  static logout() {
    localStorage.clear();
  }

  static isAuthorized() {
    return this.retrieveToken();
  }
}

export default Auth;
