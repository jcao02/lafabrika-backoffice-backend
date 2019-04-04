'use strict';

const { User } = require('lafabrika-objection-models');
const Boom = require('boom');
const jwt = require('jsonwebtoken');

const signInHandler = async (request, h) => {
  const { email, password } = request.payload;

  const isRightCombination = await User.checkUserPassword(email, password);

  if (isRightCombination) {
    const user = await User.query().where('email', '=', email);
    const token = jwt.sign({ email, role: user.role }, process.env.JWT_PRIV_KEY);
    return h.response({ token }).code(201);
  } else {
    throw Boom.unauthorized('Wrong email/password combination');
  }
};

module.exports = {
  signInHandler
};

