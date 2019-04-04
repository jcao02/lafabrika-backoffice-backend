const { server } = require('../../server');
const { User } = require('lafabrika-objection-models');

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
      const modelSpy = spyOn(User, 'checkUserPassword').and.returnValue(Promise.resolve(false));
      const expectedCode = 401;
      testStatusCode(opts, expectedCode, (_, err) => {
        if (err) {
          done.fail(err);
        } else {
          expect(modelSpy).toHaveBeenCalledWith(email, password);
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

      process.env.JWT_PRIV_KEY = 'JWT_PRIV_KEY';
      const modelSpy = spyOn(User, 'checkUserPassword').and.returnValue(Promise.resolve(true));
      const userQuery = { where() { return Promise.resolve({ email, role: 'admin' }) } };
      const querySpy = spyOn(User, 'query').and.returnValue(userQuery);
      const expectedCode = 201;
      testStatusCode(opts, expectedCode, (res, err) => {
        if (err) {
          done.fail(err);
        } else {
          const payload = JSON.parse(res.payload);
          expect(payload.token).not.toBeUndefined();

          expect(modelSpy).toHaveBeenCalledWith(email, password);
          expect(querySpy).toHaveBeenCalled();

          delete process.env.JWT_PRIV_KEY;
          done();
        }
      });
    });
  });
});
