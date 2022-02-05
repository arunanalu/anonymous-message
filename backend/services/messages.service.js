const {
  create,
  findMessages,
  findNotApprovedMessages,
  update,
  deleteMessage,
} = require('../models/messages.model');

const createMessage = async (anonymousMessage) => {
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
