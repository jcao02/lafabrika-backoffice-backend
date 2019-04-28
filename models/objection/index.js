'use strict';

const Knex = require('knex');
const knexConfig = require('./knexfile');
const {
  UniqueViolationError,
  NotNullViolationError,
  CheckViolationError,
  ConstraintViolationError,
  ForeignKeyViolationError
} = require('objection-db-errors');

const { Model } = require('objection');

/** Associate knex to objection */
const knex = Knex(knexConfig);
Model.knex(knex);

/** Export associated models */
module.exports = {
  User: require('./models/User'),
  Role: require('./models/Role'),
  UserPrivateInformation: require('./models/UserPrivateInformation'),
  Errors: {
    UniqueViolationError,
    NotNullViolationError,
    CheckViolationError,
    ConstraintViolationError,
    ForeignKeyViolationError
  }
};

