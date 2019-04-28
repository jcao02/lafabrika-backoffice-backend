'use strict';

const { User, Errors } = require('lafabrika-objection-models');
const UserManager = require('../classes/user-manager');
const Boom = require('boom');

/**
 * Handles user creation
 */
const userNewHandler = async (request, h) => {
  try {
    const user = await UserManager.createUser(request.payload);
    return h.response(user.toJSON()).code(201);
  } catch (err) {
    if (err instanceof Errors.UniqueViolationError) {
      throw Boom.conflict('Email already registered');
    } else {
      throw err;
    }
  }
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
 * Handlers user private information edition
 */
const privateInformationEditHandler = async (request, h) => {
  const { id } = request.params;
  const { currentPassword, newPassword } = request.payload;
  try {
    if (newPassword) {
      await UserManager.updatePassword(id, currentPassword, newPassword);
    }

    return h.continue;
  } catch (err) {
    if (err instanceof User.NotFoundError) {
      throw Boom.notFound('User not found');
    } else {
      throw err;
    }
  }
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
  const users = await UserManager.getUsers({ limit, offset });
  return users.map(u => u.toJSON());
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
  userDeleteHandler,
  privateInformationEditHandler
};
