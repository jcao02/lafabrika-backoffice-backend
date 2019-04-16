'use strict';

const UserManager = require('../classes/user-manager');

/**
 * Handles user creation
 */
const userNewHandler = async (request, h) => {
  const manager = new UserManager();
  const user = await manager.createUser(request.payload);
  return h.response(user.toJSON()).code(201);
};

/**
 * Handles user edition
 */
const userEditHandler = async (request) => {
  const { id } = request.params;
  const manager = new UserManager();
  const user = await manager.updateUser(id, request.payload);
  return user.toJSON();
};

/**
 * Handles user show
 */
const userShowHandler = async (request) => {
  const { id } = request.params;
  const manager = new UserManager();
  const user = await manager.getUser(id);
  return user.toJSON();
};

/**
 * Handles user list
 */
const userListHandler = async (request) => {
  const { limit, offset = 0 } = request.query;
  const manager = new UserManager();
  const users = manager.getUsers({ limit, offset });
  return users.toJSON();
};

/**
 * Handles user delete
 */
const userDeleteHandler = async (request) => {
  const { id } = request.params;
  const manager = new UserManager();
  return await manager.deleteUser(id);
};


module.exports = {
  userNewHandler,
  userEditHandler,
  userShowHandler,
  userListHandler,
  userDeleteHandler
};
