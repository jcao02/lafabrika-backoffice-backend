'use strict';

const { User } = require('lafabrika-objection-models');

/**
 * Class to handle email/password authentication
 */
class AuthenticationManager {
  /**
   * Returns null if the authentication is not successful, and the user otherwise
   * @param {string} email to be checked
   * @param {string} password to be checked
   * @returns {User|null}
   */
  static async authenticate(email, password) {
    const isRightCombination = await User.checkUserPassword(email, password);

    if (isRightCombination) {
      const user = await User.query().where('email', '=', email).first();
      return user;
    } else {
      return null;
    }
  }
}

module.exports = AuthenticationManager;