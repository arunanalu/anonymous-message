const { createNewUser } = require('../services/userServices');
const { created } = require('../utils/dictionary/statusCode');

const createANewUser = async (req, res, next) => {
  try {
    const { name, password, type } = req.body;
    const result = await createNewUser(name, password, type);
    res.status(created).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createANewUser };
