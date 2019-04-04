const { server } = require('../../server');
const AuthenticationManager = require('../../classes/authentication-manager');
const TokenGenerator = require('../../classes/token-generator');

// Helper to test status code
async function testStatusCode(opts, expectedCode, cb) {
  try {
    const result = await server.inject(opts);
    expect(result.statusCode).toBe(expectedCode)
    cb(result);
  } catch (err) {
    cb(null, err);
  }
}

describe('Handlers', () => {
  describe('signInHandler', () => {
    const email = 'myEmail@example.com';
    const password = 'myPassword';

    it('should return 400 when email is missing', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { password }
      }

      const expectedCode = 400;
      testStatusCode(opts, expectedCode, (_, err) => !err ? done() : done.fail(err));
    });
    it('should return 400 when password is missing', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { email }
      }
      const expectedCode = 400;
      testStatusCode(opts, expectedCode, (_, err) => !err ? done() : done.fail(err));
    });
    it('should return 401 when email/password combination is wrong', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { email, password }
      }
      const authSpy = spyOn(AuthenticationManager, 'authenticate').and.returnValue(Promise.resolve(null));
      const expectedCode = 401;
      testStatusCode(opts, expectedCode, (_, err) => {
        if (err) {
          done.fail(err);
        } else {
          expect(authSpy).toHaveBeenCalledWith(email, password);
          done();
        }
      });
    });
    it('should return 201 with jwt token when email/password combination is right', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { email, password }
      }

      const user = { email, role: 'admin' };
      const authSpy = spyOn(AuthenticationManager, 'authenticate').and.returnValue(Promise.resolve(user));
      const token = 'myToken';
      const tokenSpy = spyOn(TokenGenerator, 'generate').and.returnValue(token)
      const expectedCode = 201;
      testStatusCode(opts, expectedCode, (res, err) => {
        if (err) {
          done.fail(err);
        } else {
          const payload = JSON.parse(res.payload);
          expect(payload.token).toEqual(token);
          expect(authSpy).toHaveBeenCalledWith(email, password);
          expect(tokenSpy).toHaveBeenCalledWith({ email: user.email, role: user.role}, '1y');
          done();
        }
      });
    });
  });
});
