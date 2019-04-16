const faker = require('faker');
const { User } = require('lafabrika-objection-models');

const { server } = require('../../../server');
const { userScope, selfScope } = require('../../../routes/scopes');
const UserManager = require('../../../classes/user-manager');

describe('User Handlers', () => {
  describe('PATCH /users/{id}', () => {
    const id = 1;
    let user;
    beforeEach(() => {
      user = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };
    });

    describe('Success', () => {
      it('should patch properly a user', async done => {
        const updatedUser = ( new User() ).$setJson({ ...user });
        const userSpy = spyOn(UserManager, 'updateUser').and.returnValue(Promise.resolve(updatedUser));
        const payload = { ...user };
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload,
          auth: {
            strategy: 'jwt',
            credentials: { scope: [ userScope, selfScope ] }
          }
        };
        const result = await server.inject(opts);
        const expected = 200;
        expect(result.statusCode).toBe(expected)

        const resultPayload = JSON.parse(result.payload);
        expect(resultPayload).toEqual(updatedUser.toJSON());

        expect(userSpy).toHaveBeenCalledWith(id, payload);
        done();
      });
    });

    describe('Errors', () => {
      it('should return 401 when no authentication', async done => {
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload: { ...user }
        }
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 403 when no self scope and admin', async done => {
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload: { ...user },
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
      it('should return 403 when no self scope and user', async done => {
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload: { ...user },
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
      it('should validate email', async done => {
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload: { ...user, email: 'invalid' },
          auth: {
            strategy: 'jwt',
            credentials: { scope: [ userScope, selfScope ] }
          }
        };
        const result = await server.inject(opts);
        const expected = 400;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should validate password length 8', async done => {
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload: { ...user, password: '1234567' },
          auth: {
            strategy: 'jwt',
            credentials: { scope: [ userScope, selfScope ] }
          }
        };
        const result = await server.inject(opts);
        const expected = 400;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should not allow role', async done => {
        const opts = {
          method: 'PATCH',
          url: `/users/${id}`,
          payload: { ...user, role: 'admin' },
          auth: {
            strategy: 'jwt',
            credentials: { scope: [ userScope, selfScope ] }
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

