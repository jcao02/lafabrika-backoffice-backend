'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
  routes: {
    cors: { credentials: true }
  }
});

const validateFn = async (decoded) => {
  if (!'role' in decoded) {
    return { isValid: false };
  } else {
    return { isValid: true, credentials: { scope: decoded.role } };
  }
};

const registerPlugins = async () => {
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_PRIV_KEY,
    validate: validateFn
  });

  server.auth.default('jwt');
};

/** Register all plugins */
const pluginsRegistered = registerPlugins().then(() => {
   /** Register routes after plugins */
  routes.forEach((route) => {
    server.route(route);
  });
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
  pluginsRegistered.then(() => {
    init();
  })
}

module.exports = { server };
