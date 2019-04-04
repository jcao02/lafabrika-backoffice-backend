const jwt = require('jsonwebtoken');

/**
 * Class to handle token generation
 */
class TokenGenerator {
  /**
   * Generates a token (random string) from a payload
   * @param {Object} payload to use
   * @returns {string} token
   */
  static generate(payload) {
    return jwt.sign(payload, process.env.JWT_PRIV_KEY);
  }
}

module.exports = TokenGenerator;
