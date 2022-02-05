const {
  create,
  findMessages,
  findNotApprovedMessages,
  update,
  deleteMessage,
} = require('../models/messages.model');
const { messageValidation, messagesEmpty } = require('../utils/functions/Validations');

const createMessage = async (anonymousMessage) => {
  const { message } = anonymousMessage;
  messageValidation(message);

  const id = await create(anonymousMessage);
  return id;
};

const getMessages = async () => {
  const messages = await findMessages();
  messagesEmpty(messages);
  return messages;
};

const getNotApproved = async () => {
  const messages = await findNotApprovedMessages();
  messagesEmpty(messages);
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
