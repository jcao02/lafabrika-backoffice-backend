'use strict';

const Knex = require('knex');
const knexConfig = require('./knexfile');

const { Model } = require('objection');

/** Associate knex to objection */
const knex = Knex(knexConfig);
Model.knex(knex);

/** Export associated models */
module.exports = {
  User: require('./User'),
  Role: require('./Role'),
};

