const updateRoutes = require('./update');
const showRoutes = require('./show');

module.exports = [
  ...updateRoutes,
  ...showRoutes
];
