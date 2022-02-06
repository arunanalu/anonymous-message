/* eslint-disable no-console */
const { verifyToken } = require('../services/authService');
const { missingAuth, jwtMalformed, onlyAdmins } = require('../utils/dictionary/messagesDefault');
const { unauthorized } = require('../utils/dictionary/statusCode');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) res.status(unauthorized).json(missingAuth);

    const data = verifyToken(authorization);

    if (!data) res.status(unauthorized).json(jwtMalformed);

    // console.log(data, 'aqui está o data');
    // console.log(data.type, 'aqui está o tipo');

    if (data.type !== 'admin') res.status(unauthorized).json(onlyAdmins);

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação', error);
    res.status(unauthorized).json(jwtMalformed);
  }
};
