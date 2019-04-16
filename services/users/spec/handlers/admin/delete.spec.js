const { User } = require('lafabrika-objection-models');

const { server } = require('../../../server');
const { adminScope, userScope } = require('../../../routes/scopes');
const UserManager = require('../../../classes/user-manager');

describe('User Handlers Admin', () => {
  describe('DELETE /admin/users/{id}', () => {
    const id = 1;
    describe('Success', () => {
      it('should return 200', async done => {
        const userSpy = spyOn(UserManager, 'deleteUser').and.returnValue(Promise.resolve());
        const opts = {
          method: 'DELETE',
          url: `/admin/users/${id}`,
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 200;
        expect(result.statusCode).toBe(expected)
        expect(userSpy).toHaveBeenCalledWith(id);
        done();
      });
    });
    describe('Error', () => {
      it('should return 401 if no auhtentication', async done => {
        const opts = {
          method: 'DELETE',
          url: `/admin/users/${id}`
        };
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 403 if no admin', async done => {
        const opts = {
          method: 'DELETE',
          url: `/admin/users/${id}`,
          auth: {
            strategy: 'jwt',
            credentials: { scope: userScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 403;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 404 if user not found', async done => {
        const userSpy = spyOn(UserManager, 'deleteUser').and.throwError(User.createNotFoundError());
        const opts = {
          method: 'DELETE',
          url: `/admin/users/${id}`,
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 404;
        expect(result.statusCode).toBe(expected)
        expect(userSpy).toHaveBeenCalledWith(id);
        done();
      });
    })
  });
});
