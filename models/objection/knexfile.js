'use strict';

module.exports = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_URI,
  searchPath: ['lafabrika', 'public'],
};

