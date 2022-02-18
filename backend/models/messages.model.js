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

const findApprovedMessages = async () => {
  const db = await connect();
  const messages = await db.collection(DB_COLLECTION).find({ approved: 'true' }).toArray();
  return messages;
};

const findApprovedMessagesWithPagination = async (skip) => {
  const db = await connect();
  const messages = await db.collection(DB_COLLECTION).find({ approved: 'true' }).sort({ _id: -1 }).skip(skip)
    .limit(15)
    .toArray();
  return messages;
};

const findNotApprovedMessages = async () => {
  const db = await connect();
  const messages = await db.collection(DB_COLLECTION).find({ approved: 'false' }).toArray();
  return messages;
};

const update = async (id) => {
  const db = await connect();
  await db.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, {
      $set: {
        approved: 'true',
      },
    });
};

const deleteMessage = async (id) => {
  const db = await connect();
  await db.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

const getMessageById = async (id) => {
  const db = await connect();
  const message = await db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return message;
};

module.exports = {
  create,
  findApprovedMessages,
  findNotApprovedMessages,
  update,
  deleteMessage,
  findApprovedMessagesWithPagination,
  getMessageById,
};
