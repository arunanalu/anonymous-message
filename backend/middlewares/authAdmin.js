/* eslint-disable no-console */
const { verifyToken } = require('../services/authService');
const { authorizationValidate, tokenValidation, onlyAdminValidations } = require('../utils/functions/Validations');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    authorizationValidate(authorization);

    const data = verifyToken(authorization);

    tokenValidation(data);
    onlyAdminValidations(data.type);

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação', error);
    next(error);
  }
};
