'use strict';

const Joi = require('joi');

const { userShowHandler } = require('../../handlers');

const routes = [
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userShowHandler
  }
];

module.exports = routes;
