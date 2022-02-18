const { ObjectId } = require('mongodb');
const {
  create,
  findApprovedMessages,
  findNotApprovedMessages,
  update,
  deleteMessage,
  findApprovedMessagesWithPagination,
  getMessageById,
} = require('../models/messages.model');
const {
  messageValidation, messagesEmpty, messageExistValidation, idValidation,
} = require('../utils/functions/Validations');

const createMessage = async (anonymousMessage) => {
  const { message } = anonymousMessage;
  messageValidation(message);

  const id = await create(anonymousMessage);
  return id;
};

const getApprovedMessages = async (n) => {
  if (n) {
    const numberPerPage = 15;
    const messages = await findApprovedMessagesWithPagination(numberPerPage * n);
    const moreMessages = (messages.length === 15);

    return { messages, nextPage: moreMessages };
  }
  const messages = await findApprovedMessages();
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
  if (!ObjectId.isValid(id)) throw idValidation();
  const messageExist = await getMessageById(id);
  if (!messageExist) throw messageExistValidation();
  await update(id);
};

const removeMessage = async (id) => {
  // da pra validar se foi mesmo deletada com o retorno da mensagem
  if (!ObjectId.isValid(id)) throw idValidation();
  const messageExist = await getMessageById(id);
  if (!messageExist) throw messageExistValidation();
  await deleteMessage(id);
};

module.exports = {
  createMessage,
  getApprovedMessages,
  getNotApproved,
  updateMessage,
  removeMessage,
};
