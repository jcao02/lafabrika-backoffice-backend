'use strict';

const Joi = require('joi');

const { userEditHandler } = require('../../handlers');

const { selfScope } = require('../scopes');

const routes = [
  {
    method: 'PATCH',
    path: '/users/{id}',
    handler: userEditHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: selfScope
      },
      validate: {
        payload: {
          email: Joi.string().email(),
          password: Joi.string().min(8)
        }
      }
    }
  }
];

module.exports = routes;
