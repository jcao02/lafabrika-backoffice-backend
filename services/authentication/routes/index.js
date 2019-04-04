'use strict';

const Joi = require('joi');
const { signInHandler } = require('../handlers');

const routes = [
  {
    method: 'POST',
    path: '/sign-in',
    handler: signInHandler,
    options: {
      validate: {
        payload: {
          email: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  }
];

module.exports = routes;
