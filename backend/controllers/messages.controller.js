const { createMessage, getMessages } = require('../services/messages.service');
const { messageSent } = require('../utils/dictionary/messagesDefault');
const { created, success } = require('../utils/dictionary/statusCode');

const messageCreate = async (req, res, next) => {
  const anonymousMessage = req.body;
  try {
    await createMessage(anonymousMessage);

    return res.status(created).json({ message: messageSent });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const messages = await getMessages();
    return res.status(success).json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  messageCreate,
  getAll,
};
