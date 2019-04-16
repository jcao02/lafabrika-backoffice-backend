'use strict';

const Joi = require('joi');

const { userNewHandler } = require('../../handlers');

const { adminScope } = require('../scopes');

const routes = [
  {
    method: 'POST',
    path: '/admin/users',
    handler: userNewHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      },
      validate: {
        payload: {
          email: Joi.string().email().required(),
          role: Joi.string().valid(['admin', 'user']).required(),
          password: Joi.string().min(8).required()
        }
      }
    }
  }
];

module.exports = routes;
