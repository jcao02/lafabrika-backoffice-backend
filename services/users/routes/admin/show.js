'use strict';

const { userShowHandler } = require('../../handlers');
const { adminScope } = require('../scopes');

const routes = [
  {
    method: 'GET',
    path: '/admin/users/{id}',
    handler: userShowHandler,
    config: {
      auth: {
        strategy: 'jwt',
        scope: adminScope
      }
    }
  },
];

module.exports = routes;
