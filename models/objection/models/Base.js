const { Model } = require('objection');
const { DBErrors } = require ('objection-db-errors');

/**
 * This is just a wrapper with pretty errors
 */
class BaseModel extends DBErrors(Model) {}

module.exports = {
  BaseModel
};
