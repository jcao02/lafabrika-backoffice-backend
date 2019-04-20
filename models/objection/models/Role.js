'use strict';

const { BaseModel } = require('./Base');

class Role extends BaseModel {
  static get tableName() {
    return 'roles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'roles.name',
          to: 'users.role'
        }
      }
    };
  }
}

module.exports = Role;
