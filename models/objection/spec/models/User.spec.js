const Objection = require('objection');
const faker = require('faker');
const { User } = require('../../index');
/**
 * Creates a Result-compatible type (https://node-postgres.com/api/result)
 * @param {Array<any>} rows to be embedded in the Result
 */
function createResult(rows) {
  return { rows };
}

describe('User model', () => {
  describe('createWithPassword', () => {
    let user, userGraph;
    beforeEach(() => {
      user = {
        id: faker.random.number(),
        email: faker.internet.email(),
        role: 'admin',
        password: faker.internet.password(),
      };
      userGraph = {
        ...user,
        privateInformation: {
          password: user.password,
        }
      };
    delete userGraph.password;
    });

    it('should create a user with its password properly', async done => {
      const trxSpy = spyOn(Objection, 'transaction').and.returnValue(Promise.resolve(userGraph));
      const payload = user;
      await User.createWithPassword(payload);
      expect(trxSpy).toHaveBeenCalled();
      done();
    });
    it('should throw error is password is not provided', async done => {
      const trxSpy = spyOn(Objection, 'transaction');
      try {
        const payload = { email: user.email, role: user.role };
        await User.createWithPassword(payload);
        done.fail('Should throw error');
      } catch (err) {
        expect(trxSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });
  describe('checkUserPassword', () => {
    const email = 'jon@example.com';
    const password = 'mypassword';
    const queryStr = `SELECT * FROM check_user_password_combination('${email}', '${password}')`;
    it('should return true if the user/password combination is right', async done => {
      const queryRes = createResult([ {check_user_password_combination: true} ])
      const knexSpy = spyOn(User.knex(), 'raw').and.returnValue(Promise.resolve(queryRes));
      const result = await User.checkUserPassword(email, password);
      expect(result).toBe(true);
      expect(knexSpy).toHaveBeenCalledWith(queryStr);
      done();
    });
    it('should return false if the user/password combination is wrong', async done => {
      const queryRes = createResult([ {check_user_password_combination: false} ])
      const knexSpy = spyOn(User.knex(), 'raw').and.returnValue(Promise.resolve(queryRes));
      const result = await User.checkUserPassword(email, password);
      expect(result).toBe(false);
      expect(knexSpy).toHaveBeenCalledWith(queryStr);
      done();
    });
  });
});