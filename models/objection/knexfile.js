'use strict';

module.exports = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_URI,
  searchPath: ['lafabrika', 'public'],
});

