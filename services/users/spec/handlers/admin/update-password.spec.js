const faker = require('faker');
const { User } = require('lafabrika-objection-models');

const { server } = require('../../../server');
const { adminScope, userScope } = require('../../../routes/scopes');
const UserManager = require('../../../classes/user-manager');

describe('User Handlers Admin', () => {
  describe('PATCH /admin/user-private-informations/{id}', () => {
    const id = '1';
    const url = `/admin/user-private-informations/${id}`;
    let payload;
    beforeEach(() => {
      payload = {
        currentPassword: faker.internet.password(),
        newPassword: faker.internet.password(10)
      };
    });
    describe('Success', () => {
      it('should properly update a user password', async done => {
        const passSpy = spyOn(UserManager, 'updatePassword').and.returnValue(Promise.resolve());
        const opts = {
          method: 'PATCH',
          url,
          payload,
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 200;
        expect(result.statusCode).toBe(expected)
        expect(passSpy).toHaveBeenCalledWith(id, payload.currentPassword, payload.newPassword);
        done();

      });
    });
    describe('Error', () => {
      it('should return 401 if no authentication', async done => {
        const opts = {
          method: 'PATCH',
          url,
          payload
        }
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 403 if user is not admin', async done => {
        const opts = {
          method: 'PATCH',
          url,
          payload,
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
      it('should validate password length 8', async done => {
        const opts = {
          method: 'PATCH',
          url,
          payload: { ...payload, newPassword: '1234567' },
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 400;
        expect(result.statusCode).toBe(expected)
        done();
      });
    });
  });
});
