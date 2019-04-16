'use strict';

const { User } = require('lafabrika-objection-models');
const UserManager = require('../classes/user-manager');
const Boom = require('boom');

/**
 * Handles user creation
 */
const userNewHandler = async (request, h) => {
  const user = await UserManager.createUser(request.payload);
  return h.response(user.toJSON()).code(201);
};

/**
 * Handles user edition
 */
const userEditHandler = async (request) => {
  const { id } = request.params;
  const user = await UserManager.updateUser(+id, request.payload);
  return user.toJSON();
};

/**
 * Handles user show
 */
const userShowHandler = async (request) => {
  const { id } = request.params;
  const user = await UserManager.getUser(+id);
  if (user !== null) {
    return user.toJSON();
  } else {
    throw Boom.notFound('User not found');
  }
};

/**
 * Handles user list
 */
const userListHandler = async (request) => {
  const { limit, offset = 0 } = request.query;
  const users = UserManager.getUsers({ limit, offset });
  return users.toJSON();
};

/**
 * Handles user delete
 */
const userDeleteHandler = async (request, h) => {
  const { id } = request.params;
  try {
    await UserManager.deleteUser(+id);
    return h.response().code(200);
  } catch (err) {
    if (err instanceof User.NotFoundError) {
      throw Boom.notFound('User not found');
    } else {
      throw err;
    }
  }
};


module.exports = {
  userNewHandler,
  userEditHandler,
  userShowHandler,
  userListHandler,
  userDeleteHandler
};
