/* eslint-disable no-console */
const { loginService } = require('../services/login');
const { success } = require('../utils/dictionary/statusCode');

const loginController = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await loginService(name, password);

    res.status(success).json(user);
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

module.exports = { loginController };
