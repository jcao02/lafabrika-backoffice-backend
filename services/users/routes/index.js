'use strict';

const Joi = require('joi');

const {
  userNewHandler,
  userEditHandler,
  userListHandler,
  userShowHandler,
  userDeleteHandler
} = require('../handlers');

const { adminScope, userScope, selfScope } = require('./scopes');

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
