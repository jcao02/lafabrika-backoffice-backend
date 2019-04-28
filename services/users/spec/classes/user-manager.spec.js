const faker = require('faker');
const UserManager = require('../../classes/user-manager');
const { User } = require('lafabrika-objection-models');

describe('UserManager', () => {
  let user, userModel;
  beforeEach(() => {
    user = {
      id: faker.random.number(),
      email: faker.internet.email(),
      role: 'admin',
      password: faker.internet.password(),
    };

    userModel = {
      ...user,
      privateInformation: {
        password: user.password,
      }
    };

    delete userModel.password;
  });
  describe('createUser', () => {
    it('should create a user properly', async done => {
      const createSpy = spyOn(User, 'createWithPassword').and.returnValue(Promise.resolve(userModel));
      const payload = { email: user.email, password: user.password, role: user.role };
      const result = await UserManager.createUser(payload);

      expect(result.email).toEqual(user.email);
      expect(result.role).toEqual(user.role);
      expect(result.privateInformation).toEqual({ password: user.password });
      expect(createSpy).toHaveBeenCalled();
      done();
    });
    it('should throw an error if the user has an id', async done => {
      const createSpy = spyOn(User, 'createWithPassword').and.returnValue(Promise.resolve(userModel));
      try {
        const payload = user;
        await UserManager.createUser(payload);
        done.fail('SHould throw and error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if the user is missing password', async done => {
      const createSpy = spyOn(User, 'createWithPassword').and.returnValue(Promise.resolve(userModel));
      try {
        const payload = { email: user.email, role: user.role };
        await UserManager.createUser(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if the user is missing email', async done => {
      const createSpy = spyOn(User, 'createWithPassword').and.returnValue(Promise.resolve(userModel));
      try {
        const payload = { password: user.password, role: user.role };
        await UserManager.createUser(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if the user is missing role', async done => {
      const createSpy = spyOn(User, 'createWithPassword').and.returnValue(Promise.resolve(userModel));
      try {
        const payload = { email: user.email, password: user.password };
        await UserManager.createUser(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });

  describe('updateUser', () => {
    it('should update a user properly', async done => {
      const newUser = {
        ...user,
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'regular'
      }
      const userQuery = { updateAndFetchById() { return Promise.resolve(newUser); } }
      const updateSpy = spyOn(User, 'query').and.returnValue(userQuery);
      const payload = { email: newUser.email, password: newUser.password, role: newUser.role };
      const result = await UserManager.updateUser(user.id, payload);

      expect(result.email).toEqual(newUser.email);
      expect(result.role).toEqual(newUser.role);
      expect(updateSpy).toHaveBeenCalled();
      done();
    });
    it('should throw an error if the user email is set to null', async done => {
      const userQuery = { updateAndFetchById() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { email: null };
        await UserManager.updateUser(user.id, payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    })
    it('should throw an error if the user password is set to null', async done => {
      const userQuery = { updateAndFetchById() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { password: null };
        await UserManager.updateUser(user.id, payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if the user role is set to null', async done => {
      const userQuery = { updateAndFetchById() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { role: null };
        await UserManager.updateUser(user.id, payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });

  describe('getUsers', () => {
    it('should get the list of users properly', async done => {
      const queryObj = { limit() { return Promise.resolve([user])}, offset() { return Promise.resolve([user]) } }
      const userQuery = { limit() { return queryObj; }, offset() { return queryObj; }};
      const listSpy = spyOn(User, 'query').and.returnValue(userQuery);
      const payload = { limit: 10, offset: 0 };
      const users = await UserManager.getUsers(payload);

      expect(users).toEqual([user]);
      expect(listSpy).toHaveBeenCalled();
      done();
    });
    it('should throw an error if limit is missing', async done => {
      const queryObj = { limit() { return Promise.resolve([user])}, offset() { return Promise.resolve([user]) } }
      const userQuery = { limit() { return queryObj; }, offset() { return queryObj; }};
      const listSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { offset: 0 };
        await UserManager.getUsers(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(listSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if offset is missing', async done => {
      const queryObj = { limit() { return Promise.resolve([user])}, offset() { return Promise.resolve([user]) } }
      const userQuery = { limit() { return queryObj; }, offset() { return queryObj; }};
      const listSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { limit: 10 };
        await UserManager.getUsers(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(listSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });

  describe('getUser', () => {
    it('should get the user properly', async done => {
      const userQuery = { findById() { return Promise.resolve(user); } }
      const findSpy = spyOn(User, 'query').and.returnValue(userQuery);
      const result = await UserManager.getUser(user.id);

      expect(result.email).toEqual(user.email);
      expect(result.role).toEqual(user.role);
      expect(findSpy).toHaveBeenCalled();
      done();
    });
    it('should return null if the user does not exist', async done => {
      const userQuery = { findById() { return Promise.resolve(undefined); } }
      const findSpy = spyOn(User, 'query').and.returnValue(userQuery);
      const result = await UserManager.getUser(user.id);

      expect(result).toBeNull();
      expect(findSpy).toHaveBeenCalled();
      done();
    });
  });

  describe('deleteUser', () => {
    it('should delete the user properly', async done => {
      const userQuery = { deleteById() { return { throwIfNotFound() { return Promise.resolve(); } } } };
      const findSpy = spyOn(User, 'query').and.returnValue(userQuery);
      await UserManager.deleteUser(user.id);
      expect(findSpy).toHaveBeenCalled();
      done();
    });
    it('should return throw and error if the user does not exist', async done => {
      const userQuery = { deleteById() { return { throwIfNotFound() { return Promise.reject(User.createNotFoundError()); } } } };
      const findSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        await UserManager.deleteUser(user.id);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
        expect(findSpy).toHaveBeenCalled();
        done();
      }
    });
  });
});
