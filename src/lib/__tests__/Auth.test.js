import Auth from '../Auth';

describe('Auth.js', () => {
  const testToken = 'test';

  afterAll(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should store a token in local storage', () => {
    Auth.storeToken(testToken);
    expect(localStorage.getItem('token')).toBe(testToken);
  });

  it('should retrieve a token from local storage', () => {
    localStorage.setItem('token', testToken);
    expect(Auth.retrieveToken()).toBe(testToken);
  });

  it('should clear local storage', () => {
    localStorage.setItem('token', testToken);
    Auth.logout();
    expect(localStorage.getItem('token')).toBe(null);
  });

  describe('isAuthorised', () => {
    it('should be truthy when a token is in local storage', () => {
      localStorage.setItem('token', testToken);
      expect(Auth.isAuthorized()).toBeTruthy();
    });

    it('should be falsy when a token is not in local storage', () => {
      expect(Auth.isAuthorized()).toBeFalsy();
    });
  });
});
