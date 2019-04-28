'use strict';

const assert = require('assert');
const { User } = require('lafabrika-objection-models');

/**
 * This class handle users CRUD
 */
class UserManager {

  /**
   * Creates a user from the payload
   * @param {Object} payload with user data
   */
  static async createUser(payload) {
    assert.ok(!payload.id)
    assert.ok(payload.email);
    assert.ok(payload.password);
    assert.ok(payload.role);

    /** Don't include password in user's payload. It won't work */
    const password = payload.password;
    delete payload.password;

    const graphToInsert = {
      ...payload,
      privateInformation: { password }
    }

    return await User.query().insertGraph(graphToInsert);
  }

  /**
   * Updates a user data
   * @param {number} id of the user to update
   * @param {Object} payload with the user data
   */
  static async updateUser(id, payload) {
    const notNullAttrs = ['email', 'password', 'role'];
    notNullAttrs.forEach(attr => {
      if (attr in payload) {
        assert.ok(payload[attr]);
      }
    });
    return await User.query().updateAndFetchById(id, payload);
  }

  /**
   * Gets a list of users
   * @param {Object} options to get user by (limit and offset)
   */
  static async getUsers(options) {
    assert.ok('limit' in options);
    assert.ok('offset' in options);

    const { limit, offset } = options;
    return await User.query().limit(limit).offset(offset);
  }

  /**
   * Gets a user by id
   * @param {number} id of the user to show
   */
  static async getUser(id) {
    const user = await User.query().findById(id);
    return !!user ? user : null;
  }

  /**
   * Deletes user by id
   * @param {number} id of the user to delete
   */
  static async deleteUser(id) {
    return await User.query().deleteById(id).throwIfNotFound();
  }
}

module.exports = UserManager;
