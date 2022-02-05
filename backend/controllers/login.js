/* eslint-disable no-console */
const { loginService } = require('../services/login');
const { createToken } = require('../services/authService');
const { success } = require('../utils/dictionary/statusCode');

const loginController = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await loginService(name, password);

    const token = await createToken(user);

    console.log('controller', token);

    res.status(success).json({ token });
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

module.exports = { loginController };
