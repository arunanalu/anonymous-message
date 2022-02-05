const Router = require('express');
const {
  messageCreate,
  getAll,
  getNotApprovedMessages,
  updateMessageApproved,
} = require('../controllers/messages.controller');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);
messagesRoute.get('/', getAll);
messagesRoute.get('/approve', getNotApprovedMessages);
messagesRoute.put('/approve/:id', updateMessageApproved);

module.exports = { messagesRoute };
