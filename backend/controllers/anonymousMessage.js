const anonymousMessageServices = require('../services/anonymousMessage');
const { created, success } = require('../utils/dictionary/statusCode');
const { messageSent } = require('../utils/dictionary/messagesDefault');

const createAnonymousMessage = async (req, res, next) => {
  try {
    const { user } = req.params;
    const { message } = req.body;
    await anonymousMessageServices.createAnonymousMessage({ message, user });
    return res.status(created).json({ message: messageSent });
  } catch (error) {
    return next(error);
  }
};

const getAnonymousMessages = async (req, res, next) => {
  try {
    const { user } = req.params;
    const messages = await anonymousMessageServices.getAnonymousMessages(user);
    return res.status(success).json(messages);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createAnonymousMessage, getAnonymousMessages };
