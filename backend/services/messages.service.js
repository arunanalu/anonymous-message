const { create } = require('../models/messages.model');

const createMessage = async (anonymousMessage) => {
  const id = await create(anonymousMessage);
  return id;
};

module.exports = {
  createMessage,
};
