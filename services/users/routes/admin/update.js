'use strict';

const Joi = require('joi');

const { userEditHandler } = require('../../handlers');
const { adminScope } = require('../scopes');

const routes = [
  {
    method: 'PATCH',
    path: '/admin/users/{id}',
    handler: userEditHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      },
      validate: {
        payload: {
          email: Joi.string().email(),
          role: Joi.string().valid(['admin', 'user']),
          password: Joi.string().min(8)
        }
      }
    }
  },
];

module.exports = routes;
