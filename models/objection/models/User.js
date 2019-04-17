'use strict';

const { Model } = require('objection');
const Role = require('./Role');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  /**
   * Resolves with true if the user/password combination is right
   * @param {string} email of the user
   * @param {string} password of the user
   */
  static async checkUserPassword(email, password) {
    const results = await this.knex().raw(`SELECT * FROM check_user_password_combination('${email}', '${password}')`);

    // This returns a Result (https://node-postgres.com/api/result)
    const row = results.rows[0];
    return row.check_user_password_combination;
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
      authRole: {
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
