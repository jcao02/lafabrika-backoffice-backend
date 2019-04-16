const faker = require('faker');
const validateFn = require('../../routes/validate');
const { adminScope, selfScope } = require('../../routes/scopes');

describe('ValidateFn', () => {
  it('should return valid false if no role in decoded', async done => {
    const decoded = { id: 1, email: faker.internet.email() };
    const request = { params: {} };
    const expected = { isValid: false };
    expect(await validateFn(decoded, request)).toEqual(expected);
    done();
  });
  it('should return valid false if role does not exist', async done => {
    const decoded = { id: 1, email: faker.internet.email(), role: 'invalid' };
    const request = { params: {} };
    const expected = { isValid: false };
    expect(await validateFn(decoded, request)).toEqual(expected);
    done();
  });
  it('should return valid true with role in scope', async done => {
    const decoded = { id: 1, email: faker.internet.email(), role: adminScope };
    const request = { params: {} };
    const expected = { isValid: true, credentials: { scope: adminScope } };
    expect(await validateFn(decoded, request)).toEqual(expected);
    done();
  });
  it('should return valid true with role with selfScope in scope if ID is the same as route', async done => {
    const decoded = { id: 1, email: faker.internet.email(), role: adminScope };
    const request = { params: { id: decoded.id } };
    const expected = { isValid: true, credentials: { scope: [ adminScope, selfScope ] } };
    expect(await validateFn(decoded, request)).toEqual(expected);
    done();
  });
});
