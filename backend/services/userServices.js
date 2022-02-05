const { createUser, findUser, users } = require('../models/userModels');

const createNewUser = async (name, password, type) => {
  const result = await createUser(name, password, type);
  return result;
};

const findAUser = async (name) => {
  const result = await findUser(name);
  const { password: _password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

const getUsers = async () => {
  const result = await users();
  const newResult = result.map((el) => {
    const { password: _password, ...userWithoutPassword } = el;
    return userWithoutPassword;
  });
  return newResult;
};

module.exports = { createNewUser, findAUser, getUsers };
