'use strict';

const { userListHandler } = require('../../handlers');

const routes = [
  {
    method: 'GET',
    path: '/admin/users',
    handler: userListHandler
  },
];

module.exports = routes;
