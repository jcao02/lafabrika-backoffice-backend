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
    path: '/admin/users',
    handler: userNewHandler
  },
  {
    method: 'PATCH',
    path: '/admin/users',
    handler: userEditHandler
  },
  {
    method: 'PATCH',
    path: '/users',
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
