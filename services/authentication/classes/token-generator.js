const jwt = require('jsonwebtoken');

/**
 * Class to handle token generation
 */
class TokenGenerator {
  /**
   * Generates a token (random string) from a payload
   * @param {Object} payload to use
   * @param {string} expiresIn expressed in seconds or a string describing a time span zeit/ms. (60, "2 days", "10h")
   * @returns {string} token
   */
  static generate(payload, expiresIn) {
    return jwt.sign(payload, process.env.JWT_PRIV_KEY, { expiresIn });
  }
}

module.exports = TokenGenerator;
