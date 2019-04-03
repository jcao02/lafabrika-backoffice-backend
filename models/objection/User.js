'use strict';

const { Model } = require('objection');
const Role = require('./Role');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.HasOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role',
          to: 'roles.name'
        }
      }
    };
  }
}

module.exports = User;
