const AuthenticationManager = require('../../classes/authentication-manager');
const { User } = require('lafabrika-objection-models');

describe('AuthenticationManager', () => {
  const email = 'myEmail@example.com';
  const password = 'myPasword';
  it('should return the user if the email/password combination is right', async done => {
    try {
      const checkSpy = spyOn(User, 'checkUserPassword').and.returnValue(Promise.resolve(true));
      const user = { email, role: 'admin' };
      const userQuery = { where() { return Promise.resolve(user) } };
      const userSpy = spyOn(User, 'query').and.returnValue(userQuery);
      const result = await AuthenticationManager.authenticate(email, password);
      expect(result).toEqual(user);
      expect(checkSpy).toHaveBeenCalledWith(email, password);
      expect(userSpy).toHaveBeenCalled();
      done();
    } catch (err) {
      done.fail(err);
    }
  });
  it('should return null if the email/password combination is wrong', async done => {
    try {
      const checkSpy = spyOn(User, 'checkUserPassword').and.returnValue(Promise.resolve(false));
      const result = await AuthenticationManager.authenticate(email, password);
      expect(result).toBeNull();
      expect(checkSpy).toHaveBeenCalledWith(email, password);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});