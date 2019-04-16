'use strict';

const Joi = require('joi');

const {
  userNewHandler,
  userEditHandler,
  userListHandler,
  userShowHandler,
  userDeleteHandler
} = require('../handlers');

const { adminScope } = require('./scopes');

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
  },
  {
    method: 'PATCH',
    path: '/admin/users/{id}',
    handler: userEditHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      }
    }
  },
  {
    method: 'PATCH',
    path: '/users/{id}',
    handler: userEditHandler
  },
  {
    method: 'GET',
    path: '/admin/users',
    handler: userListHandler
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userShowHandler
  },
  {
    method: 'DELETE',
    path: '/admin/users/{id}',
    handler: userDeleteHandler
  }
];

module.exports = routes;
