'use strict';

const { User } = require('lafabrika-objection-models');

/**
 * This class handle users CRUD
 */
export class UserManager {

  /**
   * Creates a user from the payload
   * @param {Object} payload with user data
   */
  async createUser(payload) {
    return await User.query().insertAndFetch(payload);
  }

  /**
   * Updates a user data
   * @param {number} id of the user to update
   * @param {Object} payload with the user data
   */
  async updateUser(id, payload) {
    return await User.query().updateAndFetchById(id, payload);
  }

  /**
   * Gets a list of users
   * @param {Object} options to get user by (limit and offset)
   */
  async getUsers(options) {
    const { limit, offset } = options;
    return await User.query().limit(limit).offset(offset);
  }

  /**
   * Gets a user by id
   * @param {number} id of the user to show
   */
  async getUser(id) {
    return await User.query().findById(id);
  }

  /**
   * Deletes user by id
   * @param {number} id of the user to delete
   */
  async deleteUser(id) {
    return await User.query().deleteById(id);
  }
}
