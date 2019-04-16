const faker = require('faker');
const UserManager = require('../../../classes/user-manager');
const { User } = require('lafabrika-objection-models');

const { server } = require('../../../server');
const { userScope } = require('../../../routes/scopes');

fdescribe('User Handlers', () => {
  let user;
  beforeEach(() => {
    user = {
      id: faker.random.number(),
      email: faker.internet.email(),
      role: 'admin'
    };
  });
  describe('GET /users/{id}', () => {
    describe('Success', () => {
      it('should return 200 with the user', async done => {
        const foundUser = (new User()).$setJson(user);
        const showSpy = spyOn(UserManager, 'getUser').and.returnValue(Promise.resolve(foundUser));
        const opts = {
          method: 'GET',
          url: `/users/${user.id}`,
          auth: {
            strategy: 'jwt',
            credentials: { scope: userScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 200;
        expect(result.statusCode).toBe(expected)

        const resultPayload = JSON.parse(result.payload);
        expect(resultPayload).toEqual(foundUser.toJSON());
        expect(showSpy).toHaveBeenCalledWith(user.id);
        done();
      });
    });
    describe('Errors', () => {
      it('should return 401 when no authenticated', async done => {
        const opts = {
          method: 'GET',
          url: `/users/${user.id}`
        };
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 404 when user not found', async done => {
        const showSpy = spyOn(UserManager, 'getUser').and.returnValue(Promise.resolve(null));
        const opts = {
          method: 'GET',
          url: `/users/${user.id}`,
          auth: {
            strategy: 'jwt',
            credentials: { scope: userScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 404;
        expect(result.statusCode).toBe(expected)
        expect(showSpy).toHaveBeenCalledWith(user.id);
        done();
      });
    });
  });
});
