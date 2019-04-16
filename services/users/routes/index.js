'use strict';

const adminRoutes = require('./admin');
const userRoutes = require('./user');

const routes = [
  ...adminRoutes,
  ...userRoutes
];

module.exports = routes;
