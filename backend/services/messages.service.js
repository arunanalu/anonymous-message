const {
  create,
  findMessages,
  findNotApprovedMessages,
} = require('../models/messages.model');

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

module.exports = {
  createMessage,
  getMessages,
  getNotApproved,
};
