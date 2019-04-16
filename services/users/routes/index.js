'use strict';

const validateFn = require('./validate');

const adminRoutes = require('./admin');
const userRoutes = require('./user');

const routes = [
  ...adminRoutes,
  ...userRoutes
];

module.exports = {
  routes,
  validateFn
};
