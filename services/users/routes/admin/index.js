const createRoutes = require('./create');
const updateRoutes = require('./update');
const listRoutes = require('./list');
const deleteRoutes = require('./delete');
const showRoutes = require('./show');

module.exports = [
  ...createRoutes,
  ...updateRoutes,
  ...listRoutes,
  ...deleteRoutes,
  ...showRoutes
];
