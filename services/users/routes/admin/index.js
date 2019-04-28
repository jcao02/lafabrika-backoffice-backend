const createRoutes = require('./create');
const updateRoutes = require('./update');
const updatePrivateRoutes = require('./update-private');
const listRoutes = require('./list');
const deleteRoutes = require('./delete');
const showRoutes = require('./show');

module.exports = [
  ...createRoutes,
  ...updateRoutes,
  ...updatePrivateRoutes,
  ...listRoutes,
  ...deleteRoutes,
  ...showRoutes
];
