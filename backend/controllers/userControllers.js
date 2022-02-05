const { createNewUser, findAUser, getUsers } = require('../services/userServices');
const { created, success } = require('../utils/dictionary/statusCode');

const createANewUser = async (req, res, next) => {
  try {
    const { name, password, type } = req.body;
    const result = await createNewUser(name, password, type);
    res.status(created).json(result);
  } catch (error) {
    next(error);
  }
};

const findAnExistingUser = async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await findAUser(name);
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await getUsers();
    res.status(success).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createANewUser, findAnExistingUser, getAllUsers };
