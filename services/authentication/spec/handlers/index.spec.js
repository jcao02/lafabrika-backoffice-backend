const { server } = require('../../server');
const { User } = require('lafabrika-objection-models');

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
      try {
        const result = await server.inject(opts);
        const expectedCode = 400;
        expect(result.statusCode).toBe(expectedCode)
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('should return 400 when password is missing', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { email }
      }
      try {
        const result = await server.inject(opts);
        const expectedCode = 400;
        expect(result.statusCode).toBe(expectedCode)
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('should return 401 when email/password combination is wrong', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { email, password }
      }
      try {
        const modelSpy = spyOn(User, 'checkUserPassword').and.returnValue(Promise.resolve(false));
        const result = await server.inject(opts);

        const expectedCode = 401;
        expect(result.statusCode).toBe(expectedCode)

        expect(modelSpy).toHaveBeenCalledWith(email, password);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('should return 201 with jwt token when email/password combination is right', async done => {
      const opts = {
        method: 'POST',
        url: '/sign-in',
        payload: { email, password }
      }
      try {
        const modelSpy = spyOn(User, 'checkUserPassword').and.returnValue(Promise.resolve(true));
        const result = await server.inject(opts);


        const expectedCode = 201;
        expect(result.statusCode).toBe(expectedCode)

        const payload = JSON.parse(result.payload);

        expect(payload.token).not.toBeUndefined();
        expect(modelSpy).toHaveBeenCalledWith(email, password);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});