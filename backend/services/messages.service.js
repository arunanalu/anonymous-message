const {
  create,
  findMessages,
  findNotApprovedMessages,
  update,
} = require('../models/messages.model');
const { messageNotFound } = require('../utils/dictionary/messagesDefault');
const { notFound } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

const createMessage = async (anonymousMessage) => {
  const id = await create(anonymousMessage);
  return id;
};

const getMessages = async () => {
  const messages = await findMessages();
  return messages;
};

const getNotApproved = async () => {
  const messages = await findNotApprovedMessages();
  return messages;
};

const updateMessage = async (id) => {
  const response = await update(id);

  if (response === 0) throw errorConstructor(notFound, messageNotFound);
};

module.exports = {
  createMessage,
  getMessages,
  getNotApproved,
  updateMessage,
};
