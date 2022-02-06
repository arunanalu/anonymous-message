const { newAnonymousMessage, getAnonymousMessagesByUser } = require('../models/anonymousMessage');

const createAnonymousMessage = async (message) => {
  const newMessage = await newAnonymousMessage(message);
  return newMessage;
};

const getAnonymousMessages = async (user) => {
  const messages = await getAnonymousMessagesByUser(user);
  return messages;
};

module.exports = { createAnonymousMessage, getAnonymousMessages };
