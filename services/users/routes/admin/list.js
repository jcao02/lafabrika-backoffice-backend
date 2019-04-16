'use strict';

const Joi = require('joi');
const { userListHandler } = require('../../handlers');
const { adminScope } = require('../scopes');

const routes = [
  {
    method: 'GET',
    path: '/admin/users',
    handler: userListHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      },
      validate: {
        query:  {
          limit: Joi.number().integer().min(1).required(),
          offset: Joi.number().integer().min(0).required()
        }
      }
    }
  },
];

module.exports = routes;
