'use strict';

const {
  userNewHandler,
  userEditHandler,
  userListHandler,
  userShowHandler,
  userDeleteHandler
} = require('../handlers');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: userNewHandler
  },
  {
    method: 'PATCH',
    path: '/users',
    handler: userEditHandler
  },
  {
    method: 'GET',
    path: '/users',
    handler: userListHandler
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userShowHandler
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: userDeleteHandler
  }
];

module.exports = routes;
