'use strict';

const { userDeleteHandler } = require('../../handlers');
const { adminScope } = require('../scopes');

const routes = [
  {
    method: 'DELETE',
    path: '/admin/users/{id}',
    handler: userDeleteHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      }
    }
  }
];

module.exports = routes;
