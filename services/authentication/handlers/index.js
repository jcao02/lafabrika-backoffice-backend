'use strict';

const { User } = require('lafabrika-objection-models');
const Boom = require('boom');

const signInHandler = async (request, h) => {
  const { email, password } = request.payload;
  const isRightCombination = await User.checkUserPassword(email, password);

  if (isRightCombination) {
    return "";
  } else {
    throw Boom.unauthorized('Wrong email/password combination');
  }

};

module.exports = {
  signInHandler
};

