const faker = require('faker');
const { server } = require('../../server');
const { adminScope, userScope } = require('../../routes/scopes');

describe('Users Handlers', () => {
  let user;

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: userScope
    };
  });

  describe('POST /admin/users', () => {
    describe('Success', () => {
      it('should return 201 on succes', async done => {
        const createdUser = { ...user, id: 1 };
        const opts = {
          method: 'POST',
          url: '/admin/users',
          payload: { ...user },
          auth: {
            strategy: 'jwt',
            credentials: { scope: adminScope }
          }
        };
        const result = await server.inject(opts);
        const expected = 201;
        expect(result.statusCode).toBe(expected)

        const payload = JSON.parse(result.payload);
        expect(payload).toEqual(createdUser);
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
});
