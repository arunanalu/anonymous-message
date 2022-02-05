/* eslint-disable no-console */
const { verifyToken } = require('../services/authService');
const { missingAuth, jwtMalformed } = require('../utils/dictionary/messagesDefault');
const { unauthorized } = require('../utils/dictionary/statusCode');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) res.status(unauthorized).json(missingAuth);

    const data = verifyToken(authorization);

    console.log(data);

    if (!data) res.status(unauthorized).json(jwtMalformed);

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação', error);
    res.status(unauthorized).json(jwtMalformed);
  }
};
