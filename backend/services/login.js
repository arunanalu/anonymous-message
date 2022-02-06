const { loginValidation } = require('../utils/functions/Validations');
const { createToken } = require('./authService');

const loginService = async (name, password) => {
  const user = await loginValidation(name, password);
  const { password: _password, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);
  const { type } = user;

  return { token, type };
};

module.exports = { loginService };
