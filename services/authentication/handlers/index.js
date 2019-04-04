'use strict';

const AuthenticationManager = require('../classes/authentication-manager');
const TokenGenerator = require('../classes/token-generator');
const Boom = require('boom');

const signInHandler = async (request, h) => {
  const { email, password } = request.payload;
  const userOrNull = await AuthenticationManager.authenticate(email, password);

  if (userOrNull) {
    const expiresIn = '1y'; // One year expiration
    const token = TokenGenerator.generate({ email: userOrNull.email, role: userOrNull.role }, expiresIn);
    return h.response({ token }).code(201);
  } else {
    throw Boom.unauthorized('Wrong email/password combination');
  }
};

module.exports = {
  signInHandler
};

