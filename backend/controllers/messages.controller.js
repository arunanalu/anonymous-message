const {
  createMessage,
  getMessages,
  getNotApproved,
  updateMessage,
} = require('../services/messages.service');
const { messageSent, approvedMessage } = require('../utils/dictionary/messagesDefault');
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

const getNotApprovedMessages = async (req, res, next) => {
  try {
    const messages = await getNotApproved();
    return res.status(success).json(messages);
  } catch (error) {
    next(error);
  }
};

const updateMessageApproved = async (req, res, next) => {
  const id = req.params;
  try {
    await updateMessage(id);
    return res.status(success).json({ message: approvedMessage });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  messageCreate,
  getAll,
  getNotApprovedMessages,
  updateMessageApproved,
};
