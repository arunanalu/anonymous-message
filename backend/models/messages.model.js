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

const findNotApprovedMessages = async () => {
  const db = await connect();
  const messages = await db.collection(DB_COLLECTION).find({ approved: 'false' }).toArray();
  return messages;
};

const update = async (id) => {
  const db = await connect();
  const { modifiedCount } = await db.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, {
      $set: {
        approved: 'true',
      },
    });
  return modifiedCount;
};

module.exports = {
  create,
  findMessages,
  findNotApprovedMessages,
  update,
};
