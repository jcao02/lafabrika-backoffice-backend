const faker = require('faker');
const UserManager = require('../../classes/user-manager');
const { User } = require('lafabrika-objection-models');

describe('UserManager', () => {
  let manager = new UserManager();
  let user;
  beforeEach(() => {
    user = {
      id: faker.random.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'admin'
    };
  });
  describe('createUser', () => {
    it('should create a user properly', async done => {
      const userQuery = { insertAndFetch() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      const payload = { email: user.email, password: user.password, role: user.role };
      const result = await manager.createUser(payload);

      expect(result.email).toEqual(user.email);
      expect(result.role).toEqual(user.role);
      expect(createSpy).toHaveBeenCalled();
      done();
    });
    it('should throw an error if the user is missing password', async done => {
      const userQuery = { insertAndFetch() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { email: user.email, role: user.role };
        await manager.createUser(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if the user is missing email', async done => {
      const userQuery = { insertAndFetch() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { password: user.password, role: user.role };
        await manager.createUser(payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
    it('should throw an error if the user is missing role', async done => {
      const userQuery = { insertAndFetch() { return Promise.resolve(user); } }
      const createSpy = spyOn(User, 'query').and.returnValue(userQuery);
      try {
        const payload = { email: user.email, password: user.password };
        await manager.createUser(payload);
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
      const result = await manager.updateUser(user.id, payload);

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
        await manager.updateUser(user.id, payload);
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
        await manager.updateUser(user.id, payload);
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
        await manager.updateUser(user.id, payload);
        done.fail('Should throw an error');
      } catch (err) {
        expect(createSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });

  describe('getUsers', () => {
    it('should get the list of users properly');
    it('should throw an error if limit is missing');
    it('should throw an error if offset is missing');
  });

  describe('getUser', () => {
    it('should get the user properly');
    it('should return null if the user does not exist');
  });

  describe('deleteUser', () => {
    it('should delete the user properly');
    it('should return throw and error if the user does not exist');
  });
});
