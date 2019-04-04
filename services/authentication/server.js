'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0'
});

routes.forEach((route) => {
  server.route(route);
});

const init = async () => {
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

/** Only start server if not required by another module */
if (!module.parent) {
  init();
}

module.exports = { server };
