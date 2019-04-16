const { selfScope } = require('./scopes');

const validateFn = async (decoded, request) => {
  if (!'role' in decoded) {
    return { isValid: false };
  } else {
    const isSelf = request.params.id === decoded.id;
    const scope = !isSelf ? decoded.role : [decoded.role, selfScope];
    return { isValid: true, credentials: { scope } };
  }
};

module.exports = validateFn;
