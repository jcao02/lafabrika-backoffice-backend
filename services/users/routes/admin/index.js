const createRoutes = require('./create');
const updateRoutes = require('./update');
const listRoutes = require('./list');
const deleteRoutes = require('./delete');

module.exports = [
  ...createRoutes,
  ...updateRoutes,
  ...listRoutes,
  ...deleteRoutes
];
