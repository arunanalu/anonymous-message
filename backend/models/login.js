/* eslint-disable no-console */
const connection = require('./connection');

const loginModel = async (name, password) => {
  const connect = await connection();

  const login = await connect
    .collection('users')
    .findOne({ name, password });

  console.log('model', login);
  return login;
};

module.exports = {
  loginModel,
};
