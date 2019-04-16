const faker = require('faker');
const { User } = require('lafabrika-objection-models');
const { server } = require('../../server');
const { adminScope, userScope } = require('../../routes/scopes');
const UserManager = require('../../classes/user-manager');

describe('Users Handlers', () => {
  describe('POST /admin/users', () => {
    let user;

    beforeEach(() => {
      user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: userScope
      };
    });
    describe('Success', () => {
      it('should return 201 on succes', async done => {
        const createdUser = ( new User() ).$setJson({ ...user });
        const userSpy = spyOn(UserManager, 'createUser').and.returnValue(Promise.resolve(createdUser));
        const payload = { ...user };
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload,
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 201;
        expect(result.statusCode).toBe(expected)

        const resultPayload = JSON.parse(result.payload);
        expect(resultPayload).toEqual(createdUser.toJSON());

        expect(userSpy).toHaveBeenCalledWith(payload);
        done();
      });
    });
    describe('Errors', () => {
      it('should return 401 if no authentication', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { ...user }
        }
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 403 if no admin', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
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

      it('should validate email as required', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { password: user.password, role: user.role },
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
      it('should validate email', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { ...user, email: 'invalid' },
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
      it('should validate role as required', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { email: user.email, password: user.password },
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
      it('should validate role', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { ...user, role: 'invalid' },
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
      it('should validate password as required', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { email: user.email, role: 'user' },
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
      it('should validate password min-length 8', async done => {
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { email: user.email, role: 'user', password: '1234567' },
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
  describe('PATCH /admin/users/{id}', () => {
    const id = 1;
    let user;
    beforeEach(() => {
      user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'admin'
      };
    });
    describe('Success', () => {
      it('should properly patch a user', async done => {
        const updatedUser = ( new User() ).$setJson({ ...user });
        const userSpy = spyOn(UserManager, 'updateUser').and.returnValue(Promise.resolve(updatedUser));
        const payload = { ...user };
        const opts = {
          method: 'PATCH',
          url: `/admin/users/${id}`,
          payload,
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
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
    describe('Error', () => {
      it('should return 401 if no authentication', async done => {
        const opts = {
          method: 'PATCH',
          url: `/admin/users/${id}`,
          payload: { ...user }
        }
        const result = await server.inject(opts);
        const expected = 401;
        expect(result.statusCode).toBe(expected)
        done();
      });
      it('should return 403 if user is not admin', async done => {
        const opts = {
          method: 'PATCH',
          url: `/admin/users/${id}`,
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
          url: `/admin/users/${id}`,
          payload: { ...user, email: 'invalid' },
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
      it('should validate password length 8', async done => {
        const opts = {
          method: 'PATCH',
          url: `/admin/users/${id}`,
          payload: { ...user, password: '1234567' },
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
      it('should validate role', async done => {
        const opts = {
          method: 'PATCH',
          url: `/admin/users/${id}`,
          payload: { ...user, role: 'invalid' },
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
