'use strict';

const { User } = require('lafabrika-objection-models');
const TokenGenerator = require('./token-generator');

/**
 * Class to handle email/password authentication
 */
class AuthenticationManager {
  /**
   * Returns null if the authentication is not successful, and the jwt token otherwise
   * @param {string} email to be checked
   * @param {string} password to be checked
   * @returns {string|null}
   */
  static async authenticate(email, password) {
    const isRightCombination = await User.checkUserPassword(email, password);

    if (isRightCombination) {
      const user = await User.query().where('email', '=', email);
      const token = TokenGenerator.generate({ email, role: user.role });
      return token;
    } else {
      return null;
    }
  }
}

module.exports = AuthenticationManager;