const { newAnonymousMessage, getAnonymousMessagesByUser } = require('../models/anonymousMessage');
const { messageValidation, getPrivateMessagesValidation } = require('../utils/functions/Validations');

const createAnonymousMessage = async (message) => {
  messageValidation(message.message);
  const newMessage = await newAnonymousMessage(message);
  return newMessage;
};

const getAnonymousMessages = async (user, name) => {
  getPrivateMessagesValidation(user, name);
  const messages = await getAnonymousMessagesByUser(user);
  return messages;
};

module.exports = { createAnonymousMessage, getAnonymousMessages };
