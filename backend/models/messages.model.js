const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'messages';

const create = async (anonymousMessage) => {
  const { message, approved } = anonymousMessage;
  const db = await connect();
  const { insertedId } = await db.collection(DB_COLLECTION)
    .insertOne({ message, approved });
  return insertedId;
};

const findMessages = async () => {
  const db = await connect();
  const messages = await db.collection(DB_COLLECTION).find().toArray();
  return messages;
};

module.exports = {
  create,
  findMessages,
};
