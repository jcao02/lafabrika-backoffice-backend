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
  async createUser(payload) {
    assert.ok(payload.email);
    assert.ok(payload.password);
    assert.ok(payload.role);

    return await User.query().insertAndFetch(payload);
  }

  /**
   * Updates a user data
   * @param {number} id of the user to update
   * @param {Object} payload with the user data
   */
  async updateUser(id, payload) {
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
  async getUsers(options) {
    assert.ok('limit' in options);
    assert.ok('offset' in options);

    const { limit, offset } = options;
    return await User.query().limit(limit).offset(offset);
  }

  /**
   * Gets a user by id
   * @param {number} id of the user to show
   */
  async getUser(id) {
    const user = await User.query().findById(id);
    return !!user ? user : null;
  }

  /**
   * Deletes user by id
   * @param {number} id of the user to delete
   */
  async deleteUser(id) {
    return await User.query().deleteById(id);
  }
}

module.exports = UserManager;
