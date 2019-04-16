const { selfScope, adminScope, userScope } = require('./scopes');

const validateFn = async (decoded, request) => {
  // Invalid: No role or invalid role
  if (!( 'role' in decoded ) || ![adminScope, userScope].includes(decoded.role)) {
    return { isValid: false };
  } else {
    const isSelf = request.params.id === decoded.id;
    const scope = !isSelf ? decoded.role : [decoded.role, selfScope];
    return { isValid: true, credentials: { scope } };
  }
};

module.exports = validateFn;
