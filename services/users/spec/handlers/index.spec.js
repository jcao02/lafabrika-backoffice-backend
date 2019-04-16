const faker = require('faker');
const { server } = require('../../server');
const { adminScope, userScope } = require('../../routes/scopes');

const JWT_PRIV_KEY = 'JWT_PRIV_KEY';

describe('Users Handlers', () => {
  let user;
  let oldKey;


  beforeAll(() => {
    oldKey = process.env.JWT_PRIV_KEY;
    process.env.JWT_PRIV_KEY = JWT_PRIV_KEY;
  });

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: userScope
    };
  });

  afterAll(() => {
    process.env.JWT_PRIV_KEY = oldKey;
  });

  describe('POST /admin/users', () => {
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
    it('should validate email as required', async done => {
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
  });
});
