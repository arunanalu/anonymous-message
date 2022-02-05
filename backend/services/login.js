/* eslint-disable no-console */
const { loginValidation } = require('../utils/functions/Validations');
const { createToken } = require('./authService');

const loginService = async (name, password) => {
  const user = await loginValidation(name, password);

  const { type } = user;
  const token = createToken(user);

  return { type, token };
};

module.exports = { loginService };
