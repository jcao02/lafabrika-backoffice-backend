'use strict';

const { userDeleteHandler } = require('../../handlers');

const routes = [
  {
    method: 'DELETE',
    path: '/admin/users/{id}',
    handler: userDeleteHandler
  }
];

module.exports = routes;
