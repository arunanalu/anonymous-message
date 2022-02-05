const Router = require('express');
const {
  messageCreate,
  getAll,
  getNotApprovedMessages,
  updateMessageApproved,
  messageDelete,
} = require('../controllers/messages.controller');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);
messagesRoute.get('/', getAll);
messagesRoute.get('/approve', getNotApprovedMessages);
messagesRoute.put('/approve/:id', updateMessageApproved);
messagesRoute.delete('/approve/:id', messageDelete);

module.exports = { messagesRoute };
