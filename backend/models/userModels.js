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

module.exports = { createUser };
