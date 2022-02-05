const { createUser } = require('../models/userModels');

const createNewUser = async (name, password, type) => {
  const result = await createUser(name, password, type);
  return result;
};

module.exports = { createNewUser };
