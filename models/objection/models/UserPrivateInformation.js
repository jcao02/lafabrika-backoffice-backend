'use strict';

const { BaseModel } = require('./Base');

class Role extends BaseModel {
  static get tableName() {
    return 'user_private_informations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        password: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'user_private_informations.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Role;
