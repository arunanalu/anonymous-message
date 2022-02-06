/* eslint-disable consistent-return */
const {
  createMessage,
  getApprovedMessages,
  getNotApproved,
  updateMessage,
  removeMessage,
} = require('../services/messages.services');
const { messageSent, approvedMessage, messageDeleted } = require('../utils/dictionary/messagesDefault');
const { created, success } = require('../utils/dictionary/statusCode');

const messageCreate = async (req, res, next) => {
  const anonymousMessage = req.body;
  try {
    await createMessage(anonymousMessage);

    res.status(created).json({ message: messageSent });
  } catch (error) {
    next(error);
  }
};

const getAllApproved = async (req, res, next) => {
  try {
    const messages = await getApprovedMessages();
    res.status(success).json(messages);
  } catch (error) {
    next(error);
  }
};

const getNotApprovedMessages = async (req, res, next) => {
  try {
    const messages = await getNotApproved();
    res.status(success).json(messages);
  } catch (error) {
    next(error);
  }
};

const updateMessageApproved = async (req, res, next) => {
  const id = req.params;
  try {
    await updateMessage(id);
    res.status(success).json({ message: approvedMessage });
  } catch (error) {
    next(error);
  }
};

const messageDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeMessage(id);
    res.status(success).json({ message: messageDeleted });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  messageCreate,
  getAllApproved,
  getNotApprovedMessages,
  updateMessageApproved,
  messageDelete,
};
