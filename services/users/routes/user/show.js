'use strict';

const { userShowHandler } = require('../../handlers');

const routes = [
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userShowHandler,
    config: {
      auth: 'jwt'
    }
  }
];

module.exports = routes;
