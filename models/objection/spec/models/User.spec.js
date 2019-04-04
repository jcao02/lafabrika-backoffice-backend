const { User } = require('../../index');
/**
 * Creates a Result-compatible type (https://node-postgres.com/api/result)
 * @param {Array<any>} rows to be embedded in the Result
 */
function createResult(rows) {
  return { rows };
}

describe('User model', () => {
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