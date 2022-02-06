const connection = require('./connection');

const DB_COLLECTION = 'individualMessages';

const newAnonymousMessage = async (message) => {
  // const { message, user } = anonymousMessage;
  const db = await connection();
  const { insertedId } = await db.collection(DB_COLLECTION)
    .insertOne(message);
  return insertedId;
};

const getAnonymousMessagesByUser = async (user) => {
  const db = await connection();
  const messages = await db.collection(DB_COLLECTION).find({ user }).toArray();
  return messages;
};

module.exports = { newAnonymousMessage, getAnonymousMessagesByUser };
