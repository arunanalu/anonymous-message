const { createMessage } = require('../services/messages.service');
const { messageSent } = require('../utils/dictionary/messagesDefault');
const { created } = require('../utils/dictionary/statusCode');

// eslint-disable-next-line consistent-return
const messageCreate = async (req, res, next) => {
  const anonymousMessage = req.body;
  try {
    await createMessage(anonymousMessage);

    return res.status(created).json({ message: messageSent });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  messageCreate,
};
