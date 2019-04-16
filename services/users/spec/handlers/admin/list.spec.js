const faker = require('faker');
const { User } = require('lafabrika-objection-models');

const { server } = require('../../../server');
const { adminScope, userScope } = require('../../../routes/scopes');
const UserManager = require('../../../classes/user-manager');

describe('User Handlers Admin', () => {
  let user;
  const limit = 10;
  const offset = 0;
  beforeEach(() => {
    user = {
      id: faker.random.number(),
      email: faker.internet.email(),
      role: 'admin'
    };
  });
  describe('GET /admin/users', () => {
    describe('Success', () => {
      it('should return 200 with list of users', async done => {
        const foundUser = (new User()).$setJson(user);
        const listSpy = spyOn(UserManager, 'getUsers').and.returnValue(Promise.resolve([foundUser]));
        const opts = {
          method: 'GET',
          url: `/admin/users?limit=${limit}&offset=${offset}`,
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 200;
        expect(result.statusCode).toBe(expected)

        const resultPayload = JSON.parse(result.payload);
        expect(resultPayload).toEqual([ foundUser.toJSON() ]);
        expect(listSpy).toHaveBeenCalledWith({ limit, offset });
        done();
      });
    });
    describe('Error', () => {
      it('should return 401 if no authentication', async done => {
        const opts = {
          method: 'GET',
          url: `/admin/users`
        };
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 403 if no admin', async done => {
        const opts = {
          method: 'GET',
          url: `/admin/users`,
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
      it('should return 400 if limit is missing', async done => {
        const opts = {
          method: 'GET',
          url: `/admin/users?offset=${offset}`,
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
      it('should return 400 if offset is missing', async done => {
        const opts = {
          method: 'GET',
          url: `/admin/users?limit=${limit}`,
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
