'use strict';

const AuthenticationManager = require('../classes/authentication-manager');
const Boom = require('boom');

const signInHandler = async (request, h) => {
  const { email, password } = request.payload;
  const tokenOrNull = await AuthenticationManager.authenticate(email, password);

  if (tokenOrNull) {
    return h.response({ token: tokenOrNull }).code(201);
  } else {
    throw Boom.unauthorized('Wrong email/password combination');
  }
};

module.exports = {
  signInHandler
};

