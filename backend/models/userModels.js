const connection = require('./connection');

const createUser = async (name, password, type) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ name, password, type });
  return {
    name,
    type,
    insertedId,
  };
};

const findUser = async (name) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ name });
  return user;
};

const users = async () => {
  const db = await connection();
  const allUsers = await db.collection('users').find().toArray();
  return allUsers;
};

module.exports = { createUser, findUser, users };
