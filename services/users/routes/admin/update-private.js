'use strict';

const Joi = require('joi');

const { privateInformationEditHandler } = require('../../handlers');
const { adminScope } = require('../scopes');

const routes = [
  {
    method: 'PATCH',
    path: '/admin/user-private-informations/{id}',
    handler: privateInformationEditHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      },
      validate: {
        payload: {
          newPassword: Joi.string().min(8)
        }
      }
    }
  },
];

module.exports = routes;
