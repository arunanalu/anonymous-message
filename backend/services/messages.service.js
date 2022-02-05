const {
  create,
  findMessages,
  findNotApprovedMessages,
  update,
  deleteMessage,
} = require('../models/messages.model');
const { messageValidation } = require('../utils/functions/Validations');
// const { messageNotFound, messageNotDeleted } = require('../utils/dictionary/messagesDefault');
// const { notFound, badRequest } = require('../utils/dictionary/statusCode');
// const errorConstructor = require('../utils/functions/errorConstructor');

const createMessage = async (anonymousMessage) => {
  messageValidation(anonymousMessage);

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
  // da pra validar se foi mesmo modificada com o retorno da mensagem
  await update(id);
};

const removeMessage = async (id) => {
  // da pra validar se foi mesmo deletada com o retorno da mensagem
  await deleteMessage(id);
};

module.exports = {
  createMessage,
  getMessages,
  getNotApproved,
  updateMessage,
  removeMessage,
};
