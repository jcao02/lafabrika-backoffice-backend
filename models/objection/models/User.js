'use strict';

const assert = require('assert');
const Objection = require('objection');
const { BaseModel } = require('./Base');
const Role = require('./Role');
const UserPrivateInformation = require('./UserPrivateInformation')

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  /**
   * Creates a user in the DB and its private information relationship
   * @param {Object} payload including user password
   */
  static async createWithPassword(payload) {
    // Password must be present in this function
    assert.ok(payload.password);
    // Create relationship graph
    const graphToInsert = {
      ...payload,
      privateInformation: { password: payload.password }
    }
    // Users table does not have a password
    delete graphToInsert.password;

    // A transaction is required because `insertGraph` is not atomic
    return await Objection.transaction(User.knex(), async trx =>
      User
        .query(trx)
        .insertGraph(graphToInsert)
        .returning('*')
    );
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
        relation: BaseModel.HasOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role',
          to: 'roles.name'
        }
      },
      privateInformation: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserPrivateInformation,
        join : {
          from: 'users.id',
          to: 'user_private_informations.user_id'
        }
      }
    };
  }
}

module.exports = User;
